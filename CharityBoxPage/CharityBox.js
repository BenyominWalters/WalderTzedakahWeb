/* Basic functionality for Tzedakah Box.
    Clicking on value buttons should add appropriate value to total in box.
    Clicking donate will open paypal link, and clear value of box.
    Add giveAmount to confirm how much you want to add?
*/

var boxTotal = 0;
var giveAmount = 0.00; // Holds value of donation before adding to box to confirm.

var fullAmount = 18.00; // Amount to show donate

var donationLink = ""

var coinSound = new Audio('../Assets/Coin Sounds/zapsplat_foley_coin_drop_into_metal_collection_tin_006_21089.mp3');

function loadSaved() {
    boxTotal = parseInt(localStorage.boxTotal) || 0;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2);

    savedCharityName = localStorage.charityName || 'Walder Education';
    document.getElementById("charityNameInput").value = savedCharityName;
    savedCharityEmail = localStorage.charityEmail || 'teacherscenter@waldereducation.org';
    document.getElementById("charityEmailInput").value = savedCharityEmail;

    fullAmount = parseInt(localStorage.fullAmount) || 18.00;
    document.getElementById("fullAmount").value = fullAmount.toFixed(2);
    document.getElementById("fullAmountLabel").innerHTML = '$' + fullAmount.toFixed(2);
}

function showButton(buttonName) {
document.getElementById(buttonName).style.visibility = "visible"; // Makes button visible when box not full
}

function hideButton(buttonName) {
    document.getElementById(buttonName).style.visibility = "hidden"; // Hides button when box full
}

function checkIfFull() {
    if (boxTotal >= fullAmount) {
        showButton("donateButton");
    } else {
        hideButton("donateButton")
        }
    
}

function addValue(value) {
    value = parseInt(value); // Because value of button is string, converts to Int
    giveAmount = giveAmount + value;
    document.getElementById("giveAmount").value = (giveAmount/100).toFixed(2);
    // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.
    showButton("giveButton");
}

function updateGiveAmount(value) {
    editedValue = parseFloat(value) * 100;
    giveAmount = editedValue;

    // Show coin
    if (value > 0) {
        showButton("giveButton");
    } else {
        hideButton("giveButton");
    }
}

function giveToBox() {
    boxTotal = boxTotal + giveAmount;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2); // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.
    
    // Save total to localStorage
    localStorage.boxTotal = boxTotal;
    
    // Resets giveAmount
    giveAmount = 0.00;
    document.getElementById("giveAmount").value = giveAmount.toFixed(2); // To fixed formats as $0.00, instead of just $0
    hideButton("giveButton");

    // Play coin sound
    coinSound.play();

// Check if full to show Donate Button
    checkIfFull();

} 

function resetBox(){
    boxTotal = 0;
    document.getElementById("boxValue").innerHTML = "$" + boxTotal.toFixed(2); // To fixed formats as $0.00, instead of just $0
    localStorage.setItem('boxTotal', '0');
    hideButton("donateButton");
}

function buildDonationLink() {
    let charityEmail = localStorage.charityEmail || 'teacherscenter@waldereducation.org';
    let charityName = localStorage.charityName || 'Walder Education';
    let donationInteger = boxTotal.toString().slice(0, -2); // Separates whole dollar value from boxTotal--removes last two digits
    let donationDecimal = boxTotal.toString().slice(-2).padStart(2, '0'); // Separates decimal values from boxTotal--keeps only last two digits, adds leading zero if less than 0.10
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

}

function donateBoxTotal() {
    console.log("You Donated!");
    buildDonationLink();
    console.log(donationLink); // Turn on window to launch actual payment.
    window.open(donationLink, 'Donate', width=100,height=100);
    resetBox();
}

function showSnackBar(message) {

        // Get the snackbar DIV
        var updatedSnackbar = document.getElementById("snackbar");

        // Change the message of snackbar
        updatedSnackbar.innerHTML = message;

        // Add the "show" class to DIV
        updatedSnackbar.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ updatedSnackbar.className = updatedSnackbar.className.replace("show", ""); }, 3000);

}

window.onload = function() {

    // Get the settings modal
    var modal = document.getElementById("settingsModal");

    // Get the button that opens the modal
    var settingsButton = document.getElementById("settingsButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeButton")[0];

    // Get the submit button
    var submitButton = document.getElementById("settingsSubmitButton");

    // Get the Update Minimum Button

    var fullAmountButton = document.getElementById("fullAmountButton");

    // When the user clicks the button, open the modal 
    settingsButton.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    submitButton.onclick = function() {

        let savedCharityEmail = localStorage.charityEmail || 'teacherscenter@waldereducation.org';
        let savedCharityName = localStorage.charityName || 'Walder Education';
        
        if (document.getElementById("charityNameInput").value != null) {
            savedCharityName = document.getElementById("charityNameInput").value;
            localStorage.setItem("charityName", savedCharityName);
        }
        
        if (document.getElementById("charityEmailInput").value != null) {
            savedCharityEmail = document.getElementById("charityEmailInput").value;
            localStorage.setItem("charityEmail", savedCharityEmail);
        }

        document.getElementById("charityName").innerHTML = localStorage.charityName || 'Walder Education';
        document.getElementById("charityEmail").innerHTML = localStorage.charityEmail || 'teacherscenter@waldereducation.org';

        document.getElementById("charityNameInput").value="";
        document.getElementById("charityEmailInput").value="";

        showSnackBar("Default Charity Updated");

        return false;
        
    }

    fullAmountButton.onclick = function() {
        fullAmount = parseFloat(document.getElementById("fullAmount").value) || 18;
        localStorage.setItem("fullAmount", fullAmount);
        document.getElementById("fullAmount").value = fullAmount.toFixed(2);
        document.getElementById("fullAmountLabel").innerHTML = '$' + fullAmount.toFixed(2);

        showSnackBar("Minimum Donation Updated");

        checkIfFull();

        return false;
    }

        loadSaved();
        checkIfFull();
}
