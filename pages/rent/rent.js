// pages/rent/rent.js

Page({
  bindBill: function () {
    wx.navigateTo({
      url: '../bill/bill'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    deviceInfo: '暂无',
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
        thisBlock.setData({
          deviceInfo: 'balabala'+res.data,
        })
      }
    })
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