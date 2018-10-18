

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
    document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);
    //document.getElementById("fullAmount").innerHTML = '$' + fullAmount.toFixed(2);
}

function showButton(buttonName) {
document.getElementById(buttonName).style.visibility = "visible"; // Makes button visible when box not full
}

function hideButton(buttonName) {
    document.getElementById(buttonName).style.visibility = "hidden"; // Hides button when box full
}

function checkIfFull() {
    if (boxTotal >= fullAmount * 100) {
        showButton("donateButton");
    } else {
        hideButton("donateButton")
        }
    
}

function addValue(value) {
    value = parseInt(value); // Because value of button is string, converts to Int
   
    giveAmount = (giveAmount || 0) + value;
    document.getElementById("giveAmount").value = (giveAmount/100).toFixed(2);
    // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.
    showButton("giveButton");
}

function updateGiveAmount(value) {
    editedValue = parseFloat(value) * 100 || 0;
    
    giveAmount = editedValue || 0.00;

    // Show coin
    if (editedValue > 0) {
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

function editBoxTotal(){
    if (confirm('Reset your box?')) {
        resetBox()
    }
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
    // console.log("You Donated!");
    buildDonationLink();
    // console.log(donationLink); // Turn on window to launch actual payment.
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

    // Get the settings modal and its elements
    var modal = document.getElementById("settingsModal");
    var settingsButton = document.getElementById("settingsButton"); // Button that opens the modal
    var span = document.getElementsByClassName("closeButton")[0]; // <span> element that closes the modal
    var submitButton = document.getElementById("settingsSubmitButton"); // Submit button
    var fullAmountButton = document.getElementById("fullAmountButton"); // Update Minimum Button

    // When the user clicks the Settings button, open the modal 
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
        
        if (document.getElementById("charityNameInput").value == "") {

            showSnackBar("Please include Charity Name");
            document.getElementById("charityNameInput").value = localStorage.charityName || 'Walder Education';

        } else if (document.getElementById("charityEmailInput").value == "") {

            showSnackBar("Please include Charity Email");
            document.getElementById("charityEmailInput").value = localStorage.charityEmail ||  'teacherscenter@waldereducation.org';

        } else if (document.getElementById("fullAmountInput").value == "") {

            showSnackBar("Enter A Minimum Amount");
            document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);

        } else {
            
            // Update Charity Name, Email, and Full Amount, save values to Local Storage, and display new values in form
            savedCharityName = document.getElementById("charityNameInput").value;
            localStorage.setItem("charityName", savedCharityName);

            savedCharityEmail = document.getElementById("charityEmailInput").value;
            localStorage.setItem("charityEmail", savedCharityEmail)

            fullAmount = parseFloat(document.getElementById("fullAmountInput").value);
            localStorage.setItem("fullAmountInput", fullAmount);
            
            document.getElementById("charityNameInput").value = localStorage.charityName || 'Walder Education';
            document.getElementById("charityEmailInput").value = localStorage.charityEmail || 'teacherscenter@waldereducation.org';
            document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);

            showSnackBar("Updated Settings");

            checkIfFull();

        }       

        return false;
        
    }

    // fullAmountButton.onclick = function() {

    //     if (document.getElementById("fullAmountInput").value == "") {

    //         showSnackBar("Enter A Minimum Amount");
    //         document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);

    //     } else {
    //         fullAmount = parseFloat(document.getElementById("fullAmountInput").value);
    //         localStorage.setItem("fullAmountInput", fullAmount);
    //         document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);
    //         //document.getElementById("fullAmount").innerHTML = '$' + fullAmount.toFixed(2);
    
    //         showSnackBar("Minimum Donation Updated");
    //     }
        

    //     checkIfFull();

    //     return false;
    // }

        loadSaved();
        checkIfFull();
}
