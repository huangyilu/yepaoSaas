

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
    headimg: '../../images/1.jpg',
    period: {
      surplus: 8,
      total: 12
    }
  },
  {
    name: '朱有为',
    headimg: '../../images/1.jpg',
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
    headimg: '../../images/1.jpg',
    period: {
      surplus: 8,
      total: 12
    }
  }
}