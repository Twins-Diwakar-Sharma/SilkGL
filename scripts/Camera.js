class Camera {

  constructor() {
      this.spin = new Quat(1,0,0,0);
      this.position = new Vec3(0,0,0);
  }

  setPosition =(x,y,z)=> {
    this.position.set(0,x);
    this.position.set(1,y);
    this.position.set(2,z);
  }

  rotate =(x,y,z)=> {
    let rad = Math.PI / 180.0;
    let radx = x/2 * rad, rady = y/2 * rad, radz = z/2 * rad;
    
    let cx = Math.cos(radx), sx = Math.sin(radx);
    let cy = Math.cos(rady), sy = Math.sin(rady);
    let cz = Math.cos(radz), sz = Math.sin(radz);

    this.spin = Quat.multiplyMany(new Quat(cy, 0, sy, 0), this.spin, new Quat(cx, sx, 0, 0), new Quat(cz, 0, 0, sz));
  }

  translate =(forward, strafe)=> {
    let mv = new Quat(0, strafe, 0, -1.0 * forward);
    mv = Quat.multiplyMany(this.spin, mv, this.spin.conjugate());
    this.position = Vec3.add(this.position, new Vec3(mv.get(1), mv.get(2), mv.get(3)));
  }

}
