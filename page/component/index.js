var util = require('../../util/util.js');
const app = getApp()


Page({

  onLoad: function () {
    let date = new Date()
    this.setData({
      date: date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日"
    })
    
    app.post(
      'getBillboard',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
        currentPageNum: 1,
        rowsPerPage: 5
      }
    )
    .then(res => {
      //请求成功
      //console.log(res.data)

      //将公告列表存到本地
      this.setData({
        billboardList: res.data.data
      })
      let list = this.data.billboardList
      for(let i = 0; i < list.length; i++) {
        let item = list[i]
        var time = item.createTime
        time = time.substring(0, 4) + "年" + time.substring(5, 7) + "月" + time.substring(8, 10) + "日 " + time.substring(11, 19)
        item.createTime = time
        item.open = false
        item.isRead = false
      }
      this.setData({
        billboardList: list
      })
    })
    .catch(data => {
      wx.showToast({
        title: '公告获取失败',
        icon: 'none'
      })
      console.log(data)
    })
  },

  data: {
    date: '',
    billboardList: [],
  },

  goToEditPage:function(){
    wx.navigateTo({
      url: '/page/component/pages/edit/edit',
    })
  },

  /*下拉刷新 */
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
    const list = this.data.billboardList
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
        list[i].isRead = true
      } else {
        list[i].open = false
      }
    }
    this.setData({
      billboardList: list
    })
  }
})
