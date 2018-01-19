// pages/mine/courseShare/courseShareDetails.js

import weSwiper from '../../../utils/weSwiper/weSwiper.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightItemHidden: true,

    shareDetailList: [
      {
        ishidden: false,
        time: '12:10',
        details: [
          {
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            name: '俯撑开合跳'
          },
          {
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            name: '俯撑开合跳'
          }
        ]
      },
      {
        ishidden: false,
        time: '12:10',
        details: [
          {
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            name: '俯撑开合跳'
          },
          {
            imgUrl: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
            name: '俯撑开合跳'
          }
        ]
      }
    ],

    // 浏览视频
    videoIconUrl: '../../../images/icon/delete_back.png',
    showVideoHidden: true,
    videoIndex: 1,
    videoUrlsBrowse: [
      {
        name: '',
        url: 'http://xiqingfengbao-sp.oss-cn-hangzhou.aliyuncs.com/qd-sp/1515403272068.mp4?Expires=1516332176&OSSAccessKeyId=LTAIGdDLarpYm7lf&Signature=j92EmKs9sPB7lmujSWhpmS9r6fs%3D'
      },
      {
        name: '',
        url: 'http://xiqingfengbao-sp.oss-cn-hangzhou.aliyuncs.com/qd-sp/1515403272068.mp4?Expires=1516332176&OSSAccessKeyId=LTAIGdDLarpYm7lf&Signature=j92EmKs9sPB7lmujSWhpmS9r6fs%3D'
      }
    ],

    videoContext: null
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
  // 视频播放结束 播放下一个视频 -- 
  bindVideoPalyEnded(e) {

    var index = +e.currentTarget.id;
    if (index < this.data.videoUrlsBrowse.length - 1) {
      index = index + 1;
      this.videoContext = wx.createVideoContext('' + index);
      this.videoContext.play();
      this.weswiper.slideTo(index);
      console.log('bindVideoPalyEnded ...' + index);
    }
    
    console.log(' ... end');

  },
  bindCloseVideoShowTap(e) {

    this.setData({
      showVideoHidden: true
    })

  },

  bindVideoCellTap (e) {
    var index = e.currentTarget.id;

    this.setData({
      showVideoHidden: false
    })
    this.weswiper.slideTo(+index);
    this.videoContext = wx.createVideoContext(index);
    this.videoContext.play();

  }

})