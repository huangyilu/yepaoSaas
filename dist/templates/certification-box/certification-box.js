import {
  assign, get
}
  from '../../utils/npm/lodash-wx';

import * as homeService from '../../services/home-service';
import * as homedata from '../../utils/homedata-format';
import * as AuthService from '../../services/auth-service';


let parent
let parentDataKey
let mytimer

export default {
  setParent(p) {
    parent = p
  },
  getParent() {
    return parent
  },
  data() {
    return {
      reminTitle: '会员认证',
      // 输入框 输入的手机号码
      memTelephone: '',
      telephoneCode: '',
      // 输入框 的水印
      placeholderText: '请输入会员手机号',
      // 验证码 文字 和倒计时
      codeText: '',
      codeNum: 60,
      // 门店 列表
      gymList: [],
      gym: '',
      // 是否显示 输入手机号 界面 true 显示,fale 隐藏手机号界面 （显示门店列表界面）
      isGYMListHidden: false,

      // 是否允许再次发送验证码
      isAollowCodeTap: true,
      // 会员认证
      isCertificationMem: false,
      isCertificationMemHidden: true,

      // 确定 验证 会员手机号
      isConfiMemPhone: true,
      // 确定 验证码
      isConfiCode: false,
      // 确定 门店
      isConfiGym: false,
      // 门店 是否隐藏 
      isGYMListHidden: false
    }
  },
  listeners() {
    return {
      // 输入框 获取输入的 手机号/验证码
      bindCerMemInput(e) {
        if (parent.data[parentDataKey].codeText != '') {
          parent.data[parentDataKey].telephoneCode = e.detail.value;
        } else {
          parent.data[parentDataKey].memTelephone = e.detail.value;
        }
      },
      // 获取验证码 点击按钮
      bindGetPhoneCodeTap: (e) => {

        // 倒计时
        if (parent.data[parentDataKey].isAollowCodeTap) {

          this.setThisData({
            name: 'placeholderText',
            data: '请输入验证码'
          })
          this.setTimeOutPhoneCode(this);
          this.sendCodeMessage();
        }

      },
      // 门店 列表 选择
      bindGymCellTap: (e) => {
        var gymList = parent.data[parentDataKey].gymList;
        var index = e.currentTarget.id;

        gymList.forEach(item => {
          item.checked = false;
        })
        gymList[index].checked = true;

        this.setThisData({
          name: 'gymList',
          data: gymList
        })
        this.setThisData({
          name: 'gym',
          data: gymList[index].gym
        })

      },
      // 取消 按钮
      bindCancelBoxBtnTap: (e) =>  {

        this.setThisData({
          name: 'isCertificationMem',
          data: false
        })
        this.setThisData({
          name: 'isCertificationMemHidden',
          data: true
        })

      },
      // 确认 按钮
      bindConfirmBoxBtnTap: (e) => {

        // 1、确定验证 会员
        if (parent.data[parentDataKey].isConfiMemPhone) {
          this.confirmCertification();
        }

        // 2、确定 验证 验证码
        if (parent.data[parentDataKey].isConfiCode) {
          this.confirmPhoneCode();
          clearTimeout(mytimer);
        }

        // 3、确定门店
        if (parent.data[parentDataKey].isConfiGym) {
          this.confirmNewMemInfo();
        }

      },
    }
  },
  bindData(pageOptions, dataKey = 'certificationBoxData', data) {
    parentDataKey = dataKey
    pageOptions.data[dataKey] = assign(this.data(), data)
  },
  bindListeners(pageOptions, listeners) {
    assign(pageOptions, this.listeners(), listeners)
    let onReady = pageOptions.onReady;
    let onShow = pageOptions.onShow;
    let onHide = pageOptions.onHide;
    let me = this;
    pageOptions.onReady = function (options) {

      console.log('##called certificationbox. onReady' )
      onReady && onReady.call(this, options)
      // 查询是否认证会员
      me.getCertifiMem(this);
    }
    pageOptions.onHide = function (options) {
      me.setThisData({
        name: 'isCertificationMemHidden',
        data: true
      })
      onHide && onHide.call(this, options)
      console.log('##called certificationbox. onHide')
    }
  },
  setThisData(newData) {
    let data = {}
    data[parentDataKey] = {
      // 会员认证
      isCertificationMem: newData.name == 'isCertificationMem' ? newData.data : parent.data[parentDataKey].isCertificationMem,
      // 是否 进行 会员认证
      isCertificationMemHidden: newData.name == 'isCertificationMemHidden' ? newData.data : parent.data[parentDataKey].isCertificationMemHidden,
      memTelephone: newData.name == 'memTelephone' ? newData.data : parent.data[parentDataKey].memTelephone,
      telephoneCode: newData.name == 'telephoneCode' ? newData.data : parent.data[parentDataKey].telephoneCode,
      reminTitle: newData.name == 'reminTitle' ? newData.data : parent.data[parentDataKey].reminTitle,
      codeText: newData.name == 'codeText' ? newData.data : parent.data[parentDataKey].codeText,
      placeholderText: newData.name == 'placeholderText' ? newData.data : parent.data[parentDataKey].placeholderText,
      // cerInputNum: newData.name == 'cerInputNum' ? newData.data : parent.data[parentDataKey].cerInputNum,
      codeNum: newData.name == 'codeNum' ? newData.data : parent.data[parentDataKey].codeNum,
      isAollowCodeTap: newData.name == 'isAollowCodeTap' ? newData.data : parent.data[parentDataKey].isAollowCodeTap,
      gymList: newData.name == 'gymList' ? newData.data : parent.data[parentDataKey].gymList,
      gym: newData.name == 'gym' ? newData.data : parent.data[parentDataKey].gym,

      // 确定 验证 会员手机号
      isConfiMemPhone: newData.name == 'isConfiMemPhone' ? newData.data : parent.data[parentDataKey].isConfiMemPhone,
      // 确定 验证码
      isConfiCode: newData.name == 'isConfiCode' ? newData.data : parent.data[parentDataKey].isConfiCode,
      // 确定 门店
      isConfiGym: newData.name == 'isConfiGym' ? newData.data : parent.data[parentDataKey].isConfiGym,
      // 门店 是否隐藏 
      isGYMListHidden: newData.name == 'isGYMListHidden' ? newData.data : parent.data[parentDataKey].isGYMListHidden
    }
    parent.setData(data)
  },

  // 检查是否认证会员
  getCertifiMem(that) {
    if (AuthService.getMemberInfo()) {
      that.setData({
        isCertificationMem: true
      })
      console.log('##已认证会员');
      parent.getCertifiMem();
    } else {
      console.log('##未认证会员');
    }
  },
  // 确定认证
  confirmCertification() {
    AuthService.queryCertificationMember(parent.data[parentDataKey].memTelephone).then((result) => {

      this.setThisData({
        name: 'isCertificationMemHidden',
        data: true
      })
      this.setThisData({
        name: 'isCertificationMem',
        data: true
      })
      parent.getCertifiMem();

    }).catch((error) => {

      if (error.errMsg == 'request:fail') {

      } else {

        this.setThisData({
          name: 'reminTitle',
          data: '您还不是会员！'
        })
        this.setThisData({
          name: 'placeholderText',
          data: '请输入验证码'
        })
        // this.setThisData({
        //   name: 'cerInputNum',
        //   data: ''
        // })
        this.setThisData({
          name: 'isConfiMemPhone',
          data: false
        })
        this.setThisData({
          name: 'codeText',
          data: '获取验证码'
        })
        
      }

      console.log(error);
    })
  },
  setTimeOutPhoneCode(that) {
    var codeNum = parent.data[parentDataKey].codeNum;

    if (codeNum == 0) {

      this.setThisData({
        name: 'isAollowCodeTap',
        data: true
      })
      this.setThisData({
        name: 'codeText',
        data: '重新发送'
      })
      this.setThisData({
        name: 'codeNum',
        data: 60
      })
      
    } else {

      codeNum--;
      this.setThisData({
        name: 'isAollowCodeTap',
        data: false
      })
      this.setThisData({
        name: 'codeText',
        data: codeNum + 's'
      })
      this.setThisData({
        name: 'codeNum',
        data: codeNum
      })
      mytimer = setTimeout(function () {
        that.setTimeOutPhoneCode(that)
      }, 1000)
    }  
  },
  // 发送手机验证码
  sendCodeMessage() {

    homeService.queryPhoneCode(parent.data[parentDataKey].memTelephone).then((result) => {

      this.setThisData({
        name: 'isConfiCode',
        data: true
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  confirmPhoneCode() {

    homeService.uploadPhoneCode(parent.data[parentDataKey].telephoneCode, parent.data[parentDataKey].memTelephone).then((result) => {

      this.setThisData({
        name: 'isConfiGym',
        data: true
      })
      this.setThisData({
        name: 'isConfiCode',
        data: false
      })

      // 获取 gym list 
      this.getGYMList();

    }).catch((error) => {
      console.log(error);
    })
  },
  getGYMList() {

    homeService.queryGYMList().then((result) => {

      this.setThisData({
        name: 'gymList',
        data: homedata.formatGYMList(result.gymList)
      })
      this.setThisData({
        name: 'isGYMListHidden',
        data: true
      })

    }).catch((error) => {
      console.log(error);
    })

  },
  confirmNewMemInfo() {
    var infoDic = {};
    infoDic.memTelephone = parent.data[parentDataKey].memTelephone;
    infoDic.gym = parent.data[parentDataKey].gym;

    homeService.uploadNewMem(infoDic).then((result) => {

      this.setThisData({
        name: 'isCertificationMem',
        data: true
      })
      this.setThisData({
        name: 'isCertificationMemHidden',
        data: true
      })

      // 保存 会员信息
      AuthService.saveMemberInfo(result.newMem);

    }).catch((error) => {
      console.log(error);
    })
  },
}
