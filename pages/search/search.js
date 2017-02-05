//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto:{
      content:"为乐趣而读书。",
      author:"—— 毛姆"
    }
  },
  formSubmit:function(e){
    wx.navigateTo({
      url: '../resultlist/resultlist?searchKey='+e.detail.value.input,
    })
  }
})
