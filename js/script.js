function searchUser(){

    var request = new XMLHttpRequest();
    
    
	// searching the user


    var username= 'https://api.github.com/users/' + document.getElementById('userInput').value;

    request.open('get', username, false);

    request.send();

    var userProfile = JSON.parse(request.responseText);
    
    //searching user's repo

	var repos = 'https://api.github.com/users/'+ document.getElementById('userInput').value +'/repos';

    request.open('get', repos, false);

    request.send();
    
    var userRepos = JSON.parse(request.responseText);
    
    
    var results = document.getElementById("searchResult");

    //check the request and if the user exist or not
    
    if (request.readyState==4 && request.status==200){

		results.innerHTML = "<div class='userLogin'>\@" + userProfile.login +  "</div>";
		results.innerHTML += "<div><h2 class='userName'>" + userProfile.name +  "</h2></div>" + "<div class='imgUser'><img src="+userProfile.avatar_url + "/></div>";
		results.innerHTML +="<div><p class='bio'> Bio: " + userProfile.bio + "</p></div>";
		results.innerHTML += "<div><h2>Repositories</h2></div>"
    
		var reposTable = document.createElement('table');
    
		userRepos.forEach(function (value, i){
			var tr = document.createElement('tr');
			tr.innerHTML = "<td>"+ userRepos[i].name + "</td>"+ "<td><i class='mdi mdi-star'></i> "+ userRepos[i].stargazers_count +"</td>" +"<td><i class='mdi mdi-source-fork'></i> "+ userRepos[i].forks + "</td>";
			reposTable.appendChild(tr);
		 
    	});
    
    
    	results.appendChild(reposTable);

    } else {
	    results.innerHTML = "<div class='problem'><p> &nbsp; Does not exist</p></div>";
    }
    
    return results;
    
    }
    
    
