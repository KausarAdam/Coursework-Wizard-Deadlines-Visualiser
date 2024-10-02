'use client';

import { useState } from 'react';
import Link from "next/link";

export default function Test1() {

  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter enquiry subject here" 
        required
        value={subject}
        onChange={handleSubjectChange}
      />

      <input 
        type="date" 
        required
        value={date}
        onChange={handleDateChange}
      />

      <textarea 
        placeholder="Enter details about your enquiry here" 
        required
        value={details}
        onChange={handleDetailsChange}
      />

      <Link
        href={{
          pathname: '/Staff/testmiddle',
          query: {
            subject: subject, // Pass the input value here
            date: date,
            details: details,
          },
        }}
      >
        <button>Go to testmiddle page</button>
      </Link>
    </div>
  );
}
