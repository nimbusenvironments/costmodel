import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PromptsGuide from '../components/PromptsGuide';
import CostingSheet from '../components/CostingSheet';
import InputForm from '../components/InputForm';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [costingData, setCostingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  const handleSubmit = async (prompt, zipcode, serviceType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, zipcode, serviceType }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate estimate');
      }
      
      const data = await response.json();
      setCostingData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Cost Estimator - Get Ballpark Estimates Instantly</title>
          <meta name="description" content="Generate ballpark cost estimates for any project" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="text-3xl font-bold mb-8 text-center">Get Instant Cost Estimates</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PromptsGuide />
            </div>
            
            <div className="lg:col-span-2">
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {costingData && !isLoading && (
                <CostingSheet data={costingData} />
              )}
              
              {isLoading && (
                <div className="mt-8 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 