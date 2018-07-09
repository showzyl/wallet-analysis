/**
 *
 * Created by showzyl on 2018/7/6
 *
 *  [ 、 ( 、 + 、 -
 *
 **/

'use strict'

module.exports = {
  msleep(sleepTime) {
    for (var start = +new Date; +new Date - start <= sleepTime;) {}
  }
}