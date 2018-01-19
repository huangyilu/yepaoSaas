// pages/myCoach/courseCustom.js

import moment from '../../../utils/npm/moment';
import * as minedata from '../../../utils/minedata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekData:[],
    levelItem: [
      {
        level: '初级',
        selected: false,
      },
      {
        level: '中级',
        selected: true,
      },
      {
        level: '高级',
        selected: false,
      }
    ],

    bodyItem: [
      {
        body: '有氧',
        selected: true,
        styles: ''
      },
      {
        body: '两肩',
        selected: false,
        styles: 'top-left-btn'
      },
      {
        body: '肩臂',
        selected: false,
        styles: 'top-right-btn'
      },
      {
        body: '核心',
        selected: false,
        styles: 'center-btn'
      },
      {
        body: '下半身',
        selected: false,
        styles: 'bottom-left-btn'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 初始化 周历
    this.initWeekCalendar();
  
  },

  // 初始化
  initWeekCalendar () {
    
    var weekData = [];
    for (var i=0; i<7; i++) {
      var w = moment().add(i, 'days').format('E');
      var d = moment().add(i, 'days').format('DD');
      weekData.push({
        week: minedata.FORMATNUMTOCHNESE[w],
        day: d,
        selected: false
      })
      weekData[0].selected = true;
    }
    this.setData({
      weekData: weekData
    })
  },

  // 点击事件
  bindCourseBtnTap (e) {
    var index = e.currentTarget.id;
    var levelItem = this.data.levelItem;
    levelItem.forEach(item => {
      item.selected = false;
      levelItem[index].selected = true;
    })
    this.setData({
      levelItem: levelItem
    })
  },
  bindCalendarTodayTap (e) {
    var index = e.currentTarget.id;
    var weekData = this.data.weekData;
    weekData.forEach(item => {
      item.selected = false;
      weekData[index].selected = true;
    })
    this.setData({
      weekData: weekData
    })
  },
  bindCourseBtnItemTap (e) {
    var index = e.currentTarget.id;
    var bodyItem = this.data.bodyItem;
    bodyItem.forEach(item => {
      bodyItem[index].selected = !bodyItem[index].selected;
    })
    this.setData({
      bodyItem: bodyItem
    })
  },
  bindMakeUpTap (e) {
    // 生成
    wx.navigateTo({
      url: 'courseTraining',
    })
  }

})