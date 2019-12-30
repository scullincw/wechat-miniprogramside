const app = getApp()

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
    if(inputVal.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if(inputVal.message == '') {
      wx.showToast({
        title: '请输入请假理由',
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
        appType: 1,
        applicant: inputVal.name,
        appContent: inputVal.message
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

  /**监听签到按钮是否被点击 */
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
