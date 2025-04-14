import React, { useState } from "react";

export default function WineQualityPredictor() {
  const [features, setFeatures] = useState({
    alcohol: 10,
    pH: 3.2,
    residual_sugar: 5,
    citric_acid: 0.3,
    sulphates: 0.6,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: parseFloat(value) });
  };

  const predictQuality = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("https://your-api-endpoint.amazonaws.com/prod/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setResult("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">🍷 Wine Quality Predictor</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(features).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-medium text-gray-700 capitalize mb-1">{key.replace("_", " ")}</label>
              <input
                type="number"
                name={key}
                step="0.1"
                value={value}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ))}
        </div>

        <button
          onClick={predictQuality}
          disabled={loading}
          className="mt-8 w-full bg-purple-600 text-white py-3 rounded-xl text-lg hover:bg-purple-700 transition"
        >
          {loading ? "Predicting..." : "Predict Quality"}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Predicted Quality:</h2>
            <p
              className={`text-3xl font-bold mt-2 ${
                result >= 7
                  ? "text-green-600"
                  : result >= 5
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
