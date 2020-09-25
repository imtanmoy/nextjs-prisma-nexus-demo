import React from 'react';
import Link from 'next/link';

const AboutPage: React.FC = () => (
  <div>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <Link href="/">Go home</Link>
      </Link>
    </p>
  </div>
);

export default AboutPage;
