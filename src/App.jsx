import React, { useState } from "react";

export default function SentimentApp() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://your-api-endpoint.amazonaws.com/prod/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
      setResult("Error during analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">🧠 Sentiment Analysis</h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          onClick={analyzeSentiment}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className={`text-lg mt-2 ${
              result === "positive"
                ? "text-green-600"
                : result === "negative"
                ? "text-red-600"
                : "text-gray-600"
            }`}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}