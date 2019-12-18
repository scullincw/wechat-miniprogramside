Page({
  onShareAppMessage() {
    return {
      title: '我的',
      path: 'page/cloud/index'
    }
  },

  data: {
    username: '', //微信用户昵称
    avatarUrl: '',  //微信用户头像图片链接地址
    list: [
      {
        id: 'user',
        name: '我的申请',
        open: false,
        pages: [
          {
            zh: '获取 OpenID',
            url: 'user-authentication/user-authentication'
          }
        ]
      }, {
        id: 'database',
        name: '设置',
        open: false,
        pages: [
          {
            zh: '基本操作',
            url: 'crud/crud'
          }, {
            zh: '权限管理',
            url: 'db-permission/db-permission'
          }, {
            zh: '服务端时间',
            url: 'server-date/server-date'
          }
        ]
      }
    ],
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

  onLoad() {
    var userInfo = wx.getStorageSync('userInfo')
    //console.log(userInfo)
    this.setData({
      username: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    })
  },
})
