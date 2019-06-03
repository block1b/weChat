// pages/transfer/transfer.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {
    console.log("py");
    var thisBlock = this;
    wx.getStorage({
      key: 'transferType',
      success: function (res) {
        console.log("py 类型：", res.data, e.detail.value.money);
        var temp = { "clientId": "WeChat", "a_user": { "cost_type": "recharge", "money": "50", "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "b_user": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" } }
        // set type;cost
        temp.a_user.cost_type = res.data;
        temp.a_user.money = e.detail.value.money;
        console.log("transfer temp", temp);
        thisBlock.subpub("useBalance", temp
        );
      }
    });
    // test
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      var repTopic = app.globalData.mqttClientId + '/' + topic;
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