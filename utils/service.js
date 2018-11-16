const baseUrl = 'https://tapi.51chifanfan.com'
const customerId = '1538133217696899702528'


/**
 * 获取用户信息
 */
export const askforUserInfo = ()=>{
  return new Promise((response,request)=>{
    wx.request({
      url: ''
    })
  })
}

/**
 * 获取配餐日期
 */
export const askforPlan = ()=>{
  const siteId = wx.getStorageSync('site').siteId
  return new Promise((response,request)=>{
    wx.request({
      url: baseUrl + '/goods/plan?a=' + Math.random(),
      data:{
        siteId
      },
      success(res) {
        response(res)
      },
      fail(err){
        request(err)
      }
    })
  })
}

/**
 * 获取列表数据
 */
export const askforGoodsList = (date) => {
  const siteId = wx.getStorageSync('site').siteId
  return new Promise((response, request) => {
    wx.request({
      url: baseUrl + '/goods/list',
      data: {
        siteId,
        date
      },
      success(res) {
        response(res)
      },
      fail(err) {
        request(err)
      }
    })
  })
}

/**
 * 获取常去点位和周边点位
 */

export const askforPtList = ()=>{
  return new Promise((response, request)=>{
    wx.request({
      url: baseUrl + '/mansion/site',
      data: {
        city: '1',
        coordinate: '39.9219, 116.44355',
        search:'',
        customerId
      },
      success(res) {
        response(res)
      },
      fail(err) {
        request(err)
      }
    })
  })
}

/**
 * 获取商品详情
 */
export const askforGoodInfo = (goodId)=>{
  return new Promise((response,request)=>{
    wx.request({
      url: baseUrl + '/goods/detail',
      data: {
        planId: goodId
      },
      success(res){
        response(res)
      },
      fail(err) {
        request(err)
      }
    })
  })
}