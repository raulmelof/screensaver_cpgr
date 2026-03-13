import Renderizador from "./Render/Renderizador.js";
import Triangulo from "./Forma/Triangulo.js";
import Quadrado from "./Forma/Quadrado.js";
import Pentagono from "./Forma/Pentagono.js";

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

// sorteia um inteiro entre min e max
// util pro tamanho da forma e o centroide
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// sorteia uma cor aleatoria com alpha 1.0
function getRandomColor() {
    return [Math.random(), Math.random(), Math.random(), 1.0];
}

// sorteia um tipo de forma e ja devolve instanciado
function gerarFormaAleatoria(canvasWidth, canvasHeight) {
    const tipos = [Triangulo, Quadrado, Pentagono];
    const TipoSorteado = tipos[getRandomInt(0, 2)];
    
    // sorteia um tamanho de lado (coloquei entre 20 e 150 mas ajusta como ficar melhor visualmente)
    const tamanhoLado = getRandomInt(20, 150);
    
    // sorteia um centroide
    const limitadorDeBordas = 75; //Para as formas não vazarem muito do canvas
    const centroide = [
        getRandomInt(0 + limitadorDeBordas, canvasWidth - limitadorDeBordas),
        getRandomInt(0 + limitadorDeBordas, canvasHeight - limitadorDeBordas)
    ];
    
    const cor = getRandomColor();

    return new TipoSorteado(tamanhoLado, centroide, cor);
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl2");
    if(!gl) { alert("Não consegui abrir o contexto 2D"); return; }
    const renderizador = new Renderizador(gl, vertexShaderSrc, fragmentShaderSrc);

    const formas = [];
    let qtdFormas = 0;
    const limiteDeFormas = 50;
    const intervalo = 1000; //Milissegundos
    let ultimoTempo = 0;

    function looparInfinitamente(timestamp) {
        if(timestamp - ultimoTempo > intervalo) { //Verifica se já passou tempo suficiente desde a última forma para adicionar uma nova
            ultimoTempo = timestamp;
            if(qtdFormas >= limiteDeFormas) {
                //Reset
                formas.length = 0;
                qtdFormas = 0;
                renderizador.limparTela();
            }
            const novaForma = gerarFormaAleatoria(canvas.width, canvas.height);
            formas.push(novaForma);
            qtdFormas++;

            //Renderiza todas as formas
            renderizador.limparTela();
            for(const forma of formas) {
                renderizador.renderizar(forma);
            }
        }
        requestAnimationFrame(looparInfinitamente);
    }
    requestAnimationFrame(looparInfinitamente);
}

window.onload = main();