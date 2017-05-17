
var s,
GithubApi = {

    settings: {
        client: null,
        submitButton: document.getElementById("submit"), 
        inputUsername: document.getElementById("githubUsername")
    },

    init: function() {

        s = this.settings;
        s.client = new this.httpClient()
        this.bindUIActions();
        // json = this.fetchUserInfo(s.client, "caspyin")
        // this.fetchUserInfo(function(json) {
        //     console.log(json)
        // })

    },

    bindUIActions: function() {

        s.submitButton.addEventListener("click", function(){
            GithubApi.searchForUser(function(json) {
                console.log(json)
            });
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
                if (req.readyState == 4 && req.status == 200)
                    callback(req.responseText);
            }

            req.open( "GET", url, true );            
            req.send( null );
        }
    },

    searchForUser: function(callback) {

        s.client.get("https://api.github.com/users/" + s.inputUsername.value, function(response) {

            // jsonize the response
            callback(JSON.parse(response));

        });
    }


}


GithubApi.init()

// reusable client class
// var httpClient = function() {
//     this.get = function(url, calllback) {
//         var req = new XMLHttpRequest();
//         req.onreadystatechange = function() { 
//             if (req.readyState == 4 && req.status == 200)
//                 calllback(req.responseText);
//         }

//         req.open( "GET", url, true );            
//         req.send( null );
//     }
// }

// var client = new httpClient();

// fetch the user information
// client.get("https://api.github.com/users/caspyin", function(response) {

// 	// jsonize the response
//     json = JSON.parse(json);


// });

