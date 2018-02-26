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

// 消息 列表
export function quaryMessage() {
  return jsonGetRequest('yp-xcx-getAllMemMsg', {
    // memId: AuthService.getMemberInfo().memId,
    memId: '5a5eb7133782b10c18462eb9',
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
  })
}

// 消息 详情
export function quaryMessageDetails(msgType) {
  return jsonGetRequest('yp-xcx-getMemMsgDetail', {
    memId: '5a5eb7133782b10c18462eb9',
    // msgId: msgId,
    msgType: msgType,
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
  })
}

// 消息更新状态 
export function updateMessageState(msgType) {
  return jsonGetRequest('yp-xcx-updateMsgState', {
    memId: '5a5eb7133782b10c18462eb9',
    msgType: msgType,
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym
  })
}