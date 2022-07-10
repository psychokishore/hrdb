function loadHeader() {
    $("#myHeader").load("header.html");
    currentTab();
}

function deleteSession() {
    localStorage.clear();
    window.location.href = "login.html";
}

function checkSession() {
    if (localStorage.getItem("mail")==null) {
        alert("you are logged out");
        setTimeout(function(){
        window.location.href = "login.html";},2000);
    }
    return;
}

function loadFooter() {
    $("#myFooter").load("footer.html");
    currentTab();
}


function currentTab() {
    if (myName === "home") {
        $("#myHome").prop("class", "active");
    } else if (myName === "profile") {
        $("#myProfile").prop("class", "active");
    } else if (myName === "change") {
        $("#myChange").prop("class", "active");
    } else if (myName === "form") {
        $("#myForm").prop("class", "active");
    }
    return;
}
