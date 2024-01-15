class Engine {
  
  constructor(gl, width, height) {

    this.canvasWidth = width;
    this.canvasHeight = height;



    this.gl = gl;
    this.gl.enable(gl.DEPTH_TEST);
    this.gl.clearColor(0.1, 0.1, 0.2, 1);
    this.gl.viewport(0,0,width,height); 

    document.addEventListener("keydown", this.keyDown, false);
    document.addEventListener("pointerlockchange", this.pointerLockChange, false);
    document.addEventListener("mozpointerlockchange", this.pointerLockChange, false);
    document.addEventListener("webkitpointerlockchange", this.pointerLockChange, false);
    document.getElementById("canvas").onclick = document.body.requestPointerLock ||
                                                document.body.mozRequestPointerLock ||
                                                document.body.webkitRequestPointerLock;

    setProjection(0.1, 1000.0, 60.0, width, height);

    this.alpineMesh = new Mesh(gl, "scary");
    this.alpineTex = new Texture(gl, "scaryBrown");
    this.objectRenderer = new ObjectRenderer(gl);

    this.objects = [];
    this.objects.push(new Object(this.alpineMesh, this.alpineTex));
    this.objects[0].setPosition(0,0,-5);
    this.objects[0].setScale(1,1,1);

    this.cam = new Camera();
    this.sun = new DirectionalLight(new Vec3(0,-1,-1), new Vec3(1,1,0.7));

    this.forward = 0;
    this.starfe = 0;
    this.speed = 0.1;
    this.rotx = 0;
    this.roty = 0;
    this.mouseSpeed = 0.5;
    this.pause = false;

  
  }

  loop =()=> {
    
    const ticks = 1000.0/60.0;
    setInterval( ()=> {
      if(! this.pause){
        this.update();
        this.render();
      }
    }, ticks);

  }

  render =()=> {

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.objectRenderer.render(this.objects, this.cam, this.sun);
 
  }

  update =()=> {

    this.cam.rotate(this.rotx, this.roty, 0);
    this.cam.translate(this.forward, this.starfe);
    this.roty = 0;
    this.rotx = 0;
    this.forward = 0;
    this.starfe = 0;

  }

  keyDown =(event)=> {

    if(this.pause)
      return;

    if("w" === event.key){
      this.forward += this.speed;
    }else if("s" === event.key) {
      this.forward -= this.speed;
    }

    if("a" === event.key) {
      this.starfe -= this.speed;
    }else if("d" === event.key) {
      this.starfe += this.speed;
    }

  }

  mouseMove =(event)=> {

    let x = event.movementX;
    let y = event.movementY;
    this.rotx += (-y) * this.mouseSpeed;
    this.roty += (-x) * this.mouseSpeed;
    
  }

  pointerLockChange =(event)=> {

    let requestedElement = document.getElementById("canvas");
    if(document.pointerLockElement === requestedElement || 
       document.mozPointerLockElement === requestedElement || 
       document.webkitPointerLockElement === requestedElement) {
                document.addEventListener("mousemove", this.mouseMove, false);
                this.pause = false;
                console.log("unpuased");
    }else{
      document.removeEventListener("mousemove", this.mouseMove, false);
      this.pause = true;
      console.log("paused");
    }
  }

}
