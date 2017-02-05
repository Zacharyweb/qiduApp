//app.js
var util = require('utils/util.js')
App({
  globalData: {
    userInfo: null,
    detailExtData: "暂无收录相关信息"
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getBooksDataInList: function (booksList, callback) {
    var flag = 0;
    var books = [];
    for (var i = 0; i < booksList.length; i++) {
      wx.request({
        url: 'https://api.douban.com/v2/book/' + booksList[i].id,
        success: function (res) {
          res.data.grade = res.data.rating.average * 10
          res.data.miniSummary = util.miniStr(res.data.summary, 75)
          books.push(res.data)
          flag++
          if (flag == booksList.length) {
            callback(books)
          }
        }
      })
    }
  },
  setBooksExtMsg: function (data) {
    var booksMsg = data
    var collectedBooksId = wx.getStorageSync('collectedBookId') || []
    for (var i = 0; i < booksMsg.length; i++) {
      booksMsg[i].miniSummary = util.miniStr(booksMsg[i].summary, 65)
      var grade = booksMsg[i].rating.average * 10
      booksMsg[i].grade = grade
      var bookId = booksMsg[i].id;
      if (collectedBooksId.indexOf(bookId) >= 0) {
        booksMsg[i].mark = true
      } else {
        booksMsg[i].mark = false
      }
    }
    return booksMsg
  },
  setBookExtMsg: function (bookMsg) {
    var collectedBooksId = wx.getStorageSync('collectedBookId') || []
    bookMsg.miniSummary = util.miniStr(bookMsg.summary, 65)
    var grade = bookMsg.rating.average * 10
    bookMsg.grade = grade
    var bookId = bookMsg.id;
    if (collectedBooksId.indexOf(bookId) >= 0) {
      bookMsg.mark = true
    }
    else {
      bookMsg.mark = false
    }
    return bookMsg
  }
})