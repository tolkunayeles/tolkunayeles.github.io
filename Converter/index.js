const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies'
let rates = {};
let endPoint = "usd";
const resultBtn = document.querySelector("#button");
const clearBtn = document.querySelector("#clear")


function getResult() {
    fetch(url + "/" + endPoint + ".json")
      .then((response) => response.json())
      .then((data) => {
        rates = data.usd;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from").value;
    const toCurrency = document.getElementById("to").value;

    const amountInUSD = amount / rates[fromCurrency];
    const convertedAmount = amountInUSD * rates[toCurrency];
  
    document.getElementById(
      "result"
    ).innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency.toUpperCase()}`;
  }
  resultBtn.addEventListener("click", convertCurrency);
  clearBtn.addEventListener('click', () => {
        document.querySelector('#amount').value = '';
        document.querySelector('#from').value = '';
        document.querySelector('#to').value = '';
        result.textContent = 'Result';
      });
  getResult();


