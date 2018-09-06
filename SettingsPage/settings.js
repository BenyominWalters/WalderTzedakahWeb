var savedCharityName = ""
var savedCharityEmail = ""

function saveSettings() {
    alert("submitted!");
    console.log("submitted!");
    savedCharityName = document.getElementById("charityNameInput").value;
    console.log(savedCharityName);
    savedCharityEmail = document.getElementById("savedCharityEmail").value;
    console.log(savedCharityEmail);
}

