// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artBean: {},
    // scrollTop:0,
    goTopStatus:false
  },

  loadDetails(isArt,id) {
    if(isArt==0){ 
      return app.blog.getArtDetails(id)
      .then(rep => {
        rep.contentHtml = rep.contentHtml.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        .replace(/\<pre/gi, '<pre style="overflow: auto;background-color: #f6f6f6;padding:10px; font-size:15px;" ');
        this.setData({
            artBean: rep
          });
          wx.setNavigationBarTitle({
            title:this.data.artBean.title
            });
      })}else{
      return app.blog.getEssayDetails(id)
      .then(rep => {
        rep.contentHtml = rep.contentHtml.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        .replace(/\<pre/gi, '<pre style="overflow: auto;background-color: #f6f6f6;padding:10px; font-size:15px;" ');
        this.setData({
            artBean: rep
          });
          wx.setNavigationBarTitle({
            title:this.data.artBean.title
            });
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDetails(options.isArt,options.id)
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

  },
  onPageScroll:function(obj){
    if (obj.scrollTop > 360) {
      this.setData({
          goTopStatus: true
      })
  }else{
    this.setData({
      goTopStatus: false
  })
  }
  },
  go2Top: function() {
    wx.pageScrollTo({
        scrollTop: 0,
    })
    this.setData({
        goTopStatus: false
    })
  }
})