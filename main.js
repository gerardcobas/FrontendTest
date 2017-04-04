//set initial global variables
var username;
var result;

//AJAX base request
function request(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
        else {
            callback("404");
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

//request user data and repos
function requestUser(username) {

    const baseUrl = "https://api.github.com/users/" + username;

    request(baseUrl, (data) => {
        if (data != "404") {
            fillResultDetails(JSON.parse(data));
        } else {
            showError("404");
        }
    })
}

//fill result div with data
function fillResultDetails(data) {
    const avatar = data.avatar_url;
    const login = data.login;
    const fullname = data.name;
    const bio = data.bio;

    var output = '<img src="' + avatar + '" alt="avatar">' +
        '<p>@' + login + '</p>' +
        '<h3>' + fullname + '</h3>' +
        '<p>' + bio + '</p>';

    result.innerHTML = output;
    result.className = "success"
}

//displays not found or empty error
function showError(err) {
    result.className = "error";
    if (err == "empty") {
        result.innerHTML = "Empty field, please type a username";
    } else {
        result.innerHTML = "User not found";
    }
}


//search button function
function submitUser() {

    username = document.getElementById('user').value
    result = document.getElementById('result');

    if (username != '') {
        requestUser(username);
    } else {
        showError("empty");
    }
}




