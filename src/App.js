import './App.css';
import { useState, useEffect } from 'react';

function App() {
    const [imageSRC, setImageSRC] = useState("");
    const [scale, setScale] = useState(1);
    const [x, setX] = useState(50);
    const [y, setY] = useState(50);
    
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]){
            const img = event.target.files[0];
            setImageSRC(URL.createObjectURL(img));
            }
        }

    const deleteImage = () => {setImageSRC("")}

    let displayArea;

    useEffect(()=> {
		function keyHandle(event){
			
		if (event.key === "z"){
			setScale(scale => 1.1*scale);
			}
		if (event.key === "x"){
			setScale(scale => scale/1.1)
			}

		if (event.key === "ArrowLeft"){
			setX(x => x-5)
			}

		if (event.key === "ArrowRight"){
			setX(x => x+5)
			}

		if (event.key === "ArrowUp"){
			setY(y => y+5)
			}

		if (event.key === "ArrowDown"){
			setY(y => y-5)
			}
		}

		document.addEventListener('keydown', keyHandle);

		 return function cleanup() {
      document.removeEventListener('keydown', keyHandle);
    }
		
		}, []);
	 

    

    if (imageSRC) {
		
        displayArea = (
        <div id="imageBox">
        <div id="uploadedImage" style={{backgroundImage: "url('"+ imageSRC + "')", backgroundPosition: `${x}% ${y}%`, backgroundSize: `${scale}%`, backgroundRepeat: "no-repeat", }}/>
        </div>
        );
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
              <div>
              <label htmlFor="imageUpload">Upload Image</label>
              <input id="imageUpload" type="file" onChange={onImageChange}/>
              <button id="imageDelete" onClick={deleteImage}>Delete Image</button>
              </div>
              {displayArea}
    </div>
  );
}

export default App;
