const {
  httpGet,
  updateUserInformations,
  updateUserRepositories,
  searchByUsername,
  searchReposByUsername,
} = require('../searcher');

test('httpGet response returns the user', () => {
  const response = httpGet('https://api.github.com/users/pmiralopes');
  const user = JSON.parse(response.responseText);

  expect(response.status).toBe(200);
  expect(user.login).toBe('PMiraLopes');
  expect(user.name).toBe('Pedro Lopes');
});

test('httpGet response do not return a user in case of not existing', () => {
  const response = httpGet('https://api.github.com/users/error-user');
  const error = JSON.parse(response.responseText);

  expect(response.status).toBe(404);
  expect(error.message).toBe('Not Found');
});

test('searchByUsername will return false if username is null', () => {
  expect(searchByUsername(null)).toBe(false);
});

test('searchByUsername will returns the user object', () => {
  expect(searchByUsername('pmiralopes')).not.toBe(false);
  expect(searchByUsername('pmiralopes')).not.toBe(null);
  expect(searchByUsername('pmiralopes').login).toBe('PMiraLopes');
});

test('updateUserInformations will return false if user is null', () => {
  expect(updateUserInformations(null)).toBe(false);
});

test('searchReposByUsername will returns the user object', () => {
  expect(searchReposByUsername('pmiralopes')).not.toBe(null);
  expect(searchReposByUsername('pmiralopes').length).toBeGreaterThanOrEqual(0);
});

test('searchReposByUsername will return false if username is null', () => {
  expect(searchReposByUsername(null)).toBe(null);
});

test('updateUserRepositories will return false if user is null', () => {
  expect(updateUserRepositories(null)).toBe(false);
});
