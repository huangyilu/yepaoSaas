// pages/fitnessCircle/fitnessCircle.js

import * as AuthService from '../../services/auth-service';
import * as messageService from '../../services/message-service';
import * as messagedata from '../../utils/messagedata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无消息',
    emptyIcon: '../../images/bg_img/no_data.png',

    articleItems: [],

    // 会员认证
    isCertificationMem: false,
    isCertificationMemHidden: true,
    memTelephone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    messageService.quaryMessage().then((result) => {

      this.setData({
        articleItems: messagedata.formatMessageList(result.result)
      })

    }).catch((error) => {
      console.log(error);
    })
    
  },
  onShow: function (options) {
    // 查询是否认证会员
    this.getCertifiMem();
  },

  bindArticleCellTap (e) {

    if (!this.data.isCertificationMem) {
      this.setData({
        isCertificationMemHidden: false
      })
    } else {
      var index = e.currentTarget.id;
      var articleItems = this.data.articleItems;
      wx.navigateTo({
        url: 'messageDetails?title=' + articleItems[index].title,
      })
    }

  },
  // 查询是否认证会员
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('已认证会员');
    } else {
      console.log('未认证会员');
    }
  },
  //会员认证 取消/确认
  bindConfirmBoxBtnTap(e) {
    var id = e.currentTarget.id;
    if (id == 'a') {
      // 确定 认证
      AuthService.queryCertificationMember(this.data.memTelephone).then((result) => {

        this.setData({
          isCertificationMemHidden: true,
          isCertificationMem: true
        })

      }).catch((error) => {
        console.log(error);
      })

    } else {
      // 取消
      this.setData({
        isCertificationMemHidden: true
      })
    }
  },
  bindCerMemInput(e) {
    this.setData({
      memTelephone: e.detail.value
    })
  }
})