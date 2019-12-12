// pages/login/login.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onSubmit: function (e) {
    if (e.detail.value.tel == '' || e.detail.value.pwd == '') {
      wx.showToast({
        icon: 'none',
        title: '手机号或密码不能为空',
        duration: 2000,
      })
    }
    else if (e.detail.value.tel.length != 11) {
      wx.showToast({
        icon: 'none',
        title: '手机号必须为11位',
        duration: 2000,
      })
    } else {
      //调用封装后的wx.request请求
      app.post(
        'userLogin',
        {
          phone: e.detail.value.tel,
          password: e.detail.value.pwd,
          UUID: wx.getStorageSync('uuid'),
          businesstype: '1'
        }
      )
        .then(res => {
          //登录成功
          console.log('登录成功')
          wx.setStorageSync('phone', e.detail.value.tel)
          wx.setStorage({
            key: 'loginInfo',
            data: {
              'token': res.data.token,
              'timestamp': res.data.timestamp,
              'focusBrandID': res.data.focusBrandID, //最后一次登陆的品牌（为0或为空时为未登陆）
              'focusShopID': res.data.focusShopID, //最后一次登陆的门店（为0或为空时为未登陆）
              'focusBrandName': res.data.focusBrandName, //最后一次登陆的品牌名
              'focusShopName': res.data.focusShopName  //最后一次登陆的门店名
            }
          })

          //跳转
          wx.switchTab({
            url: '../user/index/index',
          })
        })
        .catch(data => {
          wx.showToast({
            icon: 'none',
            title: '登陆失败，请检查用户名和密码'
          })
        })
    }
  },

  register: function () {
    wx.showToast({
      icon: 'none',
      title: '正在跳转...',
      duration: 3000,
    })
    wx.redirectTo({
      url: '../register/register',
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