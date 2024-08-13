"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}