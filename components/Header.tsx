
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon.tsx';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-purple-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Business Name Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Describe your business idea, and let our AI craft the perfect name and slogan to kickstart your brand.
      </p>
    </header>
  );
};

export default Header;