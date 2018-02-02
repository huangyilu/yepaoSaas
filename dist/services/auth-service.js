
/* ----------------------------------------------------------------------- */

import * as appConfig from '../app-config';
import Promise from '../utils/npm/bluebird.min';

const EXPIRATION_MILLISECONDS = 1209600000;
const FORCE_LOGIN = false;

var storeE = {
  set: function (key, val, exp) {
    try {
      wx.setStorageSync(key, { val: val, exp: exp, time: new Date().getTime() });
    } catch (e) { }
  },
  get: function (key) {
    try {
      var info = wx.getStorageSync(key);
      if (!info) {
        return null;
      }
      if (new Date().getTime() - info.time > info.exp) {
        return null;
      }
      return info.val;
    } catch (e) {
      return null;
    }
  }
};

export function saveAuthInfo(authInfo, userProfile) {
  let openId = authInfo.openId;
  storeE.set('userProfile', userProfile.userInfo, EXPIRATION_MILLISECONDS);
  storeE.set('openid', openId, EXPIRATION_MILLISECONDS);
}

export function clearAuthInfo(authInfo) {
  wx.removeStorageSync('openid');
}

export function getUserProfile() {
  return storeE.get('userProfile');
}

export function getUserId() {
  return storeE.get('openid');
}

export function getUserInfo() {
  let userProfile = getUserProfile();
  if (!userProfile) {
    return null;
  }
  return {
    userId: getUserId(),
    username: userProfile.nickName,
    avatarSrc: userProfile.avatarUrl
  };
}

export function isLoggedIn() {
  let userInfo = getUserInfo();
  return !FORCE_LOGIN && userInfo && userInfo.userId && userInfo.username && userInfo.avatarSrc;
}

export function authFromServer(authCode, userInfoResult) {
  console.log('getUserInfo callback');
  // console.log(authCode, userInfoResult);
  return new Promise((resolve, reject) => {
    wx.request({
      url: appConfig.apiBase + 'yp-xcx-getOpenId',
      method: 'GET',
      data: {
        "code": authCode,
        "custName": appConfig.custName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("wxappauth result: " + JSON.stringify(res));
        if (+res.statusCode === 200) {
          console.log('wxappauth succeed: ' + JSON.stringify(res.data));
          saveAuthInfo(res.data, userInfoResult);
          return resolve();
        } else {
          console.log("wxappauth failed: " + res.statusCode);
          return reject(+res.statusCode);
        }
      },
      fail: function (error) {
        return reject(error);
      }
    });
  });
}

// 如果没有同意 获取头像，再次发起请求
export function authorizeUserInfo() {
  return new Promise((resolve, reject) => { 
    wx.authorizeAsync({
      scope: 'scope.userInfo'
    }).catch((error) => {
      console.log(error);   
      return reject(error);
    }).then(res => {
      return resolve(res);
    })
  })
}

// 认证会员
export function certificationMemberFromServer() {
  return true
}

export function wxappLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (loginResult) {
        console.log('loginResult: ' + JSON.stringify(loginResult));
        wx.getUserInfo({
          success: function (res) {
            console.log('getUserInfo result: ' + JSON.stringify(res));
            return resolve({ authCode: loginResult.code, userInfoResult: res });
          },
          fail: function (error) {
            return reject(error);
          }
        });
      },
      fail: function (error) {
        return reject(error);
      }
    });
  });
}

export function ensureLoggedIn() {
  return new Promise((resolve, reject) => {
    if (isLoggedIn()) {
      console.log('LoggedIn already');
      return resolve();
    }

    return wxappLogin().then(({ authCode, userInfoResult }) => {
      return authFromServer(authCode, userInfoResult);
    });
  });
}

// code 0016FrSw0fuhgi1ie2Sw0qAcSw06FrS0