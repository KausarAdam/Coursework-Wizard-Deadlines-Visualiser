'use client';

import { useSearchParams } from 'next/navigation';

export default function Timeline() {

  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const date = searchParams.get('date');
  const details = searchParams.get('details');

  return (
    <div>
      <p>Subject: {subject ? subject : 'No subject provided'}</p>
      <p>Date: {date ? date : 'No date provided'}</p>
      <p>Details: {details ? details : 'No details provided'}</p>
    </div>
  );
}
