// pages/mine/myMember/infoTransfer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText: '确定将选择的会员移交给马敏吗？',
    confirmBoxHidden: true,
    
    infoTranList: [
      {
        checked: false,
        name: '张迪',
        gender: 'boy',
        merchandiser: '马敏',
        merserStatus: '在职'
      },
      {
        checked: true,
        name: '张迪',
        gender: 'girl',
        merchandiser: '马敏',
        merserStatus: '在职'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindInfoCellTap (e) {
    var index = e.currentTarget.id;

    var infoTranList = this.data.infoTranList;
    infoTranList[index].checked = !infoTranList[index].checked;

    this.setData({
      infoTranList: infoTranList
    })

  },

  // 平均移交
  bindAverageTap (e) {

    this.setData({
      confirmBoxHidden: false
    })

  },
  // 指定移交
  bindSpecifiedTap (e) {

  }

})