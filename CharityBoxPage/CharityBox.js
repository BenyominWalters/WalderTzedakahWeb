

var boxTotal = 0;
var giveAmount = 0.00; // Holds value of donation before adding to box to confirm.

var fullAmount = 18.00; // Amount to show donate

var donationLink = ""

var coinSound = new Audio('../Assets/Coin Sounds/zapsplat_foley_coin_drop_into_metal_collection_tin_006_21089.mp3');
//coinSound.preload = "auto";

var loginModal = document.getElementById('loginModal');
var login = true;

Parse.initialize("0edbc24c4194a2bf17fb28b4b17a84befdf22537");
Parse.serverURL = "http://3.16.162.6:80/parse/";

var user = Parse.User.current();
var username = "";
var userTotal = 0;
var userCharityName = "Walder Education";
var userCharityEmail = "teacherscenter@waldereducation.org"
var userFullAmount = 18.00;

function refreshUser() {
    var currentUser = Parse.User.current();
    if (currentUser) {
        user.fetch().then(function(fetchedUser){
            username = fetchedUser.getUsername();
            userTotal = fetchedUser.get("total");
            userCharityName = fetchedUser.get("CharityName");
            userCharityEmail = fetchedUser.get("CharityEmail");
            userFullAmount = fetchedUser.get("FullAmoung");
            console.log("Welcome " + username);
            loadSaved();
        }, function(error){
            console.log(error.message);
        });
    } else {
        loginModal.style.display = "block";
    }
}

function saveToParse() {

    console.log("Saved!")

    user.set("total", boxTotal);

    user.save(null, {
        success: function(user) {
            user.fetch();
            console.log("Successfully saved.");
            console.log(user.get('total'));
        },
        error: function(user, error) {
            alert('Failed to update object, with error code: ' + error.message);
        }
    });

}

function loadSaved() {

    boxTotal = userTotal || 0;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2);

    savedCharityName = userCharityName || 'Walder Education';
    document.getElementById("charityNameInput").value = savedCharityName;
    savedCharityEmail = userCharityEmail || 'teacherscenter@waldereducation.org';
    document.getElementById("charityEmailInput").value = savedCharityEmail;

    fullAmount = userFullAmount || 18.00;
    document.getElementById("fullAmountInput").value = fullAmount.toFixed(2);

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
    // Play coin sound
    coinSound.play();
    
    boxTotal = boxTotal + giveAmount;
    document.getElementById("boxValue").innerHTML = "$" + (boxTotal/100).toFixed(2); // Uses toFixed() to trim extra float zeros to display as a two decimal place for currency.

    saveToParse(); // Saves total to Parse server
    
    // Resets giveAmount
    giveAmount = 0.00;
    document.getElementById("giveAmount").value = giveAmount.toFixed(2); // To fixed formats as $0.00, instead of just $0
    hideButton("giveButton");

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

    refreshUser();

    // Get the settings modal and its elements
    var modal = document.getElementById("settingsModal");
    var settingsButton = document.getElementById("settingsButton"); // Button that opens the modal
    var span = document.getElementsByClassName("closeButton")[0]; // <span> element that closes the modal
    var submitButton = document.getElementById("settingsSubmitButton"); // Submit button
    var loginButton = document.getElementById("loginButton"); // login

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

    loginButton.onclick = function () {
        let myUsername = document.getElementById("usernameInput").value;
        let myPassword = document.getElementById("passwordInput").value;
        let myEmail = document.getElementById("emailInput").value;

        if (login) {
           logIn(myUsername, myPassword);
        } else {
           signUp(myUsername, myPassword, myEmail);
        }

    }

        loadSaved();
        checkIfFull();
}

// When the user clicks anywhere outside of the Login modal, close it
window.addEventListener('click', function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
});

function toggleLogInButton() {

    if (login){
        document.getElementById("loginButton").innerHTML="Sign Up";
        document.getElementById("toggleLoginLink").innerHTML="Log In instead?";
        document.getElementById("emailWrapper").style.display = "inline";
        login = false;
    } else {
        document.getElementById("loginButton").innerHTML="Log In";
        document.getElementById("toggleLoginLink").innerHTML="Sign Up instead?";
        document.getElementById("emailWrapper").style.display = "none";
        login = true;
    }

}

async function logIn(myUsername, myPassword) { 

    try {
        user = await Parse.User.logIn(myUsername, myPassword);
        refreshUser();
        alert("Logged In!");
        loginModal.style.display = "none";

        } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }

}

async function signUp(myUsername, myPassword, myEmail) {
    var user = new Parse.User();

    user.set("username", myUsername);
    user.set("password", myPassword);
    user.set("email", myEmail);
    user.set("total", 0);
    user.set("charityName", "Walder Education");
    user.set("charityEmail", "teacherscenter@waldereducation.org");
    user.set("fullAmount", "1800");

    try {
        await user.signUp();
        // Hooray! Let them use the app now.
        refreshUser();
        loginModal.style.display = "none";
        alert("Sign Up Successful!");
        } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }

}

function logout() {
    Parse.User.logOut().then(() => {
        currentUser = Parse.User.current();  // this will now be null
      });
    location.reload();
    alert("You have successfully logged out.");
    loginModal.style.display = "block";
    resetBox();

}

function resetPassword() {
    Parse.User.requestPasswordReset(user.get("email"), {
        success: function() {
            console.log("Password reset request was sent successfully");
        },
        error: function(error) {
            console.log("The login failed with error: " + error.code + " " + error.message);
        }
    });
}