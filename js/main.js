

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
    responseInsideDiv.innerHTML += "<h1 class='nameUser'>" + apiObject.name +  "</h1>" + "<div><img src="+apiObject.avatar_url + "/></div>";
    responseInsideDiv.innerHTML +="<div><span>" + apiObject.bio + "</span></div>";
    responseInsideDiv.innerHTML +="<div>"  + apiRepos[0].name + "</div>";
    repostotal


    return responseInsideDiv;
}

