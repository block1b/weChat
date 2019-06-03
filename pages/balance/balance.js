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

  bindFlash: function () {
    console.log("刷新余额");
    // 刷新页面
    var thisBlock = this;
    // 查询余额
    thisBlock.subpub('balanceInfo',
      { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" } }
    );
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisBlock = this;
    // 查询余额
    thisBlock.subpub('balanceInfo',
      { "clientId": "WeChat", "user": { "nice_name": "alice", "private_key": "88L2BJC9eNtSWhpPwWqqsLDRGz7aBPhuRNyfsWx4QxWR", "public_key": "HWkENox4DM4Tp3qSfYW8igndpog9GpKFzB7Tp7yXgpBq", "type": "balance", "id": "main", "asset_id": "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de" } }
    );
    // 刷新页面
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
    console.log("渲染完成");
    // 刷新页面
    var thisBlock = this;
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