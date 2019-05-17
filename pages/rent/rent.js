// pages/rent/rent.js
var app = getApp();
Page({
  bindFlash:function(){
    console.log("刷新数据");
    var thisBlock = this; // this作用域不包括success中
    wx.getStorage({
      key: 'deviceInfo',
      success: function (res) {
        console.log("加载设备" + res.data + "详细信息");
        thisBlock.setData({
          deviceInfo: 'new',
        })
      }
    })
    
  },
  bindReturn: function () {
    console.log("归还");
    // 归还设备
    this.subpub('returnIot');
  },
  bindRent: function () {
    console.log("租用");
    this.subpub('rentIot');
  },
  /**
   * 页面的初始数据
   */
  data: {
    iotInfo: {'iotName':'clock','status':'可用'},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisBlock = this; // this作用域不包括success中
    wx.getStorage({
      key: 'deviceId',
      success: function (res) {
        console.log("加载设备"+res.data+"详细信息");
        // 请求设备信息
        this.subpub('deviceInfo');
        thisBlock.setData({
          deviceInfo: 'balabala'+res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  subpub: function(topic){
    if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
      // 订阅
      var repTopic = app.globalData.userInfo.nickName + '/' + topic;
      if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
        app.globalData.mqtt_client.subscribe(repTopic, {
          qos: 0,
          onSuccess: function () {
            console.log("sub success");
          },
          onFailure: function () {
            console.log("sub err");
          },
        });
      }
      console.log("订阅响应topic done");
      // 请求
      if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
        var reqTopic = 'smartServer/' + topic;
        var msg = { "clientId": app.globalData.userInfo.nickName };
        var qor = 0;
        var retained = false;
        app.globalData.mqtt_client.publish(
          reqTopic,
          JSON.stringify(msg),
          qor,
          retained
        );
      }
      console.log("publish success");
    } else {
      console.log("client invalid");
      wx.showToast({
        title: 'loading',
        icon: 'loading',
        duration: 2000
      });
    }
  }
})