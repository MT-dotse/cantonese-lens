import "./App.css";
import { useState } from "react";

type VocabularyWord = {
  chinese: string;
  jyutping: string;
  english: string;
};
function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<VocabularyWord | null>(null);

  function handleClick() {
    if (input.trim() === "") {
      setError("Please enter a word.");
      return;
    }
    setWord(null);
    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:8000/analyze", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input.trim().toLowerCase(),
      }),
      method: "POST",
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Word not found. Try another word.");
        }
        if (!response.ok) {
          throw new Error("HTTP request failed");
        }
        return response.json();
      })
      .then((data) => setWord(data))
      .catch((error) => {
        if (error instanceof TypeError) {
          setError("Could not connect to the server. Please try again.");
        } else if (error instanceof Error) {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));
  }
  return (
    <>
      <h1>Cantonese Lens</h1>
      {word && <h2>{word.chinese}</h2>}
      {word && <p className="pronunciation">{word.jyutping}</p>}
      {word && <p className="translation">{word.english}</p>}

      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleClick}>Analyze</button>
      {loading && <p>loading...</p>}
      <p>{error}</p>
    </>
  );
}

export default App;
