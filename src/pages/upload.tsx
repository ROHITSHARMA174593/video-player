// src/pages/upload.tsx
import { useState, useEffect } from 'react';

interface IStudent {
  _id: string;
  videoURL: string;
}

export default function Home() {
  const [videoURL, setVideoURL] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitData, setSubmitData] = useState<IStudent[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting videoURL:', videoURL);

    try {
      const data = { videoURL };
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: { message: string; success: boolean } = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `HTTP error! status: ${res.status}`);
      }

      setMessage(result.message || 'Submitted successfully');
      setVideoURL('');
      apiHandler();
    } catch (error: any) {
      console.error('Submit error:', error);
      setMessage(`Failed to submit: ${error.message}`);
    }
  };

  const apiHandler = async () => {
    try {
      const res = await fetch('/api/hello');
      const allData: { message: string; success: boolean; students?: IStudent[] } = await res.json();
      if (!res.ok) {
        throw new Error(allData.message || `HTTP error! status: ${res.status}`);
      }
      setSubmitData(Array.isArray(allData.students) ? allData.students : []);
    } catch (error: any) {
      console.error('Fetch error:', error);
      setMessage(`Failed to load students: ${error.message}`);
    }
  };

  useEffect(() => {
    apiHandler();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/hello', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result: { message: string; success: boolean } = await res.json();
      if (!res.ok) {
        throw new Error(result.message || `HTTP error! status: ${res.status}`);
      }

      setMessage(result.message || 'Deleted');
      apiHandler();
    } catch (error: any) {
      console.error('Delete error:', error);
      setMessage(`Failed to delete: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit} className="mb-5 flex flex-wrap items-center gap-4">
        <input
          type="url"
          placeholder="Enter Video URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
      <h2>Submitted Students:</h2>
      <br />
      <hr />
      {submitData.length > 0 ? (
        submitData.map((elem, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p>Video URL: {elem.videoURL}</p>
            <button
              onClick={() => handleDelete(elem._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No students submitted yet.</p>
      )}
    </div>
  );
}