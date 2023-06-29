let counter = 0;
let tripInfoList = [];
let changeCounter = 0;
let totalExpense = 0;
let myLength = 1;
const table = document.querySelector('table');

// constructer function for creating object
function tripInfo(number ,discription, personName,amount,paidOrNot){
    this.number = number,
    this.discription = discription,
    this.personName = personName,
    this.amount = amount,
    this.paidOrNot = paidOrNot
}
document.querySelector('#expenseTotal').textContent = "Total Kharcha: "+"\u20B9 "+totalExpense;
document.querySelector('#submit').addEventListener('click', function (e){    

   // to prevent submit from sending data to server 
   e.preventDefault();

   // validate user should not leave input field empty
   let validate = validateForm();
   if (validate === false){
   return false;
   }

   // storing input value of fields
   let discription = document.querySelector('#discription').value;
   let personName = document.querySelector('#personName').value;
   let amount = document.querySelector('#amount').value;
   amount = Number(amount);
   console.log(typeof amount == "number");
   let paidOrNot = document.querySelector('#paidOrNot').value;
   if(paidOrNot === 'yes') paidOrNot = "Paid";
   else if(paidOrNot === 'no') paidOrNot = "Not Paid Yet";

   // creating object using above value
   let newtripInfo = new tripInfo(myLength,discription,personName,amount,paidOrNot);

   // adding the object to list
   tripInfoList.push(newtripInfo);
   // display all the current object data along with previous entries
   printSubmit();

   // variable to keep count of number of entries
   myLength = tripInfoList.length+1;

   // clear input field after submit
   clearPreviousInputField();
});

// gets value of the newly added enter in tripInfoList list . here entries is a list of values
function getValue(){
   let entries = Object.values(tripInfoList[tripInfoList.length - 1]);
   counter++;
   return entries;
}

// function that display entered info on window
function printSubmit () {
      let entries = getValue();
      let length = entries.length;
      const tR = document.createElement('tr');
      tR.setAttribute('data-value', +myLength);

      // creating tD tags equal to how many values are given by user
      for(let i = 0 ; i < length ; i++){
         const tD = document.createElement('td');

         // adding ruppee symbol in amount cell using unicode
         if(i == 3){
            tD.textContent = "\u20B9 " + entries[i];
         } else tD.textContent = entries[i];
         tR.appendChild(tD);
      }

      // also creating delete and changeread button for each new entry
      const tDButton1 = document.createElement('td');
      const tDButton2 = document.createElement('td');
      const readStatusChange = document.createElement('button');

      // adding class to all changeread button.
      readStatusChange.classList.add('readStatus');
      readStatusChange.textContent = "Change Paid Status"
      const deleteEntryButton = document.createElement('button');

      // adding class to button
      deleteEntryButton.classList.add('deleteEntry');
      deleteEntryButton.textContent = "Delete entry";
      tDButton1.appendChild(readStatusChange);
      tDButton2.appendChild(deleteEntryButton);
      tR.appendChild(tDButton1);
      tR.appendChild(tDButton2);
      table.appendChild(tR);
      totalExpense += entries[3];
      document.querySelector('#expenseTotal').textContent = "Total Kharcha: "+"\u20B9 "+totalExpense;
}

// form validation function , print warning if nothing is entered.
function validateForm() {
   let x = document.forms["myForm"]["discription"].value;
   let y = document.forms["myForm"]["personName"].value;
   let z = document.forms["myForm"]["amount"].value;
   let a = document.forms["myForm"]["paidOrNot"].value;
   if (x == "" || y == "" || z== "" || a=="" ) {
     document.querySelector('#Alert').textContent = "Enter all the required field";
     clearPreviousInputField();
     return false;
   }else if(isNaN(z) === true){
      document.querySelector('#Alert').textContent = "Enter Numeric Value inside Amound field";
      clearPreviousInputField();
      return false;
   } else document.querySelector("#Alert").textContent = "";
 }

// listnening clicks for changeread and delete button and performing action based on which is clicked
// event delegation being used
document.querySelector('table').addEventListener('click', (e)=>{

   // if delete button is clicked
   if(e.target.className === "deleteEntry"){
      // selecting data-value of tr tag of clicked delete button
      let index = e.target.parentElement.parentElement.dataset.value;
      totalExpense = totalExpense - tripInfoList[index-1].amount;
      document.querySelector('#expenseTotal').textContent = "Total Kharcha: "+"\u20B9 "+totalExpense;
      // removing entry from tripInfoList list for which delete button was clicked 
      tripInfoList.splice(index-1,1);

      let length = tripInfoList.length;

      // removing whole row by using data-value
      document.querySelector('[data-value="' + index + '"]').remove();

      // condition to ensure that changes to tripInfoList.time entries and data-value are not made when last entry delete button is clicked.
      // otherwise applying changes in tripInfoList.number , data-value and Sr.no textcontent to ensure they are in chronological order.
      if (length - index > -1){
         for (let i = 0;i <length; i++){
            tripInfoList[i].number = i+1;
         }
         let changeRowValue = document.querySelectorAll('tr');
         let arrRowValue = Array.from(changeRowValue);

         // to avoid first tr tag which contains headings of table
         arrRowValue.splice(1).forEach(changeDataAttribute);
         
         changeCounter = 0;
         // keeping myLength var align with current changes which is responsible for adding data-value to new entry 
         myLength = tripInfoList[index-1].number+1;
      }
   }

   // listening changestatus button and changing value of td to opposite
   else if(e.target.className === "readStatus"){
      let tempPaidOrNotValue = e.target.parentElement.previousElementSibling.textContent;
      if (tempPaidOrNotValue === "Paid"){
         e.target.parentElement.previousElementSibling.textContent = "Not Paid Yet";
      } else e.target.parentElement.previousElementSibling.textContent = "Paid";
   }
})

// changing Sr.no and data-value to keep them in chronological order
function changeDataAttribute(current){

   // variable to index each element of array
   let tempLength = tripInfoList.length;

   // changing Sr.no to make them chronological
   current.firstElementChild.textContent = tripInfoList[changeCounter].number;

   // changing data-value to make them chronological
   current.setAttribute('data-value', +tripInfoList[changeCounter].number);

   //increment to keep track of number of function calls
   changeCounter++;
}

// clearing input field after submiting.
function clearPreviousInputField(){
   let allInputField = document.querySelectorAll('.user-input');
   allInputField.forEach((current)=>{
      current.value = "";
   })
}