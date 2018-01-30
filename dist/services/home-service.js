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