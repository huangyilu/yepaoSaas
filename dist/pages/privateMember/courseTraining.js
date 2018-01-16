// pages/privateMember/courseTraining.js

import weSwiper from '../../utils/weSwiper/weSwiper.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseItem: ['上半身', '核心'],
    courseLevel: '中级',
    courseRTime: '25s',

    courseTrainingList: [
      {
        id: 0,
        title: '热身',
        open: true,
        courseList: [
          {
            name: '全膝俯卧撑',
            imgUrl: '../../images/1.jpg',
            videoUrl: '',
            choosed: true,
          },
          {
            name: '全膝俯卧撑',
            imgUrl: '../../images/1.jpg',
            videoUrl: '',
            choosed: false,
          }
        ]
      },
      {
        id: 0,
        title: '热身',
        open: false,
        courseList: [
          {
            name: '全膝俯卧撑',
            imgUrl: '../../images/1.jpg',
            videoUrl: '',
            choosed: false,
          },
          {
            name: '全膝俯卧撑',
            imgUrl: '../../images/1.jpg',
            videoUrl: '',
            choosed: false,
          }
        ]
      }
    ],

    courseShare: false,
    courseShareSuccess: false,

    // 浏览视频
    showVideoHidden: false,
    videoIndex: 1,
    videoUrlsBrowse: [
      {
        name: '',
        url: 'http://xiqingfengbao-sp.oss-cn-hangzhou.aliyuncs.com/qd-sp/1515403272068.mp4?Expires=1516107921&OSSAccessKeyId=LTAIGdDLarpYm7lf&Signature=3SKCnjw%2F5pmIFZEFnoFKyX51FKg%3D'
      },
      {
        name: '',
        url: 'http://xiqingfengbao-sp.oss-cn-hangzhou.aliyuncs.com/qd-sp/1515403272068.mp4?Expires=1516107921&OSSAccessKeyId=LTAIGdDLarpYm7lf&Signature=3SKCnjw%2F5pmIFZEFnoFKyX51FKg%3D'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.initWeSwiper(this.data.videoUrlsBrowse);

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
    console.log('播放 视频 。。。');
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

      this.setData({
        courseShareSuccess: true
      })

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
    if (index < this.data.videoUrlsBrowse.length-1) {
      index = index + 1;
    }
    this.weswiper.slideTo(index);

    console.log('bindVideoPalyEnded ...' + index);

  },
  bindCloseVideoShowTap (e) {

    this.setData({
      showVideoHidden: true
    })

  }

})