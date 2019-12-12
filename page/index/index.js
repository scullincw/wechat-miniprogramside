//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  /**
  * 授权获取手机号并登录
  * 获取到 encryptedData，iv信息，需要服务端解密才能获取到真正的手机号
  */
  getPhoneNumber(e) {
    //检查登录态
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        //console.log("session_key 未过期")
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("session_key 已经失效")
        wx.login() //重新登录
      }
    })

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //用户拒绝授权手机号
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权，请手动输入手机号'
      })
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      /**
       * 用户同意授权手机号
       * 则向服务器发送 encryptedData
       * 解密手机号，返回用户信息显示在欢迎页
       */
      app.post(
        'getWePhone',
        {
          'openid': wx.getStorageInfoSync('openid'),
          'js_code': encodeURIComponent(e.detail.encryptedData)
        }
      )
        .then(res => {
          //请求成功，将数据存入缓存
          wx.setStorage({
            'phone': res.data.purePhoneNumber,  //没有区号的手机号
            'countryCode': res.data.countryCode,  //区号
          });
        })
        .catch(data => {
          wx.showToast({
            icon: 'none',
            title: '请求异常，请稍后再试',
          })
        })
    }
  }
})
