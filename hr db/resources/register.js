var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var connToken = "90938970|-31949288590521988|90940118";
var empDbName = "HRDB";
var empRelName = "hrRel";

if(localStorage.getItem("mail") !== null){
    alert("you are logged in");
    window.location.href = "home.html";
}

function validateData(){
    var regName = $("#registerName").val();
    var regMail = $("#registerEmail").val();
    var regNum = $("#registerNum").val();
    var regPass = $("#registerPass").val();
    var rePass = $("#registerRepass").val();
    
    if(regName === ""){
        alert("Name field is not filled");    
        $("#registerName").focus();
        return "";
    }
    if(regMail === ""){
        alert("Mail field is not filled");   
        $("#registerEmail").focus();
        return "";
    }
    if(regNum === ""){
        alert("Phone Number field is not filled"); 
        $("#registerNum").focus();
        return "";
    }
    if(regPass === ""){
        alert("Password field is not filled");  
        $("#registerPass").focus();
        return "";
    }
    if(rePass === ""){
        alert("Retype Password field is not filled");    
        $("#registerRepass").focus();
        return "";
    }
    if(rePass !== regPass){
        alert("Retyped password is not matching with the password!! Please check");
        $("#registerRepass").focus();
        return "";
    }
    
    var pass = {
        name: regName,
        mail: regMail, 
        phoneNumber: regNum, 
        password: regPass
    };
    
    return JSON.stringify(pass);
}

function getDetails(){
    var regmail = $("#registerEmail").val();
    var jsonStr = {
        mail: regmail
    };
    
    
    var getReq = createGET_BY_KEYRequest(connToken, empDbName, empRelName, JSON.stringify(jsonStr));

    jQuery.ajaxSetup({async: false});
    var respStr = executeCommandAtGivenBaseUrl(getReq, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    
    if(respStr.status === 200){
        alert("This Email is already registered");
        window.location.href = "login.html";
        resetForm();
    }
}

function resetForm(){
    $("#registerName").val("");
    $("#registerEmail").val("");
    $("#registerNum").val("");
    $("#registerPass").val("");
    $("#registerRepass").val("");
    
    $("#registerName").focus();
}

function saveData(){
    var jsonStr = validateData();
    if(jsonStr === ""){
        return;
    }
    
    var putReq = createPUTRequest(connToken, jsonStr, empDbName, empRelName);


    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReq, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    
    resetForm();
}
