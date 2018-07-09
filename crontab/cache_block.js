/**
 *
 * Created by showzyl on 2018/7/6
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

const path = require('path')
const fs = require('fs-extra')
const queryString = require('querystring')
const http = require('http')
const sleep = require('../util/sleep')
const rimraf = require('rimraf')


let {
  debug,
  startBlock,
  endBlock,
  hostName
} = require('../cfg')

const Log = require('log')
let log = new Log('cache_block.js')

debug && log.info('[require] cache_block.js')

let sHeader = ''

let dirName = path.dirname(`${__dirname}`) + `/tmp/block.txt`



let aPromises = []


async function cacheBlocks() {
  return new Promise((resolve, reject) => {
    // `Promise.all` will full of memory
    // Promise.all(aPromises).then(function () {
    //   resolve(`cacheBlocks success..`)
    // })
    for (let i = startBlock; i < endBlock; i++) {
      console.log(`requrest_${i}....`)
      // `500ms` request for once
      sleep.msleep(500)
      // aPromises.push(fetchBlock(i))
      fetchBlock(i)
      if(i === (endBlock-1)){
        resolve()
      }
    }
  })
}


async function fetchBlock(search) {

  const postData = queryString.stringify({
    search: search
  })

  let options = {
    hostname: 'explorer.npw.live',
    port: 8080,
    path: '/search',
    method: 'POST',
    headers: {
      'followAllRedirects': true,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Accept': 'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zhq=0.9,enq=0.8,sqq=0.7',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Cookie': '__cfduid=df393e6e889cb87975026d510e0ef9e5a1530584589 _ga=GA1.2.814201671.1530584591 _gid=GA1.2.694237125.1530584591',
      'Pragma': 'no-cache',
      'Referer': '',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  // return new Promise(function (resolve, reject) {
    let req = http.request(options, (res) => {
      sHeader += `${hostName}${res.headers.location}`
      sHeader += `\n`
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
      })
      res.on('end', () => {
        // console.log('响应中已无数据。')
        if (sHeader) {
          fs.writeFile(`${dirName}`, sHeader, 'utf8', function () {
            console.log(`${dirName} 写入成功...`)
            // resolve()
          })
        }
      })
    })

    req.on('error', (e) => {
      console.error(`请求遇到问题: ${e.message}`)
    })

    // 写入数据到请求主体
    req.write(postData)
    req.end()
  // })

}


module.exports = {
  cacheBlocks
}









