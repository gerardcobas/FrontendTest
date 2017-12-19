  window.onload = function() {
    document.getElementById('ghsubmitbtn').addEventListener('click', function(e){
      e.preventDefault();

      var username = document.getElementById('ghusername').value;
      var requri   = 'https://api.github.com/users/'+username;
      var repouri  = 'https://api.github.com/users/'+username+'/repos';

      requestJSON(requri, function(json) {
        if(json.message == "Not Found" || username == '') {
          document.getElementById('ghapidata').innerHTML = "<h2>No User Info Found</h2>";
        }

        else {
          // else we have a user and we display their info
          var fullname   = json.name;
          var username   = json.login;
          var aviurl     = json.avatar_url;
          var profileurl = json.html_url;
          var location   = json.location;
          var followersnum = json.followers;
          var followingnum = json.following;
          var reposnum     = json.public_repos;
          var bio = json.bio;

          if(fullname == undefined) { fullname = username; }
          if(bio == null) { bio = '';}

          var outhtml = `<div class="info">
                        <div class="profile-info">
                          <div class="profile-pic">
                            <div>
                              <a href="${profileurl}" target="_blank"><img class="avatar-pic" src="${aviurl}" width="80" height="80" alt="${username}"></a>
                            </div>
                         </div>
                          <div class="profile-text">
                            <span>@<a href="${profileurl}" target="_blank">${username}</a></span>
                            <h2>${fullname}</h2>
                            <p>${bio}</p>
                          </div>

                        </div>
                        <div class="clearfix">
                        <div class="repos-list">`;

          var repositories;

          function getJSONContent(uri) {
            var request = new XMLHttpRequest();
            request.open('GET', uri, true);
            request.onload = function() {
              if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                repositories = data;
                outputPageContent();
              }
            };
            request.send();
          };
          getJSONContent(repouri);

          function outputPageContent() {
            if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
            else {
              outhtml += '<p class="repos-name"><strong>Repositories:</strong></p><ul>';
              for(var i=0; i<repositories.length; i++) {
                outhtml = outhtml + `<li>
                                      <a href="${repositories[i].html_url}" target="_blank">${repositories[i].name}
                                      <img class="icon" src="../images/fork.png">${repositories[i].forks}<img class="icon" src="../images/star.png">${repositories[i].stargazers_count}</a>
                                    </li>`;
              }
              outhtml = outhtml + '</ul></div>';
            }
            document.getElementById('ghapidata').innerHTML = outhtml;
          }
        }
      });
    }, false);



    function requestJSON(url, callback) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
          if (xhr.status === 200 && xhr.readyState === 4) {
              callback(JSON.parse(xhr.response));
          }
          else {
              alert('Request failed.  Returned status of ' + xhr.status);
          }
      };
      xhr.send();
    }
  };
