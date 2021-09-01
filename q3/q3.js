let amortecedor = "0"; 

let valorAtual = 0; 

let opBefore = null;

const monitorCalculator = document.querySelector(".calculator-visor");

var elements = document.getElementsByClassName("calc-btn");

Array.from(elements).forEach(function(element) {
    element.addEventListener('click', function(event){
        
        let valueSend =  event.target.innerHTML.indexOf('</p>') != -1 ? event.target.querySelector('p').innerHTML.trim() : event.target.innerHTML.trim();
       
        eventoClicarBotaoCalculadora(valueSend);
  });
})



function rerenderScreen(){
    monitorCalculator.innerHTML = amortecedor;
}



function enviarSimbolo(value){

    switch (value){
        case "AC":
            amortecedor = "0";
            valorAtual = 0;
            opBefore = null;
            break;
        default:
            amortecedor += value;
            break;
    }
}


function eventoClicarBotaoCalculadora(value){
    
    if(isNaN(parseInt(value))){
        enviarSimbolo(value);
    }else{
        enviarNumero(value);
    }
    rerenderScreen();
}

function enviarNumero(value){
    if(amortecedor === "0"){
        amortecedor = value;
    }else{
        amortecedor += value;
    }
}
