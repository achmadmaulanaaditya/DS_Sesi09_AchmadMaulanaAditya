const { $ } = require("@wdio/globals");
const Page = require("./page");

class LoginPage extends Page {
  get fieldUsername() {
    return $("#user-name");
  }

  get fieldPassword() {
    return $("#password");
  }

  get buttonLogin() {
    return $("#login-button");
  }

  get invalidCredentials() {
    return $(
      '//h3[text()="Epic sadface: Username and password do not match any user in this service"]'
    );
  }

  get usernameRequired() {
    return $('//h3[text()="Epic sadface: Username is required"]');
  }

  get passwordRequired() {
    return $('//h3[text()="Epic sadface: Password is required"]');
  }

  get errorLockedOutUser() {
    return $(
      '//h3[text()="Epic sadface: Sorry, this user has been locked out."]'
    );
  }

  async login(username, password) {
    await this.fieldUsername.waitForDisplayed({ timeout: 2500 });
    await this.fieldUsername.setValue(username);
    await this.fieldPassword.setValue(password);
    await this.buttonLogin.click();
  }

  async validateInvalidCredentials() {
    await expect(this.invalidCredentials).toBeDisplayed();
  }

  async validateEmptyUsername() {
    await expect(this.usernameRequired).toBeDisplayed();
  }

  async validateEmptyPassword() {
    await expect(this.passwordRequired).toBeDisplayed();
  }

  async validateLockedOutUserError() {
    await this.errorLockedOutUser.waitForDisplayed({ timeout: 2500 });
    await expect(this.errorLockedOutUser).toBeDisplayed();
  }

  open() {
    return super.open("/");
  }
}

module.exports = new LoginPage();
