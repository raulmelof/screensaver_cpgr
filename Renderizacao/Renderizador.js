/*export default class Renderizador {

    constructor(glContext) {
        this.gl = glContext;
    }

    renderiza(forma, vertexShaderSrc, fragmentShaderSrc) {
        var gl = this.gl;
        var program = makeProgram(gl, vertexShaderSrc, fragmentShaderSrc);
        if(program) {alert("Criação de shaders ok!!");}
        var aPosition = gl.getAttribLocation(program, "aPosition");
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        forma.geraMatrizVertices();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(forma.getMatrizVertices()), gl.STATIC_DRAW);
        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(
            aPosition,  //parâmetro de entrada do shader
            2,          //quantidade de elementos por vértice
            gl.FLOAT,   //tipo de dados
            false,      //normalização
            0,          //stride - sem separação entre os vértices
            0           //offset - 0 para pegar o byte 0
        ); 
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindVertexArray(vao);
        gl.drawArrays(
            gl.TRIANGLE_FAN,        //formato de desenho
            0,                      //inicio
            forma.getQtdVertices()  //quantidade de vértices
        );
    }
}*/