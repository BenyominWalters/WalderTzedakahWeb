/* Basic functinaly for Tzedakah Box.
    Clicking on value buttons should add appropriate value to total in box.
    Clicking donate will open paypal link, and clear value of box.
*/

var boxTotal = 0;
//var giveAmount = 0;

var donationLink = ""

function addValue(value) {
    //giveAmount = giveAmount + value;
    value = parseInt(value);
    console.log(value);
    boxTotal = boxTotal + value;
    // The toFixed() function prevents javaScript from adding tons of decimal places to float
    // This way it displays as a two decimal place currency.
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2); 
}

function resetBox(){
    boxTotal = 0;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2);
}

function buildDonationLink() {
    let charityEmail = 'info@clhds.com';
    let charityName = 'Cheder Lubavitch';
    let donationInteger = parseInt(Math.floor(boxTotal/100)); // Separates whole dollar value from boxTotal
    let donationDecimal = boxTotal.toString().slice(-2);
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