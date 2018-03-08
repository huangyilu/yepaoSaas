// pages/home/home.js

import * as AuthService from '../../services/auth-service';
import * as homeService from '../../services/home-service';
import * as homedata from '../../utils/homedata-format';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 会员认证
    isCertificationMem: false,

    // 是否 进行 会员认证
    isCertificationMemHidden: true,

    memTelephone: '',
    telephoneCode: '',
    reminTitle: '会员认证',
    codeText: '',
    placeholderText: '请输入会员手机号',
    cerInputNum: '',
    codeNum: 60,
    isAollowCodeTap: true,
    gymList: [],

    // 确定 验证 会员手机号
    isConfiMemPhone: true,
    // 确定 验证码
    isConfiCode: false,
    // 确定 门店
    isConfiGym: false,
    // 门店 是否隐藏 
    isGYMListHidden: false

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

      // 1、确定验证 会员
      if (this.data.isConfiMemPhone) {
        this.confirmCertification();
      }

      // 2、确定 验证 验证码
      if (this.data.isConfiCode) {
        this.confirmPhoneCode();
      }

      // 3、确定门店
      if (this.data.isConfiGym) {
        this.confirmNewMemInfo();
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

      // 验证码发送成功
      this.setData({
        isConfiCode: true
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  confirmPhoneCode() {
    
    homeService.uploadPhoneCode(this.data.telephoneCode, this.data.memTelephone).then((result) => {
      
      // 验证码 验证成功
      this.setData({
        isConfiGym: true,
        isConfiCode: false
      })
      // 获取 gym list 
      this.getGYMList();

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
        cerInputNum: '',
        // 认证 会员失败 之后
        isConfiMemPhone: false
      })

      console.log(error);
    })
  },
  getGYMList() {

    homeService.queryGYMList().then((result) => {

      this.setData({
        gymList: homedata.formatGYMList(result.gymList),
        isGYMListHidden: true
      })

    }).catch((error) => {
      console.log(error);
    })

  },
  confirmNewMemInfo() {
    var infoDic = {};
    infoDic.memTelephone = this.data.memTelephone;
    infoDic.gym = this.data.gym;

    homeService.uploadNewMem(infoDic).then((result) => {

      this.setData({
        isCertificationMemHidden: true,
        isCertificationMem: true
      })
      // 保存 会员信息
      AuthService.saveMemberInfo(result.newMem);


    }).catch((error) => {
      console.log(error);
    })
  },

  // 登录 潜客会员 门店选择
  bindGymCellTap(e) {
    var gymList = this.data.gymList;
    var index = e.currentTarget.id;
    gymList.forEach(item => {
      item.checked = false;
    })
    gymList[index].checked = true;
    this.setData({
      gymList: gymList,
      gym: gymList[index].gym
    })
  },

  bindCerMemInput(e) {
    if (this.data.codeText != '') {
      this.setData({
        telephoneCode: e.detail.value
      })
    } else {
      this.setData({
        memTelephone: e.detail.value
      })
    }
  }
})