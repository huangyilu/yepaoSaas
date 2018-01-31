

// 在线购卡
export function formatBuyMemCard(list) {
  return list.map(item => this.formatBuyMemCardItem (item))
}
export function formatBuyMemCardItem(item) {
  return {
    bgimg: item.picUrlString ? item.picUrlString : '',
    carPrice: item.fee ? +item.fee : 0,
    carName: item.card_name ? item.card_name : '',
    checked: false
  }
}

// 我的会员卡
export function formatMyMemCard(list) {
  return list.map(item => this.formatMyMemCardItem(item))
}
export function formatMyMemCardItem(item) {
  return {
    cardId: item.id ? item.id : '', 
    bgimg: item.picUrlString ? item.picUrlString : '',
    carType: item.cardTypeString ? item.cardTypeString : '',
    carName: item.card_name ? item.card_name : ''
  }
}

// 会员卡详情
export function formatMyMemCardDetails(item) {
  return {
    bgimg: '../../images/icon/home/car/card_bg.png',
    carPrice: 1000,
    carName: '一年卡',
    carType: '年卡',
    timeLeft: '365',
    effectiveTime: '2019.01.09',
    openingTime: '2018.01.09'
  }
}

// 私人教练 buy_times,remain_times,teacherName,teacherPhone,remainDays,card_name
export function formatPersonalTrainer(list) {
  return list.map(item => this.formatPersonalTrainerItem(item))
}
export function formatPersonalTrainerItem(item) {
  return {
    headImg: item.picUrlString ? item.picUrlString : '',
    coachName: item.teacherName ? item.teacherName : '',
    className: item.card_name ? item.card_name : '',
    remainTimes: item.remain_times ? item.remain_times : 0,
    buyTimes: item.buy_times ? item.buy_times : 0,
    remainDays: item.remainDays ? item.remainDays : 0,
    telephone: item.teacherPhone ? item.teacherPhone : 0
  }
}

// 推荐课程
export function formatRecommendCourse(list) {
  return list.map(item => this.formatRecommendCourseItem(item))
}
export function formatRecommendCourseItem(item) {
  return {
    headimg: item.headUrlString ? item.headUrlString : '',
    courseName: item.card_name ? item.card_name : '',
    price: item.app_amt ? item.app_amt : 0,
    courseTime: item.times ? item.times : 0
  }
}

// 课程表
export function formatClassSchedule(list) {
  return list.map(item => this.formatClassScheduleItem(item))
}
export function formatClassScheduleItem(item) {
  return {
    classImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    className: '肚皮舞',
    classTime: '10:00-11:00',
    teacherName: '藏冬雨',
    teacherScore: ['star', 'star', 'star', 'star', ''],
    allowSignUp: 10
  }
}

// 我的约课
export function formatMyClass(list) {
  return list.map(item => this.formatMyClassItem(item))
}
export function formatMyClassItem(item) {
  return {
    headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    className: '肚皮舞',
    classType: '团',
    teacherName: '子不语',
    finishedPeriod: '0',
    totalPeriod: '2',
    classTime: '2018-01-20 14:00-15:00',
    classStatus: '取消团课'
  }
}