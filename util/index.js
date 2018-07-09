/**
 *
 * Created by showzyl on 2018/7/6
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

const http = require('http')


// Utility function that downloads a URL and invokes
function httpGet(url) {
  return new Promise(function (resolve, reject) {
    http.get(url, function(res) {
      let data = ''
      res.on('data', function (chunk) {
        data += chunk
      })
      res.on('end', function() {
        // callback(data)
        resolve(data)
      })
    }).on('error', function() {
      // callback(null)
      reject('err')
    })
  })
}

module.exports = {
  httpGet
}