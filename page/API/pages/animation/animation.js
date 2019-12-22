// page/API/pages/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forminput: '',
    longitude: 0,
    latitude: 0,
    isClick: false
  },

  onSubmit: function (e) {
    const inputVal = e.detail.value
    if (inputVal.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if (inputVal.message == '') {
      wx.showToast({
        title: '请输入请假理由',
        icon: 'none'
      })
      return
    }
    if (inputVal.money == '') {
      wx.showToast({
        title: '请输入报销金额',
        icon: 'none'
      })
      return
    }
    this.setData({
      forminput: '',
    })
    wx.showToast({
      title: '提交成功',
    })
  },

  change: function () {
    var click = this.data.click;
    this.setData({
      isClick: true
    })

    wx.showToast({
      title: '提交成功',
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