import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setError("");
    setMessage("");
    fetch("http://127.0.0.1:8000/analyze", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: "apple",
      }),
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP request failed");
        }
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => setError("Could not connect to the server."))
      .finally(() => setLoading(false));
  }
  return (
    <>
      <h1>Cantonese Lens</h1>
      <h2>蘋果</h2>
      <p className="pronunciation">ping4 gwo2</p>
      <p className="translation">Äpple</p>
      <button onClick={handleClick}>Analyze</button>
      {loading && <p>loading...</p>}
      <p>{message}</p>
      <p>{error}</p>
    </>
  );
}

export default App;
