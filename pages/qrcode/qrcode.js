// pages/qrcode/qrcode.js
import drawQrcode from '../../utils/weapp.qrcode.min.js'

Page({
  data: {
    text: '',
    inputValue: ''
  },
  onLoad() {
    console.log('加载新建设备信息');
    this.setData({
      text: '{"deviceId":"123456"}',
    })
    this.draw()
  },
  changeText(text) {
    if (!this.data.inputValue) {
      wx.showModal({
        title: '提示',
        content: '请先输入要转换的内容！',
        showCancel: false
      })
      return
    }
    console.log("输入" + this.data.inputValue);
    this.setData({
      text: this.data.inputValue
    }),
    this.draw()
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  draw() {
    drawQrcode({
      width: 160,
      height: 160,
      x: 80,
      y: 80,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      typeNumber: 10,
      text: this.data.text,
      image: {
        imageResource: '../../images/icon.png',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      },
      callback(e) {
        console.log('e: ', e)
      }
    })
  },
  repaint() {
    // 设置二维码起始位置 x,y
    drawQrcode({
      width: 160,
      height: 160,
      x: 80,
      y: 80,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: this.data.text,
      callback(e) {
        console.log('e: ', e)
      }
    })
  },
  download() {
    // 导出图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myQrcode',
      success(res) {
        console.log('图片的临时路径为：', res.tempFilePath)
        let tempFilePath = res.tempFilePath
        // 保存图片，获取地址
        // wx.saveFile({
        //   tempFilePath,
        //   success (res) {
        //     const savedFilePath = res.savedFilePath
        //     console.log('savedFilePath', savedFilePath)
        //   }
        // })

        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  getBase64Data() {
    // 获取二维码 base64 格式
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myQrcode',
      success(res) {
        console.log('图片的临时路径为：', res.tempFilePath)
        let tempFilePath = res.tempFilePath
        // 获取 base64
        wx.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {
            console.log('[base64 data is]', res)
            wx.showToast({
              title: '获取成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '获取失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  }
})