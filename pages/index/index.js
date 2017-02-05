//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bannerBooks: [
      {
        name: "解忧杂货铺",
        id: "25862578",
        image: "../../images/banner01.jpg",
        purchase_url: "https://s.click.taobao.com/YPeHZAx"
      },
      {
        name: "小王子",
        id: "20443559",
        image: "../../images/banner02.jpg",
        purchase_url: "https://s.click.taobao.com/xWjGZAx"
      },
      {
        name: "白夜行",
        id: "10554308",
        image: "../../images/banner03.jpg",
        purchase_url: "https://s.click.taobao.com/FSwGZAx"
      }],
    hotBooks: [
      {
        name: "所有失去的都会以另一种方式归来",
        id: "26747695",
        purchase_url: "https://s.click.taobao.com/NaVHZAx"
      },
      {
        name: "活着",
        id: "4913064",
        purchase_url: "https://s.click.taobao.com/gbFHZAx"
      },
      {
        name: "摆渡人",
        id: "26356948",
        purchase_url: "https://s.click.taobao.com/NXDHZAx"
      }],
    boutiqueBooks: [
      {
        name: "平凡的世界",
        id: "10517238",
        images: {
          title_img: "../../images/titleImg01.jpg",
          author: "../../images/luyao.jpg"
        },
        purchase_url: "https://s.click.taobao.com/xrVGZAx"
      },
      {
        name: "我们仨",
        id: "1023045",
        images: {
          title_img: "../../images/titleImg02.jpg",
          author: "../../images/yangjiang.jpg"
        },
        purchase_url: "https://s.click.taobao.com/HABHZAx"
      },
      {
        name: "追风筝的人",
        id: "1770782",
        images: {
          title_img: "../../images/titleImg03.jpg",
          author: "../../images/husai.jpg"
        },
        purchase_url: "https://s.click.taobao.com/1KOHZAx"
      }]
  },
  onLoad: function () {
    var that = this;
    app.getBooksDataInList(that.data.hotBooks, function (books) {
      for (var i = 0; i < books.length; i++) {
        for (var j = 0; j < that.data.hotBooks.length; j++) {
          if (books[i].id == that.data.hotBooks[j].id) {
            books[i].purchase_url = that.data.hotBooks[j].purchase_url
          }
        }
      }
      that.setData({
        hotBooks: books
      })
    })
    app.getBooksDataInList(that.data.boutiqueBooks, function (books) {
      for (var i = 0; i < books.length; i++) {
        for (var j = 0; j < that.data.boutiqueBooks.length; j++) {
          if (books[i].id == that.data.boutiqueBooks[j].id) {
            books[i].purchase_url = that.data.boutiqueBooks[j].purchase_url
            books[i].images = that.data.boutiqueBooks[j].images
          }
        }
      }
      that.setData({
        boutiqueBooks: books
      })
    })
  },
  bindToDetailTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id + '&purchase=' + e.currentTarget.dataset.purchase
    })
  }
})
