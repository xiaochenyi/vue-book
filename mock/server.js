let http = require('http');
let fs = require('fs');
let url = require('url');
let path =  require('path');

//获取轮播图 /sliders
let sliders = require('./sliders');
function read(cbk) {
    fs.readFile('./books.json', 'UTF-8', function (err, data) {
        if(err || data.length==0) {
            cbk([]) //如果有错误或者文件没长度
        } else {
            cbk(JSON.parse(data)) //将读出来的内容转换成对象
        }
    })
}
function write(data, cbk) {
    fs.writeFile('./books.json', JSON.stringify(data), cbk)
}

http.createServer((req,res) => {
    //设置跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader("X-Powered-By",' 3.2.1')
    if (req.method == 'OPTIONS') {
        return res.end(); /*让options请求快速返回*/
    }


    let {pathname, query} = url.parse(req.url, true); //第二个参数true把query转化成对象
    if(pathname === '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        return res.end(JSON.stringify(sliders));
    }

    if(pathname === '/hot') {
        read(function (books) {
            let hot = books.reverse().slice(0, 6);
            setTimeout(()=>{
                res.end(JSON.stringify(hot));
            }, 300)

        })
        return;
    }

    /**
     * restful
     */
    if(pathname==='/book') {
        let id = parseInt(query.id);
        switch(req.method) {
            case 'GET':
                if(!isNaN(id)) {
                    read(function (books) {
                        let book = books.find(item=>item.bookId == id);
                        if(!book) book={}
                        res.end(JSON.stringify(book));
                    })
                }else {
                    read(function (books) {
                        setTimeout(()=>{
                            res.end(JSON.stringify(books.reverse()));
                        }, 500)
                    })
                }
                break;
            case 'POST':
                let str = '';
                req.on('data', function (chunk) {
                    str += chunk;
                });
                req.on('end', function () {
                    let book = JSON.parse(str);
                    read(function (books) {
                        book.bookId = books.length ? books[books.length-1].bookId + 1 : 1;
                        books.push(book);
                        write(books, function () {
                            res.end(JSON.stringify(book));
                        })
                    })
                })
                break;
            case 'PUT':
                if(id) {
                    let str = '';
                    req.on('data', function (chunk) {
                        str += chunk;
                    });
                    req.on('end', function () {
                        let book = JSON.parse(str);
                        read(function (books) {
                            books = books.map((item)=>item.bookId == id ? book : item)
                            write(books, function () {
                                res.end(JSON.stringify(book));
                            })
                        })
                    })
                }
                break;
            case 'DELETE':
                read(function (books) {
                    books = books.filter((item)=>item.bookId !== id)
                    write(books, function () {
                        res.end(JSON.stringify({})) //删除返回空对象
                    })
                })
                break;
        }
        return;
    }

    /**
     * 分页
     */
    if(pathname === '/page') {
        let offset = parseInt(query.offset) || 0;
        read(function (books) {
            let result = books.reverse().slice(offset, offset+5);
            let hasMore = true;
            if(books.length <= offset+5) { //已经显示的数目大于了总数
                hasMore = false;
            }
            setTimeout(()=>{
                res.end(JSON.stringify({hasMore, books:result}))
            }, 20)
        })
        return;
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