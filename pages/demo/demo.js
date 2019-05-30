// pages/demo/demo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindInit: function () {
    console.log("初始化asset");
    var balanceAsset = {
      balance_asset_id: "d6464d9f40ef5656c307a7750a2ac6d2dc76835f7c0fd188ff6d866bd12eb7de"
    };
    var iotAsset = {
      iot_asset_ids : [
        "027e9943c4f18f1873b00b08a02477d036ebe93cc98d8a551389ed252fe95ed1"
      ]
    };
    // 缓存
    try {
      // 写入文件
      const fs = wx.getFileSystemManager();  // 文件对象
      fs.writeFileSync(`${wx.env.USER_DATA_PATH}/balanceAsset.txt`, JSON.stringify(balanceAsset), 'utf8');
      fs.writeFileSync(`${wx.env.USER_DATA_PATH}/iotAsset.txt`, JSON.stringify(iotAsset), 'utf8');
      // balance asset;iot assets
      var balanceAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/balanceAsset.txt`, 'utf8')
      var iotAsset = fs.readFileSync(`${wx.env.USER_DATA_PATH}/iotAsset.txt`, 'utf8')
      console.log("文件balance内容：",balanceAsset);
      console.log("文件iot内容：",iotAsset);
      // 更新到缓存
      var balanceAssetJson = JSON.parse(balanceAsset);
      if (balanceAssetJson.balance_asset_id) {
        app.globalData.balance_asset_id = balanceAssetJson.balance_asset_id;
      }
      var iotAssetJson = JSON.parse(iotAsset);
      if (iotAssetJson.iot_asset_ids) {
        app.globalData.iot_asset_ids = iotAssetJson.iot_asset_ids;
      }
      console.log("初始化完成,balance:", app.globalData.balance_asset_id, "iot:", app.globalData.iot_asset_ids);
    } catch (err) {
      console.log("读取本地资产记录失败",err);
    } finally {
      wx.showToast({
        title: '初始化完成',
        icon: "success",
        duration: 2000
      });
    }
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