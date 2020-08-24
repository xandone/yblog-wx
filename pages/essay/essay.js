// pages/essay/essay.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    page: 1,
    size: 10,
    hasMore: true,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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
    return app.blog.getEssays(this.data.page, this.data.size)
      .then(rep => {
        this.data.items = [];
        this.setData({
            items: this.data.items.concat(rep.data),
            hasMore: this.data.items.length < rep.total
          }),
          this.checkShowBottom();
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
    return app.blog.getEssays(++this.data.page, this.data.size)
      .then(rep => {
        this.setData({
          items: this.data.items.concat(rep.data),
          hasMore: this.data.items.length < rep.total
        });
        this.checkShowBottom();
        wx.hideLoading()
      }).then(() => {
        wx.stopPullDownRefresh()
      }).catch(e => {
        wx.hideLoading()
        this.data.page--;
      })
  },
  checkShowBottom() {
    for(let i=0;i<this.data.items.length;i++){
      let jsarr = JSON.parse(this.data.items[i].coverImg);
      this.data.items[i].isShowBottom = jsarr.length >= 3;
      this.data.items[i].isShowLeft = jsarr.length == 1 || jsarr.length == 2;
      this.data.items[i].imgArr = jsarr;
      this.data.items[i].leftImg = jsarr[0];
    }

    // 直接this.data.bean.这样修改数据，并不会刷新布局
    this.setData({
      items: this.data.items
    })
},
})