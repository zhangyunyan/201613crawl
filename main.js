/**
 * 1.写一个read模块，用来传入url地址，返回读取后的对象数组
 * 2.把上面的对象数组保存在数据库中mongodb
 * 3.建立一个web服务器显示保存的数据库
 * 4.开启一个计划任务每小时更新一次数据库
 * 5.把此项目发布github并且布署阿里云上
 */
var read=require('./read').movie;
var write=require('./write').movie;
var debug=require('debug')('crawl:main');  //前面是项目名：后面是模块名字
var async=require('async');
var Movie=require('./model').Movie;
var url='http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1&qq-pf-to=pcqq.group';
async.waterfall([
    function (callback) {
        Movie.remove({},callback);
    },
    function (callback) {
        read(url,callback)
    },function (movies, callback) {
        write(movies,callback)
    }
],function (err, result) {
    debug('全部任务执行完成')
})