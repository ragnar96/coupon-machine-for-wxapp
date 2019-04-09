//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ifsp: false,

    /*-------------speech-------------*/
    speechword: [
    ]
  },
 
  onLoad: function () {

    this.setData({
      "ifsp": app.globalData.ifshenpi,
      "speechword": app.globalData.speecharr
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

/*新手教程 */
  handlePosterTap: function (event) {
    var posterUrl = event.currentTarget.dataset.image;
    console.log("posterurl:")
    console.log(posterUrl)
    wx.navigateTo({
      url: '/pages/detail/poster/poster?posterUrl=' + posterUrl
    });
  },

/*客服 */
  handleKefuTap: function () {
    wx.showModal({
      title: '客服微信',
      content: this.data.speechword.weixin_no,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },

 

})
