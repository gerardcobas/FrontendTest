
/*
	bindUIActions() should invoke the submitButton click event,
		set GithubApi.settings.userInfoRepos.style.display = none
		and call GithubApi.analyzeQuery()	
*/
describe('Bind UI Actions Test', function() {

	var dummyElement;
	beforeEach( function() {

		dummyElement = document.createElement('div');
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
		GithubApi.settings.submitButton = dummyElement;
		GithubApi.settings.inputUsername = dummyElement
		GithubApi.settings.userInfoRepos = dummyElement;
		GithubApi.bindUIActions();
		
	});

	it (`should invoke the submitButton click event,
		set GithubApi.settings.userInfoRepos.style.display = none
		and call GithubApi.analyzeQuery()`, function() {

	    spyEvent = spyOnEvent(GithubApi.settings.submitButton, 'click');
		spyOn(GithubApi, 'analyzeQuery');

		$(GithubApi.settings.submitButton).trigger("click");
			       
	    expect("click").toHaveBeenTriggeredOn(GithubApi.settings.submitButton);
		expect(GithubApi.analyzeQuery).toHaveBeenCalled();
		expect(GithubApi.settings.userInfoRepos.style.display).toEqual('none');
    });

});


/*
	init() should initialize http client and call bindUIActions()
*/
describe('Init Test', function () {

	beforeEach( function() {
		spyOn(GithubApi, 'bindUIActions');
	});

	it('should initialize http client', function () {
		GithubApi.init();
		expect(GithubApi.settings.client).not.toEqual('null');
	});

	it('should call bindUIActions()', function() {
		GithubApi.init();
		expect(GithubApi.bindUIActions).toHaveBeenCalled();
	});
});


/*
	httpClient() should make GET requests correctly with existing urls and execute callback with the response
*/
describe('HTTP Client Test 1', function() {

	var httpClient;
	var flag;

	beforeEach( function(done) {
		httpClient = new GithubApi.httpClient;
		flag = false;

		httpClient.get("https://api.github.com/users/jcasado94", function(reqResponse) {
			flag = true;
			done();
		});

	});

	it('should make GET requests correctly with existing urls and execute callback with the response', function(done) {

			expect(flag).toEqual(true);
			done();

	});

});


/*
	httpClient() should make GET requests correctly with non-existing urls and execute callback with the response
*/
describe('HTTP Client Test 2', function() {

	var httpClient;
	var flag;

	beforeEach( function(done) {
		httpClient = new GithubApi.httpClient;
		flag = false;

		httpClient.get("https://api.github.com/users/this_is_a_random_name_right", function(reqResponse) {
			flag = true;
			done();
		});

	});

	it('should make GET requests correctly with non-existing urls and execute callback with the response', function(done) {

			expect(flag).toEqual(true);
			done();

	});

});


/*
	analyzeQuery() should call GithubApi.userFound() in case an existing Github user is provided
*/
describe('Analyze Query Test 1', function() {

	beforeEach(function(done) {

		dummyElement = document.createElement('div');
		GithubApi.settings.inputUsername = dummyElement;
		GithubApi.settings.inputUsername.value = "jcasado94";
		GithubApi.settings.client = new GithubApi.httpClient();
		GithubApi.userFound = jasmine.createSpy('Spy');
		
		GithubApi.analyzeQuery();

		setTimeout(function() {
			done();
    	}, 1500);

	});

	it('should call GithubApi.userFound() in case an existing Github user is provided', function(done) {

		expect(GithubApi.userFound).toHaveBeenCalled();
		done();

	})

});


/*
	analyzeQuery() should call GithubApi.userNotFound() in case a non-existing Github user is provided
*/
describe('Analyze Query Test 2', function() {

	beforeEach(function(done) {

		dummyElement = document.createElement('div');
		GithubApi.settings.inputUsername = dummyElement;
		GithubApi.settings.inputUsername.value = "this_is_clearly_a_fake_user";
		GithubApi.settings.client = new GithubApi.httpClient();
		GithubApi.userNotFound = jasmine.createSpy('Spy');
		
		GithubApi.analyzeQuery();

		setTimeout(function() {
			done();
    	}, 1500);

	});

	it('should call GithubApi.userNotFound() in case a non-existing Github user is provided', function(done) {

		expect(GithubApi.userNotFound).toHaveBeenCalled();
		done();

	})

});


/*
	buildUserRepos() should populate GithubApi.settings.userInfoRepos with new HTML content
*/
describe('Build User Repos Test', function() {

	beforeEach(function() {
		dummyElement = document.createElement('div');
		GithubApi.settings.userInfoRepos = dummyElement
		GithubApi.settings.inputUsername = dummyElement
		GithubApi.settings.inputUsername.value = "jcasado94"
	});

	it('should populate GithubApi.settings.userInfoRepos with new HTML content', function() {

		expect(GithubApi.settings.userInfoRepos.innerHTML).toEqual("");

		// simplified repositories json version
		GithubApi.buildUserRepos("Josep Casado", "Codito ergo sum", 
								JSON.parse(`[ { "id": 91583367, "name": "JuniorFrontendTest", "full_name": "jcasado94/JuniorFrontendTest" }, { "id": 91582959, "name": "Spoon-Knife", "full_name": "jcasado94/Spoon-Knife" }, { "id": 18806459, "name": "tabooList", "full_name": "jcasado94/tabooList" }, { "id": 52786047, "name": "tfg", "full_name": "jcasado94/tfg" } ]`));
		(GithubApi.settings.userInfoRepos.innerHTML).not.toEqual("");

	});

});