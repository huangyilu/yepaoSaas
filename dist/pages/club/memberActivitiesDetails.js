// pages/club/memberActivitiesDetails.js

import moment from '../../utils/npm/moment';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';

var timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    hour: 0,
    mints: 0,
    second: 0,
    clock: false,
    activities: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    this.getClubDetail(options.activeId);

    

  },
  onUnload: function (options) {
    clearTimeout(timer);
  },

  // 详情
  getClubDetail(activeId) {
    clubService.queryClubActiveDetail(activeId).then((result) => {
      this.setData({
        activities: clubdata.formatClubDetail(result.result)
      })
      this.activitiesCountdown(this, result.result.state);
    }).catch((error) => {
      console.log(error);
    })
  },

  // 活动 结束倒计时
  activitiesCountdown(that, state) {
    var EndTime = this.data.activities.endtime;
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];

    if (state == 'ready') {
      total_micro_second = NowTime - EndTime || [];
    }
    // console.log('EndTime: ' + EndTime);
    // console.log('剩余时间：' + total_micro_second);
    // 渲染倒计时时钟
    that.activitiesDateformat(total_micro_second, that);

    if (total_micro_second <= 0) {
      that.setData({
        clock: true
      });
      return;
    }
    timer = setTimeout(function () {
      total_micro_second -= 1000;
      that.activitiesCountdown(that, state);
    }, 1000)
  },

  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  activitiesDateformat(micro_second,that) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // console.log(' *** ' + day + "天" + hr + "小时" + min + "分钟" + sec + "秒" );
    that.setData({
      days: day,
      hour: hr,
      mints: min,
      second: sec
    })
  },

  bindCardItemTap(e) {
    // wx.navigateTo({
    //   url: '../home/onlinePaymentForCard',
    // })

    wx.showToast({
      icon: 'none',
      title: '活动已结束！'
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.activitiesTitle,
      path: 'pages/club/memberActivitiesDetails',
      success: function (res) {
        // 转发成功
        console.log('转发成功');
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  }
})