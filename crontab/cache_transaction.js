/**
 *
 * Created by showzyl on 2018/7/6
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

const path = require('path')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const sleep = require('../util/sleep')

let {
  debug,
  hostName
} = require('../cfg')
const {httpGet} = require('../util')

const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()


const Log = require('log')
let log = new Log('cache_transaction.js')

debug && log.info('[require] cache_transaction.js')

const readline = require('readline')
const fileName = path.dirname(`${__dirname}`) + `/tmp/block.txt`




let resultFileName = path.dirname(`${__dirname}`) + `/tmp/transaction.txt`

let sTrans = ``

// console.log('__filename: ', path.dirname(`${__dirname}`) + `/tmp/block.txt` )

async function cacheTransaction() {
  debug && log.info('[invoke] cacheTransaction')
  // let url = 'http://explorer.npw.live:8080/block/000002524a10e45760bade880b6942a8d96291b08144d73a0743d8403e7a63e9'

  return new Promise((resolve, reject) => {

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName)
    })

    let lineNum = 0
    let httpNum = 0

    rl.on('line', (url, i) => {
      debug && console.log(`接收到${lineNum}行：${url} `)

      if(url){

        lineNum++

        httpGet(url).then(function (data) {
        sleep.msleep(500)
        httpNum++

        const $ = cheerio.load(data)

        // debug && console.log(`href: `, $('.hidden-xs').find('a').attr('href'))
        let href = $('.hidden-xs').find('a').attr('href')
        console.log(`httpGet: ${hostName}${href}`)

        sTrans += `${hostName}${href}`
        sTrans += `\n`

        if (httpNum === lineNum) {
          event.emit('writeTrans')
        }

      })
      }

      // rl.close()
    })


    rl.on('close', function () {
      debug && console.log('end.')
      debug && console.log(`i：${lineNum}`)
    })

    event.on('writeTrans', function () {
      debug && console.log('writeTrans.')
      fs.writeFile(`${resultFileName}`, sTrans, 'utf8', function () {
        debug && console.log(`${resultFileName} 写入成功...`)
        resolve(`cache transaction success.`)
      })
    })
  })


}


module.exports = {
  cacheTransaction
}







