import Axios from "axios";
import { useState } from "react";

function Excuses() {
  const [excuse, setExcuse] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = (category) => {
    setLoading(true);
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}`).then(
      (res) => {
        const excuseText = res.data[0].excuse;
        setExcuse(excuseText);
        setCopied(false);
      },
    )
    .catch((err) => {
        console.error(err);
        setError(true);
    })
    .finally(() => {
        setLoading(false);
    })
  };
  const copyExcuse = () => {
    navigator.clipboard.writeText(excuse);
    setCopied(true);
  };
  return (
    <div className="app">
      <div className="card">
        <h1>Excuse Generator</h1>
        <p className={excuse ? "generated" : ""}>
          {loading ? "Generating excuse..." 
            : error ? "Something went wrong 😢" 
            : excuse ? `"${excuse}"` 
            : "Click a category to generate an excuse"}
        </p>
        <div className="buttons">
          <button onClick={() => fetchData("family")}>Family</button>
          <button onClick={() => fetchData("office")}>Office</button>
          <button onClick={() => fetchData("party")}>Party</button>
        </div>
        <button className="copy" onClick={copyExcuse}>
          {copied ? "Excuse Copied!" : "Copy Excuse"}
        </button>
      </div>
    </div>
  );
}
export default Excuses;
