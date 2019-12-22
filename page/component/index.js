var util = require('../../util/util.js');
const app = getApp()


Page({
  data: {
    date: '',
    isAdmin: true,
    currentBillboardId: 1,
    billboardList: [],
  },

  onLoad() {
    let date = new Date()
    this.setData({
      date: date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
    })
    
    this.getBillboard()
  },

  /*从服务端获取公告列表*/
  getBillboard() {
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
        let list = res.data.data
        //更新列
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          var time = item.createTime
          time = time.substring(0, 4) + "年" + time.substring(5, 7) + "月" + time.substring(8, 10) + "日 "/* + time.substring(11, 19)*/
          item.createTime = time
          item.open = false //默认公告不打开详情

          if (item.isRead == undefined) {
            //如果是初次加载，将所有通知标为未读
            item.isRead = false
          } else {
            //如果不是初次加载，保存公告的已读状态
            item.isRead = this.data.billboardList[i].isRead
          }
        }
        //刷新数据
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

  goToEditPage(){
    wx.navigateTo({
      url: '/page/component/pages/edit/edit',
    })
  },

  /*下拉刷新 */
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getBillboard(false) //获取列表
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  
  /*点击公告展开详情*/
  kindToggle(e) {
    const id = e.currentTarget.id //当前点击公告的id
    this.setData({
      currentBillboardId: id
    })
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
  },

  /*删除公告*/
  onDeleteBillboard(e) {
    console.log(e.currentTarget.id)
    //保存本地的公告已读状态
    let readList = []
    let billboardList = this.data.billboardList
    for(let i = 0; i < billboardList.length; i++) {
      let item = billboardList[i]
      if(item.isRead & item.id != e.currentTarget.id) {
        readList.push({
          id: item.id,
          isRead: item.isRead
        })
      }
    }
    //console.log(readList)

    //向服务端请求删除公告
    app.post(
      'deleteBillboard',
      {
        openid: wx.getStorageSync('openid'),
        skey: wx.getStorageSync('skey'),
        id: e.currentTarget.id
      }
    )
    .then(res => {
      let responseList = res.data.data
      //更新列
      for (let i = 0; i < responseList.length; i++) {
        let item = responseList[i]
        var time = item.createTime
        time = time.substring(0, 4) + "年" + time.substring(5, 7) + "月" + time.substring(8, 10) + "日 "/* + time.substring(11, 19)*/
        item.createTime = time
        item.open = false //默认公告不打开详情
        item.isRead = false //首先将所有公告设为未读
      }
      //恢复公告的已读状态
      for (let i = 0; i < readList.length; i++) {
        responseList[readList[i].id].isRead = readList[i].isRead
      }
      console.log(responseList)

      //刷新数据
      this.setData({
        billboardList: responseList
      })
    })

  }
})
