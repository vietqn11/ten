
import React, { useState, useCallback } from 'react';
import { generateBusinessNames } from './services/geminiService';
import type { BusinessName } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import NameList from './components/NameList';
import LoadingSpinner from './components/LoadingSpinner';

// Chào bạn, tôi đã tạo trang web theo yêu cầu của bạn.
// I'm using TypeScript (.tsx) as it helps in building more robust and maintainable applications.
// It adds type safety which catches errors early. Hope you like the result!

const App: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [names, setNames] = useState<BusinessName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNames = useCallback(async () => {
    if (!description.trim()) {
      setError('Please enter a business description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setNames([]);

    try {
      const generatedNames = await generateBusinessNames(description);
      setNames(generatedNames);
    } catch (err) {
      setError('Failed to generate names. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [description]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />

        <main className="mt-8">
          <InputForm
            description={description}
            setDescription={setDescription}
            onSubmit={handleGenerateNames}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {!isLoading && names.length > 0 && <NameList names={names} />}
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Google's Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
