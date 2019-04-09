var app = getApp()

Page( {
  data: {
  
    windowWidth: null,
    windowHeight:null,


    /*全部商品集 */
    goodsList: [
    
    ],
    /*全部商品集 */

    shoppage:1,    
    //初始商品页数，下拉时商品页数递增

    //搜索内容
    searchword:null,

    //搜索文字
    searchtext: "",
    isloading: false,

    /*标题栏选择样式 */
    styleclass1: "sort-item",
    styleclass2: "sort-item",
    styleclass3: "sort-item",
    styleclass4: "sort-item",

    ifsp: false,
    /*-------------speech-------------*/
    speechword: [
    ]
  },
  
  onReady: function() {

  },

  onLoad: function(options) {
    //审批
    this.setData({
      "ifsp": app.globalData.ifshenpi,
      "speechword": app.globalData.speecharr
    })
    //审批
    

    //获取搜索参数
    var searchtext = options.searchtext;
    this.setData({
      "searchword":searchtext
    });

    // 获取视窗宽度、高度
    var windowWidth = app.globalData.windowWidth;
    var windowHeight = app.globalData.windowHeight;
    this.setData({
      "windowWidth": windowWidth, 
      "windowHeight": windowHeight 
      });

    this.getshopdata();
    console.log( 'onLoad' );



  
  },
 
  onShow: function() {

  },

  onShareAppMessage: function () {
    return {
      title: this.data.speechword.share_title,
      desc: this.data.speechword.share_content,
      path: '/pages/searchindex/searchindex',
      success: function (res) {
        console.log("这个页面转发成功")
      },
    }
  },
 

  getshopdata: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    if (this.data.isloading) {
      console.log("加载中")
    } else {
      this.searchshops();
    }
  },

  begingetshopdata: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    if (this.data.isloading) {
      console.log("加载中")
    } else {
      this.beginsearchshops();
    }
  },



  searchshops: function () {
    if (this.data.isloading) {
      console.log("正在加载。。。")
    } else {
      this.setData({
        "isloading": true
      })
      console.log("参数：");
      var q = this.data.searchword;
      console.log(q)
      console.log(this.data.shoppage)
      var that = this;
      wx.request({
        method: 'POST',
        url: 'https://www.taoquangong.cn/getshop.api',
        data: {
          q: q,
          page_no: that.data.shoppage
        },
        success: function (res) {
          wx.showToast({
            title: '加载成功',
            icon: 'loading',
            duration: 1000
          });
          console.log("success!")
          /*防止参数为空 */
          if(res.data != null) {
            that.setData({
              "goodsList": that.data.goodsList.concat(res.data),
              "shoppage": that.data.shoppage + 1,
              "isloading": false
            });
          }else {
            that.setData({
              "goodsList": that.data.goodsList,
              "isloading": false
            });
          }
          
          console.log(that.data.goodsList)
          console.log("goodsList")
        }
      })
    }
  },



  beginsearchshops: function () {
    console.log("参数：");
    var q = this.data.searchword;
    console.log(q)

    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://www.taoquangong.cn/getshop.api',
      data: {
        q: q,
        page_no: 1
      },
      success: function (res) {
        wx.showToast({
          title: '加载成功',
          icon: 'loading',
          duration: 1000
        });
        console.log("success!")

        that.setData({
          "goodsList": res.data,
          "shoppage": 1,
        });
        console.log(that.data.goodsList)
        console.log("goodsList")
      }
    })

  },



/*滑动到底部刷新 */
  handleLower: function (event) {
    console.log("handleLower");
    // 请求活动列表
    this.getshopdata();
  },



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

    /*xpz */


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

  /*获取搜索框文本信息 */
  getsearchtext: function (event) {
    this.setData({ searchtext: event.detail.value })
  },

  /*清空文本框信息 */
  clearsearchtext: function () {
    this.setData({ searchtext: "" })
  },


  /*点击搜索按钮 */
  searchclick: function () {
    this.setData({
      "searchword": this.data.searchtext
    });
    this.begingetshopdata();
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
  sortbyvolume: function () {
    console.log("按销量排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortfun('volume'))
    this.setData({
      "goodsList": arr
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
  sortbydate: function () {
    console.log("按时间排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortDate('coupon_start_time'))
    var array = arr.reverse();
    this.setData({
      "goodsList": array
    })
  },



  /*按大小排序 */
  sortbyquan: function () {
    console.log("排序")
    var arr = this.data.goodsList;
    arr.sort(this.sortfun('quan'))
    this.setData({
      "goodsList": arr
    })
  },

  /*点击后改变样式 */
  changecss1: function (event) {
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
 


})
