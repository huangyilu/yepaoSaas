// pages/privateMember/courseCustom.js

import moment from '../../utils/npm/moment';
import * as privatedata from '../../utils/privatedata-format';

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

    all: {
      body: '全身',
      selected: true,
    },
    
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
      weekData.push({
        week: privatedata.FORMATNUMTOCHNESE[i],
        day: moment().add(i, 'days').format('DD'),
        selected: false
      })
      if ((i+1) == moment().add(0, 'days').format('E')) {
        weekData[i].selected = true;
      }
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
  }

})