// pages/home/home.js

import * as AuthService from '../../services/auth-service';
import * as homeService from '../../services/home-service';
import * as homedata from '../../utils/homedata-format';
import certificationBox from '../../templates/certification-box/certification-box'

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    isCertificationMem: false,
    isCertificationMemHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onReady() {
    certificationBox.setParent(this)
  },
  onShow() {
    this.getCertifiMem();
  },
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },
  bindNavigatorTap(e) {
    var url = e.currentTarget.id;

    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
      // certificationBox.setThisData({
      //   name: 'isCertificationMemHidden',
      //   data: false
      // });
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },

}

certificationBox.bindData(pageOptions)
certificationBox.bindListeners(pageOptions)

Page(pageOptions)