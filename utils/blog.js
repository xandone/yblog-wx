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

function getEssays(page, row) {
  const params = {
    page: page,
    row: row
  }
  return getDatas('/essay/essaylist', params)
    .then(rep => rep.data)
}

function getEssayDetails(id) {
  const params = {
    essayId: id
  }
  return getDatas('essay/essayDetails', params)
    .then(rep => rep.data.data[0])
}

function getBanners(){
    return getDatas('/banner/list')
    .then(rep => rep.data)
}


module.exports = {
  getArts,
  getArtDetails,
  getEssays,
  getEssayDetails,
  getBanners
}