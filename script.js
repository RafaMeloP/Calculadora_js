var input, botoes = [], result = 0, operacao = "", psq;
resultado = () => {
    try {
        result = eval(operacao).toString();
    }
    catch{
        alert("Operação inválida");
        apaga();
    }
    operacao = result;
    psq = result.match(".");
    if (psq) result = result.replace(".", ",");
    input.value = result;
}
sobeValor = (valor) => {
    input.value += valor;
    if (valor == "x") valor = "*";
    else if (valor == ",") valor = ".";
    operacao += valor;
}
apaga = () => {
    operacao = input.value = "";
    result=0;
}
apagaAnterior = () => {
    var corte = input.value.substring(0, input.value.length - 1);
    input.value = corte;
    psq = corte.match("x");
    if (psq) corte = corte.replace(/x/g, "*");
    psq = corte.match(",");
    if (psq) corte = corte.replace(/,/g, ".");
    operacao = corte;
}
verificaTecla = (tecla) => {
    switch (tecla) {
        case 8: apagaAnterior(); break;
        case 46: apaga(); break;
        case 107: sobeValor("+"); break;
        case 109: sobeValor("-"); break;
        case 106:
        case 88: sobeValor("x"); break;
        case 111: sobeValor("/"); break;
        case 110:
        case 188: sobeValor(","); break;
        case 13:
        case 187:
            for (var i = 0; i < botoes.length; i++) {
                botoes[i].blur();
            }
            resultado();
            ; break;
        default:
            for (var i = 0; i < 10; i++) {
                if (tecla == (96 + i) || tecla == (48 + i)) sobeValor(i);
            }
            ; break;
    }
}
inicia = () => {
    input = document.querySelector(".calculadora .input input");
    botoes = document.querySelectorAll(".calculadora button");
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", () => {
            var valor = event.target.innerHTML;
            switch (valor) {
                case "=": resultado(); break;
                case "CE": apaga(); break;
                case "⬅️": apagaAnterior(); break;
                default: sobeValor(valor); break;
            }
        });
    }
    document.addEventListener("keydown", () => {
        var tecla = event.keyCode;
        verificaTecla(tecla);
    });
}
window.addEventListener("load", inicia);