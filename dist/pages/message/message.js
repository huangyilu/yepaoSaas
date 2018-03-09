// pages/fitnessCircle/fitnessCircle.js

import * as AuthService from '../../services/auth-service';
import * as messageService from '../../services/message-service';
import * as messagedata from '../../utils/messagedata-format';
import moment from '../../utils/npm/moment';
import certificationBox from '../../templates/certification-box/certification-box'

  /**
   * 页面的初始数据
   */
let pageOptions = {

  data: {
    emptyText: '暂无消息',
    emptyIcon: '../../images/bg_img/no_data.png',

    articleItems: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady() {
    certificationBox.setParent(this)
  },
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      // 获取消息列表
      this.getMessageList();
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
  },
  getMessageList() {
    messageService.quaryMessage().then((result) => {

      this.setData({
        articleItems: messagedata.formatMessageList(result.result)
      })

    }).catch((error) => {
      console.log(error);
    })
  },

  bindArticleCellTap(e) {

    if (!this.data.isCertificationMem) {
      this.setData({
        'certificationBoxData.isCertificationMemHidden': false
      })
    } else {
      wx.navigateTo({
        url: 'messageDetails?mesgtype=' + e.currentTarget.dataset.mesgtype + '&title=' + e.currentTarget.dataset.title,
      })
    }

  }
}

certificationBox.bindData(pageOptions)
certificationBox.bindListeners(pageOptions)

Page(pageOptions)