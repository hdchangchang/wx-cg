import { askforPlan, askforGoodsList } from '../../utils/service.js'

const App = getApp();
const navHeight = App.globalData.navHeight;
const navPadding = App.globalData.navPadding;

// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navHeight,
    navPadding,
    today: '', //
    siteName: '',
    plan: [], // 配餐日期
    activeIndex: 0, // 当前展示日期下标
    goodsList: [] // 展示的数据列表

  },
  // 获取配餐日期
  getDataPlan(){
    askforPlan().then((res)=>{
      const data = res.data
      if(data.data){
        this.setData({
          plan: data.data
        })
      }

      this.initActiveIndex()
      let date='';

      if (this.data.activeIndex < 5 && this.data.activeIndex >0 ){
        date = this.data.today 
      }else{
        date = this.data.plan[0] && this.data.plan[0].date
      } 
      this.getGoodsList(date)
    })
  },
  // 获取goods列表
  getGoodsList(date){
    askforGoodsList(date).then((res)=>{
      const data = res.data
      const goodsList = data.data
      goodsList.forEach((item)=>{
        item.goodsLabel = item.goodsLabel.split('、')
      })
      console.log(data)
      this.setData({
        goodsList
      })
    })
  },
  setActiveIndex(index){
    this.setDate({"activeIndex":index})
  },
  initActiveIndex(){
    var _this = this;
    this.data.plan.forEach((item,index)=>{
      if(item.date==_this.data.today){
        this.setData({
          activeIndex: index
        })
      }
    })
  },
  // 获取当前时间日期 eg:201181015
  getToday(){
    let now = new Date();
    let yy = now.getFullYear()
    let mm = now.getMonth()+1
    mm=mm<=9?'0'+mm:mm;
    let dd = now.getDate()
    dd=dd<=9?'0'+dd:dd;
    this.setData({'today': '' + yy + mm + dd})
  },
  /**
   * 点击切换日期
   */
  clickQhTime(event){
    this.setData({"activeIndex": event.currentTarget.dataset.index})
    this.getGoodsList(event.currentTarget.dataset.date)
  },
  /**
   * 获取存储点位信息
   */
  getSite(){
    const site = wx.getStorageSync('site')
    // 如果没有存储上次选择点位
    if(!site.siteName){
      wx.navigateTo({
        url: '/pages/map/map',
      })
    }else{
      this.setData({'siteName':site.siteName})
    }
  },
  /**
   * 获取用户信息
   */
  _getUserInfo(){

  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getSite()
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
    this.getSite()
    this.getDataPlan()
    this.getToday()
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