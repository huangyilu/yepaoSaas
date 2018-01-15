

export const FORMATNUMTOCHNESE = {
  '0': '一',
  '1': '二',
  '2': '三',
  '3': '四',
  '4': '五',
  '5': '六',
  '6': '日',
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