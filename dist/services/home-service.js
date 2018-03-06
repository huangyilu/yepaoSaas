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

// custName 如肯德基
// gym 如肯德基观前店
// memId 会员id
// planId 课程id

// 在线购卡 列表
export function queryOnlineCards() {
  return jsonGetRequest('yp-xcx-getCards', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym
  })
}

// 我的会员卡
export function queryMyCards() {
  return jsonGetRequest('yp-xcx-getMyCards', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    id: AuthService.getMemberInfo().memId // 实际上是 memId
  })
}

// 我的会员卡详情
export function queryMyCardsDetail(cardId) {
  return jsonGetRequest('yp-xcx-getMyCardsMsg', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    id: cardId,
    memId: AuthService.getMemberInfo().memId
  })
}

// 私人教练
export function queryMyPersonalCoach() {
  return jsonGetRequest('yp-xcx-getMyPrivateTeacher', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    id: AuthService.getMemberInfo().memId, // 实际上是 memId
  })
}

// 课程购买 列表
export function queryRecomdCourse(cardType) {
  return jsonGetRequest('yp-xcx-getRecommendCourse', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    cardType: cardType
  })
}

// 课程购买 点击支付
export function uploadBuyClassPay(cardId, price) {
  return urlencodePostRequest('yp-xcx-submitBuyCourseOrder', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
    cardId: cardId,
    fee: price
  })
}

// 课程购买 教练列表
export function queryCoachList(nameOrPhone) {
  return jsonGetRequest('yp-xcx-getPtList', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    nameOrPhone: nameOrPhone
  })
}

// 课程表
export function queryClassSchedule(dateString) {
  return jsonGetRequest('yp-xcx-showPlan', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    dateString: dateString,
    memId: AuthService.getMemberInfo().memId
  })
}

// 课程详情
export function queryClassScheduleDetail(planId, planDetailId) {
  return jsonGetRequest('yp-xcx-detailPlan', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
    planId: planId,
    planDetailId: planDetailId
  })
}

// 课程预约
export function uploadMemJoinClassSchedule(planDetailId, planId) {
  return urlencodePostRequest('yp-xcx-orderLesson', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
    planDetailId: planDetailId,
    planId: planId
  })
}

// 我的约课
export function queryMyClass() {
  return jsonGetRequest('yp-xcx-getMyLesson', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId
  })
}

// 取消团课
export function uploadCancelMyClass(orderId) {
  return urlencodePostRequest('yp-xcx-cancelLesson', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    orderId: orderId
  })
}