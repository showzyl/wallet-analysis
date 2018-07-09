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
const readline = require('readline')
const sleep = require('../util/sleep')

const {httpGet} = require('../util')

const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()

const {
  debug,
  hostName
} = require('../cfg')

const Log = require('log')
let log = new Log('cache wallet')

debug && log.info('[require] cache_wallet.js')

const transactionFile = path.dirname(`${__dirname}`) + `/tmp/transaction.txt`
let resultFileName = path.dirname(`${__dirname}`) + `/tmp/wallet.txt`


let sRes = ``
let mapWallet = {}

async function cacheWallet() {

  return new Promise((resolve, reject) => {

    const rl = readline.createInterface({
      input: fs.createReadStream(transactionFile)
    })

    let lineNum = 0
    let httpNum = 0


    rl.on('line', (url) => {
      debug && console.log(`接收到：${url}`)

      lineNum++

      sleep.msleep(300)

      httpGet(url).then(function (data) {
          const $ = cheerio.load(data)

          httpNum++

          // debug && console.log(`href: `, $('.hidden-xs').find('a').attr('href'))
          let txt = $('.summary-table').find('.loading').text()
          if(!mapWallet[txt]){
            mapWallet[txt] = 1

            sRes += `${txt}`
            sRes += `\n`
          }

          if (httpNum === lineNum) {
            event.emit('writeWallet')
          }
        })

    })


    rl.on('close', function () {
      // debug && console.log('end.')
      // debug && console.log(`i：${lineNum}`)
    })

    event.on('writeWallet', function () {
      debug && console.log('writeWallet.')
      fs.writeFile(`${resultFileName}`, sRes, 'utf8', function () {
        debug && console.log(`${resultFileName} 写入成功...`)
        resolve(`cache transaction success.`)
      })
    })
  })

}


module.exports = {
  cacheWallet
}




