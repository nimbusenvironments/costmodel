import { useState } from 'react';

export default function CostingSheet({ data }) {
  const [viewMode, setViewMode] = useState('standard'); // standard, comparison
  
  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length <= 5) return title;
    return words.slice(0, 5).join(' ') + '...';
  };
  
  const handleExportCSV = () => {
    // Create CSV content
    let csv = 'Component,Average Cost\n';
    
    data.components.forEach(component => {
      csv += `${component.name},${component.medium}\n`;
    });
    
    csv += `\nTOTAL,${data.totals.medium}\n`;
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${data.query.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_estimate.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{truncateTitle(data.query)}</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Generated on {data.date}</span>
          {data.zipcode && (
            <>
              <span className="mx-2">•</span>
              <span>Location: {data.zipcode}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cost Estimate</h2>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('standard')}
              className={`px-3 py-1 rounded ${
                viewMode === 'standard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-1 rounded ${
                viewMode === 'comparison'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Comparison
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <button
              onClick={handlePrintPDF}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'standard' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-right">Average Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.components.map((component, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{component.name}</td>
                  <td className="px-4 py-2 text-right">${component.medium.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-50">
                <td className="px-4 py-2">TOTAL</td>
                <td className="px-4 py-2 text-right">${data.totals.medium.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {viewMode === 'comparison' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-right">Low Cost</th>
                <th className="px-4 py-2 text-right">Medium Cost</th>
                <th className="px-4 py-2 text-right">High Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.components.map((component, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{component.name}</td>
                  <td className="px-4 py-2 text-right">${component.low.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${component.medium.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${component.high.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-50">
                <td className="px-4 py-2">TOTAL</td>
                <td className="px-4 py-2 text-right">${data.totals.low.toLocaleString()}</td>
                <td className="px-4 py-2 text-right">${data.totals.medium.toLocaleString()}</td>
                <td className="px-4 py-2 text-right">${data.totals.high.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {data.disclaimers && (
        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          <p className="font-medium mb-1">Disclaimers:</p>
          <ul className="list-disc list-inside space-y-1">
            {data.disclaimers.map((disclaimer, index) => (
              <li key={index}>{disclaimer}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Confidence Level: {data.confidence_level || 'Medium'}</p>
      </div>
    </div>
  );
} 