var mode="mors00"
var hexReg = /^((([0-9]|[a-f]){2},)*([0-9]|[a-f]){2}||([0-9]|[a-f]){2})$/
var binaryReg=/^((([0]|[1]){8},)*([0]|[1]){8}||([0]|[1]){8})$/
var lowerReg=/^([a-z]|[ ]|[\n])*$/
var numReg=/^([0-9])*$/
var morseReg = /^([0-z]|[ ])*$/
var plainText;
document.getElementById("mors").checked = true
document.getElementById("mors00").checked = true

setdisp("morse","block")
setdisp("vernham","none")
setdisp("ceaser","none")

//Makes sure that only one of the checkbox can be checked
var submitButton = document.getElementById("submit")
submitButton.onclick = function(){
    translate(true)
}


var popupClick = document.getElementById("alertBox")
popupClick.onclick = function(){
  document.getElementById("alertBox").style.display = "none"
}

document.onkeypress = function(e){
  console.log(e)
}

function niceAlert(alertText){
  document.getElementById("alertBox").style.display = "block"
  document.getElementById("alertPlaintext").innerHTML  = alertText
  document.getElementById("alertBox").focus()
}

//On even on user wanting to update filename
var upFile = document.getElementById("upload")
upFile.onclick = function(){
  importText()
}

//Only one of the checkboxes can be enganged at once,
function un_check(x) {
    //Sets all of the addition boxes to be display none temporarrily
    setdisp("vernham", "none")
    setdisp("ceaser","none")
    setdisp("morse","none")
    //Gets ann array of all main cipher options
    checks = document.querySelectorAll("input[type='checkbox'].main")
    //
    if(x.className=="main"){
        //Goes through array of main options and unchecks them all to make
        //sure previous one cannot be checked
        for(i =0;i<checks.length;i++){
            checks[i].checked=false
        }
        if (x.id=="vern"){
            setdisp("vernham","block")
            for(var i=0;i<3;i++){
                document.getElementById("vern"+i+0).checked = true
            }
        }
        else if (x.id=="mors") {
            setdisp("morse", "block")
        }
        if (x.id.substring(0,4)=="ceas"){setdisp("ceaser","block")}
        x.checked=true
    }
    else{
        if (x.id.substring(0,4)=="vern"){
            setdisp("vernham", "block")
            for(var i=0;i<x.parentNode.querySelectorAll("input[type='checkbox']").length;i++){
                document.getElementById("vern"+x.id[4]+i).checked=false
            }
        }
        if (x.id.substring(0,4)=="mors"){
            setdisp("morse", "block")
            for(var i=0;i<x.parentNode.querySelectorAll("input[type='checkbox']").length;i++){
                document.getElementById("mors"+x.id[4]+i).checked=false
            }}
        x.checked = true
          }
    mode = x.id
}

function translate(plaintextId){
  if(plaintextId){
    plainText = document.getElementById("in").value
  }
  switch (mode.substring(0, 4)) {
    case "mors":
      ciphertext = mors(plainText)
      break;
    case "ceas":
      ciphertext = cease(plainText)
      break;
    case "vern":
      ciphertext = vern(plainText)
      break;
  }
  document.getElementById("out").value = ciphertext
}


function mors(plaintext){
    translationCnFig=get_checker_mode("mors0",2)
    plaintext.toLowerCase
    if (translationCnFig==0){
        MORSEjson = JSON.parse(loadjson("/assets/cipher/other/t-m.json"))
    }
    else if(translationCnFig==1){
        MORSEjson = JSON.parse(loadjson("/assets/cipher/other/m-t.json"))
        console.log(plaintext);
        plaintext = plaintext.split(" ")
        console.log(plaintext);
    }
    morse = ""
    for (var i = 0; i < plaintext.length-1; i++) {
        morse += MORSEjson[plaintext[i]]
        if(translationCnFig==0){
          morse += " "
        }
    }
    return morse;
}

function cease(plaintext){
    plaintext = plaintext.toLowerCase()
    shift_pad = document.getElementById("num").value
    out = ""
    if(numReg.test(shift_pad)==false){niceAlert("letters are not permited in shift value");return""}
    else{shift_pad = parseInt(shift_pad)}
    if(lowerReg.test(plaintext)==false){niceAlert("plaintext contains unsupported characters");return""}
    for (var i = 0; i < plaintext.length; i++){
        if(plaintext[i]=="\n"){out+="\n"}
        else{
            var out_code = (plaintext.charCodeAt(i) + shift_pad - 96) % 26 + 96
            out += String.fromCharCode(out_code)
        }
    }
    return out;
}

function vern(plaintext){
    var oneTimeMode =  get_checker_mode("vern0",3)
    var plainMode = get_checker_mode("vern1", 3)
    var oneTime = document.getElementById("vernkey").value
    var outText = ""

    switch(oneTimeMode){
        case 1:
            if(hexReg.test(oneTime)==false){niceAlert("does not meet critia for 2 bit hex then comma");return ""}
            oneTime = oneTime.split(",")
            convertInt(oneTime,16)
            break;
        case 2:
            if(hexReg.test(oneTime)==false){niceAlert("does not meet critia for 8 bit binary then comma");return ""}
            oneTime = oneTime.split(",")
            convertInt(oneTime, 2)
            break;
    }
    switch(plainMode) {
        case 1:
            if(hexReg.test(plaintext)==false){niceAlert("does not meet critia for 8 bit binary then comma");return ""}
            plaintext = oneTime.split(",")
            convertInt(plaintext, 16);
            break;
        case 2:
            if(hexReg.test(plaintext)==false){niceAlert("does not meet critia for 8 bit binary then comma");return ""}
            plaintext = plaintext.split(",")
            convertInt(plaintext, 2)
            break;
    }
    if(plaintext.length<=oneTime.length){niceAlert("one time pad different length to plain text");return ""}
    for(var i=0;i<plaintext.length;i++){
        outText += plaintext[i] ^ oneTime[i]
    }
    return outText;
}

function setdisp(els,is_show){
    els = document.getElementsByClassName(els)
    for(var i =0; i <els.length;i++){
        els[i].style.display=is_show;
    }
    els[0].style.display=is_show
}

function get_checker_mode(starterid,loop){
    for(var i=0;i<loop;i++){
        if(document.getElementById(starterid+i).checked==true){
            return i
        }
    }
}

//Loading the json syncronously
function loadjson(filename){
    if(window.XMLHttpRequest){xhttp=new XMLHttpRequest()}
    else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseText;
}

function convertInt(arr,base){
    for(var i=0;i<arr.length;i++){
        arr[i]= parseInt(arr[i],base)
}}

//Function to take the file input once recieved fulluy
 function importText(){
   uploadText().then(file => {
        plainText = file
        document.getElementById('in').value = file
        translate(false)
   })
 }

 function uploadText() {
     return new Promise((resolve) => {
         //Create file input
         const uploader = document.createElement('input')
         uploader.type = 'file'
         uploader.style.display = 'none'

         //Listen for files
         uploader.addEventListener('change', () => {
             const files = uploader.files

             if (files.length) {
                 const reader = new FileReader()
                 reader.addEventListener('load', () => {
                     uploader.parentNode.removeChild(uploader)
                     resolve(reader.result)
                 })
                 reader.readAsText(files[0])
             }
         })

         // trigger input
         document.body.appendChild(uploader)
         uploader.click()
     })
 }
