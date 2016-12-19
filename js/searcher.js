const githubApi = 'https://api.github.com/users/';

module.exports.httpGet = httpGet;
module.exports.updateUserInformations = updateUserInformations;
module.exports.updateUserRepositories = updateUserRepositories;
module.exports.searchByUsername = searchByUsername;
module.exports.searchReposByUsername = searchReposByUsername;

/**
 * It searches by a provided username, if the search is success full the user details area is updated 
 * with the returned user informations, otherwise the error div is displayed 
 */
function searchByUsername(username) {
  if (username === '' || username === null) { //for security reasons if the username is empty it returns without making the http request
    return false;
  }

  const response = httpGet(githubApi + username);

  if (response.status === 200 && response.readyState === 4) {
    return JSON.parse(response.responseText);
  } else {
    return null;
  }
}

/**
 * It receives an user  list and updates the user-details on the interface.
 */
function updateUserInformations(user) {
  if (user === null || user === undefined) { //for security reasons if the list is empty it returns false;
    return false;
  }

  document.getElementById('username').innerHTML = `@${user.login}`;
  document.getElementById('fullName').innerHTML = user.name;
  document.getElementById('bio').innerHTML = user.bio;
  document.getElementById('userImg').innerHTML ='<img src=' + user.avatar_url + ' alt="user image" />';
}

/**
 * It searches by a provided username, if the search is success it returns an array
 * with the user's repositories, else it returns null.
 */
function searchReposByUsername(username) {
  if (username === '' || username === null) { //for security reasons if the username is empty it returns without making the http request
    return null;
  }

  const response = httpGet(`${githubApi}${username}/repos`);
  if (response.status === 200 && response.readyState === 4) {
    return JSON.parse(response.responseText);
  } else {
    return null;
  }
}

/**
 * It receives an array with the repositories list and updates the user-repositories list on the interface.
 */
function updateUserRepositories(repositories) {
  if (repositories === null || repositories === undefined) { //for security reasons if the list is empty it returns false;
    return false;
  }
  var list = '';
  for(var i = 0; i < repositories.length; i++){
    list += '<li><div class="repository-name">' +
      repositories[i].name +
      '</div><div class="repository-info"><span class="octicon octicon-star"></span><span>' +
      repositories[i].stargazers_count +
      '</span><span class="octicon octicon-repo-forked"></span><span>' +
      repositories[i].forks +
      '</span></div></li>';
  }
  document.getElementById('repositories').innerHTML = list;
}

/**
 * Function to be called when search button is pressed,
 * if the input field is empty nothing happens.
 */
function validateForm(){
  const username = document.getElementById('searchField').value;

  if( username === '' || username === null || username ===  undefined){
    return false;
  }

  const user = searchByUsername(username);
  if (user !== null) {
    updateUserInformations(user);
    updateUserRepositories(searchReposByUsername(username));
    addClass(document.getElementById('user-informations'), 'active');
    removeClass(document.getElementById('error-container'), 'active');
  } else {
    removeClass(document.getElementById('user-informations'), 'active');
    addClass(document.getElementById('error-container'), 'active');
  }
}

/**
 * Auxiliary function make http requests to a provided url
 */
function httpGet(url) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  return xmlHttp;
}
/**
 * Auxiliary function to check if some element has some class
 */
function containsClass(el,cls) {
  return !!el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

/**
 * Auxiliary function to add a class to an element
 */
function addClass(el, className) {
  if (el.classList){
    el.classList.add(className);
  }
  else if (!containsClass(el, className)) { 
    el.className += " " + className;
  }
}

/**
 * Auxiliary function to remove a class from an element
 */
function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  }
  else if (containsClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}
