//获取应用实例
var app = getApp()
Page({
  data: {
    loading: true,
    contentText: null,
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.setNavigationBarTitle({
      title: options.nav,
      success: function (res) {
        that.setData({
          contentText: app.globalData.detailExtData,
          loading: false
        })
        wx.hideNavigationBarLoading()
        wx.hideToast()
      }
    })
  }
})