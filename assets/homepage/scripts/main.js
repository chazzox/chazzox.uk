

dispButton = document.getElementById("proj")
dispButton.onclick = function(){
    document.getElementById("noShow").style.display = "block"
    document.getElementById("closeButton").style.display = "block"
    document.getElementById("main").style.filter= "blur(7px)"
    for(var i=0;i<document.getElementsByClassName("boxforlink").length();i++){
    document.getElementsByClassName("boxforlink")[i].style.padding = "20px"
    }
}

closeButt = document.getElementById("closeButton")
closeButt.onclick = function(){
    document.getElementById("noShow").style.display = "none"
    document.getElementById("closeButton").style.display = "none"
    document.getElementById("main").style.filter = "blur(0px)"
    for(var i=0;i<document.getElementsByClassName("boxforlink").length();i++){
    document.getElementsByClassName("boxforlink")[i].style.padding = ""
    }
}