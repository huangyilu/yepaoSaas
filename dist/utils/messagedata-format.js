
import moment from './npm/moment';

// 判断 日期 属于 今天 昨天 不是今年
export function formatDifferentTypesDate(timeStr) {
  // +timeStr 

  // var newstr = moment(+timeStr).format('X');

  // console.log('' + newstr);

  // var newStr = '';
  // var nowStr = moment().format('YYYY-MM-DD');
  // var oldStr = moment(+timeStr).format('YYYY-MM-DD');

  // var isBeforeToday = moment(oldStr).isBefore(nowStr);
  // var isBeforeThisYear = moment(oldStr).isBefore(nowStr, 'year');

  // if (isBeforeToday) {
  //   newStr = moment(oldStr).format('MM-DD');
  // } else {
  //   newStr = moment(+timeStr).format('HH:mm');
  // }
  // if (isBeforeThisYear) {
  //   newStr = moment(oldStr).format('YYYY-MM-DD');
  // }
  // console.log('newStr ... ' + newStr);
  // return newStr;
}

// 消息列表
export function formatMessageList(list) {
  return list.map(item => this.formatMessageListItem(item))
}
export function formatMessageListItem(item) {
  return {
    newMessNum: item.totalNum,
    mesgId: item.message.id,
    leftImg: CHANGEMESSAGETYPEIMG[item.message.msg_type],
    title: CHANGEMESSAGETYPE[item.message.msg_type],
    content: item.message.msg_content,
    time: this.formatDifferentTypesDate(item.message.send_time)
  }
}

// 消息类型转换
export const CHANGEMESSAGETYPE = {
  'mem_order_grp': '预约团课',
  'mem_reduce_lesson': '消课',
  'mem_order_private': '预约私教课',
  'mem_buy_lesson': '会员购课',
  'mem_buy_card': '会员购卡',
  'mem_fee_hoilday': '付费请假',
  'mem_remove_card': '会员退卡',
}
export const CHANGEMESSAGETYPEIMG = {
  'mem_order_grp': '../../images/icon/message/booking_class.png',
  'mem_reduce_lesson': '../../images/icon/message/fire_class.png',
  'mem_order_private': '../../images/icon/message/private_lessons.png',
  'mem_buy_lesson': '../../images/icon/message/pay_for_buy.png',
  'mem_buy_card': '../../images/icon/message/buy_card.png',
  'mem_fee_hoilday': '../../images/icon/message/pay_leave.png',
  'mem_remove_card': '../../images/icon/message/refund_card.png',
}