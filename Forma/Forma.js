export default class Forma {
    constructor(tamanhoLado, centroide, cor) {
        this.qtdVertices = null;
        this.matrizVertices = [];
        this.tamanhoLado = tamanhoLado;
        this.centroide = centroide;
        this.cor = cor;
    }

    getQtdVertices() {
        return this.qtdVertices;
    }
    getMatrizVertices() {
        return this.matrizVertices;
    }
    getCor() {
        return this.cor;
    }

    gerarMatrizVertices() {}
}