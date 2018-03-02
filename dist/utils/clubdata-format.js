
import moment from './npm/moment';

// 判断 日期 属于 今天 昨天 不是今年
export function formatDifferentTypesDate(oldStr) {
  // +timeStr
  var newStr = '';
  var nowStr = moment().format('YYYY-MM-DD');

  var isBeforeToday = moment(oldStr).isBefore(nowStr);
  var isBeforeThisYear = moment(oldStr).isBefore(nowStr, 'year');

  if (isBeforeToday) {
    newStr = moment(oldStr).format('MM-DD');
  } else {
    newStr = moment(oldStr).format('HH:mm');
  }
  if (isBeforeThisYear) {
    newStr = moment(oldStr).format('YYYY-MM-DD');
  }
  console.log('newStr ... ' + newStr);
  return newStr;
}

// 俱乐部 首页
export function formatClubList(list, clubList) {
  list.forEach(item => {
    clubList.push({
      titleImg: item.pic_url,
      deadline: this.formatDifferentTypesDate(item.end_time),
      status: FORMATCLUBSTATU[item.state],
      title: item.title ? item.title : '',
      totalPeople: item.num,
      nowPeople: item.reserveNum
    });
  })
  return clubList
}

export const FORMATCLUBSTATU = {
  'start' : '已开始',
  'ready' : '预售中',
  'end' : '已结束',
  'join': '已参加'
}

// 俱乐部 动态
export function formatClubDynamicsList(list) {
  return list.map(item => this.formatClubDynamicsListItem(item))
}
export function formatClubDynamicsListItem(item) {
  return {
    id: 1,
    title: '健美的要点',
    titleImg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    content: '不管你是想要减肥、增重、增肌、增强体能肌力，踏出第一步的时候都面对...',
    time: '2017-12-12 10:34',
    author: '王艳',
    // goodNum: 111,
    isGoodSelected: true
  }
}