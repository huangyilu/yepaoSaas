// pages/home/classScheduleDetails.js
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 5,
    starUrl: '../../images/icon/star_red.png',
    emptUrl: '../../images/icon/star_g.png',

    classDetails: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
    this.setData({
      planId: options.planId ? options.planId : 0,
      planDetailId: options.planDetailId ? options.planDetailId : 0
    })

    this.getClassSchDetail();

  },

  getClassSchDetail() {

    homeService.queryClassScheduleDetail(this.data.planId, this.data.planDetailId).then((result) => {

      console.log('queryClassScheduleDetail *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          classDetails: homedata.formatClassScheduleDetail(result.result)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },

  // 预约
  bindClassScheduleApptTap () {
    
  }


})