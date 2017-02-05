//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    books: []
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      })
    })
      wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var collectedBooksId = wx.getStorageSync('collectedBookId') || []
    var newBooksList = []
    var flag = 0;
    if (collectedBooksId.length == 0) {
      that.setData({
        books: []
      })
      wx.hideToast()
      wx.setNavigationBarTitle({
        title: '收藏',
      })
      return
    }
    for (var i = 0; i < collectedBooksId.length; i++) {
      wx.request({
        url: 'https://api.douban.com/v2/book/' + collectedBooksId[i],
        success: function (res) {
          newBooksList.push(res.data)
          flag++;
          if (flag == collectedBooksId.length) {
            that.setData({
              books: newBooksList
            })
            wx.hideToast()
            wx.setNavigationBarTitle({
              title: '收藏',
            })
          }
        }
      })
    }

  },
  onShow: function () {
    this.onLoad()
  },
  bindBookTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})
