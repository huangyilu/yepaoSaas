// pages/myCoach/courseTraining.js

import weSwiper from '../../../utils/weSwiper/weSwiper.js'
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseItem: null,
    courseLevel: '',
    courseRTime: '25s',

    courseTrainingList: [],

    courseShare: false,
    courseShareSuccess: false,

    // 浏览视频
    videoIconUrl: '../../../images/icon/delete_back.png',
    showVideoHidden: true,
    videoIndex: 1,
    videoUrlsBrowse: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      memId: options.memId ? options.memId : null,
      customizeDateString: options.customizeDateString ? options.customizeDateString : null
    })

    this.getCourseCustomizationDetail();

    
  },

  // 取数据
  getCourseCustomizationDetail() {

    mineService.queryCourseCustomizationDetail(this.data.customizeDateString, this.data.memId).then((result) => {

      console.log('queryCourseCustomizationDetail *** ' + JSON.stringify(result));
      if (result.result.length > 0) {
        var formatlist = minedata.formatCourseTraining(result.result[0]);
        this.setData({
          courseTrainingList: formatlist.courseTrainingList,
          videoUrlsBrowse: formatlist.videoUrlsBrowse,
          courseItem: result.result[0].customize_parts.split(','),
          courseLevel: result.result[0].customize_level
        })

        this.initWeSwiper(formatlist.videoUrlsBrowse);
      }

    }).catch((error) => {
      console.log(error);
    })

  },

  // weswiper 事件
  initWeSwiper(videoUrlsBrowse) {
    var me = this;
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: videoUrlsBrowse.length,
      direction: 'horizontal',
      initialSlide: 0,
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {

        console.log("weswiper == " + weswiper.activeIndex)
        me.setData({
          videoIndex: weswiper.activeIndex + 1,
        })

        var videoIndex = weswiper.activeIndex + 1;
        var videoContext = wx.createVideoContext(videoIndex,me);
        videoContext.pause();

        if (index < this.data.videoUrlsBrowse.length - 1) {
          var videoContext = wx.createVideoContext(videoIndex+1,me);
          videoContext.pause();
        }

      },

    })
  },
  touchstart(e) {
    this.weswiper.touchstart(e)
  },
  touchmove(e) {
    this.weswiper.touchmove(e)
  },
  touchend(e) {
    this.weswiper.touchend(e)
  },

  // 分享
  bindCourseSharedTap () {
    var courseShare = this.data.courseShare;
    this.setData({
      courseShare: !courseShare
    })
  },
  // cell 展开收起
  bingKindToggleTap (e) {
    
    var id = e.currentTarget.id,
      list = this.data.courseTrainingList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      }
    }
    this.setData({
      courseTrainingList: list
    });

  },
  // 点击 视频
  bingKindToggleInsideCellTap (e) {
    
    var x = e.currentTarget.dataset.outindex;
    var y = e.currentTarget.dataset.inindex;

    var index = x * 2 + y + 1;
    console.log('播放 视频 。。。' + index);
    
    this.weswiper.slideTo(index);

    this.setData({
      showVideoHidden: false
    })
  },
  // 选择 视频
  bindKindToggleInsideCellChoosedTap (e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var inIndex = e.currentTarget.dataset.inindex;

    var courseTrainingList = this.data.courseTrainingList;
    courseTrainingList[outIndex].courseList[inIndex].choosed = !courseTrainingList[outIndex].courseList[inIndex].choosed;

    this.setData({
      courseTrainingList: courseTrainingList
    })

  },
  // 开始 或 立即分享
  bindMakeUpTap (e) {

    if (this.data.courseShare) {
      
      // 立即分享
      this.uploadCourse();

      // 分享成功之后 收起 提醒 已经选择框？

    } else {
      // 开始 从头 播放视频
      this.setData({
        showVideoHidden: false
      })

    }

  },
  // 视频播放结束 播放下一个视频 -- 
  bindVideoPalyEnded (e) {
    
    var index = +e.currentTarget.id;

    // pause
    var videoContext = wx.createVideoContext(index,this);
    videoContext.pause();

    if (index < this.data.videoUrlsBrowse.length - 1) {
      index = index + 1;
      var videoContext = wx.createVideoContext(index,this);
      videoContext.pause();
    }

    this.weswiper.slideTo(index);

    console.log('bindVideoPalyEnded ...' + index);

  },
  bindCloseVideoShowTap (e) {

    this.setData({
      showVideoHidden: true
    })

  },

  uploadCourse () {

    var courseTrainingList = this.data.courseTrainingList;
    var courIds = [];
    var courIdsString = '';
    courseTrainingList.forEach(couTra => {
      couTra.courseList.forEach(item => {
        if (item.choosed == true) {
          courIds.push(item.id);
        }
      })
    })
    courIdsString = courIds.join(',');

    mineService.uploadShareCourse(courIdsString, this.data.memId).then((result) => {

      console.log('uploadShareCourse *** ' + JSON.stringify(result));
      if (result.rs == 'Y') { 
        this.setData({
          courseShareSuccess: true
        })
      }

    }).catch((error) => {
      console.log(error);
    })

  }

})