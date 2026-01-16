import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

// Get directory of current script file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Question {
  id: string;
  type: string;
  question: string;
  correctAnswer: string | string[];
  hint?: string;
  abbreviation?: string;
  relatedTo?: string;
  relatedPair?: string;
  associatedWith?: string;
  acceptableVariations?: string[];
  fullSequence?: string;
  tools?: string;
  topics?: string;
  topic?: string;
  scores: {
    correct: number;
    incorrect: number;
    percentage: number;
  };
}

interface QuizData {
  quizSettings: {
    mode: string;
    currentQuestionIndex: number;
  };
  questions: Question[];
  abbreviations: unknown[];
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function normalizeDataDto(text: string): string {
  // Normalize "data" and "dto" to be equivalent for matching
  // Use word boundaries to avoid matching parts of other words
  return text
    .replace(/\bdata\b/gi, '{data/dto}')
    .replace(/\bdto\b/gi, '{data/dto}');
}

function normalizeZhello(text: string): string {
  // Normalize "z" or "zhello" - accept "z" as equivalent to "zhello"
  return text
    .replace(/\bzhello\b/gi, '{z/zhello}')
    .replace(/\bz\b/gi, '{z/zhello}');
}

function normalizeTR808(text: string): string {
  // For TR808 answers, normalize any number or "seconds" to be equivalent
  // Replace any number with {number} and "seconds" with {seconds}
  return text
    .replace(/\b\d+\b/g, '{number}')
    .replace(/\bseconds?\b/gi, '{seconds}');
}

function normalizeAbbreviationPairs(text: string): string {
  // Normalize common abbreviation variations for lint group questions
  return (
    text
      // Normalize case variations
      .replace(/\(tcp\)/gi, '(TCP)')
      .replace(/\(e\)/gi, '(E)')
      // Accept TO(TS) as TOT(S) - common typo
      .replace(/to\(ts\)/gi, 'tot(s)')
      // Normalize separators (accept comma, "and", or "/")
      .replace(/\s*,\s*/g, ' and ')
      .replace(/\s+and\s+/gi, ' and ')
      // Normalize spacing around slashes
      .replace(/\s*\/\s*/g, ' / ')
      .trim()
  );
}

function normalizeCommonMisspellings(text: string): string {
  // Normalize common misspellings
  return text
    .replace(/\boverides\b/gi, 'overrides')
    .replace(/\btypescipt\b/gi, 'typescript')
    .replace(/\btypescrip\b/gi, 'typescript');
}

function normalizeTsconfig(text: string): string {
  // Normalize Tsconfig - accept "typescript" as equivalent to "tsconfig"
  // Also accept ROCE expansion (root, output, commonjs, excludes)
  return (
    text
      .replace(/\btsconfig\b/gi, '{tsconfig}')
      .replace(/\btypescript\b/gi, '{tsconfig}')
      // Remove ROCE expansion - handle various formats
      .replace(/\([^)]*roce[^)]*\)/gi, '')
      .replace(/\([^)]*root[^)]*output[^)]*commonjs[^)]*excludes[^)]*\)/gi, '')
      .replace(/\(root[^)]*output[^)]*commonjs[^)]*excludes[^)]*\)/gi, '')
      .replace(/root[^,)]*output[^,)]*commonjs[^,)]*excludes/gi, '')
      .replace(/\broce\b/gi, '')
      .replace(/\broot\b/gi, '')
      .replace(/\boutput\b/gi, '')
      .replace(/\bcommonjs\b/gi, '')
      .replace(/\bexcludes\b/gi, '')
      // Clean up extra spaces and commas
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*,/g, ',')
      .trim()
  );
}

function normalizeTSRest(text: string): string {
  // Normalize TSRest variations - TSRest, TsRest, TSresthandler, TsRestHandler are all equivalent
  return text
    .replace(/\btsresthandler\b/gi, 'tsrest')
    .replace(/\btsrest\shandler\b/gi, 'tsrest')
    .replace(/\btsrest\b/gi, 'tsrest');
}

