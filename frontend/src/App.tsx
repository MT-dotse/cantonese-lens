import "./App.css";
import { useState } from "react";

type VocabularyWord = {
  chinese: string;
  jyutping: string;
  english: string;
};
function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<VocabularyWord | null>(null);

  function handleClick() {
    setWord(null);
    setLoading(true);
    setError("");

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
      .then((data) => setWord(data))
      .catch(() => setError("Could not connect to the server."))
      .finally(() => setLoading(false));
  }
  return (
    <>
      <h1>Cantonese Lens</h1>
      {word && <h2>{word.chinese}</h2>}
      {word && <p className="pronunciation">{word.jyutping}</p>}
      {word && <p className="translation">{word.english}</p>}
      <button onClick={handleClick}>Analyze</button>
      {loading && <p>loading...</p>}
      <p>{error}</p>
    </>
  );
}

export default App;
