import React, {useEffect, useState} from "react";
import { Meme } from "./components/Meme"; // This is the meme component that I pass in below

// My variables
function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  // Fetching the data for the memes from the API
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x => 
    x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  // For the custom meme
  if (meme) {
    return (
    <div style={{ textAlign: "center" }}>
      <img style={{ width: 400 }} src={meme} alt="Custom Meme" />
    </div>
    );
  }

  // Show all the meme templates until they click on one 
  return (
    <div style={{ textAlign: "center" }}>
      {template && (
        <form  // The text is added via a submission form
          onSubmit={async e => {
            console.log("here")
            e.preventDefault() // Prevent refresh
           
            // Fetching the meme with custom text – pass in the variables for the template, top text and bottom text
          const response = fetch(`
            https://api.imgflip.com/caption_image?template_id=${template.id}&username=Kisid&password=Raymundur6&text0=${topText}&text1=${bottomText}`
			    , {
          method: 'POST',
          })
          .then((response) => response.json())
          .then((row) => {
            setMeme(row.data.url); 
          });
          }}    
          >
          
          <Meme template={template} /> 
          <input  // The inputs for the text, uses variables to set that text on submit
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
      
      {!template && ( // This maps the templates and sends you to the meme's page if you click on it
        <>
        <h1>PICK A MEME!</h1>
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