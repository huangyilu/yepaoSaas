import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import {
  wxJsonBackendPostRequestP as jsonPostRequest
}
  from 'wx-request-promise';

import {
  wxJsonBackendGetRequestP as jsonGetRequest
}
  from 'wx-request-promise';

import {
  wxUrlencodedBackenPostRequestP as urlencodePostRequest
}
  from 'wx-request-promise';


// teacher / get-mem  fit-exchange-gym
// 我是教练 查询 私教会员  /fit-login-backend
export function queryMyMembers() {
  return jsonGetRequest('getMem', {
    custName: "zjs",
    gym: "zjs"
  })
}

// 我是教练


// 定制课程 memId 私教会员ID ptId 教练ID
export function queryCourseCustomization(customizeDateString, memId) {
  return jsonGetRequest('getCourseCustomization', {
    custName: "zjs",
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    customizeDateString: customizeDateString
  })
}

// 存入 定制的 课程
export function uploadCourseCustomization(customizeDateString, memId, customizeLevel, customizeParts) {
  return urlencodePostRequest('saveCourseCustomization', {
    custName: "zjs",
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    customizeDateString: customizeDateString,
    customizeLevel: customizeLevel,
    customizeParts: customizeParts
  })
}

// 查看定制的课程
export function queryCourseCustomizationDetail(customizeDateString, memId) {
  return jsonGetRequest('getCourseCustomizationDetail', {
    custName: "zjs",
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    customizeDateString: customizeDateString
  })
}