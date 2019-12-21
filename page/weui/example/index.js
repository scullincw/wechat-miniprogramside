var latitude;
var longitude;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkInNum: 16,
    totalNum: 100,
    longitude: 0,
    latitude: 0,
    isClick:false
  },
  
  /**监听签到按钮是否被点击 */
  change: function () {
    var click = this.data.click;
    this.setData({
      isClick: true
    })

    let newNum = this.data.checkInNum + 1
    this.setData({
      checkInNum: newNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        //console.log("经度=" + longitude + "，纬度=" + latitude);
      }
    })
  },

  
})
