// pages/balance/balance.js
var app = getApp();
Page({
  bindRecharge: function () {
    console.log("充值");
    wx.setStorage({
      key: "transferType",
      data: "recharge",
    });
    wx.navigateTo({
      url: '../transfer/transfer'
    })
  },
  bindWithdrawal: function () {
    console.log("提现");
    wx.setStorage({
      key: "transferType",
      data: "withdrawal",
    });
    wx.navigateTo({
      url: '../transfer/transfer'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    balanceInfo: {'amount':'0'},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisBlock = this;
    // 查询余额
    thisBlock.subpub('balanceInfo',
      { "clientId": "WeChat", "user": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "balance", "id": "main", "asset_id": "c279f15ce6414a8c6e6e07313f93cf5c124caeeb30bf5a4ab8564c3fcdc626e3" } }
    );
    // 刷新页面 todo
    wx.getStorage({
      key: 'balanceInfo',
      success: function (res) {
        thisBlock.setData({
          balanceInfo: res.data,
        })
      }
    });
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

  subpub: function (topic, msgPayload) {
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
        var msg = msgPayload;
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