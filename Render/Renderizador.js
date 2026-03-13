import ShaderUtils from "../Utils/ShaderUtils.js";

export default class Renderizador {

    constructor(glContext, vertexShaderSrc, fragmentShaderSrc) {
        this.gl = glContext;
        const gl = this.gl;

        //Cria o programa
        this.program = ShaderUtils.makeProgram(gl, vertexShaderSrc, fragmentShaderSrc);
        //if(program) {alert("Criação de shaders ok!!");}
        gl.useProgram(this.program);

        //Pega locations
        this.aPosition = gl.getAttribLocation(this.program, "aPosition");
        this.uResolutionLocation = gl.getUniformLocation(this.program, "uResolution");
        this.uColorLocation = gl.getUniformLocation(this.program, "uColor");

        //Cria o buffer
        this.positionBuffer = gl.createBuffer();

        //Cria o VAO
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        gl.enableVertexAttribArray(this.aPosition);

        gl.vertexAttribPointer(
            this.aPosition, //parâmetro de entrada do shader
            2,              //quantidade de elementos por vértice
            gl.FLOAT,       //tipo de dados
            false,          //normalização
            0,              //stride - sem separação entre os vértices
            0               //offset - 0 para pegar o byte 0
        );

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // passa a altura e largura para o shader
        gl.uniform2f(this.uResolutionLocation, gl.canvas.width, gl.canvas.height);
    }

    limparTela() {
        const gl = this.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    renderizar(forma) {
        const gl = this.gl;

        forma.gerarMatrizVertices();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(forma.getMatrizVertices()), gl.STATIC_DRAW);

        // passa a cor para o shader
        const cor = forma.getCor();

        gl.uniform4f(this.uColorLocation, cor[0], cor[1], cor[2], cor[3]);

        gl.bindVertexArray(this.vao);

        gl.drawArrays(
            gl.TRIANGLE_FAN,        //formato de desenho
            0,                      //inicio
            forma.getQtdVertices()  //quantidade de vértices
        );
    }
}