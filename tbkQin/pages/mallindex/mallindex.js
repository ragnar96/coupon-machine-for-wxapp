var app = getApp()
var xpzlinshiarr = []
Page( {
  data: {
    /*滚动横图部分 */
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
      /*滚动横图部分 */


    windowWidth: null,
    windowHeight:null,


    /*全部商品集 */
    goodsList: [
    
    ],

    /*全部商品集 */

    shoppage:1,    
    //初始商品页数，下拉时商品页数递增

    //搜索内容
    searchtext:"",
    isloading:false,


    /*标题栏选择样式 */
    styleclass1:"sort-item",
    styleclass2: "sort-item",
    styleclass3: "sort-item",
    styleclass4: "sort-item",


    /*选品组高佣金部分 类目组名 */
    xuanpinzuclass:[],
    /*选品组高佣金部分宝贝详情 */
    xpzdetail:[],
    ifsp: true,

    /*----------design----------*/

    designimgUrls: [
      '../../resources/images/quandesign/qdiele.jpg',
      '../../resources/images/quandesign/qdifif.jpg',
      '../../resources/images/quandesign/qdifor.jpg',
      '../../resources/images/quandesign/qdinin.jpg'
    ],

    designone: [
    ],
    designtwo: [
    ],
    designthree: [
    ],

    /*-------------design-------------*/
    
    /*-------------speech-------------*/
    speechword: [
    ]
  },
  
  onReady: function() {

  },

  onLoad: function() {
    this.ifshenpi();


    // 获取视窗宽度、高度
    var windowWidth = app.globalData.windowWidth;
    var windowHeight = app.globalData.windowHeight;
    this.setData({
      "windowWidth": windowWidth, 
      "windowHeight": windowHeight 
      });

    this.getspeech();
    

  },
 
  onShow: function() {

  },

  onShareAppMessage: function () {
    return {
      title: this.data.speechword.share_title,
      desc: this.data.speechword.share_content,
      path: '/pages/mallindex/mallindex',
      success: function (res) {
        console.log("这个页面转发成功")
      },
    }
  },

  /*if shenpizhong */
  ifshenpi: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://www.taoquangong.cn/ispnew.api',
      success: function (res) {
        console.log("-----sp-----")
      var data = res.data;
      if(data=="shenpi") {
        app.globalData.ifshenpi = true;
        that.setData({
          "ifsp": app.globalData.ifshenpi
        });

        that.designone();
        that.designtwo();
        that.designthr();
      }else {
        app.globalData.ifshenpi = false;
        that.setData({
          "ifsp": app.globalData.ifshenpi
        });
        that.getshopdata();
        that.getxpz();
      }
        console.log(app.globalData.ifshenpi)
        console.log("-----sp-----")
      }
    })
  },


  getshopdata: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    if (this.data.isloading) {
      console.log("加载中")
    }else {
      this.getapishops();
    }
  },

  getapishops: function() {
    if(this.data.isloading) {
      console.log("正在加载。。。")
    }else {
      this.setData({
        "isloading": true
      })
      console.log(this.data.shoppage)
      var that = this;
      this.requestshop(that);
    }
  },

/*ask hqqd */
  requestshop: function(that) {
    wx.request({
      method: 'POST',
      url: 'https://www.taoquangong.cn/getshop.api',
      data: {
        q: '',
        page_no: that.data.shoppage
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          icon: 'loading',
          duration: 1000
        });
        console.log("success!")
        //console.log(res.data)

        that.setData({
          "goodsList": that.data.goodsList.concat(res.data),
          "shoppage": that.data.shoppage + 1,
          "isloading": false
        });
       
        console.log("hqqd:")
        console.log(that.data.goodsList)
        console.log("goodsList")
      }
    })
  },


/*adk gy */
  getxpz:function() {
    this.requestxpz();
  },

  requestxpz: function () {
    this.setData({
      "xuanpinzuclass": []
    });
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://www.taoquangong.cn/xuanpinzu.api',
      data: {
        //page_no: that.data.shoppage
      },
      success: function (res) {
        that.setData({
          "xuanpinzuclass": res.data
        });
        console.log("xpz class")
        console.log(that.data.xuanpinzuclass)
        console.log("----------")

        /*xpz detail */
        var xpzclass = that.data.xuanpinzuclass;
        for (var i = 0; i < xpzclass.length;i++) {
          that.requestxpzdetail(xpzclass[i].favorites_id)
        }
        /*xpz detail */
         
      }
    })
  },

