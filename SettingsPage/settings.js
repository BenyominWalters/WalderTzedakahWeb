var savedCharityName = ""
var savedCharityEmail = ""

function saveSettings() {
    savedCharityName = document.getElementById("charityNameInput").value;
    localStorage.setItem("charityName", savedCharityName);
    savedCharityEmail = document.getElementById("charityEmailInput").value;
    localStorage.setItem("charityEmail", savedCharityEmail);
}

