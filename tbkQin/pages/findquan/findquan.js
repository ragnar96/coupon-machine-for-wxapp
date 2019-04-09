var app = getApp()

Page( {
  data: {
 
    windowWidth: null,
    windowHeight:null,
    //搜索文字
    searchtext: "",

    ifsp: true,

    /*----------design----------*/
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
    designimgUrls: [
      '../../resources/images/quandesign/qdiele.jpg',
      '../../resources/images/quandesign/qdifif.jpg',
      '../../resources/images/quandesign/qdifor.jpg',
      '../../resources/images/quandesign/qdinin.jpg'
    ],

    /*-------------speech-------------*/
    speechword: [
    ]
  },
  
  onReady: function() {

  },

  onLoad: function(options) {

    //sp
    this.setData({
      "ifsp": app.globalData.ifshenpi,
      "speechword": app.globalData.speecharr
    })
    //sp


    // 获取视窗宽度、高度
    var windowWidth = app.globalData.windowWidth;
    var windowHeight = app.globalData.windowHeight;
    this.setData({
      "windowWidth": windowWidth, 
      "windowHeight": windowHeight 
      });
    console.log( 'onLoad' );

  },
 
  onShow: function() {

  },

  onShareAppMessage: function () {
    return {
      title: this.data.speechword.share_title,
      desc: this.data.speechword.share_content,
      path: '/pages/findquan/findquan',
      success: function (res) {
        console.log("这个页面转发成功")
      },
    }
  },

  /*获取搜索框文本信息 */
  getsearchtext: function (event) {
    this.setData({ searchtext: event.detail.value })
  },

  /*清空文本框信息 */
  clearsearchtext: function () {
    this.setData({ searchtext: "" })
  },


  /*点击搜索按钮 */
  /*点击搜索按钮 */
  searchclick: function () {
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },


  leadtipfir: function () {
    this.setData({
      "searchtext": "男"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  leadtipsec: function () {
    this.setData({
      "searchtext": "女"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  leadtipthr: function () {
    this.setData({
      "searchtext": "内衣"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  leadtipfor: function () {
    this.setData({
      "searchtext": "运动"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  leadtipfif: function () {
    this.setData({
      "searchtext": "童装"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  leadtipsix: function () {
    this.setData({
      "searchtext": "家居"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  }

  


})
