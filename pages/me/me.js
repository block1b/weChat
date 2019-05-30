// pages/me/me.js
var app = getApp();

Page({
  bindBalance: function () {
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
  bindIot: function () {
    wx.navigateTo({
      url: '../iot/iot'
    })
  },
  bindSecretKey: function () {
    const fs = wx.getFileSystemManager();  // 文件对象
    console.log("检查本地密钥");
    try {
      var keyPair = fs.readFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, 'utf8')
      console.log("已有密钥" + keyPair);
    } catch (err) {
      console.log('分配密钥');
      if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
        // 订阅
        var repTopic = app.globalData.userInfo.nickName + "/secretKey";
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
          var reqTopic = 'postServer/secretKey';
          var msg = {"clientId":app.globalData.userInfo.nickName};
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
  },
  /**
   * 页面的初始数据
   */
  data: {
    keyPair: app.globalData.keyPair,
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

  }
})