//these functions depend on he formHelpers.js file

function validateForm() {
    //use DOM manipulation to get the element
    var firstName = document.getElementById("firstName");
    if (isEmpty(firstName.value)) {
        setAlert(firstName, "First name must be provided");
        return false;
    }

    //access element through forms collection
    var lastName = document.forms["orders"]["lastName"];
    if (isEmpty(lastName.value)) {
        setAlert(lastName, "last name must be provided");
        return false;
    }

    var phoneNumber = document.getElementById("phoneNumber");
    if (!validatePhoneNumber(phoneNumber.value)) {
        setAlert(phoneNumber, "not a valid phone number");
        return false;
    }

    var email = document.getElementById("email");
    if (!validateEmail(email.value)) {
        alert( email, "Not a valid email address");
        return false;
    }

    var total = document.getElementById("total")
    if (isEmpty(total.value)) {
        alert(total, "Donation area is blank");
        return false;
    }

    var info = document.getElementById("info")
    if (isEmpty(info.value)) {
        alert(info, "You need to give me some input")
        return false;
    }

    //get value of a list
    var cardType = document.getElementById('cardType');
    if (isEmpty(cardType.value)) {
        setAlert(cardType, "Credit Card type must be selected");
        return false;
    }

    //call a more complex function
    if (!validateCard()) {
        return false;
    }
    storeOrder();
}

function validateCard() {
    var valid = false;
    var expire = document.getElementById("expireDate");
    if (isEmpty(expire.value)) {
        setAlert(expire, "Expiration date cannot be empty");
        valid = flase;
    }
    else {
        valid = true;
    }

    if (valid) {
        var cardNumber = document.getElementById("cardNumber");
        if (!isEmpty(cardNumber.value)) {
            var cardType = parseInt(document.getElementById("cardType").value);

            switch (cardType) {
                case 1:
                    valid = validateAmericanExpress(cardNumber.value);
                    break;
                case 2:
                    valid = validateMasterCard(cardNumber.value);
                    break;
                case 3:
                    valid = validateVisa(cardNumber.value);
                    break;
                default:
                    valid - false;
            }

            if (!valid) {
                setAlert(cardNumber, "Invalid credit card number");
            }
        }

        else {
            setAlert(cardNumber, "Credit card number cannot be empty");
        }
    }

    return valid;
}

function validateVisa(cardNumber) {
    //a best - practice input - validate regex for VISA ard numbers that allow for
    //optional matching delimiters of spaces or dashes between number groups,
    //
    pattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return validateRegEx(pattern, cardNumber);
}

function validateAmericanExpress(cardNumber) {
    //assert standing position is the beginning of the string or line. match the number "3"
    //match on a number "4" or "7". match on 13 other digits(0..9) Assert postion is the
    //end of the string or line.
    pattern = /^(?:3[47][0-9]{13})$/;
    return validateRegEx(pattern, cardNumber)
}

function validateMasterCard(cardNumber) {
    //MasterCard account number start with prefixes ranging from "51" to "55",
    //and are 16 digits in length
    //
    pattern = /^(?:5[1-5][0-9]{14})$/;
    return validateRegEx(pattern, cardNumber);
}

function storeOrder() {
    try {
        sessionStorage.setItem("fullName", document.getElementById("firstName").value + " " + document.getElementById("lastName").value);
        sessionStorage.setItem("phoneNumber", document.getElementById("phoneNumber").value);
        sessionStorage.setItem("email", document.getElementById("email").value);
        sessionStorage.setItem("total", document.getElementById("total").value);
        sessionStorage.setItem("creditCard", creditCardLookUp());
        sessionStorage.setItem("cardNumber", obsurceCardNumber());
        sessionStorage.setItem("expireDate", document.getElementById("expireDate").value);
        sessionStorage.setItem("info", document.getElementById("info").value);
    }
    catch (err) {
        alert("store order: " + err);
    }
}

function displayOrder() {
    try {
        var name = document.getElementById("fullName");
        name.innerText = sessionStorage.getItem("fullName");

        var phone = document.getElementById("phone");
        phone.innerText = sessionStorage.getItem("phoneNumber");

        var email = document.getElementById("email");
        email.innerText = sessionStorage.getItem("email");

        var cardType = document.getElementById("cardType");
        cardType.innerText = sessionStorage.getItem("creditCard");

        //can use dot notation
        var cardNumber = document.getElementById("cardNumber");
        cardNumber.innerText = sessionStorage.getItem("cardNumber");

        var expireDate = document.getElementById("expireDate");
        expireDate.innerText = sessionStorage.getItem("expireDate");

        var total = document.getElementById("total");
        total.innerText = sessionStorage.getItem("total");

        var info = document.getElementById("info");
        info.innerText = sessionStorage.getItem("info");

    }
    catch (err) {
        alert("display order: " + err);
    }
}

function creditCardLookUp() {
    var cardType = parseInt(document.getElementById('cardType').value);
    var cardName = "Not Selected"
    switch (cardType) {
        case 1:
            cardName = "American Express";
            break;
        case 2:
            cardName = "Master Card";
            break;
        case 3:
            cardName = "Visa";
            break;
        default:
            cardName = "Not selected";
            break;
    }
    return cardName;
}

function obsurceCardNumber() {
    var cardNumber = document.getElementById('cardNumber').value;
    var temp = "**** **** **** " + cardNumber.substring(cardNumber.length - 4, cardNumber.length);
    return temp;
}

function getRating() {
    var radList = document.getElementsByName('satisfaction');
    var rating = "Satisication level is "
    for (i = 0; i < radList.length; i++) {
        if (radList[i].checked) {
            rating += radList[i].value;
            break;
        }
    }
    return rating;
}