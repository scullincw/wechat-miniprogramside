
const app = getApp()

Page({
  onLoad() {
    app.post(
      'getApplication',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
      }
    )
      .then(res => {
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          item.isRead = false   //默认未审批
          item.open = false //默认不打开详情
          switch (item.appType) {
            case 1:
              item.typeName = '请假'
              break
            case 2:
              item.typeName = '出差'
              break
            case 3:
              item.typeName = '报销'
              break
            case 4:
              item.typeName = '会议室预约'
              break
          }
        }
        this.setData({
          applicationList: list
        })
      })
  },
  data: {
    applicationList: [],  //申请列表

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

  onSubmit(e) {
    console.log(e)
    const id = e.currentTarget.id //组件id
    let result = e.currentTarget.dataset.result   //审批结果
    let list = this.data.applicationList  //申请列表
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.id == id) {
        item.isRead = true
      }
    }

    this.kindToggle(e)
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.applicationList
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
        //list[i].isRead = true
      } else {
        list[i].open = false
      }
    }
    this.setData({
      applicationList: list
    })
  }
})
