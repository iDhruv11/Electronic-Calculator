const button = document.querySelectorAll('button');
const entryPrime = document.querySelector('#answer');
const entrySec = document.querySelector('#history p');
const equalBtn = document.querySelector('#equalButton');
const operator = document.querySelectorAll('.operator');
const number = document.querySelectorAll('.number');
const ac = document.querySelector('.ac');
const ce = document.querySelector('.ce');
let valueSec = '';
let valuePrime = ''; 
disabler();

function clear(){
    valueSec = '';
    valuePrime = '';
    entrySec.innerText = "0";
    entryPrime.innerText = "0";
}
function dlt(){
    for(let i = valueSec.length-1; i>-1; i--){
        if(valueSec.charAt(i) == '+' || valueSec.charAt(i) == '-' || valueSec.charAt(i) == '*' || valueSec.charAt(i) == '/'){
            valueSec = valueSec.substring(0, i);
            entrySec.innerText = valueSec;
            entryPrime.innerText = '0';
            break;
        }
    }
}
function performEntry(e){
    if(e.target.value == '.'){
        let lastChar = valueSec.charAt(valueSec.length - 1);
        if(valueSec == ''){ 
            valueSec = '0';
            valueSec = valueSec.toString() + e.target.value;
            entryPrime.innerText = valueSec;
            entrySec.innerText = valueSec;
        }
        else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
            valueSec = valueSec.toString() + '0' + e.target.value;
            entrySec.innerText = valueSec;
        }
        else{    
            valuePrime = valuePrime.toString() + e.target.value;
            entryPrime.innerText = valuePrime;
            valueSec = valueSec.toString() + e.target.value;
            entrySec.innerText = valueSec;
        }
        e.target.disabled = true;
    }     
    else{
        if(e.target.value == '+' || e.target.value == '-' || e.target.value == '*' || e.target.value == '/' || e.target.value == '='){
            valueSec = valueSec.toString() + e.target.value;
            valuePrime = e.target.value;
            entryPrime.innerText = valuePrime;
            entrySec.innerText = valueSec;
            valuePrime = '';
            disabler();
            number[number.length - 1].disabled = false; 

        }
        else{
            valuePrime = valuePrime.toString() + e.target.value;
            valueSec = valueSec.toString() + e.target.value;
            entryPrime.innerText = valuePrime;
            entrySec.innerText = valueSec;
            enabler();
        }
    }    
}


function enabler(){
    operator.forEach( (elem) => {
        elem.disabled = false;
    })
}

function disabler(){
    operator.forEach( (elem) => {
        elem.disabled = true;
    })
}

ac.addEventListener('click', clear);
ce.addEventListener('click', dlt);

number.forEach( (elem) => {
    elem.addEventListener('click', (e) => {
        performEntry(e);
    })
})
operator.forEach( (elem) => {
    elem.addEventListener('click', (e)=>{
        performEntry(e);
    })
})
equalBtn.addEventListener('click', (e) => {
    let result = valueSec.substring(0, valueSec.length - 1);
    result = parseFloat(eval(result)).toPrecision(3);
    valueSec = valueSec.toString() + result.toString();
    entrySec.innerText = valueSec;
    entryPrime.innerText = result;
    enabler();
    e.target.disabled = true;  
    valueSec = result.toString();
    entrySec.innerText = valueSec;
})
