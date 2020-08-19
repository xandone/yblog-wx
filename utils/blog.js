const URL = 'https://xandone.pub/yblog';

function getDatas(path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + `/${path}`,
      data: Object.assign({}, params),
      header: {
        'Content-Type': 'json'
      },
      success: resolve,
      fail: reject
    })
  })
}

function getArts(page, row) {
  const params = {
    page: page,
    row: row
  }
  return getDatas('/art/artlist', params)
    .then(rep => rep.data)
}

function getArtDetails(id) {
  const params = {
    artId: id
  }
  return getDatas('/art/artDetails', params)
    .then(rep => rep.data.data[0])
}

module.exports = {
  getArts,
  getArtDetails
}