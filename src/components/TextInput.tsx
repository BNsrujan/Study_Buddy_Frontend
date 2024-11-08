/*
import { Textarea } from '@/components/ui/textarea';

export default function TextInput() {
  return (
    <div className="mt-6">
      <label htmlFor="study-text" className="block text-sm font-medium text-gray-700">
        Or paste your text here
      </label>
      <Textarea
        id="study-text"
        placeholder="Enter or paste your study material here..."
        className="mt-1 block w-full"
        rows={6}
      />
    </div>
  );
}
*/

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TextInput() {
  const [text, setText] = useState("");

  // Handles sending the text input to the backend
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/submit-text", {
        // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Text submitted successfully:", result);
      } else {
        console.error("Failed to submit text");
      }
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  return (
    <div className="mt-6 flex flex-col">
      <label
        htmlFor="study-text"
        className="block text-md font-bold text-black pb-2"
      >
        Or paste your text here
      </label>
      <Textarea
        id="study-text"
        placeholder="Enter or paste your study material here..."
        className="mt-1 block w-full"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        className="bg-blue-600 mt-3 ml-auto hover:bg-blue-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Submit Text
      </Button>
    </div>
  );
}
