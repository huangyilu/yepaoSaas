
import moment from './npm/moment';

export const FORMATNUMTOCHNESE = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '日',
}

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

export function formatPrivateMemberList(list) {
  return list.map(item => this.formatPrivateMemberListItem(item))
}
export function formatPrivateMemberListItem() {
  return {
    name: '朱有为',
    headimg: 'http://img2.imgtn.bdimg.com/it/u=3390152407,4060777889&fm=27&gp=0.jpg',
    period: {
      surplus: 8,
      total: 12
    }
  }
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