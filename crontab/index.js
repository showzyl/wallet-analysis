/**
 *
 * Created by showzyl on 2018/7/6
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

// part 1 （ 定时脚本 ）

const path = require('path')
const { debug } = require('../cfg')
const Log = require('log')
let log = new Log('crontab index')

const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()

debug && log.info('[invoke] crontab index.js')

const { cacheBlocks } = require('./cache_block')
const { cacheTransaction } = require('./cache_transaction')
const { cacheWallet } = require('./cache_wallet')


// cacheBlocks().then(function () {
//   console.log('11111111')
// })


cacheTransaction().then(function () {
  console.log(222222222222)
})

// // 抓取每个块 写入文件 `block.txt`
// cacheBlocks().then(function (data) {
//   debug && console.log(`data: `, data)
//   // 抓取每个块的交易 写入文件 `transaction.txt`
//   return cacheTransaction()
// }).then(function (data) {
//   debug && console.log(`data: `, data)
//   cacheWallet()
// })









// 抓取`钱包地址`存入数据库

