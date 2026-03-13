import Forma from "./Forma.js";

export default class Quadrado extends Forma {
    constructor(tamanhoLado, centroide, cor) {
        super(tamanhoLado, centroide, cor);
        this.qtdVertices = 4;
    }

    gerarMatrizVertices() {
        const cx = this.centroide[0];
        const cy = this.centroide[1];

        const lado = this.tamanhoLado;

        const raio = lado / Math.sqrt(2);

        this.matrizVertices = [];

        for (let i = 0; i < 4; i++) {

            const angulo = (2 * Math.PI * i) / 4 - Math.PI / 4;

            const x = cx + raio * Math.cos(angulo);
            const y = cy + raio * Math.sin(angulo);

            this.matrizVertices.push(x, y);
        }
    }
}