var savedCharityName = "Walder Education"
var savedCharityEmail = "teacherscenter@waldereducation.org"

function loadSavedCharity() {
    savedCharityName = localStorage.charityName;
    document.getElementById("charityNameInput").value = savedCharityName;
    savedCharityEmail = localStorage.charityEmail;
    document.getElementById("charityEmailInput").value = savedCharityEmail;
}

function saveSettings() {
    savedCharityName = document.getElementById("charityNameInput").value;
    localStorage.setItem("charityName", savedCharityName);
    savedCharityEmail = document.getElementById("charityEmailInput").value;
    localStorage.setItem("charityEmail", savedCharityEmail);
}

