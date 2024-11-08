/*

import { Card } from '@/components/ui/card';

export default function Summary() {
  return (
    <Card className="mt-6 p-6">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Your summary will appear here</p>
      </div>
    </Card>
  );
}
*/

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

export default function Summary() {
  const [summary, setSummary] = useState(null);  // State to store the summary

  useEffect(() => {
    // Fetch data from the backend
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: "Your input text here" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch summary");
        }

        const data = await response.json();
        setSummary(data.summary);  // Assume `summary` is the key in the JSON response
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <Card className="mt-6 p-6">
      <div className='flex '>
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold mb-4 pb-1">Summary</h3>
      </div>
      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
        {summary ? (
          <p className="text-gray-500">{summary}</p>
        ) : (
          <p className="text-gray-500">Your summary will appear here...</p>
        )}
      </div>
    </Card>
  );
}
