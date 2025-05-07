import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitData, setSubmitData] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { name, class: studentClass, rollNo, phone };

    const res = await fetch("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setMessage(result.message || "Submitted successfully");

    setName("");
    setStudentClass("");
    setRollNo("");
    setPhone("");

    apiHandler();
  };

  const apiHandler = async () => {
    const res = await fetch("/api/hello");
    const allData = await res.json();

    setSubmitData(Array.isArray(allData.students) ? allData.students : []); // allData.students me students name ka compass me database me collection hai

    console.log("Fetched data:", allData);
  };
  useEffect(() => {
    apiHandler();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/hello", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();
    setMessage(result.message || "Deleted");

    apiHandler(); // Refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <button
          type="submit"
          className="cursor-pointer px-3 py-1 bg-blue-500 text-white"
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
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>Name: {elem.name}</p>
            <p>Class: {elem.class}</p>
            <p>Roll No: {elem.rollNo}</p>
            <p>Phone: {elem.phone}</p>
            
            <button
              onClick={() => handleDelete(elem._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
            <br />
            <hr />
          </div>
        ))
      ) : (
        <p>No students submitted yet.</p>
      )}
    </div>
  );
}
