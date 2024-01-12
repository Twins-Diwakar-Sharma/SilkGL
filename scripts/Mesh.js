class Mesh {

  constructor(gl, name) {

    console.log("What is ?");
    this.gl = gl;
    const path = "inventory/models/"+ name +".stc";


    let vertexData = [ -1, 1, -1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, -1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, -1, -1, 1, 0, 0, 0, 0, 1, 1, -1, 1, 1, 0, 0, 0, 1, -1, 1, 1, 0, 1, -1, 0, 0, -1, -1, -1, 1, 0, -1, 0, 0, -1, -1, 1, 0, 0, -1, 0, 0, 1, -1, -1, 1, 1, 0, -1, 0, -1, -1, 1, 0, 0, 0, -1, 0, -1, -1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 1, 1, 0, 0, 1, -1, 1, 0, 0, 1, 0, 0, 1, -1, -1, 1, 0, 1, 0, 0, -1, 1, -1, 0, 1, 0, 0, -1, 1, -1, -1, 1, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 1, 1, 0, 0, 0, 1, 0, -1, 1, 1, 0, 1, 0, 0, 1, -1, 1, -1, 1, 1, -1, 0, 0, 1, -1, 1, 1, 0, 0, -1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, -1, 1, 1, 0, 0, -1,  ];
     let indices = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 1, 3, 19, 4, 6, 20, 7, 9, 21, 10, 12, 22, 13, 15, 23, 16,  ];

    this.generate(vertexData, indices);
    this.size = indices.length;

  }

  generate =(vertexData, indices)=> {
    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);
    this.vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexData), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 8*4, 0*4);
    this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 8*4, 3*4);
    this.gl.vertexAttribPointer(2, 3, this.gl.FLOAT, false, 8*4, 5*4);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.ebo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), this.gl.STATIC_DRAW);
    this.gl.bindVertexArray(null);
    this.size = indices.length;
  }

  bind =()=> {
    this.gl.bindVertexArray(this.vao);
  }

  unbind =()=> {
    this.gl.bindVertexArray(null);
  }

  getSize =()=> {
    return this.size;
  }

}
