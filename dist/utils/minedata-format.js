
import moment from './npm/moment';
import { flattenDeep, groupBy } from './npm/lodash-wx';

export const FORMATNUMTOCHNESE = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '日',
}

// 我是教练
export const privateMemberList = [
  {
    name: '朱有为',
    headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    period: {
      surplus: 8,
      total: 12
    }
  },
  {
    name: '朱有为',
    headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    period: {
      surplus: 8,
      total: 12
    }
  }
]
// 私教会员
export function formatPrivateMemberList(list) {
  return list.map(item => this.formatPrivateMemberListItem(item))
}
export function formatPrivateMemberListItem(item) {
  return {
    memId: item.id,
    name: item.mem_name,
    headimg: item.app_head ? item.app_head : '../../../images/icon/default_headimg.png',
    period: {
      last: item.remain_times ? item.remain_times : 0,
      total: item.buy_times ? item.buy_times : 0
    },
    cardName: item.card_name ? item.card_name : ''
  }
}

// 私教会员 -- 资料登记
export function formatMemInfoRegistCards(list) {
  return list.map(item => this.formatMemInfoRegistCardsItem(item))
}
export function formatMemInfoRegistCardsItem(item) {
  return item.card_name
}

// 判断 日期 属于 今天 昨天 不是今年
export function formatDifferentTypesDate (timeStr) {
  // +timeStr 
  var newStr = '';
  var nowStr = moment().format('YYYY-MM-DD');
  var oldStr = moment(+timeStr).format('YYYY-MM-DD');

  var isBeforeToday = moment(oldStr).isBefore(nowStr);
  var isBeforeThisYear = moment(oldStr).isBefore(nowStr, 'year');

  if (isBeforeToday) {
    newStr = moment(oldStr).format('MM-DD');
  } else {
    newStr = moment(+timeStr).format('HH:mm');
  }
  if (isBeforeThisYear) {
    newStr = moment(oldStr).format('YYYY-MM-DD');
  }
  console.log('newStr ... ' + newStr);
  return newStr;
}

// 课程训练
export function formatCourseTraining(item) {
  var courseTrainingList = [];
  courseTrainingList = [
    {
      id: 0,
      title: '热身',
      open: true,
      courseList: item.warmUpMediaList
    },
    {
      id: 1,
      title: '正式训练',
      open: false,
      courseList: item.officialMediaList
    },
    {
      id: 2,
      title: '拉伸',
      open: false,
      courseList: item.stretchMediaList
    }
  ]
  var videoUrlsBrowse = [];
  videoUrlsBrowse.push(item.warmUpMediaList);
  videoUrlsBrowse.push(item.officialMediaList);
  videoUrlsBrowse.push(item.stretchMediaList);

  videoUrlsBrowse = flattenDeep(videoUrlsBrowse);

  return {
    courseTrainingList: courseTrainingList,
    videoUrlsBrowse: videoUrlsBrowse
  }
}


/**课程共享 */
export function formatShareCourseList(list) {
  return list.map(item => this.formatShareCourseListItem(item))
}
export function formatShareCourseListItem(item) {
  return {
    id: item.ptId,
    title: '教练' + item.teacherName + '的课程共享',
    time: this.formatDifferentTypesDate(item.create_date)
  }
}

// 课程共享 详情
export function formatShareCourseDetails(list) {
  var newList = [];
  var videoList = [];
  list.forEach(item => {
    newList.push({
      ishidden: false,
      time: this.formatDifferentTypesDate(item.create_date),
      details: item.mediaUrlList
    })
    videoList.push(item.mediaUrlList);
  })
  videoList = flattenDeep(videoList);

  return {
    courseList: newList,
    videoList: videoList
  }
}

// 我的订单
export function formatMyOrderList(list) {
  return list.map(item => this.formatMyOrderListItem(item))
}
export function formatMyOrderListItem(item) {
  return {
    orderName: '会员卡购买 (一年卡)',
    orderTime: '2018-01-01 18:00',
    orderId: '199372897',
    price: 2000,
    orderStatus: '已付款'
  }
}

// 资料移交
export function formatInfoTransfer(list) {
  return list.map(item => this.formatInfoTransferItem(item))
}
export function formatInfoTransferItem(item) {
  return {
    checked: false,
    name: item.mem_name,
    gender: FORMATGENDER[item.sex],
    memId: item.mem_id
  }
}
export const FORMATGENDER = {
  'male': 'boy',
  'female': 'girl',
}
// 选择会籍 移交
export function formatInfoTransferSelectMem(list) {
  return list.map(item => this.formatInfoTransferSelectMemItem(item))
}
export function formatInfoTransferSelectMemItem(item) {
  return {
    name: item.mem_name,
    headimg: item.appHeadString ? '../../images/icon/default_headimg.png' : item.appHeadString,
    tel: 'tel: ' + this.formatHidPhone(item.phone),
    realTel: item.phone
  }
}
// 电话隐藏 格式转换
export function formatHidPhone(phone) {
   return phone.slice(0, 3) + '****' + phone.slice(7)
}