// pages/mine/myMember/infoTransfer.js

import * as minedata from '../../utils/minedata-format';
import * as mineService from '../../services/mine-service';
import { Base64 } from '../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmText: '确定将选择的会员移交给马敏吗？',
    confirmBoxHidden: true,
    
    infoTranList: [],

    infoTransferSelectMem: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // 查询 会员列表
    mineService.queryMems().then((result) => {

      console.log('queryMems *** ' + JSON.stringify(result));
      this.setData({
        infoTranList: minedata.formatInfoTransfer(result.memList)
      })

    }).catch((error) => {
      console.log(error);
    })

  
  },
  onShow: function (options) {
    var meminfo = wx.getStorageSync('infoTransferSelectMem');
    if (meminfo) {
      console.log('infoTransferSelectMem .. ' + JSON.stringify(meminfo));
      this.setData({
        infoTransferSelectMem: meminfo
      })
      wx.removeStorage({
        key: 'infoTransferSelectMem',
      })
    }
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
  // bindAverageTap (e) {

  //   this.setData({
  //     confirmBoxHidden: false
  //   })

  // },
  // 指定移交 去选择 会员 指定移交
  bindSpecifiedTap (e) {

    var infoTranList = this.data.infoTranList;
    var isSelectMem = false;
    var selectMems = [];
    infoTranList.forEach(item => {
      if (item.checked) {
        selectMems.push(item);
        isSelectMem = true;
      }
    })

    let qsSetMems = Base64.encodeURI(JSON.stringify(selectMems)); 

    if (isSelectMem) {
      wx.navigateTo({
        url: 'selectedMem?qsSetMems=' + qsSetMems,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择会员！',
      })
    }

  }

})