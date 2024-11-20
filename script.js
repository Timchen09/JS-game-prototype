const app = new PIXI.Application();
await app.init({width: window.innerWidth, height: window.innerHeight})
document.body.appendChild(app.canvas);

function getJSON(path) {
  var xhr = new XMLHttpRequest();
  
  xhr.open("GET", path, false);
  xhr.send();

  if(xhr.status === 200) {
    let data = JSON.parse(xhr.responseText);
    return data;
  }
}

let parameters = {
  aBlockDims: [32, 32, 51],
  aScreenDims: [window.innerWidth, window.innerHeight],
  fScalingFactor: 3,
  fCameraAngle: 45 * (Math.PI / 180)
}

export {getJSON, parameters, app}