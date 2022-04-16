export class UserInfo {
  constructor({ usernameSelector, aboutSelector, proflePicSelector }) {
    this._name = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
    this._userpic = document.querySelector(proflePicSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      id: this._id
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserPic (data) {
    this._userpic.src = data.avatar
  }
}