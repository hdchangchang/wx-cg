
const App = getApp();
const navHeight = App.globalData.navHeight;
const navPadding = App.globalData.navPadding;

Component({
  properties: {
    "title":{
      type: 'string',
      value: '晨购 MorningGo'
    }
  },
  data: {
    navHeight: 0,
    navPadding: 0
  },
  attached(){
    console.log('attached')
  },
  ready(){
    this.setData({
      navHeight,
      navPadding
    })
  },
  methods: {},
})