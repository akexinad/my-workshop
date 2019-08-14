// This function sets the color and the position of each vertex you render.
// The keys fragColor and gl_Postion are keys that belong to the GL shader language GLSL.
const vertexShaderText = 
[
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

const fragmentShaderText = 
[
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    '   gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');

function initializeDemo() {

    console.log('hello world');

    // STEP 1: Initialize WebGL.

    const canvas = document.getElementById('render-surface');
    
    const gl = canvas.getContext('webgl');

    // setting up the color of the paint you want to use.
    gl.clearColor( 0.75, 0.85, 0.8, 1.0 );
    
    // Tell gl to render the color and the z position of any colors that belong to certain objects.
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // Create the shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Here we map the vertex shader written in GLSL string format above to JS.
    gl.shaderSource( vertexShader, vertexShaderText );
    gl.shaderSource( fragmentShader, fragmentShaderText );

    gl.compileShader( vertexShader );
    if ( !gl.getShaderParameter( vertexShader, gl.COMPILE_STATUS ) ) {
        throw new Error( gl.shaderInfoLog( vertexShader ) );
    }
    
    gl.compileShader( fragmentShader );
    if ( !gl.getShaderParameter( fragmentShader, gl.COMPILE_STATUS ) ) {
        throw new Error( gl.shaderInfoLog( fragmentShader ) );
    }

    // Now we can create a program where we link together the vertex shader and the fragment shader.
    const program = gl.createProgram();
    gl.attachShader( program, vertexShader );
    gl.attachShader( program, fragmentShader );
    gl.linkProgram(program);

    // Error handling for program
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
        throw new Error( gl.getProgramInfoLog(program) );
    }

    // A more comprehensive error handler for program
    gl.validateProgram( program );
    if ( !gl.getProgramParameter( program, gl.VALIDATE_STATUS ) ) {
        throw new Error( gl.getProgramInfoLog( program ) );
    }

    //
    // CREATE THE BUFFER
    //

    const triangleVertices =
    [ // X,   Y ===> and make sure the vertices are counter clockwise.
                        // R, G, B
        0.0, 0.5,       1.0, 0.0, 0.0,
        -0.5, -0.5,     0.0, 1.0, 0.0,
        0.5, -0.5,      0.0, 0.0, 1.0
    ];

    // BUFFER = A chunk of memory that can be allocated for any purpose.

    // Here we are creating the buffer in the RAM.
    const triangleVertexBufferObject = gl.createBuffer();
    // We then add that buffer object into memory
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleVertexBufferObject );
    // Then we pass in the vertex data in that buffer object in memory
    // Since GL expects 32 bit numbers, we need to convert JS's 64 bit floating point precision numbers into 32 bit numbers.
    // gl.STATIC_DRAW then sends the data from the CPU memory to the GPU memory ONLY ONCE.
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( triangleVertices ), gl.STATIC_DRAW );


    // Now we add attributes as per the attributes listed in the vertexShader string array. 
    const positionAttribLocation = gl.getAttribLocation( program, 'vertPosition' );
    const colorAttribLocation = gl.getAttribLocation( program, 'vertColor' );
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        2, // Number of elements per attribute, its a vec2 so therefore only 2.
        gl.FLOAT, // The type of the elements.
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex as per the triangles vertices array.
        0 // Offset from the beginning of a single vertex to this attribute.
    );
    gl.vertexAttribPointer(
        colorAttribLocation, // Attribute location
        3, // Number of elements per attribute, its a vec2 so therefore only 2.
        gl.FLOAT, // The type of the elements.
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex,
        2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute as per the vertices array.
    );

    gl.enableVertexAttribArray( positionAttribLocation );
    gl.enableVertexAttribArray( colorAttribLocation );

    //
    // THE MAIN RENDER LOOP
    //

    gl.useProgram(program);

    gl.drawArrays( 
        gl.TRIANGLES, // The shape in which you want to draw. 99% of the time it will be in triangles.
        0, // How many vertices you want to skip.
        3 // How many vertices you want to draw
    );



    
};