// pages/home/home.js

import * as AuthService from '../../services/auth-service';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 会员认证
    isCertificationMem: false,
    isCertificationMemHidden: true,
    memTelephone: '',
    reminTitle: '会员认证',
    codeText: '',
    placeholderText: '请输入会员手机号',
    getCode: false,
    isGYMListHidden: false,
    cerInputNum: '',
    codeNum: 60,
    isAollowCodeTap: true,
    gymList: [
      {
        name: '苏州也跑旗舰店',
        checked: true
      },
      {
        name: '苏州也跑狮山店',
        checked: false
      },
      {
        name: '苏州也跑园区店',
        checked: false
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function (options) {
    // 查询是否认证会员
    this.getCertifiMem();
  },

  bindNavigatorTap(e) {
    var url = e.currentTarget.id;

    if (!this.data.isCertificationMem) {
      this.setData({
        isCertificationMemHidden: false
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },

  // 查询是否认证会员
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('已认证会员');
    } else {
      console.log('未认证会员');
    }
  },
  //会员认证 取消/确认
  bindConfirmBoxBtnTap(e) {
    var id = e.currentTarget.id;
    if (id == 'a') {

      if (this.data.getCode) {

        // 获取验证码 并验证后 下一步获取门店列表 并做选择

        // 验证 验证码是否正确
        // if (this.data.memTelephone != '') {
          this.confirmPhoneCode();
        // } else {

        // }
        

      }  else {
        // 确定认证
        this.confirmCertification();
      }

    } else {
      // 取消
      this.setData({
        isCertificationMemHidden: true
      })
    }


  },
  // 点击发送验证码
  bindGetPhoneCodeTap() {

    this.setData({
      getCode: true,
      placeholderText: '请输入验证码'
    })

    // 倒计时
    if (this.data.isAollowCodeTap) {
      this.setTimeOutPhoneCode(this);
      this.sendCodeMessage();
    }
    
  },
  setTimeOutPhoneCode(that) {
    var codeNum = this.data.codeNum;

    if (codeNum == 0) {
      this.setData({
        isAollowCodeTap: true,
        codeText: '重新发送',
        codeNum: 60
      })
    } else {
      codeNum--;
      this.setData({
        isAollowCodeTap: false,
        codeText: codeNum + 's',
        codeNum: codeNum
      })
      setTimeout(function () {
        that.setTimeOutPhoneCode(that)
      }, 1000)
    }  
  },
  // 发送手机验证码
  sendCodeMessage() {
    
    homeService.queryPhoneCode(this.data.memTelephone).then((result) => {

      // 发送成功后
      this.setData({
        getCode: true
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  confirmPhoneCode() {
    
    homeService.uploadPhoneCode(this.data.memTelephone).then((result) => {

      this.setData({
        isGYMListHidden: true
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  // 确定认证
  confirmCertification() {
    // 确定 认证
    AuthService.queryCertificationMember(this.data.memTelephone).then((result) => {

      this.setData({
        isCertificationMemHidden: true,
        isCertificationMem: true
      })

    }).catch((error) => {

      this.setData({
        reminTitle: '您还不是会员！',
        codeText: '获取验证码',
        placeholderText: '请输入验证码',
        cerInputNum: ''
      })

      console.log(error);
    })
  },

  // 新注册会员 门店选择
  bindGymCellTap(e) {
    var gymList = this.data.gymList;
    var index = e.currentTarget.id;
    gymList.forEach(item => {
      item.checked = false;
    })
    gymList[index].checked = true;
    this.setData({
      gymList: gymList
    })
  },

  bindCerMemInput(e) {
    this.setData({
      memTelephone: e.detail.value
    })
  }
})