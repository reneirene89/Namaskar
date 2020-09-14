/*Countdown timer*/
var timeLeft;
var mins;
var sec;
var r;
var start=Date.now();
var myTime=setInterval(function () {
    timeLeft=600000-(Date.now()-start);
    if (timeLeft<=0) {
        clearInterval(myTime);
        alert("Sorry, you did not complete the form in 10:00 minutes. \n Try again if you need tickets.");
        window.location.href="mobile.html";
    }
    mins = timeLeft / 60000;
    r = mins % 1;
    sec = Math.floor(r * 60);
    if (sec < 10) {
        sec = '0'+sec;
    }
    mins = Math.floor(mins);
    document.getElementById("timer").innerHTML = mins+':'+sec;
    timeLeft=timeLeft-1000;


}, 1000);

 // validates input is only letters
 function validateAlphaOnly(ele) {
   var regLetters = /^[A-Za-z ]+$/;
   if (!regLetters.test(ele.value.trim())) {
     document.getElementById('errors').innerHTML = ele.name.toUpperCase() + " Must Only Be Letters!";
     ele.value = ""
   } else {
     document.getElementById('errors').innerHTML = ""
   }
 }

 // validates only input is only numbers
 function validateNumericOnly(ele) {
   var regLetters = /^[0-9]+$/;
   if (!regLetters.test(ele.value.trim())) {
     document.getElementById('errors').innerHTML = ele.name.toUpperCase() + " Must Only Be Numbers!";
     ele.value = ""
   } else {
     document.getElementById('errors').innerHTML = ""
   }
 }

 // validates input is only letters and numbers
 function validateAlphaNumericOnly(ele) {
   var regLetters = /^[0-9a-zA-Z ]+$/;
   if (!regLetters.test(ele.value.trim())) {
     document.getElementById('errors').innerHTML = ele.name.toUpperCase() + " Must Only Be Letters and/or Numbers";
     ele.value = ""
   } else {
     document.getElementById('errors').innerHTML = ""
   }
 }
//validates email based on standard email convention
 function validateEmail(ele) {
   if (ele.name === "email2") {
   var email1 = document.getElementById('email').value
   console.log("email1", email1, ele.value);
     if ( email1.trim() !== ele.value.trim()) {
       document.getElementById('errors').innerHTML = "comfirmation email does not match";
       ele.value = "";
       return
     } else {
       document.getElementById('errors').innerHTML = "";
     }
   }
   var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (!ele.value.match(regEmail)) {
     document.getElementById('errors').innerHTML = "Email  Must be in name@domain.extension format";
     ele.value = ""
   } else {
     document.getElementById('errors').innerHTML = ""
   }
 }

 //Validates phone number XXX-XXX-XXXX
function phonenumber(ele){
   if (ele.name === "phone2") {
   var phone1 = document.getElementById('phone').value
   console.log("phone1", phone1, ele.value);
     if ( phone.trim() !== ele.value.trim()) {
       document.getElementById('errors').innerHTML = "Please enter a 3 digit area code";
       ele.value = "";
       return
     } else {
       document.getElementById('errors').innerHTML = "";
     }
   }
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
if(!ele.value.match(phoneno)) {
      document.getElementById('errors').innerHTML = "Please enter a 10 digit number";
     ele.value = ""
   } else {
     document.getElementById('errors').innerHTML = ""
   }
}

function calcTotalPrice(quantity, price) {
    return quantity * price;
}

function getMessage(quantity, totalPrice) {
    return 'You purchased ' + quantity + ' ticket(s) and your total price is $' + totalPrice
}

function parseQuantity(val) {
    return parseInt(val, 10) || 0;
}

// Sum numbers in given list
function sum(list) {
    return list.reduce(function(acc, x) {
        return acc + x;
    }, 0)
}

(function() {
    // Use IIFE here to define a scope to initialize some variables here
    var submitBtn = document.getElementById('submitButton');
    var outputPara = document.getElementById('totalPrice');

    var config = [
        [document.getElementById('quantityAdult'), 49],
        [document.getElementById('quantityChild'), 20],
        [document.getElementById('quantitySenior'), 30]
    ];

    submitBtn.addEventListener('click', function() {
        var totalPrices;
        var quantities = config.map(function (data) { // In ES6 we could use array destructing: [el, price]
            var el = data[0];
            return parseQuantity(el.value);
        });

        if ( sum(quantities) > 0 ) {
            totalPrices = config.map(function(data) {
                var el = data[0], price = data[1];
                return calcTotalPrice(parseQuantity(el.value), price);
            });

            outputPara.innerHTML = getMessage( sum(quantities), sum(totalPrices) );
        } else {
            alert('Please purchase at least 1 ticket');
        }
    });

}());