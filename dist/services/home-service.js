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


// 在线购卡
export function queryOnlineCards() {
  return jsonGetRequest('yp-xcx-getCards', {
    custName: "zjs",
    gym: "zjs"
  })
}

// 我的会员卡
export function queryMyCards() {
  return jsonGetRequest('yp-xcx-getMyCards', {
    custName: "zjs",
    gym: "zjs",
    id: '59e8636e3d20231e641ac64f' // 实际上是 memId
  })
}

// 我的会员卡详情
export function queryMyCardsDetail(cardId) {
  return jsonGetRequest('yp-xcx-getMyCardsMsg', {
    custName: "zjs",
    gym: "zjs",
    id: cardId,
    memId: '59e8636e3d20231e641ac64f'
  })
}

// 私人教练
export function queryMyPersonalCoach() {
  return jsonGetRequest('yp-xcx-getMyPrivateTeacher', {
    custName: "zjs",
    gym: "zjs",
    id: '59e8636e3d20231e641ac64f', // 实际上是 memId
  })
}

// 课程购买 
export function queryRecomdCourse(cardType) {
  return jsonGetRequest('yp-xcx-getRecommendCourse', {
    custName: "zjs",
    gym: "zjs",
    cardType: cardType
  })
}

// 课程表
export function queryClassSchedule(dateString) {
  return jsonGetRequest('yp-xcx-showPlan', {
    custName: "zjs",
    gym: "zjs",
    dateString: dateString
  })
}

// 课程详情
export function queryClassScheduleDetail(planId, planDetailId) {
  return jsonGetRequest('yp-xcx-detailPlan', {
    custName: "zjs",
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
  return jsonGetRequest('/yp-xcx-getMyLesson', {
    custName: "zjs",
    gym: "zjs",
    memId: '59e8636e3d20231e641ac64f'
  })
}