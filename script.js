let amortecedor = "0"; 

let valorAtual = 0; 

resultTotal = 0;

let opBefore = null;


const monitorCalculator = document.querySelector(".calculator-visor");

var elements = document.getElementsByClassName("calc-btn");

Array.from(elements).forEach(function(element) {
    element.addEventListener('click', function(event){
        
        let valueSend =  event.target.innerHTML.indexOf('</p>') != -1 ? event.target.querySelector('p').innerHTML.trim() : event.target.innerHTML.trim();
       
        eventoClicarBotaoCalculadora(valueSend);
  });
   
})

window.addEventListener("keydown", event => {
    console.log(event.keyCode)
        let valueBtnKeyDown = null;
        switch (event.keyCode) {
            case 97:
                valueBtnKeyDown = "1";
                break;
            case 98: 
                valueBtnKeyDown = "2";
                break;
            case 99: 
                valueBtnKeyDown = "3";
                break;
            case 100: 
                valueBtnKeyDown = "4";
                break;
            case 101: 
                valueBtnKeyDown = "5";
                break;
            case 102: 
                valueBtnKeyDown = "6";
                break;
            case 103: 
                valueBtnKeyDown = "7";
                break;
            case 104: 
                valueBtnKeyDown = "8";
                break;
            case 105: 
                valueBtnKeyDown = "9";
                break;
            case 107: 
                valueBtnKeyDown = "+";
                break;
            case 13: 
                valueBtnKeyDown = "=";
                break;
            case 111: 
                valueBtnKeyDown = "/";
                break;
            case 8: 
                valueBtnKeyDown = "AC";
                break;
            case 109: 
                valueBtnKeyDown = "-";
                break;
            case 96: 
                valueBtnKeyDown = "0";
                break;
            default:
                break;
        }
        if(valueBtnKeyDown != null) eventoClicarBotaoCalculadora(valueBtnKeyDown)
        
        valueBtnKeyDown = null;
        
    
      return;
  });

function eventoClicarBotaoCalculadora(value){
    
    if(isNaN(parseInt(value))){
        enviarSimbolo(value);
    }else{
        
        enviarNumero(value);
    }
    recalcularValorDoMonitor();

    console.log("amortecedor = "+amortecedor)
    console.log("valor atual = " + valorAtual)

}



function recalcularValorDoMonitor(){
    monitorCalculator.innerHTML = amortecedor;
}


function enviarSimbolo(value){

    switch (value){
        case "AC":
            amortecedor = "0";
            valorAtual = 0;
            opBefore = null;
            break;
        case "=":
            if(opBefore === null){ 
                return;
            }
            valorAtual = addbits(amortecedor)
            amortecedor = valorAtual;
            opBefore =  null;
            break;
        default:
            calcularFinal(value)
            break;
    }
}


function calcularFinal(value){
    
    const internalBuffer = parseFloat(amortecedor);
    
    /*
    console.log("internal buffer  = " + internalBuffer)
    if (valorAtual === 0){
            valorAtual = parseFloat(value);
    }else{
            realizarOperacao(internalBuffer);
    }
    */
        
    opBefore = value;

    amortecedor += value;
}

function realizarOperacao(internalBuffer){
  // console.log(opBefore)
   // console.log(internalBuffer)
    if(opBefore === "+"){
        /*
        valorAtual = parseFloat(valorAtual)
        internalBuffer = parseFloat(internalBuffer)
        valorAtual = internalBuffer + valorAtual;
        */
       // amortecedor = valorAtual;
    }else if(opBefore === "-"){
        //valorAtual -= internalBuffer;
        valorAtual = parseFloat(valorAtual)
        internalBuffer = parseFloat(internalBuffer)
        valorAtual = valorAtual -  internalBuffer ;

    }else if(opBefore === "*"){
        valorAtual *= internalBuffer;
    }else if(opBefore === "/"){
        valorAtual /= internalBuffer;
    }
   // amortecedor = valorAtual;
}

function enviarNumero(value){
    
    if(amortecedor === "0"){
        valorAtual = value;
        amortecedor = value;
    }else{
       // valorAtual += value;
        amortecedor += value;   
        if(opBefore == null) valorAtual = parseFloat(amortecedor)
        //realizarOperacao(parseFloat(value))
    }
    
}


function addbits(s) {
    var total = 0,
        s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
        
    while (s.length) {
      total += parseFloat(s.shift());
    }
    return total;
  }