// pages/article/article.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '我',
    items: [],
    page: 1,
    size: 10,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
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
    this.loadData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getArtsMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadData() {
    this.setData({
      page: 1,
      size: 10
    })
    wx.showLoading({
      title: '加载中...',
    })
    return app.blog.getArts(this.data.page, this.data.size)
      .then(rep => {
        this.data.items = [];
        this.setData({
            items: this.data.items.concat(rep.data),
            hasMore: this.data.items.length < rep.total
          }),
          wx.hideLoading()
      }).then(() => {
        wx.stopPullDownRefresh()
      }).catch(e => {
        wx.hideLoading()
      })
  },

  getArtsMore() {
    if (!this.data.hasMore) {
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    return app.blog.getArts(++this.data.page, this.data.size)
      .then(rep => {
        this.setData({
          items: this.data.items.concat(rep.data),
          hasMore: this.data.items.length < rep.total
        });
        wx.hideLoading()
      }).then(() => {
        wx.stopPullDownRefresh()
      }).catch(e => {
        wx.hideLoading()
        this.data.page--;
      })
  },
})