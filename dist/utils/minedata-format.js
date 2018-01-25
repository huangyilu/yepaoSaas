
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
// app_head
export function formatPrivateMemberList(list) {
  return list.map(item => this.formatPrivateMemberListItem(item))
}
export function formatPrivateMemberListItem(item) {
  return {
    memId: item.id,
    name: item.mem_name,
    headimg: item.app_head ? item.app_head : '../../../images/icon/default_headimg.png',
    period: {
      last: 8,
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
