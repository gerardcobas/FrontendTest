# JuniorFrontendTest

Specifications
==============

* The user can search a username of GitHub
* If the searched username does exist: The searched user profile is displayed with all his repositories
* If the searched username does not exist: An error is shown

Approach and Technologies used
==============================

* Code written in JavaScript.
* Unit testing with Jasmine.
* HTML and CSS for markup and styling
* [GitHub API](https://developer.github.com/v3/)

The project uses the following classes:

**Repository** responsible for a single repository defined by a name, the number of stars and the number of forks.

**User** models a single user and stores its repositories.

**SearchView** responsible for formatting the contents of the API into a HTML view.

**Controller**  responsible for displaying the formatted HTML onto the main index page.

**APIClient** responsible for fetching the current headlines from the Github API.


Instructions and Installation
=============================

1. Fork and Clone the repo.
2. Run ```npm install``` add all the project dependencies.
3. Run ```node node_modules/http-server/bin/http-server``` to load the server with Node.js
4. Visit local host 8080 in the browser.

Screenshots
===========

First Screen
![alt tag](./images/firstScreen)
Success Screen
![alt tag](./images/searchSuccess)
Error Screen
![alt tag](./images/searchFail)
