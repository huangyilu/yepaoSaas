// pages/home/classSchedule.js

import moment from '../../utils/npm/moment';


var sliderWidth = 90; // 需要设置slider的宽度，用于计算中间位置


Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '暂无课程',
    emptyIcon: '../../images/bg_img/no_data.png',

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    navbarTabs: [
      {
        date: '',
        name: '今天'
      },
      {
        date: '',
        name: '明天'
      },
      {
        date: '',
        name: '后天'
      },
      {
        date: '',
        name: ''
      }
    ],

    // 课程列表
    courseList: [
      {
        classImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        className: '肚皮舞',
        classTime: '10:00-11:00',
        teacherName: '藏冬雨',
        teacherScore: ['star', 'star', 'star', 'star',''],
        allowSignUp: 10
      },
      {
        classImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
        className: '肚皮舞',
        classTime: '10:00-11:00',
        teacherName: '藏冬雨',
        teacherScore: ['star', 'star', 'star', 'star', ''],
        allowSignUp: 10
      }
    ],

    // 日历
    calendarData: {
      // 当前显示的年月
      cur_year: '',
      cur_month: '',
      // 今天所在年月
      this_year: '',
      this_month: '',
      // 周 列表
      weeks_ch: '',
      
      // 默认选的今天
      chooseDates: '',
      chooseMonth: '',
      chooseYear: '',
      chooseDay: '',

      // 日期 数组
      calculatedays: [],
      hasNextMonthGrid: '',
      nextMonthDaysGrids: [],
      hasLastMonthGrid: '',
      lastMonthDaysGrids: [],

      // 上次选的日期 的index
      oldChooseDayIndex: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      sliderLeft: (res.windowWidth / this.data.navbarTabs.length - sliderWidth) / 2
    })

    // 日历 初始化
    this.initDataOnCalendar();

    // 前三天 日期 初始化
    this.initTopThreeDate();
  
  },

  // 点击事件 navbar
  bindNavbarTabTap (e) {

    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
  },

  initTopThreeDate() {
    var navbarTabs = this.data.navbarTabs;
    for (var i=0 ; i<3; i++) {
      navbarTabs[i].date = moment().add(i, 'days').format('M.D')
    }
    this.setData({
      navbarTabs: navbarTabs
    })
  },
  // 日历
  initDataOnCalendar() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);

    var chooseDates = cur_year + '-' + cur_month + '-' + date.getDate();
    var this_year = cur_year;
    var this_month = cur_month;

    this.setData({
      'calendarData.cur_year': cur_year,
      'calendarData.cur_month': cur_month,
      'calendarData.this_year': this_year,
      'calendarData.this_month': this_month,
      'calendarData.weeks_ch': weeks_ch,
      'calendarData.chooseDates': chooseDates,

      // 默认选的今天
      'calendarData.chooseDay': date.getDate(),
      'calendarData.chooseMonth': cur_month,
      'calendarData.chooseYear': cur_year
    });
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  getLastDayOfWeek(year, month, day) {
    return new Date(Date.UTC(year, month - 1, day)).getDay();
  },
  calculateEmptyGrids(year, month) {
    
    // 下个月 的天数
    var nextMonth = month;
    var nextYear = year;
    if (month == 12) {
      nextMonth = 1;
      nextYear = year+1;
    } else {
      nextMonth = month + 1;
    }
    var nextMonthDays = this.getThisMonthDays(nextYear, nextMonth);
    //下个月 第一天是周几
    var lastDayOfWeek = this.getFirstDayOfWeek(nextYear, nextMonth);
    var nextMonthDaysGrids = [];
    var hasNextMonthGrid = false;
    if (lastDayOfWeek == 0) {
      lastDayOfWeek = 7;
    }
    if (lastDayOfWeek > 0) {
      lastDayOfWeek = 8 - lastDayOfWeek;
      for (var n = 1; n <= lastDayOfWeek; n++) {
        nextMonthDaysGrids.push(n);
      }
      hasNextMonthGrid = true;
    }

    this.setData({
      'calendarData.hasNextMonthGrid': hasNextMonthGrid,
      'calendarData.nextMonthDaysGrids': nextMonthDaysGrids,
    }) 

    // 上个月 剩几天
    var lastMonth = month;
    var lastYear = year;
    if (month == 1) {
      lastYear = year - 1;
      lastMonth = 12;
    } else {
      lastMonth = month - 1;
    }
    var lastMonthDays = this.getThisMonthDays(lastYear, lastMonth);
    var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    var lastMonthDaysGrids = [];
    var hasLastMonthGrid = false;

    if (firstDayOfWeek == 0) {
      firstDayOfWeek = 7;
    }
    if (firstDayOfWeek > 0) {
      for (var l=lastMonthDays,i=1 ; i < firstDayOfWeek; l--,i++) {
        lastMonthDaysGrids.push(l);
      }
      lastMonthDaysGrids.reverse();
      hasLastMonthGrid = true;
    }

    this.setData({
      'calendarData.hasLastMonthGrid': hasLastMonthGrid,
      'calendarData.lastMonthDaysGrids': lastMonthDaysGrids
    })


  },
  calculateDays(year, month) {
    let calculatedays = [];
    const date = new Date();
    const thisMonthDays = this.getThisMonthDays(year, month);
    var dayStr = date.getDate();
    for (let i = 1; i <= thisMonthDays; i++) {
      var choosed = false;
      var unChecked = false; //false 可以预约

      // 日期
      if (!this.data.calendarData.chooseDay) {
        if (i == dayStr && month == date.getMonth() + 1 && year == date.getFullYear()) {
          choosed = true;
          this.setData({
            'calendarData.oldChooseDayIndex': i - 1
          })
        }
      } else {
        if (i == this.data.calendarData.chooseDay && month == this.data.calendarData.chooseMonth && year == this.data.calendarData.chooseYear) {
          choosed = true;
          this.setData({
            'calendarData.oldChooseDayIndex': i - 1
          })
        }
      }
      // 今天以前不可选 变灰
      if (i < dayStr && month <= date.getMonth() + 1 && year <= date.getFullYear()) {
        unChecked = true;
      }

      calculatedays.push({
        day: i,
        choosed: choosed,
        unChecked: unChecked,
      });

    }

    this.setData({
      'calendarData.calculatedays': calculatedays
    });
  },
  
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const calculatedays = this.data.calendarData.calculatedays;
    var oldChooseDayIndex = this.data.calendarData.oldChooseDayIndex;
    const date = new Date();

    if (!calculatedays[idx].notOptional) {

      if (oldChooseDayIndex < calculatedays.length - 1) {
        calculatedays[oldChooseDayIndex].choosed = false;
      }
      calculatedays[idx].choosed = true;

      this.setData({
        'calendarData.calculatedays': calculatedays,
        'calendarData.oldChooseDayIndex': idx,
        'calendarData.chooseDates': this.data.calendarData.cur_year + '-' + this.data.calendarData.cur_month + '-' + (idx + 1),
        'calendarData.chooseMonth': this.data.calendarData.cur_month,
        'calendarData.chooseYear': this.data.calendarData.cur_year,
        'calendarData.chooseDay': idx+1,
      });
    }

  },
  bindCalendarMonthTap (e) {
    var taptype = e.currentTarget.dataset.taptype;
    var newYear = this.data.calendarData.cur_year;
    var newMonth = this.data.calendarData.cur_month;

    if (newMonth > 12) {
      newMonth = 1;
    }
    if (taptype == 'pre') {
      if (newMonth != this.data.calendarData.this_month) {
        newMonth = newMonth - 1;
      }
    } else {
      newMonth = newMonth + 1;
    }
    this.setCalendarMonthYear(newMonth, newYear);
  },
  bindCalendarYearTap (e) {
    var taptype = e.currentTarget.dataset.taptype;
    var newYear = this.data.calendarData.cur_year;
    var newMonth = this.data.calendarData.cur_month;

    if (taptype == 'pre') {
      if (newYear != this.data.calendarData.this_year) {
        newYear = newYear - 1;
      }
    } else {
      newYear = newYear + 1;
    }
    this.setCalendarMonthYear(newMonth, newYear);
  },
  setCalendarMonthYear(newMonth, newYear) {
    this.calculateDays(newYear, newMonth);
    this.calculateEmptyGrids(newYear, newMonth);

    this.setData({
      'calendarData.cur_month': newMonth,
      'calendarData.cur_year': newYear
    });
  },


  // 日历

})