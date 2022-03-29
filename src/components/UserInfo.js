export class UserInfo {
  constructor({ usernameSelector, aboutSelector }) {
    this._name = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}