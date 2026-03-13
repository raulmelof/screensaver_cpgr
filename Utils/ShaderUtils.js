export default class ShaderUtils {

    static compile(gl, type, source) {
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

    static link(gl, vertexShader, fragmentShader) {
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

    static makeProgram(gl, vertexShaderSrc, fragmentShaderSrc) {
        //gl - contexto gl
        //vertexShaderSrc - string com o código fonte
        //fragmentShaderSrc - string com o código fonte

        var vertexShader = ShaderUtils.compile(gl, gl.VERTEX_SHADER, vertexShaderSrc);
        var fragmentShader = ShaderUtils.compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

        if(!vertexShader || !fragmentShader) {
            alert("ERRO na compilação");
            return null;
        }

        var program = ShaderUtils.link(gl, vertexShader, fragmentShader);

        if(program) {
            return program;
        }
        alert("ERRO na link-edição");
    }
}