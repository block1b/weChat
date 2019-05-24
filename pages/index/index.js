//index.js
//获取应用实例
const app = getApp()
var MQTT = require("../../utils/paho-mqtt.js");

Page({
  data: {
    motto: '共享车位',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mqtt_broker_addr: "192.168.113.6:8083"
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindMain:function(){
    // console.log("user info: " + app.globalData.mqttClientId)
    if (app.globalData.mqtt_client && app.globalData.mqtt_client.isConnected()){
      console.log("allready connected");
    }else{
      console.log("new connect", app.globalData.mqttClientId);
      if (app.globalData.mqttClientId) {
        // 连接mqtt broker emmm 异步延迟 
        this.mqtt_connect(app.globalData.mqttClientId);
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
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    // app.globalData.mqttClientId = app.globalData.userInfo.nickName;
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
    var client = new MQTT.Client("ws://" + this.data.mqtt_broker_addr +"/mqtt", clientId);
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
        var thisBlock = this;
        app.globalData.mqtt_client = client;
        client.onMessageArrived = function (msg) {
          // 路由
          console.log("receive topic :"+msg.topic+"payload: "+msg.payloadString);
          var repTopic1 = app.globalData.mqttClientId + "/secretKey";
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
          var repTopic2 = app.globalData.mqttClientId + "/iotInfo";
          if (msg.topic == repTopic2) {
            wx.setStorage({
              key: "iotInfo",
              data: JSON.parse(msg.payloadString),
            });
          }
          var repTopic3 = app.globalData.mqttClientId + "/balanceInfo";
          if (msg.topic == repTopic3) {
            wx.setStorage({
              key: "balanceInfo",
              data: JSON.parse(msg.payloadString),
            });
          }
          var repTopic4 = app.globalData.mqttClientId + "/billInfo";
          if (msg.topic == repTopic4) {
            wx.setStorage({
              key: "billInfo",
              data: JSON.parse(msg.payloadString),
            });
          }
          // balanceAssetId
          var repTopic5 = app.globalData.mqttClientId + "/balanceAssetId";
          if (msg.topic == repTopic5) {
            // 写入文件，刷新缓存
            var text = msg.payloadString;
            console.log("保存钱包资产id:" + text);
            const fs = wx.getFileSystemManager();  // 文件对象
            fs.writeFileSync(`${wx.env.USER_DATA_PATH}/balanceAsset.txt`, text, 'utf8');
            // 重新加载到缓存
            try {
              // balance asset;iot assets
              var balanceAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/balanceAsset.txt`, 'utf8')
              // 更新到缓存
              var balanceAssetJson = JSON.parse(balanceAsset);
              if (balanceAssetJson.balance_asset_id) {
                this.globalData.balance_asset_id = balanceAssetJson.balance_asset_id;
              }
            } catch (err) {
              console.log("读取本地钱包资产记录失败");
            }
          }
          // iotAssetIds
          var repTopic6 = app.globalData.mqttClientId + "/balanceAssetId";
          if (msg.topic == repTopic6) {
            // 写入文件，刷新缓存
            var text = msg.payloadString;
            var aIotAssetJson = JSON.parse(aIotAsset);
            var aIotAssetId = aIotAssetJson.iot_asset_id
            console.log("保存钱包资产id:" + aIotAssetId);
            var iotAssets = thisBlock.globalData.iot_asset_ids;
            iotAssets.unshift(aIotAssetId);
            var newText = {"iot_asset_ids":iotAssets};
            const fs = wx.getFileSystemManager();  // 文件对象
            fs.writeFileSync(`${wx.env.USER_DATA_PATH}/iotAsset.txt`, JSON.stringify(newText), 'utf8');
            // 重新加载到缓存
            try {
              //iot assets
              var iotAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/iotAsset.txt`, 'utf8')
              // 更新到缓存
              var iotAssetJson = JSON.parse(iotAsset);
              if (iotAssetJson.iot_asset_ids) {
                this.globalData.iot_asset_ids = iotAssetJson.iot_asset_ids;
              }
            } catch (err) {
              console.log("读取本地设备资产记录失败");
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
      onFailure: function (option) {
        console.log(option);
        //去除按钮上的加载标志
        that.setData({
          btn_loading: false
        });
        wx.showModal({
          //title: msg.destinationName,
          content: option.errorMessage
        });
      }
    };
    client.connect(connectOptions);
  },
})
