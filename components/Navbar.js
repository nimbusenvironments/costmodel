import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              Cost Estimator
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 