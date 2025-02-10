// Include api for currency change
const listCurrencies = "https://api.frankfurter.dev/v1/currencies";
const latest = " https://api.frankfurter.dev/v1/latest?base=USD";


// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let reflValue =  document.querySelector(".reflValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;
let selects = document.querySelectorAll("select");
let allCurrencies = document.querySelector(".all");
let allCurrencies1 = document.querySelector(".all1");

// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});

// Event when currency is changed
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, it calls function getresults 
convert.addEventListener("click", displayResults);

// Display results after conversion
function displayResults() {
    converter(resultFrom,resultTo,searchValue);
    finalAmount.style.display = "block";    
}

function converter(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        const refAmount1 =  (1 * data.rates[to]).toFixed(2);
        finalValue.innerHTML = (`${amount} ${from} = ${convertedAmount} ${to}`);
        reflValue.innerHTML = (`1 ${from} = ${refAmount1} ${to}`);
        });
    }

fetch(listCurrencies)
.then((data) => data.json())
.then((data) => {
  let entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    selects[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    selects[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
})

  
// When user click on reset button
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};