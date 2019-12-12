// pages/register/register.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}  //输入的用户数据
  },

  onSubmit: function (e) {
    this.data.user = e.detail.value;
    var userObj = this.data.user;

    //检查注册信息的合法性
    if (userObj.account == '' || userObj.tel == '') {
      wx.showToast({
        icon: 'none',
        title: '用户信息不能为空',
        duration: 2000,
      })
    }
    else if (userObj.tel.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '手机号必须为11位',
        duration: 2000,
      })
    }
    else if (userObj.pwd1 == '' || userObj.pwd2 == '') {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
        duration: 2000,
      })
    }
    else if (userObj.pwd1 != userObj.pwd2) {
      wx.showToast({
        icon: 'none',
        title: '两次输入密码不一致',
        duration: 2000,
      })
    }
    else {
      //注册信息合法，发送注册请求
      app.post(
        'register',
        {
          phone: userObj.tel,
          password: userObj.pwd1,
          UUID: wx.getStorageSync('uuid'),
          businesstype: '1'
        }
      )
        .then(res => {
          //注册完成后自动登录
          wx.setStorage({
            key: 'loginInfo',
            data: {
              'token': res.data.token, //登陆令牌，注册完后自动完成登陆
              'timestamp': res.data.timestamp, //登录时间戳
            }
          })

          //跳转到用户页
          wx.setStorageSync('phone', userObj.tel)
          wx.switchTab({
            url: '../user/index/index',
          })
        })
        .catch(data => {
          if (data.code == -1) {
            wx.showToast({
              icon: 'none',
              title: '该账号已注册，请登录',
              duration: 2000,
            })
            wx.redirectTo({
              /**
               * @TO-DO
               * 这里路由把手机的值传过去，可设置自动输入
               */
              url: '../login/login?phone=' + userObj.tel
            })
          }
          else {
            wx.showToast({
              icon: 'none',
              title: '注册失败，请重试',
              duration: 2000,
            })
          }
        })
    }

  },

  login: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})