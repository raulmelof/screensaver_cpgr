import Triangulo from "./Forma/Triangulo.js";
import Quadrado from "./Forma/Quadrado.js";
import Pentagono from "./Forma/Pentagono.js";


class Renderizador {

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
}

var vertexShaderSrc = `#version 300 es

    in vec2 aPosition;
    uniform vec2 uResolution; //recebe a resolução do canvas, para usar na conversão de coordenadas

    void main() {
        vec2 zeroToOne = aPosition / uResolution;//converte em uma escala de 0 a 1
        vec2 zeroToTwo = zeroToOne * 2.0;//converte em uma escala de 0 a 2
        vec2 clipSpace = zeroToTwo - 1.0;//converte em uma escala de -1 a 1

        gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);//inverte o eixo y, pq o canvas tem o y para baixo, e o OpenGL tem o y para cima
    }
`;

var fragmentShaderSrc = `#version 300 es
    precision highp float; //Pode ser double também

    uniform vec4 uColor;//recebe a cor do objeto, para usar na renderização(vamos sortear a cor no js)
    out vec4 fColor;

    void main() {
        fColor = uColor;//repassa a cor para o fragmento
    }
`;

function compile(gl, type, source) {
    //gl - contexto (objeto gl)
    //type - gl.VERTEX_SHADER ou gl.FRAGMENT_SHADER
    //source - o código fonte

    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var deuCerto = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if(deuCerto) {
        return shader;
    }
    //senão, mostra o erro
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader); //desalocar o objeto, pois deu erro
}

function link(gl, vertexShader, fragmentShader) {
    //gl - contexto gl
    //vertexShader - shader já compilado
    //fragmentShader - idem

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var deuCerto = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(deuCerto) {
        return program;
    }
    console.log(gl.ProgramInfoLog(program));
    gl.deleteProgram(program);
}

function makeProgram(gl, vertexShaderSrc, fragmentShaderSrc) {
    //gl - contexto gl
    //vertexShaderSrc - string com o código fonte
    //fragmentShaderSrc - string com o código fonte

    var vertexShader = compile(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    var fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

    if(!vertexShader || !fragmentShader) {
        alert("ERRO na compilação");
        return null;
    }

    var program = link(gl, vertexShader, fragmentShader);

    if(program) {
        return program;
    }
    alert("ERRO na link-edição");
}

function main() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2"); //Pois estamos em 2D
    if(!gl) {alert("Não consegui abrir o contexto 2D");}
    const renderizador = new Renderizador(gl);
    const triangulo = new Triangulo(1, [0,0], [1,0,0]);
    const quadrado = new Quadrado(1, [0,0], [1,0,0]);
    const pentagono = new Pentagono(1, [0,0], [1,0,0]);
    renderizador.renderiza(triangulo, vertexShaderSrc, fragmentShaderSrc);
    //renderizador.renderiza(quadrado, vertexShaderSrc, fragmentShaderSrc);
    //renderizador.renderiza(pentagono, vertexShaderSrc, fragmentShaderSrc);
}

window.onload = main();