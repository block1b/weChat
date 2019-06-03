// pages/iot/iot.js
var app  =getApp();
Page({
  bindRegistIot: function () {
    wx.navigateTo({
      url: '../registIot/registIot'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    iotInfos:[
      {'device_name': 'clock', 'status':'可用'},
      {'device_name': 'clock2', 'status': '使用中' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("查询多个设备信息");
    this.sub("iotInfo");
    var iotAssetIds = app.globalData.iot_asset_ids;
    console.log("所有iot id", iotAssetIds);
    // todo 遍历查询
    for (var i=0; i<iotAssetIds.length; i++){
      console.log("iot",i,iotAssetIds[i]);
      var temp = { "clientId": "WeChat", "iot": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } }
      this.pub('iotInfo', temp);
    }

    // 刷新iotInfos
    var thisBlock = this;
    wx.getStorage({
      key: 'iotInfo',
      success: function (res) {
        thisBlock.setData({
          iotInfos: [res.data],
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
    this.sub(topic);
    this.pub(topic, msgPayload);
  },
  sub: function (topic) {
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

    } else {
      console.log("client invalid");
      wx.showToast({
        title: 'loading',
        icon: 'loading',
        duration: 2000
      });
    }
  },
  pub: function (topic, msgPayload) {
    if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
      // 请求 smartServer/secretKey
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