function checkAnswer(
  userAnswer: string,
  correctAnswer: string | string[],
  acceptableVariations?: string[],
): boolean {
  const normalized = normalizeAnswer(userAnswer);

  // Handle aliases: "main" is an alias for CRI(svg)SPOD
  // Replace "main" with "cri(svg)spod" for matching
  const normalizedForMatching =
    normalized === 'main'
      ? 'cri(svg)spod'
      : normalized
          .replace(/^main\s*\(/i, '')
          .replace(/\)$/, '')
          .trim();

  // Normalize Data/Dto to be equivalent
  const normalizedForMatchingDataDto = normalizeDataDto(normalizedForMatching);

  // Normalize common misspellings
  const normalizedForMatchingSpelling = normalizeCommonMisspellings(
    normalizedForMatching,
  );

  // Normalize TSRest variations
  const normalizedForMatchingTSRest = normalizeTSRest(normalizedForMatching);

  // Normalize Tsconfig variations
  const normalizedForMatchingTsconfig = normalizeTsconfig(
    normalizedForMatching,
  );

  // Normalize Zhello variations (z = zhello)
  const normalizedForMatchingZhello = normalizeZhello(normalizedForMatching);

  // Combine correctAnswer array with acceptableVariations for checking
  const allAcceptableAnswers = Array.isArray(correctAnswer)
    ? [...correctAnswer]
    : [correctAnswer];
  if (acceptableVariations) {
    allAcceptableAnswers.push(...acceptableVariations);
  }

  if (allAcceptableAnswers.length > 1 || Array.isArray(correctAnswer)) {
    return allAcceptableAnswers.some((ans) => {
      const normalizedAns = normalizeAnswer(ans);
      const normalizedAnsDataDto = normalizeDataDto(normalizedAns);
      const normalizedAnsSpelling = normalizeCommonMisspellings(normalizedAns);
      const normalizedAnsTSRest = normalizeTSRest(normalizedAns);
      // Check direct match or if answer contains the abbreviation
      return (
        normalizedForMatching === normalizedAns ||
        normalizedAns.includes(normalizedForMatching) ||
        normalizedForMatching.includes(normalizedAns) ||
        (normalizedAns.includes('main') &&
          normalizedAns.includes('cri(svg)spod')) ||
        normalizedForMatchingDataDto === normalizedAnsDataDto ||
        normalizedAnsDataDto.includes(normalizedForMatchingDataDto) ||
        normalizedForMatchingDataDto.includes(normalizedAnsDataDto) ||
        normalizedForMatchingSpelling === normalizedAnsSpelling ||
        normalizedForMatchingTSRest === normalizedAnsTSRest ||
        normalizeTsconfig(normalizedAns) === normalizedForMatchingTsconfig ||
        normalizeZhello(normalizedAns) === normalizedForMatchingZhello
      );
    });
  }

  const normalizedCorrect = normalizeAnswer(correctAnswer);
  const normalizedCorrectDataDto = normalizeDataDto(normalizedCorrect);
  const normalizedCorrectSpelling =
    normalizeCommonMisspellings(normalizedCorrect);
  const normalizedCorrectTSRest = normalizeTSRest(normalizedCorrect);
  const normalizedCorrectTsconfig = normalizeTsconfig(normalizedCorrect);
  const normalizedCorrectZhello = normalizeZhello(normalizedCorrect);

  // Special handling for lint group questions (containing abbreviation pairs)
  // Check both correctAnswer and acceptableVariations
  const allAnswersToCheck = [normalizedCorrect];
  if (acceptableVariations) {
    allAnswersToCheck.push(
      ...acceptableVariations.map((a) => normalizeAnswer(a)),
    );
  }

  const isLintGroupQuestion = allAnswersToCheck.some(
    (ans) =>
      ans.includes('b(e)ds') ||
      ans.includes('tot(s)') ||
      ans.includes('run fuct') ||
      ans.includes('(e)prawn'),
  );

  if (isLintGroupQuestion) {
    const userPairs = normalizeAbbreviationPairs(normalizedForMatching);

    // Check if both pairs are present in user answer (order doesn't matter)
    const hasFirstPair =
      (userPairs.includes('b(e)ds') || userPairs.includes('beds')) &&
      (userPairs.includes('(e)prawn') || userPairs.includes('eprawn'));
    const hasSecondPair =
      (userPairs.includes('tot(s)') || userPairs.includes('to(ts)')) &&
      userPairs.includes('run fuct');

    // Check if any of the acceptable answers has both pairs
    const anyAnswerHasBothPairs = allAnswersToCheck.some((correctAns) => {
      const correctPairs = normalizeAbbreviationPairs(correctAns);
      const correctHasFirstPair =
        (correctPairs.includes('b(e)ds') || correctPairs.includes('beds')) &&
        (correctPairs.includes('(e)prawn') || correctPairs.includes('eprawn'));
      const correctHasSecondPair =
        (correctPairs.includes('tot(s)') || correctPairs.includes('to(ts)')) &&
        correctPairs.includes('run fuct');
      return correctHasFirstPair && correctHasSecondPair;
    });

    if (hasFirstPair && hasSecondPair && anyAnswerHasBothPairs) {
      return true;
    }
  }

  // Check exact match
  if (
    normalizedForMatching === normalizedCorrect ||
    normalizedForMatchingDataDto === normalizedCorrectDataDto ||
    normalizedForMatchingSpelling === normalizedCorrectSpelling ||
    normalizedForMatchingTSRest === normalizedCorrectTSRest ||
    normalizedForMatchingTsconfig === normalizedCorrectTsconfig ||
    normalizedForMatchingZhello === normalizedCorrectZhello
  ) {
    return true;
  }

  // Special handling for TR808 - accept any number or "seconds"
  if (
    normalizedCorrect.includes('808') ||
    normalizedCorrect.includes('seconds')
  ) {
    const userTR808 = normalizeTR808(normalizedForMatching);
    const correctTR808 = normalizeTR808(normalizedCorrect);
    if (userTR808 === correctTR808) {
      return true;
    }
    // Also check if user has timeout, resolve, and either a number or seconds
    if (
      normalizedForMatching.includes('timeout') &&
      normalizedForMatching.includes('resolve') &&
      (/\d+/.test(normalizedForMatching) ||
        /seconds?/i.test(normalizedForMatching))
    ) {
      return true;
    }
  }

  // Special handling for RUST(ROCE) - accept typescript as tsconfig and ROCE expansion
  if (
    normalizedCorrect.includes('tsconfig') ||
    normalizedForMatching.includes('typescript')
  ) {
    const userRUST = normalizeTsconfig(normalizedForMatching);
    const correctRUST = normalizeTsconfig(normalizedCorrect);
    if (
      userRUST === correctRUST ||
      userRUST.includes(correctRUST) ||
      correctRUST.includes(userRUST)
    ) {
      return true;
    }
    // Check word-by-word for RUST(ROCE)
    const rustCorrectWords = correctRUST
      .split(/[\s,/\-()]+/)
      .filter((w) => w.length > 2 && !w.includes('{'));
    const rustUserWords = userRUST
      .split(/[\s,/\-()]+/)
      .filter((w) => w.length > 2 && !w.includes('{'));
    if (
      rustCorrectWords.length > 0 &&
      rustCorrectWords.every((word) =>
        rustUserWords.some((uw) => uw.includes(word) || word.includes(uw)),
      )
    ) {
      return true;
    }
  }

  // Check if user answer contains all key words from correct answer
  // Use DataDto-normalized versions for word matching
  // Also normalize Tsconfig and Zhello for word matching
  const normalizedCorrectForWords = normalizeZhello(
    normalizeTsconfig(normalizedCorrectDataDto),
  );
  const normalizedUserForWords = normalizeZhello(
    normalizeTsconfig(normalizedForMatchingDataDto),
  );

  const correctWords = normalizedCorrectForWords
    .split(/[\s,/\-()]+/)
    .filter((w) => w.length > 1 && !w.includes('{'));
  const userWords = normalizedUserForWords.split(/[\s,/\-()]+/);

  return correctWords.every((word) =>
    userWords.some((uw) => uw.includes(word) || word.includes(uw)),
  );
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function runQuiz() {
  try {
    const abbreviationsPath = join(__dirname, 'abbreviations.json');
    const data = JSON.parse(
      readFileSync(abbreviationsPath, 'utf-8'),
    ) as QuizData;
    const { questions, quizSettings } = data;

    console.log('\n🎯 Abbreviations Quiz\n');
    console.log(`Mode: ${quizSettings.mode}`);
    console.log(`Total questions: ${questions.length}\n`);

    let questionList: Question[];
    if (quizSettings.mode === 'random') {
      questionList = shuffle(questions);
    } else {
      questionList = questions.slice(quizSettings.currentQuestionIndex);
    }

    let correctCount = 0;
    let totalAnswered = 0;

    for (const q of questionList) {
      console.log('─'.repeat(60));
      console.log(`\nQuestion ${totalAnswered + 1}:`);
      console.log(q.question);

      if (q.abbreviation) {
        console.log(`Abbreviation: ${q.abbreviation}`);
      }

      if (q.hint) {
        console.log(`💡 Hint: ${q.hint}`);
      }

      let userAnswer = await question('\nYour answer: ');

      // Handle blank/empty answers - prompt again
      while (userAnswer.trim() === '') {
        userAnswer = await question(
          'Please enter an answer (or type "skip" to skip, "quit" to exit): ',
        );
      }

      if (
        userAnswer.toLowerCase().trim() === 'skip' ||
        userAnswer.toLowerCase().trim() === 's'
      ) {
        console.log('⏭️  Skipped\n');
        continue;
      }

      if (
        userAnswer.toLowerCase().trim() === 'quit' ||
        userAnswer.toLowerCase().trim() === 'q'
      ) {
        console.log('\n👋 Quiz ended. Saving progress...\n');
        break;
      }

      // Check if question asks for multiple parts (full sequence, tools, topics, etc.)
      let isCorrect = false;
      let questionAnswered = false;

      // Check for questions asking about tools
      const asksAboutTools =
        q.tools &&
        (q.question.toLowerCase().includes('tools') ||
          q.question.toLowerCase().includes('tool'));
      // Check for questions asking about topics (singular or plural)
      const asksAboutTopics =
        q.topics &&
        (q.question.toLowerCase().includes('topics') ||
          q.question.toLowerCase().includes('topic'));
      // Check for questions asking about topic (singular, different from topics)
      const asksAboutTopic =
        q.topic &&
        (q.question.toLowerCase().includes('topic') ||
          q.question.toLowerCase().includes('topics'));
      // Check for questions asking about full sequence
      const asksAboutSequence =
        q.fullSequence && q.question.toLowerCase().includes('full sequence');

      if (asksAboutSequence) {
        // Check if answer includes the abbreviation meaning
        const hasAbbreviationMeaning = checkAnswer(
          userAnswer,
          q.correctAnswer,
          q.acceptableVariations,
        );
        const normalizedAnswer = normalizeAnswer(userAnswer);
        const normalizedSequence = normalizeAnswer(q.fullSequence);
        const hasFullSequence =
          normalizedAnswer.includes(normalizedSequence) ||
          normalizedSequence
            .split(/\s+/)
            .every((word) => normalizedAnswer.includes(word.toLowerCase()));

        if (hasAbbreviationMeaning && hasFullSequence) {
          isCorrect = true;
          questionAnswered = true;
        } else if (hasAbbreviationMeaning && !hasFullSequence) {
          // Ask follow-up question about full sequence
          console.log('✅ Correct for the abbreviation meaning!');
          console.log(`\nNow, what's the full sequence?`);

          let sequenceAnswer = await question('\nFull sequence: ');

          // Handle blank/empty answers - prompt again
          while (sequenceAnswer.trim() === '') {
            sequenceAnswer = await question(
              'Please enter the full sequence (or type "skip" to skip, "quit" to exit): ',
            );
          }

          if (
            sequenceAnswer.toLowerCase().trim() === 'skip' ||
            sequenceAnswer.toLowerCase().trim() === 's'
          ) {
            console.log('⏭️  Skipped full sequence\n');
            isCorrect = false;
            questionAnswered = true;
          } else if (
            sequenceAnswer.toLowerCase().trim() === 'quit' ||
            sequenceAnswer.toLowerCase().trim() === 'q'
          ) {
            console.log('\n👋 Quiz ended. Saving progress...\n');
            break;
          } else {
            const normalizedSeqAnswer = normalizeAnswer(sequenceAnswer);
            const normalizedSeq = normalizeAnswer(q.fullSequence);
            const hasSeq =
              normalizedSeqAnswer === normalizedSeq ||
              normalizedSeqAnswer.includes(normalizedSeq) ||
              normalizedSeq
                .split(/\s+/)
                .every((word) =>
                  normalizedSeqAnswer.includes(word.toLowerCase()),
                );

            if (hasSeq) {
              isCorrect = true;
              console.log('✅ Correct! Full sequence is correct.');
            } else {
              isCorrect = false;
              console.log('❌ Incorrect full sequence');
              console.log(`Correct full sequence: ${q.fullSequence}`);
            }
            questionAnswered = true;
          }
        } else {
          isCorrect = false;
          questionAnswered = true;
        }
      } else if (asksAboutTools) {
        // Check if answer includes the main answer
        const hasMainAnswer = checkAnswer(
          userAnswer,
          q.correctAnswer,
          q.acceptableVariations,
        );
        const normalizedAnswer = normalizeAnswer(userAnswer);
        const normalizedTools = normalizeAnswer(q.tools);
        const hasTools =
          normalizedAnswer.includes(normalizedTools) ||
          (normalizedAnswer.includes('biome') &&
            normalizedAnswer.includes('eslint')) ||
          (normalizedTools.includes('biome') &&
            normalizedTools.includes('eslint') &&
            (normalizedAnswer.includes('biome') ||
              normalizedAnswer.includes('eslint')));

        if (hasMainAnswer && hasTools) {
          isCorrect = true;
          questionAnswered = true;
        } else if (hasMainAnswer && !hasTools) {
          // Ask follow-up question about tools
          console.log('✅ Correct for the main answer!');
          console.log(
            `\nNow, what tools does B(E)DS(TCP) / (E)PRAWN relate to?`,
          );

          let toolsAnswer = await question('\nTools: ');

          // Handle blank/empty answers - prompt again
          while (toolsAnswer.trim() === '') {
            toolsAnswer = await question(
              'Please enter the tools (or type "skip" to skip, "quit" to exit): ',
            );
          }

          if (
            toolsAnswer.toLowerCase().trim() === 'skip' ||
            toolsAnswer.toLowerCase().trim() === 's'
          ) {
            console.log('⏭️  Skipped tools\n');
            isCorrect = false;
            questionAnswered = true;
          } else if (
            toolsAnswer.toLowerCase().trim() === 'quit' ||
            toolsAnswer.toLowerCase().trim() === 'q'
          ) {
            console.log('\n👋 Quiz ended. Saving progress...\n');
            break;
          } else {
            const normalizedToolsAnswer = normalizeAnswer(toolsAnswer);
            const normalizedToolsCorrect = normalizeAnswer(q.tools);
            const hasToolsAnswer =
              normalizedToolsAnswer === normalizedToolsCorrect ||
              normalizedToolsAnswer.includes(normalizedToolsCorrect) ||
              (normalizedToolsAnswer.includes('biome') &&
                normalizedToolsAnswer.includes('eslint'));

            if (hasToolsAnswer) {
              isCorrect = true;
              console.log('✅ Correct! Tools answer is correct.');
            } else {
              isCorrect = false;
              console.log('❌ Incorrect tools');
              console.log(`Correct tools: ${q.tools}`);
            }
            questionAnswered = true;
          }
        } else {
          isCorrect = false;
          questionAnswered = true;
        }
      } else if (asksAboutTopics || asksAboutTopic) {
        // Check if answer includes the main answer
        const hasMainAnswer = checkAnswer(
          userAnswer,
          q.correctAnswer,
          q.acceptableVariations,
        );
        const normalizedAnswer = normalizeAnswer(userAnswer);
        const topicValue = q.topics || q.topic || '';
        const normalizedTopics = normalizeAnswer(topicValue);
        const hasTopics =
          normalizedAnswer.includes(normalizedTopics) ||
          (normalizedAnswer.includes('testing') &&
            normalizedAnswer.includes('typescript')) ||
          (normalizedAnswer.includes('tests') &&
            normalizedAnswer.includes('overrides') &&
            normalizedAnswer.includes('typescript')) ||
          normalizedAnswer.includes('contract') ||
          (normalizedTopics.includes('testing') &&
            normalizedTopics.includes('typescript') &&
            (normalizedAnswer.includes('testing') ||
              normalizedAnswer.includes('typescript'))) ||
          (normalizedTopics.includes('tests') &&
            normalizedTopics.includes('overrides') &&
            normalizedTopics.includes('typescript') &&
            (normalizedAnswer.includes('tests') ||
              normalizedAnswer.includes('overrides') ||
              normalizedAnswer.includes('typescript'))) ||
          (normalizedTopics.includes('contract') &&
            normalizedAnswer.includes('contract'));

        if (hasMainAnswer && hasTopics) {
          isCorrect = true;
          questionAnswered = true;
        } else if (hasMainAnswer && !hasTopics) {
          // Ask follow-up question about topic/topics
          console.log('✅ Correct for the main answer!');
          const topicQuestion = asksAboutTopic
            ? `\nNow, what topic does CDW / CCDS relate to?`
            : `\nNow, what topics does this abbreviation pair relate to?`;
          console.log(topicQuestion);

          let topicsAnswer = await question('\nAnswer: ');

          // Handle blank/empty answers - prompt again
          while (topicsAnswer.trim() === '') {
            topicsAnswer = await question(
              'Please enter the answer (or type "skip" to skip, "quit" to exit): ',
            );
          }

          if (
            topicsAnswer.toLowerCase().trim() === 'skip' ||
            topicsAnswer.toLowerCase().trim() === 's'
          ) {
            console.log('⏭️  Skipped\n');
            isCorrect = false;
            questionAnswered = true;
          } else if (
            topicsAnswer.toLowerCase().trim() === 'quit' ||
            topicsAnswer.toLowerCase().trim() === 'q'
          ) {
            console.log('\n👋 Quiz ended. Saving progress...\n');
            break;
          } else {
            const normalizedTopicsAnswer = normalizeAnswer(topicsAnswer);
            const normalizedTopicsCorrect = normalizeAnswer(topicValue);
            const hasTopicsAnswer =
              normalizedTopicsAnswer === normalizedTopicsCorrect ||
              normalizedTopicsAnswer.includes(normalizedTopicsCorrect) ||
              (normalizedTopicsAnswer.includes('testing') &&
                normalizedTopicsAnswer.includes('typescript')) ||
              (normalizedTopicsAnswer.includes('tests') &&
                normalizedTopicsAnswer.includes('overrides') &&
                normalizedTopicsAnswer.includes('typescript')) ||
              normalizedTopicsAnswer.includes('contract');

            if (hasTopicsAnswer) {
              isCorrect = true;
              console.log('✅ Correct!');
            } else {
              isCorrect = false;
              console.log('❌ Incorrect');
              console.log(`Correct answer: ${topicValue}`);
            }
            questionAnswered = true;
          }
        } else {
          isCorrect = false;
          questionAnswered = true;
        }
      } else {
        // Regular answer checking
        isCorrect = checkAnswer(
          userAnswer,
          q.correctAnswer,
          q.acceptableVariations,
        );
        questionAnswered = true;
      }

      if (questionAnswered) {
        totalAnswered++;

        if (isCorrect) {
          console.log('✅ Correct!');
          q.scores.correct++;
          correctCount++;
        } else {
          console.log('❌ Incorrect');
          q.scores.incorrect++;

          if (Array.isArray(q.correctAnswer)) {
            console.log(`Correct answer(s): ${q.correctAnswer.join(' or ')}`);
          } else {
            console.log(`Correct answer: ${q.correctAnswer}`);
          }

          if (
            q.fullSequence &&
            q.question.toLowerCase().includes('full sequence')
          ) {
            console.log(`Full sequence: ${q.fullSequence}`);
          }

          if (q.acceptableVariations && q.acceptableVariations.length > 0) {
            console.log(
              `Acceptable variations: ${q.acceptableVariations.join(', ')}`,
            );
          }
        }

        // Update percentage (lifetime score for this question)
        const total = q.scores.correct + q.scores.incorrect;
        q.scores.percentage =
          total > 0 ? Math.round((q.scores.correct / total) * 100) : 0;

        // Display session cumulative score (not individual question lifetime score)
        const sessionAccuracy =
          totalAnswered > 0
            ? Math.round((correctCount / totalAnswered) * 100)
            : 0;
        console.log(
          `Session: ${correctCount} correct, ${totalAnswered - correctCount} incorrect out of ${totalAnswered} (${sessionAccuracy}%)`,
        );
        console.log(
          `This question's lifetime: ${q.scores.correct} correct, ${q.scores.incorrect} incorrect (${q.scores.percentage}%)\n`,
        );
      }
    }

    // Save updated scores
    writeFileSync(abbreviationsPath, JSON.stringify(data, null, 2));

    console.log('─'.repeat(60));
    console.log('\n📊 Quiz Summary:');
    console.log(`Questions answered: ${totalAnswered}`);
    console.log(`Correct: ${correctCount}`);
    console.log(`Incorrect: ${totalAnswered - correctCount}`);
    if (totalAnswered > 0) {
      console.log(
        `Accuracy: ${Math.round((correctCount / totalAnswered) * 100)}%`,
      );
    }
    console.log('\n✅ Progress saved to abbreviations.json\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

runQuiz();
