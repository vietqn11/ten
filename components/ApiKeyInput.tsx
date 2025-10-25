
import React, { useState } from 'react';

interface ApiKeyInputProps {
  onKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onKeySubmit }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onKeySubmit(key.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">
          Enter Your Gemini API Key
        </h2>
        <p className="text-center text-slate-400 mb-6">
          To use this application, you need to provide your own Google Gemini API key. Your key is stored securely in your browser's session storage and is never sent to our servers.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full p-3 text-slate-200 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!key.trim()}
          >
            Save and Continue
          </button>
        </form>
        <p className="text-center text-slate-500 text-xs mt-4">
          Don't have a key? Get one from{" "}
          <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
            Google AI Studio
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;
