//index.js
//获取应用实例
const app = getApp()
var MQTT = require("../../utils/paho-mqtt.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindMain:function(){
    // console.log("user info: " + app.globalData.userInfo.nickName)
    if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()){
      console.log("allready connected");
    }else{
      console.log("new connect");
      if (app.globalData.userInfo.nickName) {
        // 连接mqtt broker emmm 异步延迟 
        this.mqtt_connect(app.globalData.userInfo.nickName);
      }
    }
    
    wx.navigateTo({
      url: '../main/main'
    })
  },
  onReady: function () {
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  saveKeyPair: function (text) {
    // 在本地用户文件目录下创建一个文件，写入内容
    console.log("保存密钥:" + text);
    const fs = wx.getFileSystemManager();  // 文件对象
    fs.writeFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, text, 'utf8');
  },

  mqtt_connect: function (clientId) {
    var client = new MQTT.Client("ws://192.168.113.6:8083/mqtt", clientId);
    var that = this;
    //connect to  MQTT broker
    var connectOptions = {
      timeout: 10,
      useSSL: false,
      cleanSession: true,
      keepAliveInterval: 30,
      reconnect: true,
      onSuccess: function () {
        console.log('connected');
        app.globalData.mqtt_client = client;
        client.onMessageArrived = function (msg) {
          // 路由
          console.log("receive topic :"+msg.topic+"payload: "+msg.payloadString);
          var repTopic1 = app.globalData.userInfo.nickName + "/secretKey";
          if (msg.topic == repTopic1){
            // 保存密钥到本地文件
            var text = msg.payloadString;
            console.log("保存密钥:" + text);
            const fs = wx.getFileSystemManager();  // 文件对象
            fs.writeFileSync(`${wx.env.USER_DATA_PATH}/secretKey.txt`, text, 'utf8');
            // un sub
            if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()) {
              app.globalData.mqtt_client.unsubscribe(repTopic1, {
                onSuccess: function () {
                  console.log("unsub success");
                },
                onFailure: function () {
                 console.log("unsub err");
                },
              });
            }
          }
        };

        client.onConnectionLost = function (responseObject) {
          if (typeof app.globalData.onConnectionLost === 'function') {
            return app.globalData.onConnectionLost(responseObject);
          }
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
          }
        };
      },
    };
    client.connect(connectOptions);
  },
})
