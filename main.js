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

//request user data
function requestUser(username) {

    const baseUrl = "https://api.github.com/users/" + username;

    request(baseUrl, (data) => {
        if (data != "404") {
            fillResultDetails(JSON.parse(data));
            //if user exists then request repos
            requestRepos(username)
        } else {
            showError("nouser");
        }
    })
}

//request repos from user
function requestRepos(username){
    const baseUrl = "https://api.github.com/users/" +username+"/repos";

    request(baseUrl, (data) => {
        if (data != "404") {
            fillReposDetails(JSON.parse(data));
        } else {
            showError("norepos");
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
        '<h2>' + fullname + '</h2>' +
        '<p>' + bio + '</p>';

    result.innerHTML = output;
    result.className = "success"
}

//fill repos div with data
function fillReposDetails(data){

    const repos = document.getElementById('repos');
    repos.style.display = "inherit";

    var output = '<h3>Repos</h3><hr>'

    data.forEach((repo)=>{
        const name = repo.name;
        const stars = repo.stargazers_count;
        const forks = repo.forks_count;

        output+= '<div class="repo"><h3>'+name+'</h3>'+
        '<div>'+
        '<span><img src="./images/flaticonImage.png" alt="stars">'+stars+'</span>'+
        '<span><img src="./images/code-fork-512.png"" alt="forks">'+forks+'</span>'+
        '</div>'+
        '</div><hr>'
    });

    repos.innerHTML = output;
    repos.className = "reposuccess";
}

//displays not found or empty error
function showError(err) {
    if (err == "empty") {
        result.className = "error";
        result.innerHTML = "Empty field, please type a username";
    } else if(err == "nouser"){
        result.className = "error";
        result.innerHTML = "User not found";
    } else{
        repos.className = "repoerror";
        repos.innerHTML = "No repos found";
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




