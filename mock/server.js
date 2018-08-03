let http = require('http');
let fs = require('fs');
let url = require('url');
let path =  require('path');

//获取轮播图 /sliders
let sliders = require('./sliders');
http.createServer((req,res) => {
    //设置跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader("X-Powered-By",' 3.2.1')
    if (req.method == 'OPTIONS') {
        return res.end(); /*让options请求快速返回*/
    }


    let {pathname, query} = url.parse(req.url);
    if(pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(sliders));
    }

    // 读取一个路径
    fs.stat('.' + pathname, function (err, stats) {
        if(err) {
            res.statusCode = 404;
            res.end('NOT FOUND');
        } else {
            if(stats.isDirectory()) {
                let p = path.join('.' + pathname, './index.html');
                fs.createReadStream('.' + pathname).pipe(p)
            } else {
                fs.createReadStream('.' + pathname).pipe(res)
            }
        }
    });

}).listen(8081);