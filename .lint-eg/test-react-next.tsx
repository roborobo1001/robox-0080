
import Image from 'next/image';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// Missing displayName
function AnonymousComponent() {
return <div>No display name</div>;
}

// Unused state variable
function UnusedState(): JSX.Element {
const [unused, setUnused] = useState(0);
return <div>State never used</div>;
}

// Array index as key
function BadKeys() {
const items = ['a', 'b', 'c'];
return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
}

// Dangerous HTML
function DangerousHTML() {
const html = '<script>alert("xss")</script>';
return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// Component with any type
function AnyProps(props: any) {
return <div>{props.value}</div>;
}

// Missing return type
function NoReturnType(x: number) {
return <div>{x}</div>;
}

// Missing key in fragments
function FragmentWithoutKey() {
const items = [1, 2, 3];
return (
  <>
    {items.map(item => (
      <React.Fragment>
        <div>{item}</div>
      </React.Fragment>
    ))}
  </>
);
}

// Using wrong hook order
function WrongHookOrder(condition: boolean) {
if (condition) {
  const [state, setState] = useState(0); // Conditional hook!
}

return <div>Bad hooks</div>;
}

// Not handling async errors
async function UnhandledAsyncError() {
const data = await fetch('/api/data');
return data.json();
}

// Using <Script> incorrectly
function BadScript() {
return (
  <div>
    <script src="external.js"></script>
  </div>
);
}

// Export without proper formatting
export { AnonymousComponent, BadKeys };
