// pages/home/classSchedule.js

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
        date: '12.26',
        name: '今天'
      },
      {
        date: '12.26',
        name: '明天'
      },
      {
        date: '12.26',
        name: '后天'
      },
      {
        date: '',
        name: ''
      }
    ],

    courseList: [],

    // 日历

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync();
    this.setData({
      sliderLeft: (res.windowWidth / this.data.navbarTabs.length - sliderWidth) / 2
    })

    // 日历
    this.initDataOnCalendar();
  
  },

  // 点击事件 navbar
  bindNavbarTabTap (e) {

    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    });
  },

  // 日历
  initDataOnCalendar() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);

    var start_date = cur_year + '-' + cur_month + '-' + date.getDate();
    var this_year = cur_year;
    var this_month = cur_month;

    this.setData({
      cur_year,
      cur_month,
      this_year,
      this_month,
      weeks_ch,
      start_date,
      chooseDates: start_date,

      // 默认选的今天
      chooseDay: date.getDate(),
      chooseMonth: cur_month,
      chooseYear: cur_year
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
    
    // let empytGrids = [];
    // if (firstDayOfWeek > 0) {
    //   for (let i = 1; i < firstDayOfWeek; i++) {
    //     empytGrids.push(i);
    //   }
    //   this.setData({
    //     hasEmptyGrid: true,
    //     empytGrids
    //   });
    // } else {
    //   this.setData({
    //     hasEmptyGrid: false,
    //     empytGrids: []
    //   });
    // }

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
    if (lastDayOfWeek >= 1) {
      lastDayOfWeek = 8 - lastDayOfWeek;
      for (var n = 1; n <= lastDayOfWeek; n++) {
        nextMonthDaysGrids.push(n);
      }
      this.setData({
        hasNextMonthGrid: true,
        nextMonthDaysGrids,
      })
    } else if (lastDayOfWeek == 0) {
      this.setData({
        hasNextMonthGrid: true,
        nextMonthDaysGrids: [1],
      }) 
    } else {
      this.setData({
        hasNextMonthGrid: false,
        nextMonthDaysGrids,
      }) 
    }

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
    var firstDayOfWeek = this.getFirstDayOfWeek(year, year);
    var lastMonthDaysGrids = [];

    if (firstDayOfWeek == 0) {
      firstDayOfWeek = 7;
    }
    if (firstDayOfWeek > 1) {
      for (var l=lastMonthDays,i=1 ; i < firstDayOfWeek; l--,i++) {
        lastMonthDaysGrids.push(l);
      }
      lastMonthDaysGrids.reverse();
      this.setData({
        hasLastMonthGrid: true,
        lastMonthDaysGrids,
      })
    } else {
      this.setData({
        hasLastMonthGrid: false,
        lastMonthDaysGrids,
      })
    }





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
      if (!this.data.chooseDay) {
        if (i == dayStr && month == date.getMonth() + 1 && year == date.getFullYear()) {
          choosed = true;
          this.setData({
            oldChooseDayIndex: i - 1
          })
        }
      } else {
        if (i == this.data.chooseDay && month == this.data.chooseMonth && year == this.data.chooseYear) {
          choosed = true;
          this.setData({
            oldChooseDayIndex: i - 1
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
      calculatedays
    });
  },
  
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const calculatedays = this.data.calculatedays;
    var oldChooseDayIndex = this.data.oldChooseDayIndex;
    const date = new Date();

    if (!calculatedays[idx].notOptional) {

      if (oldChooseDayIndex < calculatedays.length - 1) {
        calculatedays[oldChooseDayIndex].choosed = false;
      }
      calculatedays[idx].choosed = true;

      this.setData({
        calculatedays,
        oldChooseDayIndex: idx,
        chooseDates: this.data.cur_year + '-' + this.data.cur_month + '-' + (idx + 1),
        chooseMonth: this.data.cur_month,
        chooseYear: this.data.cur_year,
        chooseDay: idx+1,
      });
    }

  },
  bindCalendarMonthTap (e) {
    var taptype = e.currentTarget.dataset.taptype;
    var newYear = this.data.cur_year;
    var newMonth = this.data.cur_month;

    if (newMonth > 12) {
      newMonth = 1;
    }
    if (taptype == 'pre') {
      if (newMonth != this.data.this_month) {
        newMonth = newMonth - 1;
      }
    } else {
      newMonth = newMonth + 1;
    }
    this.setCalendarMonthYear(newMonth, newYear);
  },
  bindCalendarYearTap (e) {
    var taptype = e.currentTarget.dataset.taptype;
    var newYear = this.data.cur_year;
    var newMonth = this.data.cur_month;

    if (taptype == 'pre') {
      if (newYear != this.data.this_year) {
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
      cur_month: newMonth,
      cur_year: newYear
    });
  },


  // 日历

})