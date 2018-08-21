/* Basic functionality for Tzedakah Box.
    Clicking on value buttons should add appropriate value to total in box.
    Clicking donate will open paypal link, and clear value of box.
    Add giveAmount to confirm how much you want to add?
*/

var boxTotal = 0;
var giveAmount = 0.00; // Holds value of donation before adding to box to confirm.

var donationLink = ""

function addValue(value) {
    value = parseInt(value); // Because value of button is string, converts to Int
    console.log(value);
    giveAmount = giveAmount + value;
    document.getElementById("giveAmount").value = (giveAmount/100).toFixed(2);
    // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.
    document.getElementById("giveButton").className = "giveButton visible" // Makes button visible when has value to give
}

function giveToBox() {
    boxTotal = boxTotal + giveAmount;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2);
    // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.
    
    // Resets giveAmount
    giveAmount = 0.00;
    document.getElementById("giveAmount").value = giveAmount.toFixed(2); // To fixed formats as $0.00, instead of just $0
    document.getElementById("giveButton").className = "giveButton hidden" // Hides button when no value to give

} 

function resetBox(){
    boxTotal = 0;
    document.getElementById("boxValue").innerHTML = "$" + boxTotal.toFixed(2); // To fixed formats as $0.00, instead of just $0
}

function buildDonationLink() {
    let charityEmail = 'info@clhds.com';
    let charityName = 'Cheder Lubavitch';
    let donationInteger = boxTotal.toString().slice(0, -2); // Separates whole dollar value from boxTotal--removes last two digits
    let donationDecimal = boxTotal.toString().slice(-2); // Separates decimal values from boxTotal--keeps only last two digits
    let donationAmount = donationInteger +'%2e'+ donationDecimal;
    // Builds custom PayPal link. Its very long, so I broke it up onto multiple lines 
    donationLink = 
        'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business='
        +charityEmail
        +'&lc=US&item_name=Donation+to+'
        +charityName
        +'&no_note=0&cn=&amount='
        +donationAmount
        +'&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted';
    console.log(boxTotal);
    console.log(donationDecimal);
    console.log(donationAmount);
}

function donateBoxTotal() {
    console.log("You Donated!");
    buildDonationLink();
    console.log(donationLink); // Turn on window to launch actual payment.
    // window.open(donationLink, 'Donate', width=100,height=100);
    resetBox();
}