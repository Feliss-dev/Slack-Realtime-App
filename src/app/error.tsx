"use client";

import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">An Error Occurred</h1>
      <p className="text-lg mb-8">Please try again later.</p>
      <Link href="/">
        <span className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Go Back</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
