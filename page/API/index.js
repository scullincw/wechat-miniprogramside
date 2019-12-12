Page({
  onShareAppMessage() {
    return {
      title: '小程序接口能力展示',
      path: 'page/API/index'
    }
  },

  data: {
    list: [
      {
        id: 'api',
        name: '请假',
        open: false,
        url:'action-sheet/action-sheet'
      }, {
        id: 'page',
        name: '出差',
        open: false,
        url:'add-contact/add-contact'
      }, {
        id: 'device',
        name: '报销',
        open: false,
        url:'animation/animation'
      }, {
        id: 'network',
        name: '会议室预约',
        open: false,
        url:'background-audio/background-audio'
      }, {
        id: 'media',
        name: '审批',
        open: false,
        url:'bluetooth/bluetooth'
      }
    ],
    isSetTabBarPage: false,
  },
  onShow() {
    this.leaveSetTabBarPage()
  },
  onHide() {
    this.leaveSetTabBarPage()
  },
  kindToggle(e) {
    const id = e.currentTarget.id; const
      list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  },
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true
    })
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false
    })
  },
})
