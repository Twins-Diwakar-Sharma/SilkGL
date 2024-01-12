const start =()=> {
  
  let canvas = document.getElementById('canvas');
  let gl = canvas.getContext('webgl2');

  if(!gl)
  {
    gl = canvas.getContext('webgl-experimental');
  }

  if(!gl)
  {
    console.log("Your browser does not support webgl");
    alert("Oops!! Browser does not support Webgl");
  }

  let engine = new Engine(gl, canvas.getAttribute("width"), canvas.getAttribute("height"));
  engine.loop();

};

