let dataExist = {};
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    revertChanges();

    let username = document.getElementById('searchUsername').value;
    let gitUrlUser = `https://api.github.com/users/${username}`;
    let gitUrlUserRepo = `https://api.github.com/users/${username}/repos`;

    getGitUser(gitUrlUser)
            .then((data) => {
                dataExist = data;
                data = JSON.parse(data);
                renderUser(data);
            })
            .catch((err) => {
                console.log(err);
                showErrorMessage();
            });

    if(dataExist) {
        getGitUserRepo(gitUrlUserRepo)
            .then((data) => {
                data = JSON.parse(data);
                renderUserRepos(data);
            })
            .catch((err) => {
                console.log(err);
                showErrorMessage();
            });
    }

    function getGitUser(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
            req.onerror = (e) => reject(Error(`Network Error: ${e}`));
            req.send();
        });
    }

    function getGitUserRepo(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
            req.onerror = (e) => reject(Error(`Network Error: ${e}`));
            req.send();
        });
    }
});

// ------------------   DOM Manipulations  ---------------------- \\


function renderUser(data) {
    document.getElementById('userProfile').classList.remove('hide');
    document.getElementById('userWrapper').setAttribute("style", "border-radius: 14px");

    document.getElementById('img').setAttribute('src', data.avatar_url);
    document.getElementById('username').innerHTML = '@' + data.login;
    document.getElementById('fullName').innerHTML = data.name;
    document.getElementById('bio').innerHTML = data.bio;
}

function renderUserRepos(data) {
    document.getElementById('userRepos').classList.remove('hide');

    for(let i = 0; i < data.length; i++){

        let startIcon = document.createElement("img");
        startIcon.src = "public/star.svg";
        let forkIcon = document.createElement("img");
        forkIcon.src = "public/fork.svg";

        let li = document.createElement("li");
        li.innerHTML = data[i].name;
        let div = document.createElement("div");
        div.className = "repoImages";
        let p1 = document.createElement("p");
        p1.innerHTML = data[i].stargazers_count;
        let p2 = document.createElement("p");
        p2.innerHTML = data[i].forks;


        li.appendChild(div);
        div.appendChild(startIcon);
        div.appendChild(p1);
        div.appendChild(forkIcon);
        div.appendChild(p2);

        var ul = document.getElementById("userReposUl");
        ul.appendChild(li);
    }

    document.getElementById('submit').disabled = false;
    document.getElementById('shadowElement').style.height = '366px';
    document.getElementById('userWrapper').classList.remove('cornerShape');
}

// Reverts all changes made with JS
function revertChanges () {
    document.getElementById('submit').disabled = true;

    // Remove User Repos
    document.getElementById('userRepos').classList.add('hide');
    document.getElementById('userProfile').classList.add('hide');
    document.getElementById('messageWrapper').classList.add('hide');

    var myNode = document.getElementById("userReposUl");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Remove User Profile info
    document.getElementById('img').removeAttribute('src');
    document.getElementById('username').innerHTML = '';
    document.getElementById('fullName').innerHTML = '';
    document.getElementById('bio').innerHTML = '';

    document.getElementById('userWrapper').setAttribute("style", "border-radius: 0");
    document.getElementById('shadowElement').style.height = '82px';
    document.getElementById('userWrapper').classList.add('cornerShape');
}

function showErrorMessage() {
    
    document.getElementById('userRepos').classList.add('hide');
    document.getElementById('userProfile').classList.add('hide');
    document.getElementById('messageWrapper').classList.remove('hide');

    document.getElementById('shadowElement').style.height = '155px';
    document.getElementById('submit').disabled = false;
}


