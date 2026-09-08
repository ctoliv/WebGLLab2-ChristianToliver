"use strict";

var canvas;
var gl;



var points = [
     // HOUSE BODY
    vec4(-2.0, 0.0, 0.0, 1.0),
    vec4( 2.0, 0.0, 0.0, 1.0),
    vec4( 2.0, 2.4, 0.0, 1.0),
    vec4(-2.0, 2.4, 0.0, 1.0),

    // ROOF
    vec4(-2.0, 2.4, 0.0, 1.0),
    vec4( 0.0, 3.6, 0.0, 1.0),
    vec4( 2.0, 2.4, 0.0, 1.0),

    // WINDOW
    vec4(-0.35, -0.30, -0.1, 1.0),
    vec4( 0.35, -0.30, -0.1, 1.0),
    vec4( 0.35,  0.30, -0.1, 1.0),
    vec4(-0.35,  0.30, -0.1, 1.0)


];

var colors = [
// HOUSE BODY
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),

    // ROOF
    vec4(0.8, 0.2, 0.2, 1.0),
    vec4(0.8, 0.2, 0.2, 1.0),
    vec4(0.8, 0.2, 0.2, 1.0),

    // WINDOW
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0)

];

var numVertices  = points.length;

// Shader transformation matrices
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye, at, up;

var number=1;

var theta=0;
var theta2=0;

var down=true;
var ty=0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
	
    at = vec3(0.0, 0.0, 0.0);
    up = vec3(0.0, 1.0, 0.0);
    eye = vec3(0.0, 0.0, 1.5);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	//Create your color buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

	//Create your vertex buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//Model and Projection Buffers
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

	//Set up Ortho Projections
    projectionMatrix = ortho(-4, 4, 0, 4, 3, -3);
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );


    render();
}

function drawHouse(){
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLES, 4, 3);
}

"use strict";

var canvas;
var gl;



var points = [
     // HOUSE BODY
    vec4(-2.0, 0.0, 0.0, 1.0),
    vec4( 2.0, 0.0, 0.0, 1.0),
    vec4( 2.0, 2.4, 0.0, 1.0),
    vec4(-2.0, 2.4, 0.0, 1.0),

    // ROOF
    vec4(-2.0, 2.4, 0.0, 1.0),
    vec4( 0.0, 3.6, 0.0, 1.0),
    vec4( 2.0, 2.4, 0.0, 1.0),

    // WINDOW
    vec4(-0.35, -0.30, -0.1, 1.0),
    vec4( 0.35, -0.30, -0.1, 1.0),
    vec4( 0.35,  0.30, -0.1, 1.0),
    vec4(-0.35,  0.30, -0.1, 1.0)


];

var colors = [
// HOUSE BODY
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),
    vec4(0.2, 0.6, 0.8, 1.0),

    // ROOF
    vec4(0.8, 0.2, 0.2, 1.0),
    vec4(0.8, 0.2, 0.2, 1.0),
    vec4(0.8, 0.2, 0.2, 1.0),

    // WINDOW
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0)

];

var numVertices  = points.length;

// Shader transformation matrices
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye, at, up;

var number=1;

var theta=0;
var theta2=0;

var down=true;
var ty=0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
	
    at = vec3(0.0, 0.0, 0.0);
    up = vec3(0.0, 1.0, 0.0);
    eye = vec3(0.0, 0.0, 1.5);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	//Create your color buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

	//Create your vertex buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//Model and Projection Buffers
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

	//Set up Ortho Projections
    projectionMatrix = ortho(-4, 4, 0, 4, 3, -3);
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );


    render();
}

function drawWindows(){

    var T;
    var S;
    var windowMatrix;


    // UPPER LEFT WINDOW - translation
    T = translate(-1.2, 1.6, 0.0);

    windowMatrix = mult(
        modelViewMatrix,
        T
    );

    gl.uniformMatrix4fv(
        modelViewMatrixLoc,
        false,
        flatten(windowMatrix)
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        7,
        4
    );


    // UPPER RIGHT WINDOW - translation
    T = translate(1.2, 1.6, 0.0);

    windowMatrix = mult(
        modelViewMatrix,
        T
    );

    gl.uniformMatrix4fv(
        modelViewMatrixLoc,
        false,
        flatten(windowMatrix)
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        7,
        4
    );


    // LOWER LEFT WINDOW - translation + scaling
    T = translate(-1.2, 0.7, 0.0);

    S = scalem(
        0.8,
        1.2,
        1.0
    );

    windowMatrix = mult(
        modelViewMatrix,
        mult(T, S)
    );

    gl.uniformMatrix4fv(
        modelViewMatrixLoc,
        false,
        flatten(windowMatrix)
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        7,
        4
    );


    // LOWER RIGHT WINDOW - translation + scaling
    T = translate(1.2, 0.7, 0.0);

    S = scalem(
        0.8,
        1.2,
        1.0
    );

    windowMatrix = mult(
        modelViewMatrix,
        mult(T, S)
    );

    gl.uniformMatrix4fv(
        modelViewMatrixLoc,
        false,
        flatten(windowMatrix)
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        7,
        4
    );
}

function drawEntrance(){
    gl.drawArrays(gl.TRIANGLE_FAN, 15, 4);
}

function drawDiamond(){
    gl.drawArrays(gl.TRIANGLE_FAN, 19, 4);
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    modelViewMatrix = lookAt(eye, at, up);
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    drawHouse();
    drawWindows();

    window.requestAnimationFrame(render);
}
