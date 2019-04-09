
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
      shop_title: null,
      pict_url: null,
      title: null,
      zk_final_price: null,
      coupon_info: null,
      volume: null,
      priceafterquan:null,
      reserve_price:null,
      fanxian:null,
      quan: null,
      coupon_click_url: null,
      item_url: null,
      sellerid:null
    },
    small_images_string: null,
    taokouling:null,
    /*店铺详情 */
    shopdetails: [

    ],
    ifsp: false,

    /*-------------speech-------------*/
    speechword: [
    ],
    /*show toast */
    hiddenmodalput: true  
  },
  onLoad: function (options) {
    //sp
    this.setData({
      "ifsp": app.globalData.ifshenpi,
      "speechword": app.globalData.speecharr
    })
    //sp

    console.log("接收到的参数：")
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    var shop_title = options.shop_title;
    var pict_url = options.pict_url;
    var title = options.title;
    var zk_final_price = options.zk_final_price;
    var coupon_info = options.coupon_info;
    var volume = options.volume;
    var priceafterquan = options.priceafterquan;
    var small_images_string = JSON.parse(options.small_images_string);
    var fanxian = options.fanxian;
    var quan = options.quan;
    var sellerid = options.sellerid;

    if (options.reserve_price) {
      var reserve_price = options.reserve_price
    }else {
      var reserve_price = null
    }

    var coupon_click_url = app.globalData.thiscoupon_click_url;
    var item_url = app.globalData.thiscoupon_item_url;



    console.log("small_images_string:")
    console.log(small_images_string[0])
    console.log(small_images_string[1])

    if (coupon_info == "undefined") {
      coupon_info = false
    }

    this.setData({
      "goods.shop_title": shop_title,
      "goods.pict_url": pict_url,
      "goods.title": title,
      "goods.zk_final_price": zk_final_price,
      "goods.coupon_info": coupon_info,
      "goods.volume": volume,
      "goods.priceafterquan": priceafterquan,
      "small_images_string": small_images_string,
      "goods.reserve_price": reserve_price,
      "goods.fanxian": fanxian,
      "goods.quan": quan,
      "goods.coupon_click_url": coupon_click_url,
      "goods.item_url": item_url,
      "goods.sellerid": sellerid
    })

  /*店铺详情信息 */
    this.getdianpu();

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
  },
  


  /*小程序分享 */
  onShareAppMessage: function (res) {
    console.log("开始分享了")
    var that = this;
    var shop_title = that.data.goods.shop_title;
    var pict_url = that.data.goods.pict_url;
    var title = that.data.goods.title;
    var zk_final_price = that.data.goods.zk_final_price;
    var coupon_info = that.data.goods.coupon_info;
    var volume = that.data.goods.volume;
    var priceafterquan = that.data.goods.priceafterquan;
    var small_images_string = JSON.stringify(that.data.small_images_string);
    var reserve_price = that.data.goods.reserve_price;
    var fanxian = that.data.goods.fanxian;
    var quan = that.data.goods.quan;
    var coupon_click_url = that.data.goods.coupon_click_url;
    var item_url = that.data.goods.item_url;
    var sellerid = that.data.goods.sellerid;

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/detail/detail?shop_title=' + shop_title + '&pict_url=' + pict_url + '&title=' + title + '&zk_final_price=' + zk_final_price + '&coupon_info=' + coupon_info + '&volume=' + volume + '&small_images_string=' + small_images_string + '&priceafterquan=' + priceafterquan + '&reserve_price=' + reserve_price + '&fanxian=' + fanxian + '&quan=' + quan + '&coupon_click_url=' + coupon_click_url + '&item_url=' + item_url + '&sellerid=' + sellerid,

      success: function (res) {
        console.log("这个页面转发成功")
      },
      fail: function (res) {
        console.log("这个页面转发失败")

      }
    }
  },

  gettkl:function() {
    var couponclickurl = this.data.goods.coupon_click_url;

    console.log(couponclickurl)
  
    this.gettaokouling(couponclickurl)
   
  },



  gettaokouling: function (url) {
  
    var that = this;
    var tklurl = url;
    wx.request({
      method: 'POST', 
      url: 'https://www.taoquangong.cn/gettaokouling.api',
      data: {
        url: tklurl,
        text: that.data.goods.title,
        logo: that.data.goods.pict_url
      },
      success: function (res) {
      
        console.log("success!")
        console.log(res.data)

        that.setData({
          "taokouling": res.data
        });
        console.log(that.data.taokouling)

        that.modalinput(that)
    
      },

      fail:function(res) {
          console.log("调用失败")
      }

    })

  },




/*shop detail */
  getdianpu: function () {
    console.log("this shop deatil")
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://www.taoquangong.cn/dianpudetail.api',
      data: {
        sellerid: that.data.goods.sellerid
      },
      success: function (res) {
        console.log("success!")
        console.log(res.data)

        that.setData({
          "shopdetails": res.data
        });

      }

    })

  },



  handlePosterTap: function (event) {
    var posterUrl = event.currentTarget.dataset.image;
    console.log("posterurl:")
    console.log(posterUrl)
    wx.navigateTo({
      url: '/pages/detail/poster/poster?posterUrl=' + posterUrl
    });
  },

  bindExtend: function (event) {
    this.setData({ "extended": true });
  },

  handleBuy: function () {
    this.setData({ "extended": true });
  },


  handleshare: function() {
    console.log("share it")
  },

  /*对话框*/
  modalinput: function (that) {
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancelmodal: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirmmodal: function () {
    this.setData({
      hiddenmodalput: true
    })
  }  



})