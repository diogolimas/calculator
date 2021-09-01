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
