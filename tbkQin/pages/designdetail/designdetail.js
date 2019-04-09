
var app = getApp();
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    extended: false,
    windowWidth:app.globalData.windowWidth,
    goods: {
      title: null,
      picture: null,
      content: null
    },
    ifsp: false
  },
  onLoad: function (options) {
    //审批
    this.setData({
      "ifsp": app.globalData.ifshenpi,
    })
    //审批


    // 页面初始化 options为页面跳转所带来的参数
    var title = options.design_title;
    var picture = options.design_picture;
    var content = options.design_content;
 
    console.log(title)
    console.log(picture)
    console.log(content)


    this.setData({
      "goods.title": title,
      "goods.picture": picture,
      "goods.content": content
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
  

})