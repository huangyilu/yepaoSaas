// pages/club/memberActivitiesDetails.js

import moment from '../../utils/npm/moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImg: '../../images/bg_img/xcsr.png',
    days: 0,
    hour: 0,
    mints: 0,
    second: 0,
    clock: false,

    activitiesTitle: '新春甩肉季，我们来约“惠”',
    activitiesIntroduction: '冬天已过，正是锻炼好时节，也跑健身感恩新老客户，特“惠”来袭，你还在等什么，赶快加入吧！',
    nowNum: 2,
    totalNum: 10,

    cards: [
      {
        cardName: '项目一：一年家庭卡',
        originalPrice: 1500,
        currentPrice: 1200
      },
      {
        cardName: '项目二：私教卡',
        originalPrice: 1500,
        currentPrice: 1200
      }
    ],
    activitiesDetails: '享受帝王般的尊宠,运动休闲的皇家会所 格力特健身中心 我运动我健康 您将拥有:大型豪华私人会所,完善及舒适的环境,世界一流的健身设备,亲切的客户服务,免费国家级教练指导,最流行的动感单车,免费提供桑拿、淋浴，各种世界同步有氧操，大型停车场等。 我们为您准备的课程：身体平衡、趣味球操、有氧搏击、动感单车、芭蕾、高温瑜珈，超自然瑜珈、桌球、游泳、乒乓、健身操、拉丁等。还有休闲茶室、免费上网等。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // moment().add(i, 'days').format('YYYY-MM-DD');

    this.activitiesCountdown(this);

  },

  // 活动倒计时
  activitiesCountdown(that) {
    var EndTime = 1517969040000;
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];
    
    // console.log('剩余时间：' + total_micro_second);
    // 渲染倒计时时钟
    that.activitiesDateformat(total_micro_second, that);

    if(total_micro_second <= 0) {
      that.setData({
        clock: true
      });
      return;
    }
    setTimeout(function () {
      total_micro_second -= 1000;
      that.countdown(that);
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