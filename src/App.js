import './App.css';
import { useState } from 'react';

function App() {
    const [imageSRC, setImageSRC] = useState(""); 
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]){
            const img = event.target.files[0];
            setImageSRC(URL.createObjectURL(img));
            }
        }

    const deleteImage = () => {setImageSRC("")}

    let displayArea;

    if (imageSRC) {
        displayArea = <img src={imageSRC} alt="uploaded"/>;
        }

    if (!imageSRC) {
        displayArea = <div>No Image</div>
        }


  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Welcome to Image Viewer
        </h1>
              </header>
              <label htmlFor="imageUpload">Upload Image</label>
              <input id="imageUpload" type="file" onChange={onImageChange}/>
              <button id="imageDelete" onClick={deleteImage}>Delete Image</button>
              {displayArea}
              


    </div>
  );
}

export default App;
