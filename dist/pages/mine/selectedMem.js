// pages/mine/myMember/selectedMem.js
import * as minedata from '../../utils/minedata-format';
import * as mineService from '../../services/mine-service';
import { Base64 } from '../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],

    confirmText: '',
    confirmBoxHidden: true,

    // 上一页所选会员
    mems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.qsSetMems) {
      let qsmems = Base64.decode(options.qsSetMems);
      this.setData({
        mems: JSON.parse(qsmems)
      })
      console.log('选择的会员 ... ' + JSON.stringify(this.data.mems));
    }

  },

  bindTextInputConfirm(e) {
    // 查询 会籍列表
    mineService.queryMcs(e.detail.value).then((result) => {

      console.log('queryMcs *** ' + JSON.stringify(result));
      this.setData({
        searchList: minedata.formatInfoTransferSelectMem(result.mcList)
      })

    }).catch((error) => {
      this.setData({
        searchList: []
      })
      console.log(error);
    })
  },

  bindSearchItemTap(e) {
    var index = +e.currentTarget.id;
    var searchList = this.data.searchList;

    console.log('searchList[index] .. ' + JSON.stringify(searchList[index]));

    // 保存所选 会籍
    // wx.setStorageSync('infoTransferSelectMem', searchList[index]);

    // 弹窗询问是否确定
    this.setData({
      confirmText: '确定将选择的会员移交给' + searchList[index].name + '吗？',
      confirmBoxHidden: false
    })

  },

  bindConfirmBoxBtnTap(e) {
    var id = e.currentTarget.id;
    if (id == 'a') {
      // 确定
      // AuthService.queryCertificationMember(this.data.memTelephone).then((result) => {

        this.setData({
          confirmBoxHidden: true
        })

        wx.navigateBack({
          delta: 1
        })

      // }).catch((error) => {
      //   console.log(error);
      // })

    } else {
      // 取消
      this.setData({
        confirmBoxHidden: true
      })
    }
  }

})