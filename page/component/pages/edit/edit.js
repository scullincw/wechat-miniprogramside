// page/component/pages/edit/edit.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formInput: ''
  },

  onSubmit(e) {
    const input = e.detail.value
    //检查表单内容
    if (input.title == '') {
      wx.showToast({
        title: '请输入公告标题',
        icon: 'none'
      })
      return
    }
    if (input.content == '') {
      wx.showToast({
        title: '请输入公告内容',
        icon: 'none'
      })
      return
    }

    //提交公告到服务端
    app.post(
      'addBillboard',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
        title: input.title,
        content: input.content
      }
    )
      .then(res => {
        wx.showToast({
          title: '提交成功',
        })
        //清空表单填写内容
        this.setData({
          formInput: ''
        })
      })
      .catch(data => {
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        })
        console.log(data)
      })
    
    //返回公告界面
    wx.navigateBack({
      delta: 1
    })
  }
})