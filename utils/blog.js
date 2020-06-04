const URL = 'http://xandone.pub/yblog';

function getDatas(path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL+`/${path}`,
      data: Object.assign({}, params),
      header: {
        'Content-Type': 'json'
      },
      success: resolve,
      fail: reject
    })
  })
}

function getArts() {
  const params = {
    page: 1,
    row: 10
  }
  return getDatas('/art/artlist', params)
    .then(res => res.data.data)
}

module.exports = {
  getArts
}