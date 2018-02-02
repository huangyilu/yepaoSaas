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

// custName 如肯德基
// gym 如肯德基观前店
// memId 会员id
// planId 课程id

// 在线购卡
export function queryOnlineCards() {
  return jsonGetRequest('yp-xcx-getCards', {
    custName: appConfig.custName,
    gym: "zjs"
  })
}

// 我的会员卡
export function queryMyCards() {
  return jsonGetRequest('yp-xcx-getMyCards', {
    custName: appConfig.custName,
    gym: "zjs",
    id: '59e8636e3d20231e641ac64f' // 实际上是 memId
  })
}

// 我的会员卡详情
export function queryMyCardsDetail(cardId) {
  return jsonGetRequest('yp-xcx-getMyCardsMsg', {
    custName: appConfig.custName,
    gym: "zjs",
    id: cardId,
    memId: '59e8636e3d20231e641ac64f'
  })
}

// 私人教练
export function queryMyPersonalCoach() {
  return jsonGetRequest('yp-xcx-getMyPrivateTeacher', {
    custName: appConfig.custName,
    gym: "zjs",
    id: '59e8636e3d20231e641ac64f', // 实际上是 memId
  })
}

// 课程购买 
export function queryRecomdCourse(cardType) {
  return jsonGetRequest('yp-xcx-getRecommendCourse', {
    custName: appConfig.custName,
    gym: "zjs",
    cardType: cardType
  })
}

// 课程表
export function queryClassSchedule(dateString) {
  return jsonGetRequest('yp-xcx-showPlan', {
    custName: appConfig.custName,
    gym: "zjs",
    dateString: dateString
  })
}

// 课程详情
export function queryClassScheduleDetail(planId, planDetailId) {
  return jsonGetRequest('yp-xcx-detailPlan', {
    custName: appConfig.custName,
    gym: "zjs",
    planId: planId,
    planDetailId: planDetailId
  })
}

// 课程预约
export function uploadMemJoinClassSchedule() {
  // return 
}

// 我的约课
export function queryMyClass() {
  return jsonGetRequest('yp-xcx-getMyLesson', {
    custName: appConfig.custName,
    gym: "zjs",
    memId: '59e8636e3d20231e641ac64f'
  })
}