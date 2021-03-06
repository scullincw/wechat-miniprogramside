// page/API/pages/animation/animation.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forminput: '',
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

    //提交到服务端
    app.post(
      'addApplication',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
        appType: 3,
        applicant: inputVal.name,
        appContent: inputVal.message,
        additionalContent: inputVal.money
      }
    )
      .then(res => {
        console.log(res)
      })

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
})