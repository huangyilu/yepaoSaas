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
