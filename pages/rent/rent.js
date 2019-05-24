// pages/rent/rent.js
var app = getApp();
Page({
  bindFlash:function(){
    var thisBlock = this; // this作用域不包括success中
    wx.getStorage({
      key: 'deviceId',
      success: function (res) {
        console.log("加载设备" + res.data + "详细信息");
        // 请求设备信息
        thisBlock.subpub('iotInfo',
          { "clientId": "WeChat", "iot": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } }
        );

      }
    });
    // 刷新设备信息
    wx.getStorage({
      key: 'iotInfo',
      success: function (res) {
        thisBlock.setData({
          iotInfo: res.data,
        })
      }
    });
  },
  bindReturn: function () {
    console.log("归还");
    // 归还设备
    this.subpub('returnIot',
      { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "iot": { "device_name": "clock0", "device_info": "shareParking", "status": "Return", "ruler": "5", "nick_form": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } } }
    );
  },
  bindRent: function () {
    console.log("租用");
    this.subpub('rentIot',
      { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "iot": { "device_name": "clock0", "device_info": "shareParking", "status": "Rent", "ruler": "5", "nick_form": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } } }
    );
  },
  /**
   * 页面的初始数据
   */
  data: {
    iotInfo: {"device_name":"clock0", "device_info":"共享车位", "status":"CanUse", "ruler":"2"},
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
        thisBlock.subpub('iotInfo',
          { "clientId": "WeChat", "iot": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } }
        );
        
      }
    });
    // 刷新设备信息
    wx.getStorage({
      key: 'iotInfo',
      success: function (res) {
        thisBlock.setData({
          iotInfo: res.data,
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

  subpub: function (topic, msgPayload){
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