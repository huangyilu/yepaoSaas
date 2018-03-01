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

// 俱乐部 首页
export function quaryClubList(pageNum) {
  return jsonGetRequest('yp-xcx-getActivePageInfo', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
    pageNum: pageNum
  })
}

