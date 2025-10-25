const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";


const dropdowns = document.querySelectorAll(".dropdowns select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let mssg = document.querySelector(".mssg");




for(let select of dropdowns){
    for(currCode in countryList){
         let newOption = document.createElement("option");
         newOption.innerText = currCode;
         newOption.value = currCode;
         if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
         } else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected"
        }
         select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlags(evt.target);
    })
}

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === ""  || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    // let finalAmount = amtVal * rate;
    let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed();
    mssg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}

const updateFlags = (element) =>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let newImg = element.parentElement.querySelector("img");
   newImg.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () =>{
   updateExchangeRate();
})