let operatorCounter = 0;
let firstInput , lastInput, operator,result;

// selecting all elements with data-value attribute
const userClicks = document.querySelectorAll('[data-value]');

// iterating through each element and applying callback function
userClicks.forEach(userClick=>{

    // listining the clicks of user
    userClick.addEventListener("click",(event)=>{ 
       const dataValue = userClick.textContent;
       // if click is on number , showing it on display and using array to keep track of previous digits
       if (isNaN(dataValue) === false || dataValue === "."){
            let pointCounter = 0;
            if (dataValue === "."){
                pointCounter++;
                document.querySelector('.box-17').disabled = true;
            }
            document.querySelector('p').textContent += dataValue;
        // listing AC click
       } else if (dataValue === "AC"){
        clearTextContent();
        operatorCounter = 0;
        // clear the textContent in p element
        console.log("AC");

        // perform function of operator
        } else if (dataValue === "="){
            let LastInput = document.querySelector('p').textContent;
            LastInput = +LastInput;
            document.querySelector('p').textContent = calculations(firstInput,LastInput,operator);  
            operatorCounter = 0;
            // joining the array and converting it into number for further calculation , emptying the array for 2nd value 
        } else {
            /* document.querySelector('p').textContent = dataValue; */
            operatorCounter++;
            if (operatorCounter === 1 && document.querySelector('p').textContent !== ""){
                firstInput = document.querySelector('p').textContent;
                firstInput = +firstInput;
                clearTextContent();
                document.querySelector('.box-17').disabled = false;
                console.log("firstInput", firstInput)
            }
            else{
                if (document.querySelector('p').textContent !== ""){
                    lastInput = document.querySelector('p').textContent;
                    lastInput = +lastInput;
                    result = calculations(firstInput,lastInput,operator);
                    clearTextContent();
                    document.querySelector('p').textContent += result;
                    console.log("last input been joined", lastInput, result);
                    firstInput = result;
                }
            } 
            operator = dataValue;
            console.log("operaterCounter = ",operatorCounter);
        }
    });
});

const calculations = (firstInput,lastInput,operator)=> {
    if (operator === "/"){
        const division = firstInput / lastInput;
        return division;
    }else if(operator === "+"){
        const addition = firstInput + lastInput;
        return addition;
    } else if(operator === "-"){
        const substract = firstInput - lastInput;
        return substract;
    } else if(operator === "*"){
        const multiply = firstInput * lastInput;
        return multiply;
    }else if (operator === "%"){
        const remainder = firstInput % lastInput;
        return remainder;
    }
}

function clearTextContent(){
    document.querySelector('p').textContent = "";
}