/*ask gy */

  requestxpzdetail: function (favorid) {
    this.setData({
      "xpzdetail": []
    });
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://www.taoquangong.cn/xuanpinzu-detail.api',
      data: {
        xpzclassid: favorid
      },
      success: function (res) {
        xpzlinshiarr.push(res.data);
        that.setData({
          "xpzdetail": xpzlinshiarr
        });
        console.log("---xpz detail---")
        console.log(that.data.xpzdetail)
        console.log("---xpz detail---")
      },
      fail: function(res) {
        console.log("错误")
        console.log(res)
      }
    })
  },



/*滑动到底部刷新 */
  handleLower: function (event) {
    console.log("handleLower");
    // 请求活动列表
    this.getshopdata();
  },


/*hqqd detail */
  handleDetailTap: function (event) {
    var shop_title = event.currentTarget.dataset.shop_title;
    var pict_url = event.currentTarget.dataset.pict_url;
    var title = event.currentTarget.dataset.title;
    var zk_final_price = event.currentTarget.dataset.zk_final_price;
    var coupon_info = event.currentTarget.dataset.coupon_info;
    var volume = event.currentTarget.dataset.volume;
    var small_images = event.currentTarget.dataset.small_images;
    var coupon_click_url = event.currentTarget.dataset.coupon_click_url;
    var priceafterquan = event.currentTarget.dataset.priceafterquan;
    var item_url = event.currentTarget.dataset.item_url;
    var fanxian = event.currentTarget.dataset.fanxian;
    var quan = event.currentTarget.dataset.quan;
    var sellerid = event.currentTarget.dataset.sellerid;

/*hqqd */
    app.globalData.thiscoupon_click_url = coupon_click_url;

    app.globalData.thiscoupon_item_url = item_url;




    console.log(shop_title)
    console.log(pict_url)
    console.log(title)
    console.log(zk_final_price)
    console.log(coupon_info)
    console.log(volume)
    console.log(priceafterquan)
    console.log(small_images)
    console.log(app.globalData.thiscoupon_click_url)
    console.log(app.globalData.thiscoupon_item_url)

    var small_images_string = JSON.stringify(small_images.string);

    wx.navigateTo({
      url: '/pages/detail/detail?shop_title=' + shop_title + '&pict_url=' + pict_url + '&title=' + title + '&zk_final_price=' + zk_final_price + '&coupon_info=' + coupon_info + '&volume=' + volume + '&small_images_string=' + small_images_string + '&priceafterquan=' + priceafterquan + '&fanxian=' + fanxian + '&quan=' + quan + '&sellerid=' + sellerid
    });

  },

  /*xpz detail*/
  xpkDetailTap: function (event) {
    var shop_title = event.currentTarget.dataset.shop_title;
    var pict_url = event.currentTarget.dataset.pict_url;
    var title = event.currentTarget.dataset.title;
    var zk_final_price = event.currentTarget.dataset.zk_final_price;
    var coupon_info = event.currentTarget.dataset.coupon_info;
    var volume = event.currentTarget.dataset.volume;
    var small_images = event.currentTarget.dataset.small_images;
    var priceafterquan = event.currentTarget.dataset.priceafterquan;
    var item_url = event.currentTarget.dataset.item_url;
    var click_url = event.currentTarget.dataset.click_url;
    var fanxian = event.currentTarget.dataset.fanxian;
    var quan = event.currentTarget.dataset.quan;
    var sellerid = event.currentTarget.dataset.sellerid;

    /*only in hqqd */
    var reserve_price = event.currentTarget.dataset.reserve_price;




    /*hqqd */
   
    app.globalData.thiscoupon_item_url = item_url;

    /*xpz */
    app.globalData.this_click_url = click_url;


    console.log(shop_title)
    console.log(pict_url)
    console.log(title)
    console.log(zk_final_price)
    console.log(coupon_info)
    console.log(volume)
    console.log(priceafterquan)
    console.log(small_images)
    console.log(app.globalData.thiscoupon_item_url)
    console.log(app.globalData.this_click_url)

    var small_images_string = JSON.stringify(small_images.string);

    wx.navigateTo({
      url: '/pages/xpzdetail/xpzdetail?shop_title=' + shop_title + '&pict_url=' + pict_url + '&title=' + title + '&zk_final_price=' + zk_final_price + '&coupon_info=' + coupon_info + '&volume=' + volume + '&small_images_string=' + small_images_string + '&priceafterquan=' + priceafterquan + '&reserve_price=' + reserve_price + '&fanxian=' + fanxian + '&quan=' + quan + '&sellerid=' + sellerid
    });

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
  searchclick: function() {
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  /*点击按钮搜索（未来的按类目查找）*/
  searbutzonghe: function () {
    this.setData({
      "searchtext": ""
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutone: function () {
    this.setData({
      "searchtext": "女装"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbuttwo: function () {
    this.setData({
      "searchtext": "男装"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutthree: function () {
    this.setData({
      "searchtext": "运动户外"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },
  

  searbutfour: function () {
    this.setData({
      "searchtext": "美妆"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutfive: function () {
    this.setData({
      "searchtext": "母婴"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutsix: function () {
    this.setData({
      "searchtext": "内衣"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutseven: function () {
    this.setData({
      "searchtext": "鞋"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbuteight: function () {
    this.setData({
      "searchtext": "家居"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutnine: function () {
    this.setData({
      "searchtext": "童装"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbutten: function () {
    this.setData({
      "searchtext": "零食"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  searbuteleven: function () {
    this.setData({
      "searchtext": "家电"
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

  /*rxjp */
  searbutzero: function () {
    this.setData({
      "searchtext": ""
    })
    wx.navigateTo({
      url: '/pages/searchindex/searchindex?searchtext=' + this.data.searchtext
    })
  },

/*排序功能函数*/
  sortfun: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

/*排序功能二函数，比较日期*/  
  sortDate: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return (new Date(value1.replace(/-/g, "\/"))) - (new Date(value2.replace(/-/g, "\/")))
    }
  },
/*对已有的goodslist按销量排序 */
  sortbyvolume: function() {
    console.log("按销量排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortfun('volume'))
    this.setData({
      "goodsList":arr
    })
  },
/*对已有的goodslist按价格排序 */
  sortbyprice: function () {
    console.log("按价格排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortfun('zk_final_price'))
    this.setData({
      "goodsList": arr.reverse()
    })
  },
  
/*对已有的goodslist按时间排序 */
  sortbydate: function() {
    console.log("按时间排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortDate('coupon_start_time'))
    var array = arr.reverse();
    this.setData({
      "goodsList":array
    })
  },



/*大小排序 */
  sortbyquan: function() {
    console.log("按大小排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortfun('quan'))
    this.setData({
      "goodsList": arr
    })
  },

/*点击后改变样式 */
  changecss1:function(event) {
    this.setData({
      "styleclass1": 'sort-item comb on',
      "styleclass2": 'sort-item',
      "styleclass3": 'sort-item',
      "styleclass4": 'sort-item'
    });
  },

  changecss2: function (event) {
    this.setData({
      "styleclass1": 'sort-item',
      "styleclass2": 'sort-item comb on',
      "styleclass3": 'sort-item',
      "styleclass4": 'sort-item'
    });
  },

  changecss3: function (event) {
    this.setData({
      "styleclass1": 'sort-item',
      "styleclass2": 'sort-item',
      "styleclass3": 'sort-item comb on',
      "styleclass4": 'sort-item'
    });
  },

  changecss4: function (event) {
    this.setData({
      "styleclass1": 'sort-item', 
      "styleclass2": 'sort-item', 
      "styleclass3": 'sort-item', 
       "styleclass4": 'sort-item comb on' 
       });
  },


  /*------------des--------------*/

  designdetailTap: function(event) {

  console.log(event)

    var design_title = event.currentTarget.dataset.design_title;
    var design_picture = event.currentTarget.dataset.design_picture;
    var design_content = event.currentTarget.dataset.design_content;

    console.log(design_title)
    console.log(design_picture)
    console.log(design_content)


    wx.navigateTo({
      url: '/pages/designdetail/designdetail?design_title=' + design_title + '&design_picture=' + design_picture + '&design_content=' + design_content
    });

  },

  designone: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://www.taoquangong.cn/designone.api',
      success: function (res) {
        console.log(res.data)
       var data = res.data;
         that.setData({
            "designone": data
          });
      }
    })
  },

  designtwo: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://www.taoquangong.cn/designtwo.api',
      success: function (res) {
        var data = res.data;
        that.setData({
          "designtwo": data
        });
      }
    })
  },

  designthr: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://www.taoquangong.cn/designthr.api',
      success: function (res) {
        var data = res.data;
        that.setData({
          "designthree": data
        });
      }
    })
  },


  /*------------------des--------------*/


  /*------------des--------------*/
  getspeech: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://www.taoquangong.cn/speech.api',
      success: function (res) {
        var data = res.data;
        app.globalData.speecharr = data;
        console.log(app.globalData.speecharr)
        that.setData({
          "speechword": app.globalData.speecharr,
          "imgUrls": app.globalData.speecharr.hengfu
        });
      }
    })
  }
  /*------------des--------------*/

})
