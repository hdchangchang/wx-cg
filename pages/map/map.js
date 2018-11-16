// map.js
const App = getApp();
const navHeight = App.globalData.navHeight;
const navPadding = App.globalData.navPadding;

import { askforPtList} from '../../utils/service.js'

Page({
  data: {
    latitude:'', 
    longitude:'',
    navPadding: 0,
    mapH:0, // 设置地图高度
    mapContent: null, //
    markers: [], // 周边点位
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    showPopGaven: true, // 是否显示用户授权层
    userInfo: {}, // 用户信息
    ptSelected: {}, // 已经选择点位
    ptFavorite: {}, // 常去点位
    ptAround: [] // 周边点位
  },
  // 创建地图上下文
  createMapContent(){
    const mapContent = wx.createMapContext('map',this)
    this.setData({ mapContent })
  },
  // 回到当前位置
  back(){
    const mapContent = this.data.mapContent;
    mapContent.moveToLocation()
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  // 点击地图点位气泡跳转
  callouttap(e){
    const markerId = e.markerId
    this.data.ptAround.forEach((item,index)=>{
      if(index==markerId){
        this.toList(item)
      }
    })
  },
  // 设置地图高度
  setMapHeight(e){
    let res = wx.getSystemInfoSync()
    let h = res.windowHeight;
    this.setData({mapH:h})
  },
  // 获取当前地理位置
  getLocation(){
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.setData({ latitude, longitude })
        console.log(res)
      },
      fail(err){
        console.log(err)
        // 这里设置推荐 地理位置
        _this.setData({ latitude: '39.9219', longitude:'116.44355' })
      }
    })
  },
  // 点击获取用户信息授权
  onGotUserInfo: function (e) {
    this.setData({'showPopGaven':false})
    this.setData({ 'userInfo': e.detail.userInfo })
    wx.setStorageSync('userInfo', e.detail.userInfo)
  },
  // 获取点位数据
  _askforPtList(){
    askforPtList().then((res) => {
      const data = res.data
      this.setData({ 
        ptFavorite: data.data.defaultSite,
        ptAround: data.data.aroundList,
      })
      const markers = []
      this.data.ptAround.forEach((item,index)=>{
        const calloutContent = (item.siteName.length > 16 ? (item.siteName.substring(0, 16) + "...") : item.siteName) +
                            "\n\n" +
                            "去这里 >>"
        const obj = {
          iconPath: "../../resource/markLogo.png",
          id: index,
          latitude: item.mansion.coordinate.split(',')[0],
          longitude: item.mansion.coordinate.split(',')[1],
          width: 30,
          height: 30,
          callout:{
            content: calloutContent ,
            color: "#666",
            borderRadius: 5,
            padding: 10,
            fontSize:10,
          }
        }
        markers.push(obj)
      })
      this.setData({ markers})
    })
  },
  // 点击跳转到首页
  clickToList(event){
    const data = event.currentTarget.dataset.item
    this.toList(data)
  },
  toList(data){
    // 存储已选点位
    wx.setStorageSync('site', data)
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  //获取已经选择点位
  getPtSelected(){
    const site = wx.getStorageSync('site')
    if(site){
      this.setData({
        ptSelected: site
      })
    }
  },
  toSearch(){
    wx.navigateTo({
      url: './search/search',
    })
  },
  /**
   * option: {lat,lng}
   */
  onLoad(option){
    this.setMapHeight() // 设置尺寸
    if(option.lat&&option.lng){
      this.setData({ latitude:option.lat, longitude:option.lng })
    }else{
      this.getLocation() // 获取地理位置
    }
    this.createMapContent() //创建mapContent上下文，便于js交互
    this._askforPtList()
    this.getPtSelected()
    // 读取缓存中用户信息
    var userInfo = wx.getStorageSync('userInfo') || {}
    if (userInfo.avatarUrl){
      this.setData({ userInfo })
      this.setData({'showPopGaven': false})
    }
    this.setData({
      navPadding
    })
  },

})