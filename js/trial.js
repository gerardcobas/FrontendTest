
var s,
GithubApi = {

    /* Global settings */
    settings: {
        client: null,
        submitButton: document.getElementById("submit"), 
        inputUsername: document.getElementById("githubUsername"),
        alertBox: document.getElementById("alert"),
        userInfoRepos: document.getElementById("user-info-repos"),
        userNotFoundMessage: "Not Found"
    },

    /* Main function */
    init: function() {

        s = this.settings;
        s.client = new this.httpClient()
        this.bindUIActions();

    },

    /*
            pre:
            post: UI Binding is made
     */ 
    bindUIActions: function() {

        // Hides user-info-repos from the document and calls 'analyzeQuery()'
        s.submitButton.addEventListener("click", function(){
            s.userInfoRepos.style.display = 'none'
            GithubApi.analyzeQuery()
        });

        // adds 'Enter' key functionality
        s.inputUsername.addEventListener("keyup", function(event){
            event.preventDefault();
            if (event.keyCode == 13) s.submitButton.click()
        });
        
    },

    /* Http Client class */
    httpClient: function() {

        /* 
            pre:    
                    'url' is a string containing the requested url
                    'callback' is a function object which will handle the request response
            post:   
                    The GET request is sent to 'url'
                    and 'callback' is called with the received response as a parameter
        */
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

    /*
        pre:
                'callback' is a function object which will handle the json GET request response with the user info
        post:
                the GET request is sent to fetch the user's (s.inputUsername.value) json
                and 'callback' is called with this json as a parameter
    */
    searchForUser: function(callback) {

        s.client.get("https://api.github.com/users/" + s.inputUsername.value, function(response) {

            // jsonize the response
            callback(JSON.parse(response));

        });
    },

    /*
        pre:
                'callback' is a function object which will handle the json GET request response with the repos info
        post:
                the GET request is sent to fetch the user repos' json
                and 'callback' is called with this json as a parameter
    */
    searchForRepos: function(callback) {

        // max 300 repositories
        s.client.get("https://api.github.com/users/" + s.inputUsername.value + "/repos?per_page=300", function(response) {

            //jsonize the response
            callback(JSON.parse(response));

        })

    },

    /*
        pre:
        post:
                Given the result of requesting the user information, this function decides whether
                to show the error message (404 response) or to show the user information and repos
    */
    analyzeQuery: function() {

        this.searchForUser(function(jsonUser) {

                if (jsonUser["message"] == s.userNotFoundMessage) // 404
                    GithubApi.userNotFound()
                else 
                    GithubApi.userFound(jsonUser)

            });

    },

    /*  pre:
        post:
                The alert box is displayed in order to show the user has not been found
    */
    userNotFound: function() {

        s.alertBox.style.display = 'block'

    },


    /* 
        pre:
                'jsonUser' is a valid json obtained from a successful (non-404) call to
                the Github API requesting for the user info
        post: 
                the user's name and bio is obtained from 'jsonUser' and
                buildUserRepos() is called after getting the user repos from searchForRepos()
    */
    userFound: function(jsonUser) {

        s.alertBox.style.display = 'none'
        name = jsonUser["name"]
        bio = jsonUser["bio"]
        this.searchForRepos(function(jsonRepos) {

            GithubApi.buildUserRepos(name, bio, jsonRepos)

        })

    },

    /*
        pre:
                'name' and 'bio' are strings representing the name and biography of the user
                'reposList' is a json containing an entry for every repository owned by the user
        post:
                the HTML code to populate 'user-info-repos' (with the user info and the user repos info) 
                is generated and added to the div

    */
    buildUserRepos: function(name, bio, reposList) {

        userInfoHtml = `<div class="user-info"><div class="github-icon"><img class="bordered" src="images/github-favicon.png"></div><div class="name-bio"><div id="username">@`+s.inputUsername.value+`</div><div id="full-name">`+name+`</div><div id="user-bio">`+bio+`</div></div></div>`
        userReposHtml = `<div class="user-repos"><div id="repos-tittle">Repositories</div><ul>`
        for (var i in reposList) {
            repo = reposList[i]
            nStars = repo["stargazers_count"]
            nForks = repo["forks_count"]
            userReposHtml += `<li><span class="repo-info"><div class="repo-info-icon"><img src="images/star.svg"></div><div>`+nStars+`</div><div class="repo-info-icon"><img src="images/repo-forked.svg"></div><div>`+nForks+`</div></span><span class="repo-name">`+repo["name"]+`</span></li>`
        }
        userReposHtml += `</ul></div>`

        s.userInfoRepos.innerHTML = userInfoHtml + userReposHtml

        s.userInfoRepos.style.display = 'block'


    }


}


GithubApi.init()
