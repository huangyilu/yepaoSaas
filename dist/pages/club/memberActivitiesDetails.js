// pages/club/memberActivitiesDetails.js

import moment from '../../utils/npm/moment';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';
import * as AuthService from '../../services/auth-service';

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

    activeId: '',
    gym: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      activeId: options.activeId,
      gym: AuthService.getMemberInfo() ? AuthService.getMemberInfo().gym : ''
    })

    if (options.gym) {
      this.setData({
        gym: options.gym
      })
    }

    this.getClubDetail(options.activeId);

    // 验证 查看的人 是否是会员，若不是，则调用注册 。用转发的人的gym
    
    console.log('options .. ' + JSON.stringify(options));
    // 1、检验是否是会员

    

  },
  onUnload: function (options) {
    clearTimeout(timer);
  },

  // 详情
  getClubDetail(activeId) {
    clubService.queryClubActiveDetail(activeId,this.data.gym).then((result) => {
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
    var EndTime = this.data.activities.endTime;
    var StartTime = this.data.activities.startTime;
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];

    if (state == 'ready') {
      total_micro_second = StartTime - NowTime || [];
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

    // wx.showToast({
    //   icon: 'none',
    //   title: '活动已结束！'
    // })

    // 当 转发出去 点击的人 打算点击买卡的时候 再请求注册 会员
    

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var me = this;
    return {
      title: me.data.activities.title,
      path: 'pages/club/memberActivitiesDetails?activeId=' + me.data.activeId + '&gym=' + me.data.gym,
      success: function (res) {
        // 转发成功
        console.log('转发成功 title.. ' + me.data.activities.title);
        console.log('转发成功 activeId.. ' + me.data.activeId);
        console.log('转发成功 activeId.. ' + me.data.gym);
        // console.log('转发成功 res.. ' + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  }
})