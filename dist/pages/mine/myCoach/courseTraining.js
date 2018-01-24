// pages/myCoach/courseTraining.js

import weSwiper from '../../../utils/weSwiper/weSwiper.js'
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';

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
            imgUrl: 'http://new-saas.oss-cn-hangzhou.aliyuncs.com/tpsp/1516760632644.png?Expires=1516765216&OSSAccessKeyId=TMP.AQHugnu6EoynL7XR0r6j6dxpCZNyX1b7e3_6WZeD5KOBYn9rC2cNzRheIdhGADAtAhUAxIihf4XROCRw-q4yXG0rGHTQTGcCFAUoCYB0ZWJMdYjMfCOClx3RqVym&Signature=dAMBTB9oZisNFxDQ9RWxmdrmraU%3D',
            videoUrl: 'http://new-saas.oss-cn-hangzhou.aliyuncs.com/tpsp/1516760661079.mp4?Expires=1516765240&OSSAccessKeyId=TMP.AQHugnu6EoynL7XR0r6j6dxpCZNyX1b7e3_6WZeD5KOBYn9rC2cNzRheIdhGADAtAhUAxIihf4XROCRw-q4yXG0rGHTQTGcCFAUoCYB0ZWJMdYjMfCOClx3RqVym&Signature=D7Gp9ZQx9bDPUu8IwrqgYSuetkg%3D',
            choosed: true,
          },
          {
            name: '全膝俯卧撑',
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
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
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            videoUrl: '',
            choosed: false,
          },
          {
            name: '全膝俯卧撑',
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            videoUrl: '',
            choosed: false,
          }
        ]
      }
    ],

    courseShare: false,
    courseShareSuccess: false,

    // 浏览视频
    videoIconUrl: '../../../images/icon/delete_back.png',
    showVideoHidden: true,
    videoIndex: 1,
    videoUrlsBrowse: [
      {
        name: '',
        url: 'http://new-saas.oss-cn-hangzhou.aliyuncs.com/tpsp/1516760661079.mp4?Expires=1516765240&OSSAccessKeyId=TMP.AQHugnu6EoynL7XR0r6j6dxpCZNyX1b7e3_6WZeD5KOBYn9rC2cNzRheIdhGADAtAhUAxIihf4XROCRw-q4yXG0rGHTQTGcCFAUoCYB0ZWJMdYjMfCOClx3RqVym&Signature=D7Gp9ZQx9bDPUu8IwrqgYSuetkg%3D'
      },
      {
        name: '',
        url: 'http://xiqingfengbao-sp.oss-cn-hangzhou.aliyuncs.com/qd-sp/1515403272068.mp4?Expires=1516280515&OSSAccessKeyId=LTAIGdDLarpYm7lf&Signature=bS2Rrvs88iD%2FoTY%2BO6TpWtasu38%3D'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.initWeSwiper(this.data.videoUrlsBrowse);

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
      if (result.length > 0) {
        // this.setData({
        //   courseTrainingList: minedata.formatCourseTraining(result.result)
        // })
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