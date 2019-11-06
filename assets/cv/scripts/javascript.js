displayPrimary() //Set the default mode as soon as the page loads
var hamburgerOpen = false //Set default hamburger menu position

function hamburger() {
    if (hamburgerOpen) {
        hamburgerOpen = false;
        document.getElementById("sidebar").style.left = "calc(-85% - 11px)";
        document.getElementById("hamburger").src = "/assets/cv/pictures/hamburger.png";
        document.getElementById("hamburger").style.position = "absolute";
    } else {
        hamburgerOpen = true;
        document.getElementById("sidebar").style.left = "0";
        document.getElementById("hamburger").src = "/assets/cv/pictures/arrow.png";
        document.getElementById("hamburger").style.position = "fixed";
    }
}

function hideAllEducation() {
    document.getElementById("gcse").style.display = "none";
    document.getElementById("infant").style.display = "none";
    document.getElementById("primary").style.display = "none";
}

function displayInfant() {
    document.getElementById("educationInfoArrow").style.marginLeft = "calc(16.6% - 20px)";
    hideAllEducation()
    document.getElementById("infant").style.display = "inline-block";
    document.getElementById("gmapCanvas").src = "https://maps.google.com/maps?q=Vinehall%20Preparatory&t=&z=17&ie=UTF8&iwloc=&output=embed";
}

function displayPrimary() {
    document.getElementById("educationInfoArrow").style.marginLeft = "calc(50% - 20px)";
    hideAllEducation()
    document.getElementById("primary").style.display = "inline-block";
    document.getElementById("gmapCanvas").src = "https://maps.google.com/maps?q=potters%20gate%20primary&t=&z=17&ie=UTF8&iwloc=&output=embed";
}

function displayGCSE() {
    document.getElementById("educationInfoArrow").style.marginLeft = "calc(80% + 20px)";
    hideAllEducation()
    document.getElementById("gcse").style.display = "inline-block";
    document.getElementById("gmapCanvas").src = "https://maps.google.com/maps?q=weydon%20school&t=&z=17&ie=UTF8&iwloc=&output=embed";
}