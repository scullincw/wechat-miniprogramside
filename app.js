//app.js

App({
  //POST请求封装
  post: function (uri, data) {
    var promise = new Promise((resolve, reject) => {
      var postData = data
      wx.request({
        url: 'http://localhost:8081/wechat/' + uri,
        data: postData,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            console.log('Http post \\' + uri + ' 成功')
            resolve(res)
          }
          else if (res.statusCode == 503) {
            wx.showToast({
              icon: 'none',
              title: '服务器无响应，请稍后重试(503)'
            })
          }
          else {
            reject(res.data)
            if (res.data.msg != null) {
              console.log('错误信息:' + res.data.msg) //打印错误信息
            }
          }
        },
        fail: function (e) {
          reject('网络出错，请重试')
        }
      })
    })
    return promise
  },

  //微信小程序启动执行的代码
  onLaunch: function () {
    //获取用户信息，必须是在用户已经授权的情况下调用
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已授权用户信息')
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('rawData', res.rawData)
              //console.log(res.rawData)
              wx.setStorageSync('userInfo', res.userInfo)
              //console.log(res.userInfo)
              wx.setStorageSync('signature', res.signature)
              wx.setStorageSync('encryptedData', res.encryptedData)
              wx.setStorageSync('iv', res.iv)
            }
          })
        }
      }
    })

    

    // 微信主体登录
    wx.login({
      success: res => {
        if (res.code) {
          /**
           *  发送 res.code 到后台换取 openId, sessionKey, unionId
           *  调用封装后的wx.request请求
           */
          this.post(
            'weLogin',
            {
              js_code: res.code,
              rawData: wx.getStorageSync('rawData'),
              signature: wx.getStorageSync('signatrue'),
              encryptedData: wx.getStorageSync('encryptedData'),
              iv: wx.getStorageSync('iv')
            }
          )
            .then(res => {
              //请求成功
              console.log('openid: ' + res.data.data.openid)
              console.log('session_key: ' + res.data.data.session_key)
              console.log('skey: ' + res.data.data.skey)
              //将请求返回的结果存储下来
              wx.setStorageSync('openid', res.data.data.openid)
              wx.setStorageSync('session_key', res.data.data.session_key)
              wx.setStorageSync('skey', res.data.data.skey)
            })
            .catch(data => {
              //根据错误码显示提示
              switch (data.code) {
                case -1:
                  wx.showToast({
                    icon: 'none',
                    title: '系统繁忙，请稍后重试'
                  })
                  break;
                case -2:
                  wx.showToast({
                    icon: 'none',
                    title: '请求异常，请稍后重试'
                  })
                  break;
                case 40029:
                  wx.showToast({
                    icon: 'none',
                    title: '登录无效，请稍后重试'
                  })
                  break;
                case 45011:
                  wx.showToast({
                    icon: 'none',
                    title: '登录次数过多，请稍后重试'
                  })
                  break;
              }
            })
        } else {
          console("获取用户态登录失败:" + res.errMsg);
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重试',
        })
      }
    })

  },



  //全局数据
  globalData: {
    user: null,
    //config: globalConfig
  }
})