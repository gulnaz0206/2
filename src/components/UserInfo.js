export class UserInfo {
    constructor ({ userNameSelector, userInfoSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }
    getUserInfo() {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent,
        }
    }

    setUseInfo(name, info, link) {
        this._userName.textContent = name;
        this._userInfo.textContent = info;
        this.setUserAvatar(link);
    }

    setUserAvatar(link) {
        this._userAvatar.src = link;
    }
}