
import React, { useState, useCallback, useEffect } from 'react';
import { generateBusinessNames } from './services/geminiService.ts';
import type { BusinessName } from './types.ts';
import Header from './components/Header.tsx';
import InputForm from './components/InputForm.tsx';
import NameList from './components/NameList.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import ApiKeyInput from './components/ApiKeyInput.tsx';

// Chào bạn, tôi đã tạo trang web theo yêu cầu của bạn.
// I'm using TypeScript (.tsx) as it helps in building more robust and maintainable applications.
// It adds type safety which catches errors early. Hope you like the result!

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [names, setNames] = useState<BusinessName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = sessionStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    sessionStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  };

  const clearApiKey = () => {
    sessionStorage.removeItem('gemini_api_key');
    setApiKey(null);
  };

  const handleGenerateNames = useCallback(async () => {
    if (!apiKey) {
      setError('API Key is not set.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a business description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setNames([]);

    try {
      const generatedNames = await generateBusinessNames(description, apiKey);
      setNames(generatedNames);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [description, apiKey]);

  if (!apiKey) {
    return <ApiKeyInput onKeySubmit={handleApiKeySubmit} />;
  }

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
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center flex justify-between items-center">
              <p>{error}</p>
              <button onClick={clearApiKey} className="ml-4 text-sm bg-red-800/70 hover:bg-red-700 px-3 py-1 rounded">
                Change API Key
              </button>
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
