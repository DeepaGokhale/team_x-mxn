const JWT_SECRET_KEY = '6aRYMci5oqLQtpFkpeFrid7BbAjB'; //should hide this in the config vars

const TEST_USER = { //this is meant to mock a user in the DB
    username: "user",
    password: "pass",
    id:1234,
    foo: "Bar"
};
const JWT_OPTIONS = { //this is boilerplate. 
    algorithm: "HS256",
    // expiresIn: 60 * 60
  }

module.exports = {
    TEST_USER: TEST_USER,
    JWT_OPTIONS: JWT_OPTIONS,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
}