import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>About - Cost Estimator</title>
          <meta name="description" content="About the Cost Estimator tool" />
        </Head>

        <main className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">About Cost Estimator</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">What is Cost Estimator?</h2>
            
            <p className="mb-4">
              Cost Estimator is an AI-powered tool designed to provide ballpark estimates for a wide variety of projects and services. Whether you're planning a home renovation, starting a marketing campaign, or scoping a business expansion, our tool can give you a reasonable range of what to expect.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">How It Works</h2>
            
            <p className="mb-4">
              Our system uses advanced artificial intelligence to analyze your project description and generate cost estimates based on typical pricing for similar projects. The estimates are broken down into components and presented as ranges to account for variations in quality, materials, and specific requirements.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">Important Notes</h2>
            
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>All estimates are ballpark figures intended for initial planning purposes only.</li>
              <li>Actual costs may vary based on specific materials, labor rates in your area, and project complexities.</li>
              <li>We recommend getting professional quotes before making final budget decisions.</li>
              <li>The more specific your project description, the more accurate our estimates can be.</li>
            </ul>
            
            <div className="mt-8 text-center">
              <Link href="/" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Return to Estimator
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 