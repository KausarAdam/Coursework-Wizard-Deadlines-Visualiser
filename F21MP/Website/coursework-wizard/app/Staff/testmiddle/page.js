'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TestMiddle() {

  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const date = searchParams.get('date');
  const details = searchParams.get('details');

  return (
    <div>
      <Link
        href={{
          pathname: '/Staff/test2',
          query: {
            subject: subject,  // Pass the data to test2
            date: date,
            details: details,
          },
        }}
      >
        <button>See Final Results</button>
      </Link>
    </div>
  );
}
