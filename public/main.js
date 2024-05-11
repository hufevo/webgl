const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}


/* 
1- vertex data
2- create buffer on gpu
3- load vertex into buffer 
4- create vertex shader
5- create fragment shader
6- create program
7- attatch 2 shaders into program
8- enable vertex attributes
9- draw
*/

const vertexData = [ 
    -1, 0, 0, 
    0, 1, 0,
    0, -1, 0,
];

const buffer = gl.createBuffer(); 
gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //binding for the created buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW); //binded buffer, raw vertex data, how many times do i need to draw? none so its static

const vertexShader = gl.createShader(gl.VERTEX_SHADER); //empty vertex shader object
gl.shaderSource(vertexShader, ` 
attribute vec3 position;

void main() {
    gl_Position = vec4(position, 1);
}
`); 
/*
gl shading language
attribute vec3 pos = passing js data into vertex shader
gl.position = output of vertexshader, converts my 3 component position to 4 (x,y,z,w) and w is usally set to 1 by default. Webgl uses w for sum calculations like
 if w = 1 => 3d point
 if w = 0 => vector(length + direction) or direction
*/
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `
void main(){
    gl_FragColor = vec4(1,0,0,1); 
}
`);
//vec4(r,g,b,transparency)
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

//enable vertex attributes, all attributes are disabled by default
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);


//how it should retrieve attrib data from binded buffer
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0); 
//size = saniyede kaç değer okunacak? (arrayde 1 satırda x,y,z okunduğundan 3) , type float çünkü array32 ,  normalized = optimization, diğerlerine de gerek yok şu anlık


//creates a executable on gpu
gl.useProgram(program);

gl.drawArrays(gl.TRIANGLES, 0, 3);
