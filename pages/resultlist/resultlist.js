var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    focusResult: "current",
    focusCollected: null,
    loading: true,
    keyWords: null,
    start: 0,
    books: [],
    collected: [],
    resultBooks: [],
    collectedBooks: []
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: options.searchKey
    })
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/book/search',
      data: { q: options.searchKey, start: that.data.start, count: 3 },
      success: function (res) {
        var booksList = app.setBooksExtMsg(res.data.books)
        that.setData({
          loading: false,
          keyWords: options.searchKey,
          start: that.data.start + 3,
          resultBooks: booksList
        })
        that.setData({
          books: that.data.resultBooks
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  onShow: function () {
    var that = this
    that.setData({
      focusResult: "current",
      focusCollected: null,
    })
    var collectedBooksId = wx.getStorageSync('collectedBookId') || []
    var booksList = this.data.resultBooks
    for (var i = 0; i < booksList.length; i++) {
      var bookId = booksList[i].id;
      if (collectedBooksId.indexOf(bookId) >= 0) {
        booksList[i].mark = true
      }
      else {
        booksList[i].mark = false
      }
    }
    that.setData({
      resultBooks: booksList
    })
    that.setData({
      books: that.data.resultBooks
    })
  },
  onReachBottom: function () {
    if (this.data.focusResult == null) {
      return;
    }
    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/book/search',
      data: { q: that.data.keyWords, start: that.data.start, count: 3 },
      method: 'GET',
      success: function (res) {
        var newBooksList = app.setBooksExtMsg(res.data.books)
        var newBooks = that.data.books.concat(newBooksList)
        that.setData({
          start: that.data.start + 3,
          resultBooks: newBooks
        })
        that.setData({
          books: that.data.resultBooks
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  bindResultTap: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.setData({
      focusResult: "current",
      focusCollected: null,
      books: this.data.resultBooks
    })
    wx.hideToast()
  },
  bindCollectedTap: function () {
    this.setData({
      focusResult: null,
      focusCollected: "current",
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var collectedBooksId = wx.getStorageSync('collectedBookId') || []
    var newBooksList = []
    var flag = 0;
    var that = this;
    if (collectedBooksId.length == 0) {
      that.setData({
        collectedBooks: newBooksList
      })
      that.setData({
        books: that.data.collectedBooks
      })
      wx.hideToast()
      return
    }
    for (var i = 0; i < collectedBooksId.length; i++) {
      wx.request({
        url: 'https://api.douban.com/v2/book/' + collectedBooksId[i],
        success: function (res) {
          var book = app.setBookExtMsg(res.data)
          newBooksList.push(book)
          flag++;
          if (flag == collectedBooksId.length) {
            that.setData({
              collectedBooks: newBooksList
            })
            that.setData({
              books: that.data.collectedBooks
            })
            wx.hideToast()
          }
        }
      })
    }
  },
  bindBookTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})
