// pages/main/main.js
var app = getApp();
Page({
  bindScan: function () {
    // 扫一扫组件需要连接外网
    // wx.scanCode({
    //   success(res) {
    //     console.log(res);
    //     wx.setStorage({
    //       key: "iotAssetId",
    //       data: res.result
    //     });
    //     wx.navigateTo({
    //       url: '../rent/rent',
    //     });
    //   }
    // })
    wx.setStorage({
          key: "iotAssetId",
          data: '{"iotAsset":"027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1"}',
        });
    wx.navigateTo({
      url: '../rent/rent',
    });
  },
  // bindRent unused
  bindRent: function () {
    wx.navigateTo({
      url: '../rent/rent'
    })
  },
  bindBill: function () {
    wx.navigateTo({
      url: '../bill/bill'
    })
  },
  bindMe: function () {
    wx.navigateTo({
      url: '../me/me'
    })
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
    console.log("加载用户密钥");
    const fs = wx.getFileSystemManager();  // 文件对象
    console.log("检查本地密钥");
    try {
      var keyPair = fs.readFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, 'utf8')
      console.log("已有密钥" + keyPair);
    } catch (err) {
      console.log('分配密钥');  // secretKey
      var msg = { "clientId": app.globalData.mqttClientId };
      this.subpub("secretKey",msg);
      // // 在本地用户文件目录下创建一个文件，写入内容
      // fs.writeFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, '{"publicKey":"1","privateKey":"a"}', 'utf8');
    } finally {
      var keyPair = fs.readFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, 'utf8');
      console.log(keyPair);
      wx.showToast({
        title: '请保存好密钥',
        icon: "success",
        duration: 2000
      });
      // 保存密钥为全局参数
      var jsonKey = JSON.parse(keyPair);
      app.globalData.keyPair = jsonKey  // 设置全局变量
      this.setData({
        keyPair: app.globalData.keyPair,
      })
    }
    // 加载钱包资产
    console.log("加载钱包资产");
    try{
      // balance asset;iot assets
      var balanceAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/balanceAsset.txt`, 'utf8')
      var iotAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/iotAsset.txt`, 'utf8')
      // 更新到缓存
      var balanceAssetJson = JSON.parse(balanceAsset);
      if (balanceAssetJson.balance_asset_id){
        app.globalData.balance_asset_id = balanceAssetJson.balance_asset_id;
      }
      var iotAssetJson = JSON.parse(iotAsset);
      if (iotAssetJson.iot_asset_ids){
        app.globalData.iot_asset_ids = iotAssetJson.iot_asset_ids;
      }
    }catch (err){
      console.log("读取本地资产记录失败");
      // 请求一次余额资产id todo
      // var msg = { "clientId": app.globalData.mqttClientId };
      // this.subpub("flushBalanceAsset", msg);
    }finally{
      // 订阅刷新主题
      this.sub("balanceAssetId");
    }

  // 订阅bill
    this.sub("billInfo");
  // 订阅balance
    this.sub("balanceInfo");
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
    this.pub(topic,msgPayload);
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