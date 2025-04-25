import { useState } from 'react';

export default function InputForm({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);

  // Add a constant for the character limit
  const MAX_PROMPT_LENGTH = 1000;

  const handlePromptChange = (e) => {
    // Limit input to MAX_PROMPT_LENGTH characters
    if (e.target.value.length <= MAX_PROMPT_LENGTH) {
      setPrompt(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, zipcode, isProfessional ? 'service' : 'materials');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Describe Your Project</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            id="prompt"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe your project in detail (e.g., 'Install a 10x5 flower bed with perennial plants and stone border')"
            value={prompt}
            onChange={handlePromptChange}
            maxLength={MAX_PROMPT_LENGTH}
            required
          />
          <div className="mt-1 text-sm text-gray-500 flex justify-end">
            <span className={prompt.length >= MAX_PROMPT_LENGTH * 0.9 ? 'text-red-500' : ''}>
              {prompt.length}/{MAX_PROMPT_LENGTH} characters
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isProfessional"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isProfessional}
              onChange={(e) => setIsProfessional(e.target.checked)}
            />
            <label htmlFor="isProfessional" className="ml-2 block text-sm text-gray-700">
              This is a professional service
            </label>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {isProfessional 
              ? 'Includes professional service pricing (may include labor, installation, or management fees)'
              : 'Standard retail pricing for materials and products'}
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code (Required)
          </label>
          <input
            type="text"
            id="zipcode"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 22042"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            pattern="[0-9]{5}"
            title="Please enter a valid 5-digit ZIP code"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading || !prompt.trim() || !zipcode.trim()}
        >
          {isLoading ? 'Generating Estimate...' : 'Generate Estimate'}
        </button>
      </form>
    </div>
  );
} 