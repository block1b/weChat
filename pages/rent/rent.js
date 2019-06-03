// pages/rent/rent.js
var app = getApp();
Page({
  bindFlash:function(){
    console.log("刷新iot信息");
    var thisBlock = this; // this作用域不包括success中
    wx.getStorage({
      key: 'iotAssetId',
      success: function (res) {
        console.log("加载设备" + res.data + "详细信息");
        var iotAssetIdJson = JSON.parse(res.data);
        var iotAssetId = iotAssetIdJson.iotAssetId;
        console.log("iotId: " + iotAssetId);
        console.log("niceName: " + app.globalData.userInfo.nickName);
        console.log("clientId: " + app.globalData.mqttClientId);
        console.log("keypair: " + app.globalData.keyPair.publicKey);
        var temp = { "clientId": "WeChat", "iot": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } }
        // temp.clientId = app.globalData.mqttClientId;
        // temp.iot.nice_name = app.globalData.userInfo.nickName;  // unused
        // temp.iot.private_key = app.globalData.keyPair.privateKey;
        // temp.iot.public_key = app.globalData.keyPair.publicKey;
        // temp.iot.asset_id = iotAssetId;
        console.log("temp: " + JSON.stringify(temp));
        // 请求设备信息
        thisBlock.subpub('iotInfo', temp);
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
    var temp = { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "iot": { "device_name": "clock0", "device_info": "shareParking", "status": "Return", "ruler": "5", "nick_form": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } } }

    console.log("temp: " + JSON.stringify(temp));
    this.subpub('returnIot', temp);

    // 归还设备
    var thisBlock = this; // this作用域不包括success中
    wx.getStorage({
      key: 'iotAssetId',
      success: function (res) {
        console.log("加载设备id" + res.data);
        var iotAssetIdJson = JSON.parse(res.data);
        var iotAssetId = iotAssetIdJson.iotAssetId;
        console.log("iotId1: " + iotAssetId);
        // 设备信息
        wx.getStorage({
          key: 'iotInfo',
          success: function(res) {
            console.log("待归还设备信息"+res.data);
            // 获取关键字段 todo 
            // var temp = { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "iot": { "device_name": "clock0", "device_info": "shareParking", "status": "Return", "ruler": "5", "nick_form": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } } }

            // console.log("temp: " + JSON.stringify(temp));
            // // 归还设备
            // thisBlock.subpub('returnIot', temp);
          },
        })
      }
    });
    
  },
  bindRent: function () {
    console.log("租用");
    var temp = { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" }, "iot": { "device_name": "clock0", "device_info": "shareParking", "status": "Rent", "ruler": "5", "nick_form": { "nice_name": "admin", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } } };
    this.subpub('rentIot',temp);
    // openClock
    // this.pub();
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
      key: 'iotAssetId',
      success: function (res) {
        console.log("加载设备"+res.data+"详细信息");
        var iotAssetIdJson = JSON.parse(res.data);
        var iotAssetId = iotAssetIdJson.iotAssetId;
        console.log("iotId: "+iotAssetId);
        console.log("niceName: " + app.globalData.userInfo.nickName);
        console.log("clientId: " + app.globalData.mqttClientId);
        console.log("keypair: " + app.globalData.keyPair.publicKey);
        var temp = { "clientId": "WeChat", "iot": { "nice_name": "block", "private_key": "HwLCf9fbhm6BHTagY5aC1uVKR6sz57h7viuS8DUR9x34", "public_key": "3PKKhLTbaFSjpjdEtNYqPTSrgp17Vur25NwVjQNKK7Hm", "type": "iot", "id": "clock0", "asset_id": "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1" } }
        // temp.clientId = app.globalData.mqttClientId;
        // // temp.iot.nice_name = app.globalData.userInfo.nickName;
        // temp.iot.private_key = app.globalData.keyPair.privateKey;
        // temp.iot.public_key = app.globalData.keyPair.publicKey;
        // temp.iot.asset_id = iotAssetId;
        console.log("temp: " + JSON.stringify(temp));
        // 请求设备信息
        thisBlock.subpub('iotInfo',temp);
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