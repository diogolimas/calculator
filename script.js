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
        switch (event.keyCode) {
            case 97:
                amortecedor += "1";
                
                break;
            case 98: 
                amortecedor += "2";
                break;
            case 99: 
                amortecedor += "3";
                break;
            case 100: 
                amortecedor += "4";
                break;
            case 101: 
                amortecedor += "5";
                break;
            case 102: 
                amortecedor += "6";
                break;
            case 103: 
                amortecedor += "7";
                break;
            case 104: 
                amortecedor += "8";
                break;
            default:
                break;
        }
        console.log(amortecedor)
        recalcularValorDoMonitor();
      return;
    
    // do something
  });


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
         //  realizarOperacao(parseInt(amortecedor));
            amortecedor = valorAtual;
            opBefore = null;
            valorAtual = 0;
            break;
        default:
            calcularFinal(value)
            break;
    }
}


function eventoClicarBotaoCalculadora(value){
    
    if(isNaN(parseInt(value))){
        enviarSimbolo(value);
    }else{
        
        enviarNumero(value);
    }
    recalcularValorDoMonitor();
}

function calcularFinal(value){
    
    const internalBuffer = parseFloat(amortecedor);
    
    if (valorAtual === 0){
            valorAtual = internalBuffer;
    }else{
            realizarOperacao(internalBuffer);
    }
        
    opBefore = value;

    amortecedor += value;
}

function realizarOperacao(internalBuffer){
  // console.log(opBefore)
   // console.log(internalBuffer)
    if(opBefore === "+"){
        valorAtual = parseFloat(valorAtual)
        internalBuffer = parseFloat(internalBuffer)
        valorAtual = internalBuffer + valorAtual;
       // amortecedor = valorAtual;
    }else if(opBefore === "-"){
        valorAtual -= internalBuffer;
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
        realizarOperacao(parseFloat(value))
    }
    
    console.log(valorAtual)
    console.log(opBefore)
    console.log(amortecedor)
    
}
