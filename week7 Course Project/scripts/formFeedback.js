//these functions depend on he formHelpers.js file

function validateForms() {
    //use DOM manipulation to get the element
    var fName = document.getElementById("fName");
    if (isEmpty(fName.value)) {
        setAlert(fName, "First name must be provided");
        return false;
    }

    //access element through forms collection
    var lName = document.forms["feedback"]["lName"];
    if (isEmpty(lName.value)) {
        setAlert(lName, "last name must be provided");
        return false;
    }

    var info = document.getElementById("info1")
    if (isEmpty(info.value)) {
        alert(info, "You need to give me some input")
        return false;
    }

    storeFeed();
}

function storeFeed() {
    try {
        //still need to add in my questions
        sessionStorage.setItem("fulName", document.getElementById("fName").value + " " + document.getElementById("lName").value);
        sessionStorage.setItem("recommend", getRecommend());
        sessionStorage.setItem("find", getFind());
        sessionStorage.setItem("easy", getEasy());
        sessionStorage.setItem("work", getWork());
        sessionStorage.setItem("rating", getRating());
        sessionStorage.setItem("info1", document.getElementById("info1").value);
    }
    catch (err) {
        alert("store Feedback: " + err);
    }
}

function displayFeed() {
    try {
        var name = document.getElementById("fulName");
        name.innerText = sessionStorage.getItem("fulName");

        var recommend = document.getElementById("recommend");
        recommend.innerText = sessionStorage.getItem("recommend")

        var find = document.getElementById("find");
        find.innerText = sessionStorage.getItem("find")

        var easy = document.getElementById("easy");
        easy.innerText = sessionStorage.getItem("easy");

        var work = document.getElementById("work");
        work.innerText = sessionStorage.getItem("work");

        var rating = document.getElementById("rating");
        rating.innerText = sessionStorage.getItem("rating");

        var info1 = document.getElementById("info1");
        info1.innerText = sessionStorage.getItem("info1");

    }
    catch (err) {
        alert("display order: " + err);
    }
}

function getRecommend() {
    var recList = document.getElementsByName('recommend');
    var recommend = "Recommend level is: "
    for (i = 0; i < recList.length; i++) {
        if (recList[i].checked) {
            recommend += recList[i].value;
            break;
        }
    }
    return recommend;
}

function getEasy() {
    var easyList = document.getElementsByName('easy');
    var easy = "Website ease of use was:  "
    for (i = 0; i < easyList.length; i++) {
        if (easyList[i].checked) {
            easy += easyList[i].value;
            break;
        }
    }
    return easy;
}

function getFind() {
    var findList = document.getElementsByName('find');
    var find = "Status of finding things was: "
    for (i = 0; i < findList.length; i++) {
        if (findList[i].checked) {
            find += findList[i].value;
            break;
        }
    }
    return find;
}

function getWork() {
    var workList = document.getElementsByName('work');
    var work = "Status of everything working things was: "
    for (i = 0; i < workList.length; i++) {
        if (workList[i].checked) {
            work += workList[i].value;
            break;
        }
    }
    return work;
}

function getRating() {
    var radList = document.getElementsByName('satisfaction');
    var rating = "Satisication level is: "
    for (i = 0; i < radList.length; i++) {
        if (radList[i].checked) {
            rating += radList[i].value;
            break;
        }
    }
    return rating;
}
