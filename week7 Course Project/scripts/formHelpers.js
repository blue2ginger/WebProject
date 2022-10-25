//javascript document

function validatePhoneNumber(phoneNumber) {
    var pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    var regTest = new RegExp(pattern);
    var result = regTest.test(phoneNumber);

    return result;
}

function validateEmail(emailAddress) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regTest = new RegExp(pattern);
    var result = regTest.test(emailAddress);

    return result;
}

function isEmpty(str) {
    return (!str || str.trim().length == 0);
}

function validateRegEx(pattern, value) {
    var regTest = new RegExp(pattern);
    return regTest.test(value);
}

function setAlert(theControl, message) {
    alert(message);
    theControl.value = "";
    theControl.focus();
}