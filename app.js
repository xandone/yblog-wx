//app.js
const blog = require('utils/blog.js')

App({
  blog: blog,
  onLaunch: function () {},
  globalData: {
    userInfo: null
  }
})