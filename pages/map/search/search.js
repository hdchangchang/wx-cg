// pages/map/search/search.js
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var map = new QQMapWX({
  key: 'A7BBZ-QVER3-URV3G-32BDW-U77J7-WZFZM' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', //当前搜索关键词
    list:[], //搜索列表
    searchKeywords: [] //历史查询记录
  },
  // 获取关键字列表 
  getKeyWordList(event){
    const keyword = event.detail.value
    this.setData({ keyword})
  },
  goSearch(){
    const _this = this;
    const keyword = this.data.keyword || ''
    // 调用接口
    map.getSuggestion({
      keyword,
      region: "北京",
      success: function (res) {
        _this.setData({
          list: res.data
        })
      },
      fail: function (res) {
        _this.setData({
          list: []
        })
      }
    })
    this.addSearchHis(keyword)
  },
  //添加历史纪录
  addSearchHis(keyword) {
    // 
    if(!keyword || keyword.replace(/^\s+|\s+$/g,'')==''){
      return false;
    }
    const searchKeywords = wx.getStorageSync('searchKeywords') || []
    const maxLen = 10

    if (searchKeywords.some((item)=>{
      item==keyword
    })){
      return false
    }
    searchKeywords.push(keyword);
    if (searchKeywords.length>3){
      searchKeywords.shift()
    }

    wx.setStorageSync('searchKeywords', searchKeywords)
    this.setData({
      'searchKeywords': searchKeywords.reverse()
    })
  },
  // 跳转到地图
  toMap(event){
    const item = event.currentTarget.dataset.item
    const location = item.location
    const lat = location.lat
    const lng = location.lng
    wx.navigateTo({
      url: '/pages/map/map?lat='+lat+'&lng='+lng
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const searchKeywords = wx.getStorageSync('searchKeywords').reverse()
    this.setData({
      searchKeywords
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