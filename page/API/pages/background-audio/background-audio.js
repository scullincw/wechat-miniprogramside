// page/API/pages/background-audio/background-audio.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forminput: '',
    isClick: false,
    block:"文泰楼",
    room:101,
    multiIndex: [0,0],

    array: [['文泰楼', '文波楼', '文澜楼', '文永楼'], ['101', '102', '103', '104', '201', '202', '203', '204', '301', '302', '303', '304']]
  },
  bindMultiPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      block: that.data.array[0][e.detail.value[0]],
      room: that.data.array[1][e.detail.value[1]]
    })
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

    //提交到服务端
    app.post(
      'addApplication',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
        appType: 4,
        applicant: inputVal.name,
        appContent: inputVal.message,
        additionalContent: this.data.block + " " + this.data.room
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