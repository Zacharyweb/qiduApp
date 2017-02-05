//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    book: [],
    collected: false,
    purchaseUrl:'./'
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var that = this
    this.setData({
      purchaseUrl:options.purchase
    })
    wx.request({
      url: 'https://api.douban.com/v2/book/' + options.id,
      success: function (res) {
        var collectedBooks = wx.getStorageSync('collectedBookId') || []
        if (collectedBooks.indexOf(res.data.id) >= 0) {
          that.setData({
            collected: true
          })
        }
        res.data.miniSummary = util.miniStr(res.data.summary, 80)
        res.data.miniAuthorintro = util.miniStr(res.data.author_intro, 80)
        res.data.miniCatalog = util.miniStr(res.data.catalog, 30)
        res.data.grade = res.data.rating.average * 10
        var bookMsg = res.data
        wx.setNavigationBarTitle({
          title: bookMsg.title,
          success: function () {
            that.setData({
              book: bookMsg
            })
            wx.hideNavigationBarLoading()
            wx.hideToast()
          }
        })
      }
    })
  },
  uncollectedTap: function () {
    var that = this;
    var collectedBooks = wx.getStorageSync('collectedBookId') || []
    var index = collectedBooks.indexOf(that.data.book.id)
    collectedBooks.splice(index, 1)
    wx.setStorage({
      key: 'collectedBookId',
      data: collectedBooks,
      success: function (res) {
        that.setData({
          collected: false,
        })
      }
    })
  },
  collectedTap: function () {
    console.log("111")
    var that = this;
    var collectedBooks = wx.getStorageSync('collectedBookId') || []
    collectedBooks.push(that.data.book.id)
    wx.setStorage({
      key: 'collectedBookId',
      data: collectedBooks,
      success: function (res) {
        that.setData({
          collected: true,
        })
      }
    })
  },
  setDetailExtendData: function (dataStr, navStr) {
    if (dataStr.length >= 10) {
      app.globalData.detailExtData = dataStr
    }
    else {
      app.globalData.detailExtData = "暂无收录相关信息"
    }
    wx.navigateTo({
      url: '../detailextend/detailextend?nav=' + navStr
    })
  },
  catchSummaryTap: function () {
    this.setDetailExtendData(this.data.book.summary, '内容简介')
  },
  catchAuthorTap: function () {
    this.setDetailExtendData(this.data.book.author_intro, '作者简介')
  },
  catchCatalogTap: function () {
    this.setDetailExtendData(this.data.book.catalog, '目录')
  }

})
