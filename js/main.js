

function searchUser(){

    var request = new XMLHttpRequest();

    var uri= 'https://api.github.com/users/' + document.getElementById('inputuser').value;

    request.open('get', uri, false);

    request.send();

    var apiObject = JSON.parse(request.responseText);

var repos = 'https://api.github.com/users/'+ document.getElementById('inputuser').value +'/repos';

    request.open('get', repos, false);

    request.send();

    var apiRepos = JSON.parse(request.responseText);

var responseInsideDiv = document.getElementById("apiObject");
    responseInsideDiv.innerHTML = "<div class='userLogin'>\@" + apiObject.login +  "</div>";
    responseInsideDiv.innerHTML += "<div><h1 class='nameUser'>" + apiObject.name +  "</h1></div>" + "<div class='imgUser'><img src="+apiObject.avatar_url + "/></div>";
    responseInsideDiv.innerHTML +="<div><span class='bio'>" + apiObject.bio + "</span></div>";
    responseInsideDiv.innerHTML +="<div class='nameRepos'>"  + apiRepos[0].name + "</div>";
    responseInsideDiv.innerHTML +="<div class='forks'>"  + apiRepos[0].forks + "</div>";
    responseInsideDiv.innerHTML +="<div class='star'>"  + apiRepos[0].stargazers_count + "</div>";


    return responseInsideDiv;
}

