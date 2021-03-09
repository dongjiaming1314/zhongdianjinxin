export const calcDate = (date1, date2) => {
  var date3 = date2 - date1

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss';
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';

}


const DEFAULT_DATE_PATTERN = 'yyyy-MM-dd'
const DEFAULT_DATETIME_PATTERN = 'yyyy-MM-dd hh:mm:ss'
const SIGN_REGEXP = /([yMdhsm])(\1*)/g
const padding = (s, len) => {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s
}

/**
 * 日期格式化
 * @param date 日期
 * @param pattern 日期格式
 * @returns {*|void|string}
 */
export const format = (date, pattern) => {
  pattern = pattern || DEFAULT_DATE_PATTERN;
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case 'y': return padding(date.getFullYear(), $0.length);
      case 'M': return padding(date.getMonth() + 1, $0.length);
      case 'd': return padding(date.getDate(), $0.length);
      case 'w': return date.getDay() + 1;
      case 'h': return padding(date.getHours(), $0.length);
      case 'm': return padding(date.getMinutes(), $0.length);
      case 's': return padding(date.getSeconds(), $0.length);
    }
  })
}

/**
 * 日期格式化
 * @param date      日期字符串(如字符串为空或''则返回'')
 * @param pattern   日期格式
 * @returns {*}
 */
export const formatDate = (date, pattern) => {
  if(!date || date == '') return '';
  pattern = pattern || DEFAULT_DATE_PATTERN;
  return format(new Date(date), pattern)
}

/**
 * 日期时间格式化
 * @param date      日期时间格式化(如字符串为空或''则返回'')
 * @param pattern   日期格式
 * @returns {*}
 */
export const formatDatetime = (datetime, pattern) => {
  if(!datetime || datetime == '') return '';
  pattern = pattern || DEFAULT_DATETIME_PATTERN;
  return format(new Date(datetime), pattern)
}
