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

import {
  wxUrlencodedBackenGetRequestP as urlencodeGetRequest
}
  from 'wx-request-promise';

// teacher / get-mem  fit-exchange-gym
// 我是教练 查询 私教会员  /fit-login-backend
export function queryMyMembers() {
  return jsonGetRequest('getMem', {
    custName: appConfig.custName,
    gym: "zjs"
  })
}

// 我是教练


// 定制课程 memId 私教会员ID ptId 教练ID
export function queryCourseCustomization(customizeDateString, memId) {
  return jsonGetRequest('getCourseCustomization', {
    custName: appConfig.custName,
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    customizeDateString: customizeDateString
  })
}

// 存入 定制的 课程
export function uploadCourseCustomization(customizeDateString, memId, customizeLevel, customizeParts) {
  return urlencodePostRequest('saveCourseCustomization', {
    custName: appConfig.custName,
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
    custName: appConfig.custName,
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    customizeDateString: customizeDateString
  })
}

// 共享定制的课程
export function uploadShareCourse(shareCourseIds, memId) {
  return urlencodePostRequest('shareCourse', {
    custName: appConfig.custName,
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: memId,
    shareCourseIds: shareCourseIds
  })
}


/** 课程共享 */
// 获取 课程共享 列表
export function queryShareCourse(memId) {
  return jsonGetRequest('getShareCourseList', {
    custName: appConfig.custName,
    gym: "zjs",
    memId: '59e8636e3d20231e641ac64f'
  })
}
// 课程共享 详情
export function queryShareCourseDetail(memId) {
  return jsonGetRequest('getShareCourseDetail', {
    custName: appConfig.custName,
    gym: "zjs",
    ptId: '59ba4cc655040f3865e14b64',
    memId: '59e8636e3d20231e641ac64f',
  })
}

// 我的订单
export function queryMyOrder() {
  return jsonGetRequest('', {
    custName: appConfig.custName,
    gym: "zjs",
  })
}