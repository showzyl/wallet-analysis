/**
 *
 * Created by showzyl on 2018/7/2
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

const cheerio = require("cheerio")
const fs = require('fs-extra')
const queryString = require('querystring')
const http = require('http')




// part 2 （ 前端展示 ）
// 钱包`数量`变化情况（ 天增幅 / 周增幅 / 15天增幅 / 月增幅）
// 钱包`金额`变化榜单（ 天 / 周 / 15天 / 月）





// 财富榜页面
const richUrl = 'http://explorer.npw.live:8080/richlist'

// 交易接口
const transUrl = 'http://explorer.npw.live:8080/ext/getlasttxs/100'


let aRich = []

let oRich = {}

// [{
//   xxxx: {
//     value: 1,
//     address: 'xxxx'
//   }
// }]



async function a(i) {
  console.log(`i: `, i)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(`a`)
      resolve('aaaaaaaa_' + i)
    })
  })
}

let arr = []

for(let i=0;i<5; i++){
  arr.push(a(i))
}

async function b() {
  return new Promise((resolve, reject) => {
    Promise.all(arr).then(function () {
      resolve('bbbbbbbb')
    })
  })
}


b().then(function (res) {
  console.log(`res: `, res)
})






// download(richUrl, function(data) {
//   if (data) {
//     // console.log(`data: `, data)
//
//     const $ = cheerio.load(data)
//
//     $('.table-bordered').find('a').each(function(i, item){
//       let o = {}
//       // console.log(`item: `, item)
//       // console.log(`i: `, i)
//       let address = $(item).text()
//       let amount = $(item).parent().siblings('.hidden-xs').text()
//       // console.log(`$(item).attr('href'): `, $(item).attr('href'))
//       // o['address'] = $(item).attr('href')
//       // o['value'] = $(item).parent().siblings('.hidden-xs').text()
//
//       oRich[address] = {
//         amount,
//         address: address,
//       }
//       // aRich.push(o)
//       // console.log(`txt: `, $(item).parent().siblings('.hidden-xs').text())
//     })
//
//     // let uniqueRich = Array.from(new Set(Object.keys(oRich)))
//
//     fs.writeFile('test.txt', JSON.stringify(oRich), 'utf8', function () {
//       // console.log(`写入成功...`)
//     })
//
//     // console.log(`oRich: `, oRich)
//
//     // console.log("done")
//     // console.log("aRich: ", aRich.length)
//   } else {
//     // console.log("error")
//   }
// })


// download('http://explorer.npw.live:8080/block/000002524a10e45760bade880b6942a8d96291b08144d73a0743d8403e7a63e9', function(data) {
//   if (data) {
//     console.log(`data: `, data)
//     // data = JSON.parse(data)
//     // console.log(`data: `, data.data.length)
//     // console.log(`oRich: `, oRich)
//
//     console.log("done")
//     // console.log("aRich: ", aRich.length)
//   } else {
//     console.log("error")
//   }
// })
// //
//
// // Utility function that downloads a URL and invokes
// // callback with the data.
// function download(url, callback) {
//   http.get(url, function(res) {
//     let data = ""
//     res.on('data', function (chunk) {
//       data += chunk
//     })
//     res.on("end", function() {
//       callback(data)
//     })
//   }).on("error", function() {
//     callback(null)
//   })
// }








