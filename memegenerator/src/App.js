import React, {useEffect, useState} from "react";
import { Meme } from "./components/Meme";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return '?' + params.join("&");
};



function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  // Fetching the data from the API
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x => 
    x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
    <div style={{ textAlign: "center" }}>
      <img style={{ width: 200 }} src={meme} alt="Custom Meme" />
    </div>
    );
  }

  // Show all the meme templates until they click on one 
  return (
    <div style={{ textAlign: "center" }}>
      {template && (
        <form 
          onSubmit={async e => {
            e.preventDefault() // Prevent refresh
            // Add logic to create meme from API
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "Kisid",
              password: "-MCe%x468e+_*JW"
            };
          const response = await fetch(
            `https://api.imgflip.com/caption_image${objectToQueryParam(
              params
            )}`
          );
          const json = await response.json();
          setMeme(json.data.url);
        }}
      >
          <Meme template={template} />
          <input 
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e.target.value)} 
            />
          <input 
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)} 
            />
          <button type="submit">Create Meme</button>
        </form>
      )}
      {!template && (
        <>
        <h1>Pick a Meme!</h1>
        {templates.map(template => {
          return (
            <Meme
              template={template}
              onClick={() => {
                setTemplate(template);
              }}
            />
          );
        })}
        </>
      )}
    </div>  
  );
}

export default App;