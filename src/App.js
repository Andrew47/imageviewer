import './App.css';
import React from 'react';
import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';


function App() {
    const [imageSRC, setImageSRC] = useState("");
    const [scale, setScale] = useState(40);
    const [x, setX] = useState(50);
    const [y, setY] = useState(50);
    
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]){
            const img = event.target.files[0];
            setImageSRC(URL.createObjectURL(img));
            }
        }

    const deleteImage = () => {setImageSRC("")}

    const exportImage = () => html2canvas(document.querySelector("#uploadedImage")).then(canvas => {
        let div = document.querySelector("#snapshot")
        if (div.firstChild) {
            div.removeChild(div.firstChild)
        }
        div.append(canvas);
        })

    let displayArea;

    useEffect(()=> {
		function keyHandle(event){

			switch(event.key) {
				case "z":
				setScale(scale => 1.1*scale);
				break;
				case "x":
				setScale(scale => scale/1.1);
				break;
				case "ArrowLeft":
                                case "h":
				setX(x => x-5)
				break;
				case "ArrowRight":
                                case "l":
				setX(x => x+5)
				break;
				case "ArrowUp":
                                case "j":
				setY(y => y-5)
				break;
				case "ArrowDown":
                                case "k":
				setY(y => y+5)
				break;
				default:
				break;
				
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
        <div id="uploadedImage" 
          style={{
              backgroundImage: "url('"+ imageSRC + "')", 
              backgroundPosition: `${x}% ${y}%`, 
              backgroundSize: `${scale}%`, 
              backgroundRepeat: "no-repeat", 
              }}/>
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
        <button id="imageDelete" onClick={deleteImage}>Delete Loaded Image</button>
        <button id="imageExport" onClick={exportImage}>Snapshot Image</button>
      </div>

      <div>
        <div style={{display: "inline-block"}}>
          {displayArea}
        </div>
        <div id="snapshot" style={{display: "inline-block"}} />
        <div>
          <p>Press the following keys to manipulate the image above:</p>
          <table>
            <tr>
              <td>z</td>
              <td>Zoom In</td>
            </tr>
            <tr>
              <td>x</td>
              <td>Zoom Out</td>
            </tr>
            <tr>
              <td>h</td>
              <td>Move Image to the Left</td>
            </tr>
            <tr>
              <td>j</td>
              <td>Move Image Downwards</td>
            </tr>
            <tr>
              <td>k</td>
              <td>Move Image Upwards</td>
            </tr>
            <tr>
              <td>l</td>
              <td>Move Image to the Right</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
