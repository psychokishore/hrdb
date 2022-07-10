if(localStorage.getItem("mail") !== null){
    alert("you are logged in");
    window.location.href = "home.html";
}

var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var connToken = "90938970|-31949288590521988|90940118";
var empDbName = "HRDB";
var empRelName = "hrRel";

function authorise(){
    var mail = $("#inputEmail").val();
    var pass = $("#inputPassword").val();
    if(mail === ""){
        alert("Mail field is empty");
        $("#inputEmail").focus();
        return "";
    }
    if(pass === ""){
        alert("Password field is empty");
        $("#inputPassword").focus();
        return "";
    }
    
    var jsonStr = {
        mail: mail
    };
    
    
    var getReq = createGET_BY_KEYRequest(connToken, empDbName, empRelName, JSON.stringify(jsonStr));

    jQuery.ajaxSetup({async: false});
    var respStr = executeCommandAtGivenBaseUrl(getReq, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    var password = JSON.parse(respStr.data).record.password;
    
    if(password === pass){
        localStorage.setItem("mail", mail);
        return respStr;
    }
    
    alert("Wrong Credentials");
    return "";
}

function loginInto(){
    var data = authorise();
    if(data === ""){
        return;
    }
    
    window.location.href = "home.html";
}
