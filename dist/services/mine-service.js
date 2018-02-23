import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import * as AuthService from 'auth-service';
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



// 会员认证
export function queryCertificationMember(phone) {
  return jsonGetRequest('yp-xcx-login', {
    custName: appConfig.custName,
    phone: phone
  })
}

// teacher / get-mem  fit-exchange-gym
// 我是教练 查询 私教会员  /fit-login-backend
export function queryMyMembers() {
  return jsonGetRequest('getMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym
  })
}

// 我是教练 


// 定制课程 memId 私教会员ID ptId 教练ID
export function queryCourseCustomization(customizeDateString, memId) {
  return jsonGetRequest('getCourseCustomization', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: '59ba4cc655040f3865e14b64',
    memId: AuthService.getMemberInfo().memId,
    customizeDateString: customizeDateString
  })
}

// 存入 定制的 课程
export function uploadCourseCustomization(customizeDateString, memId, customizeLevel, customizeParts) {
  return urlencodePostRequest('saveCourseCustomization', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: '59ba4cc655040f3865e14b64',
    memId: AuthService.getMemberInfo().memId,
    customizeDateString: customizeDateString,
    customizeLevel: customizeLevel,
    customizeParts: customizeParts
  })
}

// 查看定制的课程
export function queryCourseCustomizationDetail(customizeDateString, memId) {
  return jsonGetRequest('getCourseCustomizationDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: '59ba4cc655040f3865e14b64',
    memId: AuthService.getMemberInfo().memId,
    customizeDateString: customizeDateString
  })
}

// 共享定制的课程
export function uploadShareCourse(shareCourseIds, memId) {
  return urlencodePostRequest('shareCourse', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: '59ba4cc655040f3865e14b64',
    memId: AuthService.getMemberInfo().memId,
    shareCourseIds: shareCourseIds
  })
}

/**我是会籍 */
// 资料登记 获取意向卡
export function queryGymUsableCards() {
  return jsonGetRequest('yp-xcx-getGymUsableCards', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
  })
}

// 资料登记 保存信息 memId
export function uploadMcRegisterMem(cust) {
  return urlencodePostRequest('yp-xcx-mcRegisterMem', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    mcId: AuthService.getMemberInfo().memId,
    memName: cust.name,
    sex: cust.gender,
    birthday: cust.birthday,
    phone: cust.phone,
    fitPurpose: cust.fitPurpose,
    intentionCard: cust.intentionCard,
    checkinTimes: cust.checkinTimes,
    userType: cust.userType,
    addr: cust.address,
    remark: cust.remark
  })
}

// 资料移交
export function queryMems() {
  return jsonGetRequest('yp-xcx-mc-queryMember', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    mcId: AuthService.getMemberInfo().memId
  })
}

/** 课程共享 */
// 获取 课程共享 列表
export function queryShareCourse(memId) {
  return jsonGetRequest('getShareCourseList', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId
  })
}
// 课程共享 详情
export function queryShareCourseDetail(memId) {
  return jsonGetRequest('getShareCourseDetail', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    ptId: '59ba4cc655040f3865e14b64',
    memId: AuthService.getMemberInfo().gym.memId,
  })
}

// 我的订单
export function queryMyOrder() {
  return jsonGetRequest('', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
  })
}