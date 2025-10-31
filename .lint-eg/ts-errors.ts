// Intentional TypeScript issues for testing

// 1) Type mismatch
export function add(a: number, b: number): number {
  // wrong cast to provoke error
  return a + (b as unknown as string);
}

// 2) Returning wrong type
export function getNumber(): number {
  return 'not a number' as unknown as number;
}

// 3) Using JSON.parse unsafely
const parsed = JSON.parse('{ "x": 1 }');
console.log(parsed.foo.bar.baz);

// 4) Object.keys unsafe access
const obj = { a: 1, b: 2 };
Object.keys(obj).forEach((k) => {
  const v = obj[k]; // k is string, not 'a' | 'b'
  console.log(v);
});

// 5) Awaiting a non-thenable
export async function badAwait() {
  const notPromise = 123 as unknown as Promise<string>;
  const x = await notPromise;
  return x.toUpperCase();
}

// 6) Floating promise
async function returnsPromise(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 10));
}
export function caller() {
  returnsPromise(); // no await/void
}

// 7) Unreachable code
function neverReturns(): never {
  throw new Error('boom');
}
export function afterNever() {
  neverReturns();
  const x = 1; // unreachable
  return x;
}

// 8) Incorrect this usage
function badThis(this: { v: number }) {
  return this.v + 1;
}
badThis(); // missing this binding



