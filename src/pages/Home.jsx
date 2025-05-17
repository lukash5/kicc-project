import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

function Home() {
  const [inputs, setInputs] = useState(Array(11).fill(0.0));
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const features = inputs.map(val => parseFloat(val) || 0);

    try {
      const response = await fetch('https://9r355djmo7.execute-api.eu-west-1.amazonaws.com/default/kicc-wine-classifier-deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({features})
      });
    
      if (!response.ok) {
        throw new Error(`Servererror: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(result);
      setScore(result.prediction);  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadStatus(null);
    try {
      const response = await fetch('https://ew6iancfc1.execute-api.eu-west-1.amazonaws.com/default/kicc-wine-data-fetcher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const resultText = await response.text();

      setDownloadStatus(resultText);
    } catch (err) {
      setDownloadStatus(`Download failed: ${err.message}`);
    }
  };


  return (
    <div className="flex items-center justify-center bg-gray-50 overflow-y-auto py-10">
      <div className="flex flex-col items-center space-y-8 p-6 w-full max-w-5xl">
        <div className="card p-fluid flex flex-wrap gap-3">
          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Fixed Acidity</label>
              <InputNumber value={inputs[0]} onValueChange={(e) => handleChange(0, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Volatile Acidity</label>
              <InputNumber value={inputs[1]} onValueChange={(e) => handleChange(1, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Citric Acid</label>
              <InputNumber value={inputs[2]} onValueChange={(e) => handleChange(2, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Residual Sugar</label>
              <InputNumber value={inputs[3]} onValueChange={(e) => handleChange(3, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Chlorides</label>
              <InputNumber value={inputs[4]} onValueChange={(e) => handleChange(4, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Free Sulfur Dioxide</label>
              <InputNumber value={inputs[5]} onValueChange={(e) => handleChange(5, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Total Sulfur Dioxide</label>
              <InputNumber value={inputs[6]} onValueChange={(e) => handleChange(6, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Density</label>
              <InputNumber value={inputs[7]} onValueChange={(e) => handleChange(7, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">pH</label>
              <InputNumber value={inputs[8]} onValueChange={(e) => handleChange(8, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Sulphates</label>
              <InputNumber value={inputs[9]} onValueChange={(e) => handleChange(9, e.value)} minFractionDigits={2} />
          </div>

          <div className="flex-auto">
              <label htmlFor="serial" className="font-bold block mb-2">Alcohol</label>
              <InputNumber value={inputs[10]} onValueChange={(e) => handleChange(10, e.value)} minFractionDigits={2} />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>

        {/* Score-Anzeige */}
        <div className="bg-white border rounded-2xl shadow p-6 text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Score</h2>
          <div className="text-5xl font-bold text-indigo-800">{score}</div>
        </div>

        {/* New section: Dataset Download */}
        <div className="bg-white border rounded-2xl shadow p-6 text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Dataset</h2>
          <p className="text-gray-700 mb-4">Download the dataset used for training and prediction.</p>
          <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Download Dataset
          </button>
          {downloadStatus && (
              <p className="mt-4 text-sm text-gray-600">{downloadStatus}</p>
          )}
        </div>

      </div>
    </div>


  );
}

export default Home;
