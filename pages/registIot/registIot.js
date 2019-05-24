// pages/registIot/registIot.js

Page({
  bindQRcode: function () {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    });
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 注册设备
    this.subpub("newIot",
      { "clientId": "WeChat", "device_form": { "device_name": "clock0", "device_info": "shareParking", "status": "CanUse", "ruler": "5", "nick_form": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "" } } }
    );
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  /**
   * 页面的初始数据
   */
  data: {

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
    }
  },
})