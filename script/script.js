let amortecedor = "0"; 
/***
 * Setup geral
 */
let valorAtual = 0; 

resultTotal = 0;

let opBefore = null;

const monitorCalculator = document.querySelector(".calculator-visor");

var elements = document.getElementsByClassName("calc-btn");


//setup dos eventos de click
Array.from(elements).forEach(function(element) {
    element.addEventListener('click', function(event){
        
        let valueSend =  event.target.innerHTML.indexOf('</p>') != -1 ? event.target.querySelector('p').innerHTML.trim() : event.target.innerHTML.trim();
        if(valueSend == ",") valueSend = ".";
        handleEventCalculator(valueSend);
  });
   
})


//setup de quando as teclas são clicadas
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
            case 106: 
                valueBtnKeyDown = "*";
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
        if(valueBtnKeyDown != null) handleEventCalculator(valueBtnKeyDown)
        
        valueBtnKeyDown = null;
        
    
      return;
});


//envios da calculadora e encaminhamentos
function handleEventCalculator(value){
    
    if(isNaN(parseInt(value)) && value != "."){

        handleSymbol(value);

    }else{
        
        handleNumber(value);
    }

    rereenderMonitor();
}


//renderizar novamente o monitor da calculadora
function rereenderMonitor(){
    amortecedor = amortecedor.toString().replaceAll(".", ",")
    monitorCalculator.innerHTML = amortecedor;
}


function handleSymbol(value){
    amortecedor = amortecedor.toString().replaceAll(",", ".")
    switch (value){
        //apagar tudo
        case "AC":
            amortecedor = "0";
            valorAtual = 0;
            opBefore = null;
            break;
        //apagar uma única coisa
        case "←":
                amortecedor = amortecedor.toString().trim().substring(0, amortecedor.length - 1);
                valorAtual = amortecedor;
                break;
        case "=":
            if(opBefore === null){ 
                return;
            }
            valorAtual = eval(amortecedor)
            amortecedor = valorAtual;
            opBefore =  null;
            break;
        default:
            makeSymbol(value)
            break;
    }
}


function makeSymbol(value){
        
    opBefore = value;
    amortecedor += value;
}

function handleNumber(value){
    
    if(amortecedor === "0"){
        valorAtual = value;
        amortecedor = value;
    }else{
       // valorAtual += value;
        amortecedor += value;   
        if(opBefore == null) valorAtual = parseFloat(amortecedor)
    }
    
}
