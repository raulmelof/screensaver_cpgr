import Forma from "./Forma.js";

export default class Triangulo extends Forma {
    constructor(tamanhoLado, centroide, cor) {
        super(tamanhoLado, centroide, cor);
        this.qtdVertices = 3;
    }

    geraMatrizVertices() {
        const cx = this.centroide[0];
        const cy = this.centroide[1];

        const lado = this.tamanhoLado;

        const raio = lado / Math.sqrt(3);

        this.matrizVertices = [];

        for (let i = 0; i < 3; i++) {

            const angulo = (2 * Math.PI * i) / 3 + Math.PI / 2;

            const x = cx + raio * Math.cos(angulo);
            const y = cy + raio * Math.sin(angulo);

            this.matrizVertices.push(x, y);
        }
    }
}