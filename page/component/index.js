var util = require('../../util/util.js');
Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '移动办公',
      path: 'page/component/index'
    }
  },/*下拉刷新 */
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    })
    console.log(time)
  },
  data: {
    list: [
      {
        id: 'view',
        name: '公告1...',
        open: false,
        isRead: false,
        //pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
      }, {
        id: 'content',
        name: '公告2...',
        open: false,
        isRead: false,
        //pages: ['text', 'icon', 'progress', 'rich-text']
      }, {
        id: 'form',
        name: '公告3...',
        open: false,
        isRead: false,
        //pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea', 'editor']
      }, {
        id: 'nav',
        name: '公告4...',
        open: false,
        isRead: false,
        //pages: ['navigator']
      }, {
        id: 'media',
        name: '公告5...',
        open: false,
        isRead: false,
        //pages: ['image', 'audio', 'video', 'camera']
      }, {
        id: 'map',
        name: '公告6...',
        open: false,
        isRead: false,
        //pages: ['map']
      }, {
        id: 'canvas',
        name: '公告7...',
        open: false,
        isRead: false,
        //pages: ['canvas']
      }, {
        id: 'open',
        name: '公告8...',
        open: false,
        isRead: false,
        //pages: ['ad', 'open-data', 'web-view']
      }
    ]
  },
  
  onPullDownRefresh: function() {
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
