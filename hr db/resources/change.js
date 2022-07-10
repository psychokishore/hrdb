var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var connToken = "90938970|-31949288590521988|90940118";
var empDbName = "HRDB";
var empRelName = "hrRel";

function validateData(){
    var oldpass = $("#oldpass").val();
    var newpass = $("#newpass").val();
    var repass = $("#repass").val();
    
    if(oldpass === ""){
        alert("Old password field is empty");
        $("#oldpass").focus();
        return "";
    }
    if(newpass === ""){
        alert("New password field is empty");
        $("#newpass").focus();
        return "";
    }
    if(repass === ""){
        alert("New password field is empty");
        $("#repass").focus();
        return "";
    }
    
    var mail = localStorage.getItem("mail");
    var jsonStr = {
        mail: mail
    };

    var getReq = createGET_BY_KEYRequest(connToken, empDbName, empRelName, JSON.stringify(jsonStr));

    jQuery.ajaxSetup({async: false});
    var respStr = executeCommandAtGivenBaseUrl(getReq, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    
    var pass = JSON.parse(respStr.data).record.password;
    if(pass !== oldpass){
        alert("Old Password is wrong");
        $("#oldpass").focus();
        return "";
    }
    if(newpass !== repass){
        alert("New Password is not matching with Retyped password");
        $("#repass").focus();
        return "";
    }
    
    var passvar = {
        password: newpass
    };
    return JSON.stringify(passvar);
}

function changePass(){
    var jsonReq = validateData();
    
    var mail = localStorage.getItem("mail");
    var jsonStr = {
        mail: mail
    };

    var getReq = createGET_BY_KEYRequest(connToken, empDbName, empRelName, JSON.stringify(jsonStr));

    jQuery.ajaxSetup({async: false});
    var respStr = executeCommandAtGivenBaseUrl(getReq, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    var updateReq = createUPDATERecordRequest(connToken, jsonReq, empDbName, empRelName, JSON.parse(respStr.data).rec_no);
    jQuery.ajaxSetup({async: false});
    var respObj = executeCommandAtGivenBaseUrl(updateReq, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    
    emptyForm();
    window.location.href = "home.html";
}

function emptyForm(){
    $("#oldpass").val("");
    $("#newpass").val("");
    $("#repass").val("");
    
    $("#changeButton").prop("disabled", false);
}
