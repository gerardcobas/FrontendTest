
var s,
GithubApi = {

    settings: {
        client: null,
        submitButton: document.getElementById("submit"), 
        inputUsername: document.getElementById("githubUsername"),
        alertBox: document.getElementById("alert"),
        userInfoRepos: document.getElementById("user-info-repos"),
        userNotFoundMessage: "Not Found"
    },

    init: function() {

        s = this.settings;
        s.client = new this.httpClient()
        this.bindUIActions();

    },

    bindUIActions: function() {

        s.submitButton.addEventListener("click", function(){
            s.userInfoRepos.style.display = 'none'
            GithubApi.analyzeQuery()
        });

        s.inputUsername.addEventListener("keyup", function(event){
            event.preventDefault();
            if (event.keyCode == 13) s.submitButton.click()
        });
        
    },

    httpClient: function() {
        this.get = function(url, callback) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200 || req.status == 404)
                        callback(req.responseText)
                }
            }

            req.open("GET", url, true);            
            req.send();
        }
    },

    searchForUser: function(callback) {

        s.client.get("https://api.github.com/users/" + s.inputUsername.value, function(response) {

            // jsonize the response
            callback(JSON.parse(response));

        });
    },

    searchForRepos: function(callback) {

        s.client.get("https://api.github.com/users/" + s.inputUsername.value + "/repos?per_page=100", function(response) {

            //jsonize the response
            callback(JSON.parse(response));

        })

    },

    analyzeQuery: function() {

        this.searchForUser(function(jsonUser) {

                if (jsonUser["message"] == s.userNotFoundMessage) // 404
                    GithubApi.userNotFound()
                else 
                    GithubApi.userFound(jsonUser)

            });

    },

    userNotFound: function() {

        s.alertBox.style.display = 'block'

    },

    userFound: function(jsonUser) {

        s.alertBox.style.display = 'none'
        name = jsonUser["name"]
        bio = jsonUser["bio"]
        this.searchForRepos(function(jsonRepos) {

            GithubApi.buildUserRepos(name, bio, jsonRepos)

        })

    },

    buildUserRepos: function(name, bio, reposList) {

        userInfoHtml = `<div class="user-info"><div class="github-icon"><img class="bordered" src="images/github-favicon.png"></div><div class="name-bio"><div id="username">@`+s.inputUsername.value+`</div><div id="full-name">`+name+`</div><div id="user-bio">`+bio+`</div></div></div>`
        userReposHtml = `<div class="user-repos"><div id="repos-tittle">Repositories</div><ul>`
        for (var i in reposList) {
            repo = reposList[i]
            userReposHtml += `<li><span class="repo-info"><div class="repo-info-icon"><img src="images/star.svg"></div><div>`+repo["stargazers_count"]+`</div><div class="repo-info-icon"><img src="images/repo-forked.svg"></div><div>`+repo["forks_count"]+`</div></span><span class="repo-name">`+repo["name"]+`</span></li>`
        }
        userReposHtml += `</ul></div>`

        s.userInfoRepos.innerHTML = userInfoHtml + userReposHtml

        s.userInfoRepos.style.display = 'block'


    }


}


GithubApi.init()
