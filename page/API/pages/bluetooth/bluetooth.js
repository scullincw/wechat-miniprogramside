var util = require('../../../../util/util.js');
Page({
  onShow() {

  },
  data: {
    forminput: '',
    longitude: 0,
    latitude: 0,
    isClick: false,
    list: [
      {
        id: 'view',
        name: '申请1...',
        open: false,
        isRead: false,
        //pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
      }, {
        id: 'content',
        name: '申请2...',
        open: false,
        isRead: false,
        //pages: ['text', 'icon', 'progress', 'rich-text']
      }, {
        id: 'form',
        name: '申请3...',
        open: false,
        isRead: false,
        //pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea', 'editor']
      }, {
        id: 'nav',
        name: '申请4...',
        open: false,
        isRead: false,
        //pages: ['navigator']
      }, {
        id: 'media',
        name: '申请5...',
        open: false,
        isRead: false,
        //pages: ['image', 'audio', 'video', 'camera']
      }, {
        id: 'map',
        name: '申请6...',
        open: false,
        isRead: false,
        //pages: ['map']
      }, {
        id: 'canvas',
        name: '申请7...',
        open: false,
        isRead: false,
        //pages: ['canvas']
      }, {
        id: 'open',
        name: '申请8...',
        open: false,
        isRead: false,
        //pages: ['ad', 'open-data', 'web-view']
      }
    ]
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

  /*下拉刷新 */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
        list[i].isRead = true
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
