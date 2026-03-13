import Forma from "./Forma.js";

export default class Pentagono extends Forma {
    constructor(tamanhoLado, centroide, cor) {
        super(tamanhoLado, centroide, cor);
        this.qtdVertices = 5;
    }

    gerarMatrizVertices() {
        const cx = this.centroide[0];
        const cy = this.centroide[1];

        const lado = this.tamanhoLado;

        const raio = lado / (2 * Math.sin(Math.PI / 5));

        this.matrizVertices = [];

        for (let i = 0; i < 5; i++) {

            const angulo = (2 * Math.PI * i) / 5 - Math.PI / 2;

            const x = cx + raio * Math.cos(angulo);
            const y = cy + raio * Math.sin(angulo);

            this.matrizVertices.push(x, y);
        }
    }
}