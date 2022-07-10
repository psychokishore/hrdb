var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var jpdbmail = "/serverless/send_email";
var connToken = "90938970|-31949288590521988|90940118";
var DbName = "HRDB";
var RelName = "hrRel";


if (localStorage.getItem("mail") !== null) {
   alert("you are logged in");
   setTimeout(function(){
    window.location.href = "home.html";},2000);
}

function authorise() {
    var forgotmail = $("#forgotMail").val();
    if (forgotmail === "") {
        alert("Mail field is empty");
        $("#forgotMail").focus();
        return "";
    }

    var jsonStr = {
        mail: forgotmail
    };


    var getReq = createGET_BY_KEYRequest(connToken, DbName, RelName, JSON.stringify(jsonStr));
    console.log(2);
    jQuery.ajaxSetup({async: false});
    var respStr = executeCommandAtGivenBaseUrl(getReq, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    return respStr;
}

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
                * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}



function sendMail() {
    var jsonStr = authorise();
    if (jsonStr === "") {
        return;
    }

    var password = generateP();
    var mail = $("#forgotMail").val();
    var body = "The new Password is : " + password;
    var subject = "Password Reset";
    
    var reqStr = {
        "token": connToken,
        "jsonStr": {
            "emailTo": mail,
            "emailSubject": subject,
            "emailContent": body
        }

    };

    jQuery.ajaxSetup({async: false});
    var respStr = executeCommand(JSON.stringify(reqStr), jpdbmail);
    //var respStr=executeCommandAtGivenBaseUrl(JSON.stringify(reqStr), jpdbBaseUrl, jpdbmail);
    jQuery.ajaxSetup({async: true});
}
