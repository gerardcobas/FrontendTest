"use strict";

class GitHub {
  findUser() {
    const username = document.getElementById("searchbox").value;
    document.getElementById("error-message").style.display = "none";
    document.getElementById("user-and-repos").style.display = "none";
    document.getElementById("user-repos").innerHTML = "";
    this.getInfo(`https://api.github.com/users/${username}/repos`, this._writeRepoInfo);
    this.getInfo(`https://api.github.com/users/${username}`, this._writeUserInfo);
  }
  getInfo(githubUrl, writeDataToHTML) {
    fetch(githubUrl)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          document.getElementById("error-message").style.display = "block";
        } else {
          writeDataToHTML(data);
          return data;
        }
      })
      .catch(error => { console.log(error); });
  }
  _writeRepoInfo(data) {
    document.getElementById("user-and-repos").style.display = "block";
    const repTbl = document.createElement("table");
    data.map(repo => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${repo.name}</td><td class="td-right">
          <img class="github-star" src="images/star.png" alt="GitHub Stars">
          ${repo.stargazers_count} <img class="github-fork" src="images/fork.png" alt="GitHub Forks">
          ${repo.forks_count}</td>`;
      repTbl.appendChild(tr);
    });
    document.getElementById("user-repos").appendChild(repTbl);
  }
  _writeUserInfo(data) {
    document.getElementById("github-username").innerText = data.login;
    document.getElementById("github-fullname").innerText = data.name;
    document.getElementById("github-userbio").innerText = data.bio;
    document.getElementById("github-profile-image").src = data.avatar_url;
  }
  dummyMethod() { return 1; } // used only with playing around with Jasmine Unit Testing.
}

const github = new GitHub();
