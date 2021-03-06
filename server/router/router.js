//导入uuid模块
const uuid = require('uuid');
const util = require('../untils/util.js')
module.exports = app => {
    // 注册接口
    app.get('/register', (req, res) => {

        console.log('测试传递的值', req.query);


        // 如果没有传递参数的情况  返回让他传递参数  处理 get和post请求的时候可能会出现的错误
        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('user') || !req.query.hasOwnProperty('password') || !req.query.hasOwnProperty('nickname')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        // return
        var fs = require('fs');
        var params = req.query//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/user.json', function (err, data) {
                console.log(data);
                if (err) {
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                console.log(typeof person.total);
                // 拿到账号进行匹配
                for (let index = 0; index < person.total; index++) {
                    console.log('测试==》', person.username[index].user);
                    // 如果他们已经存在了
                    if (person.username[index].user == params.user || person.username[index].nickname == params.nickname) {
                        console.log("是否存在呀");
                        res.send({ msg: "该用户已存在或者名字存在", status: 203 });
                        return
                    }
                }

                params.id = new Date().getTime()
                person.username.push(params);//将传来的对象push进数组对象中
                person.total = person.username.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person.data);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/user.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "注册失败", status: 203 })
                        console.error(err);
                    }

                    res.send({ msg: "注册成功", status: 200 })
                    console.log('----------新增成功-------------');
                })
            })
        }
        writeJson(params)

        // res.send({msg:"信息"})
        //执行一下;


        // 插入值

        // model.create({
        //     userId: 'alice1234212',
        //     username: '小明132'
        // }).then(r1 => {
        //     res.send({ msg: '测试成功', data: r1 })
        // }).catch(err =>{
        //     res.send({ msg: '测试失败', data: err })
        // })


        // model 是创建的模型 where里面是存放条件的 
        // where  是存放对象形式
        // attributes :['username']  数组形式 
        // 如果返回成功是 数组形式   数组的长度如果大于0 表示数据存在
        // model.findAll({
        //     where:{
        //         userId: 'alice1234'
        //     },
        //     // attributes:[]
        //   }).then(res =>{
        //       console.log('res===>',res);
        //   })


        // 更新里面的数据
        // 根据where里面进行查找，然后找到后将他的名字改成隔壁老王
        // model.update({ username: "隔壁老王" }, {
        //     where: {
        //         userId: "alice1234212"
        //     }
        // }).then(r1=>{
        //     console.log(r1);
        //     res.send({msg:'更新成功',data:r1})
        // })

        // // 删除所有名字为 "隔壁老王" 的数据
        // model.destroy({
        //     where: {
        //       username: "隔壁老王"
        //     }
        //   }).then(r1=>{
        //         console.log(r1);
        //         res.send({msg:'删除成功',data:r1})
        //     }).catch(err =>{
        //         res.send({msg:'删除失败',data:err})
        //     })

    })

    // 登录接口
    app.get('/login', (req, res) => {
        // 如果没有传递参数的情况  返回让他传递参数  处理 get和post请求的时候可能会出现的错误
        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('user') || !req.query.hasOwnProperty('password')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }
        // return
        var fs = require('fs');
        var params = req.query;
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/user.json', function (err, data) {
                console.log(data);
                if (err) {
                    return console.error(err);
                }

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // 拿到账号和密码进行匹配
                // 记录id信息作为token值返回
                let id = null;
                for (let index = 0; index < person.total; index++) {
                    // console.log('测试==》', person.username[index].user);
                    // 如果他们已经存在了
                    if (person.username[index].user == params.user && person.username[index].password == params.password) {
                        id = person.username[index].id
                        res.send({ msg: "登录成功", data: id, status: 300 });
                        return
                    }
                }
                res.send({ msg: "账号或者密码不正确", status: 301 });

            })
        }
        writeJson(params)

    })

    app.get('/delete', (req, res) => {

        var fs = require('fs');
        //删除json文件中的选项
        function deleteJson(id) {
            fs.readFile('./mock/person.json', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var person = data.toString();
                person = JSON.parse(person);
                //把数据读出来删除
                for (var i = 0; i < person.data.length; i++) {
                    if (id == person.data[i].id) {
                        //console.log(person.data[i])
                        person.data.splice(i, 1);
                    }
                }
                console.log(person.data);
                person.total = person.data.length;
                var str = JSON.stringify(person);
                //然后再把数据写进去
                fs.writeFile('./mock/person.json', str, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("----------删除成功------------");
                })
            })
        }
        deleteJson(5);//执行一下
        res.send('one')
    })

    //请求bannar 轮播图数据 
    app.get('/bannar', (req, res) => {
        console.log(req.query);
        // return
        var fs = require('fs');
        var params = req.query;
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/bannar.json', function (err, data) {
                console.log(data);
                if (err) {
                    res.send({ msg: "请求轮播图失败", status: 1101 })
                    return console.error(err);
                }
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                res.send({ msg: "请求轮播图成功", data: person, status: 1102 })
            })
        }
        writeJson(params)

    })

    //请求推荐产品 
    app.get('/product', (req, res) => {
        console.log(req.query);
        // return
        var fs = require('fs');
        var params = req.query;
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/product.json', function (err, data) {
                console.log(data);
                if (err) {
                    res.send({ msg: "请求产品失败", status: 1001 })
                    return console.error(err);
                }
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                let recommendProduct = [];

                // console.log(person.result.length);
                for (let index = 0; index < person.result.length; index++) {
                    if (person.result[index].recommend) {
                        recommendProduct.push(person.result[index])
                    }

                }


                res.send({ msg: "请求产品成功", data: recommendProduct, status: 1002 })
            })
        }
        writeJson(params)
    })

    //请求产品详情
    app.get('/detail', (req, res) => {
        console.log(req.query);

        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('pid')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }
        // return
        var fs = require('fs');
        var params = req.query;

        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/proDetail.json', function (err, data) {
                console.log(data);
                if (err) {
                    res.send({ msg: "请求产品详情失败", status: 701 })
                    return console.error(err);
                }
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                console.log('params.pid===>', params.pid);

                // 根据pid插叙对应的详情 返回去 
                let detailProduct = [];
                for (let index = 0; index < person.result.length; index++) {
                    if (person.result[index].pid == params.pid) {
                        detailProduct.push(person.result[index])
                    }
                }

                // 如果没有找到
                if (detailProduct.length == 0) {
                    res.send({ msg: "请求产品详情失败,检查pid是否存在", status: 701 })
                    return
                }

                res.send({ msg: "请求产品详情成功", data: detailProduct, status: 702 })
            })
        }
        writeJson(params)
    })

    //新增地址
    app.post('/address', (req, res) => {


        // 如果没有传递参数的情况  返回让他传递参数  处理 get和post请求的时候可能会出现的错误
        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('userId') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('phone') || !req.body.hasOwnProperty('area')
            || !req.body.hasOwnProperty('detialArea') || !req.body.hasOwnProperty('mail') || !req.body.hasOwnProperty('defaultAddress')
        ) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }


        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/address.json', function (err, data) {
                // console.log(data);
                if (err) {
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象


                // // 拿到账号进行匹配
                // for (let index = 0; index < person.total; index++) {
                //     console.log('测试==》', person.username[index].user);
                //     // 如果他们已经存在了
                //     if (person.username[index].user == params.user || person.username[index].nickname == params.nickname) {
                //         console.log("是否存在呀");
                //         res.send({ msg: "该用户已存在或者名字存在", status: 201 });
                //         return
                //     }
                // }

                // 生成一个产品id

                params.addId = new Date().getTime();

                // 先判断这个是否设置为默认地址  将该用户下的所有默认地址修改为false

                if (params.defaultAddress) {
                    for (let index = 0; index < person.total; index++) {
                        if (params.userId == person.address[index].userId && person.address[index].defaultAddress) {
                            person.address[index].defaultAddress = false
                        }

                    }
                }


                person.address.push(params);//将传来的对象push进数组对象中
                person.total = person.address.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/address.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "添加地址失败", stutas: 1990 })
                        console.error(err);
                    }

                    res.send({ msg: "添加地址成功", stutas: 1999 })
                    console.log('----------新增成功-------------');
                })
            })
        }
        writeJson(params)
    })


    //查询地址

    app.get('/findAddress', (req, res) => {
        console.log(req.query);


        // 如果没有传递参数的情况  返回让他传递参数  处理 get和post请求的时候可能会出现的错误
        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('userId')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }
        // return
        var fs = require('fs');
        var params = req.query;
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/address.json', function (err, data) {
                console.log(data);
                if (err) {
                    res.send({ msg: "请求地址数据失败" })
                    return console.error(err);
                }
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // 根据用户信息查询id 地址数据
                // 返回地址数据
                let address = []
                for (let index = 0; index < person.total; index++) {
                    if (person.address[index].userId == params.userId) {
                        address.push(person.address[index])
                    }

                }

                res.send({ msg: "请求地址数据成功", data: address })
            })
        }
        writeJson(params)
    })

    //加入购物车  需要发送个人id  商品数据product   还有数量 count   还有加入的时间created_at
    app.post('/addCar', (req, res) => {
        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205, data: req.body });
            return
        }

        // 如果数量为零也不行
        if (req.body.count == 0) {
            res.send({ msg: "数量不能为零", status: 207 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('count') || !req.body.hasOwnProperty('product')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据


        // 添加前先查询购物车是否有该商品
        fs.readFile('./data/car.json', function (err, data) {
            // console.log(data);
            if (err) {
                res.send({ msg: "添加购物车失败", stutas: 1200 })
                return console.error(err);
            }

            console.log("data==>", data);
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象

            for (let index = 0; index < person.car.length; index++) {
                if (params.product.pid == person.car[index].product.pid && params.id == person.car[index].id) {
                    res.send({ msg: "该商品已存在", stutas: 1205 })
                    return
                }
            }

            writeJson(params)

        })


        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/car.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "添加购物车失败", stutas: 1200 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // }

                // 生成一个产品id

                params.carId = uuid.v1()
                console.log(params);

                // res.send({ msg: "添加购物车成功",data:params, stutas: 1201 })
                // return 

                person.car.push(params);//将传来的对象push进数组对象中
                person.total = person.car.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/car.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "添加购物车失败", stutas: 1200 })
                        console.error(err);
                    }

                    res.send({ msg: "添加购物车成功", stutas: 1201 })
                    console.log('----------新增成功-------------');
                })
            })
        }

    })

    //查询购物车数据  把个人id发送过来就行了
    app.get('/findCar', (req, res) => {
        console.log('req', req.query);
        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('id')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        var fs = require('fs');
        var params = req.query//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/car.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "查询购物车失败", stutas: 1300 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                let carData = [];
                for (let index = 0; index < person.car.length; index++) {
                    if (params.id == person.car[index].id) {
                        carData.push(person.car[index])
                    }
                }

                if (carData.length == 0) {
                    res.send({ msg: "查询购物车为空", stutas: 1301 })
                } else {
                    res.send({ msg: "查询购物车成功", data: carData, stutas: 1302 })
                }
            })

        }

        writeJson(params)

    })

    //删除购物车里面的内容   需要发送个人id 和购物车的carId
    app.post('/deleteCar', (req, res) => {

        // 这是我传递的参数,测试一下
        console.log('删除购物车的数据', req.body);

        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('carId')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/car.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "删除购物车数据失败", stutas: 1500 })
                    return console.error(err);
                }

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                //删除对应的数据
                params.carId.forEach(v => {
                    const index = person.car.findIndex(item => item.carId === v)
                    if (index === -1) {
                        return res.send({ msg: "删除购物车数据失败", stutas: 1500 })
                    }
                    person.car.splice(index, 1);//移除对应的数据
                })

                person.total = person.car.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/car.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "删除购物车数据失败", stutas: 1500 })
                        console.error(err);
                    }

                    res.send({ msg: "删除购物车数据成功", stutas: 1501 })
                    console.log('----------新增成功-------------');
                })
            })
        }

        writeJson(params)

    })

    //添加一个方法 更新购物车商品的数量  
    //需要发送个人id 和购物车的carId  和需要更新的购物车对应商品的购买数量 count
    app.post('/updataCar', (req, res) => {

        // 这是我传递的参数,测试一下
        console.log('修改购物车的数据', req.body);

        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('carId') || !req.body.hasOwnProperty('count')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/car.json', function (err, data) {

                if (err) {
                    res.send({ msg: "修改购物车数据失败", stutas: 1500 })
                    return console.error(err);
                }

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                const index = person.car.findIndex(item => item.carId === params.carId.name)
                if (index === -1) {
                    return res.send({ msg: "修改购物车数据失败", stutas: 1500 })
                }
                person.car[index].count = params.count

                person.total = person.car.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/car.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "修改购物车数据失败", stutas: 1500 })
                        console.error(err);
                    }

                    res.send({ msg: "修改购物车数据成功", stutas: 1501 })
                    console.log('----------修改成功-------------');
                })
            })
        }

        writeJson(params)

    })

    //删除订单   修改订单的状态
    //提交订单  用户的id也要提交上去  生成一个订单orderId   还有就是产品提交过来 总价格, 产品数量  下单时间  生成订单编号时间戳   状态:'待发货0,待收货1,已收货2'

    //需要提交参数  用户id   产品提交过来  总价格
    //提交成功时候,要删除购物车的数据
    //参数  用户id  product  还有就是 总价格  用户地址  address
    app.post('/order', (req, res) => {

        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        //用户id提交
        if (req.body.id == null) {
            res.send({ msg: "传递的id有误", status: 207 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('product') || !req.body.hasOwnProperty('allPrice') || !req.body.hasOwnProperty('address')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }
        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据


        // 把个人id和购物车的carId去购物车里面删除

        let carIdArr = [];
        for (let index = 0; index < params.product.length; index++) {

            carIdArr.push(params.product[index].carId);
        }


        console.log('carId', carIdArr);


        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/order.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "添加订单失败", stutas: 1400 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // }

                // 生成一个产品订单id

                params.orderId = uuid.v1();

                params.orderNo = new Date().getTime() * 100

                params.stutas = 0;
                // 购物车创建时间
                params.created_at = util.formatTime(new Date())
                console.log('要被添加的对象', params);


                // res.send({ msg: "添加购物车成功",data:params, stutas: 1201 })
                // return 

                person.order.push(params);//将传来的对象push进数组对象中
                person.total = person.order.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/order.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "添加订单失败", stutas: 1400 })
                        console.error(err);
                    }
                    writeCar(params, carIdArr);
                    // res.send({ msg: "添加订单成功", stutas: 1401 })
                    // console.log('----------新增成功-------------');
                })
            })
        }

        writeJson(params);

        function writeCar(params, carIdArr) {
            //现将json文件读出来
            fs.readFile('./data/car.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "添加订单失败", stutas: 1400 })
                    return console.error(err);
                }

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // res.send({ msg: "添加购物车成功",data:params, stutas: 1201 })
                // return 


                // 对数据进行筛选用es6的过滤
                person.car = person.car.filter((item) => {
                    // if(item){}
                    if (!(item.id == params.id && carIdArr.indexOf(item.carId) > -1)) {
                        return item
                    }
                })


                person.total = person.car.length;//定义一下总条数，为以后的分页打基础

                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/car.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "添加订单失败", stutas: 1400 })
                        console.error(err);
                    }

                    res.send({ msg: "添加订单成功", stutas: 1401 })
                    console.log('----------新增成功-------------');
                })
            })
        }

    })


    //提交订单
    //查询购物车数据  把个人id发送过来就行了 和 状态码
    app.get('/getOrder', (req, res) => {
        console.log('req', req.query);
        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('id')|| !req.query.hasOwnProperty('stutas')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        var fs = require('fs');
        var params = req.query//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/order.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "查询订单车失败", stutas: 1900 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                let carData = [];
                for (let index = 0; index < person.order.length; index++) {

                    if(params.stutas==2){
                        if (params.id == person.order[index].id) {
                            carData.push(person.order[index])
                        }
                    }else {
                        if (params.id == person.order[index].id && params.stutas== person.order[index].stutas) {
                            carData.push(person.order[index])
                        }
                    }

                  
                }

                if (carData.length == 0) {
                    res.send({ msg: "查询订单为空", stutas: 1901 })
                } else {
                    res.send({ msg: "查询订单成功", data: carData, stutas: 1902 })
                }
            })

        }

        writeJson(params)

    })


    //确认收货 改变状态 传递id和orderId
    app.get('/take', (req, res) => {

        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", status: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('id') || !req.query.hasOwnProperty('orderId')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        console.log('req', req.query);


        var fs = require('fs');
        var params = req.query//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/order.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "修改订单失败", stutas: 1310 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象


                for (let index = 0; index < person.order.length; index++) {
                    if (person.order[index].orderId == params.orderId && person.order[index].id == params.id) {
                        person.order[index].stutas = 1
                    }
                }

                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/order.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "修改订单失败", stutas: 1310 })
                        console.error(err);
                    }

                    res.send({ msg: "修改订单成功", stutas: 1311 })
                    // console.log('----------新增成功-------------');
                })

            })

        }

        writeJson(params)
    })


    //删除订单
    app.post('/delectOrder', (req, res) => {
        // 这是我传递的参数,测试一下   把个人id和  购物车的carId传递过来  carIdArr 是一个数组来的  里面放的购物车的carId

        if (JSON.stringify(req.body) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", length: 0, status: 205 });
            return
        }


        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('orderId')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        // return
        var fs = require('fs');
        var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据


        console.log('测试传递的值', params)
        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/order.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "删除订单失败", stutas: 500 })
                    return console.error(err);
                }

                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                // 对数据进行筛选用es6的过滤
                person.order = person.order.filter((item) => {
                    // if(item){}

                    if (!(item.id == params.id && item.orderId == params.orderId)) {
                        return item
                    }
                })

                // res.send({ msg: "添加购物车成功",data:params, stutas: 1201 })
                // return 

                // 从新将数据进行筛选一下   carIdArr 是一个数组来的

                // 这是我传递的参数来的

                // res.send({msg:'删除搞定',data:person})
                // return 
                person.total = person.order.length;//定义一下总条数，为以后的分页打基础
                console.log('person.data==>', person);
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile('./data/order.json', str, function (err) {
                    if (err) {
                        res.send({ msg: "删除订单失败", stutas: 501 })
                        console.error(err);
                    }

                    res.send({ msg: "删除订单成功", stutas: 502 })
                    console.log('----------新增成功-------------');
                })
            })
        }

        writeJson(params)
    })


    //搜索
    app.get('/search', (req, res) => {


        if (JSON.stringify(req.query) === '{}') {
            res.send({ msg: "传递的参数不能为空,请检查", stutas: 205 });
            return
        }

        // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
        if (!req.query.hasOwnProperty('key')) {
            res.send({ msg: "传递的参数有误请检查", status: 206 });
            return
        }

        if (req.query.key == "") {
            res.send({ msg: "查询为空", data: [], status: 1901 });
            return
        }

        var fs = require('fs');
        var params = req.query//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据

        //写入json文件选项
        function writeJson(params) {
            //现将json文件读出来
            fs.readFile('./data/product.json', function (err, data) {
                // console.log(data);
                if (err) {
                    res.send({ msg: "搜索失败", stutas: 1600 })
                    return console.error(err);
                }

                console.log("data==>", data);
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象

                let carData = [];
                for (let index = 0; index < person.result.length; index++) {

                    //match xxxxxx
                    if (person.result[index].name.match(params.key)) {
                        carData.push(person.result[index])
                    }

                }

                if (carData.length == 0) {
                    res.send({ msg: "查询为空", data: [], status: 1901 });
                } else {
                    res.send({ msg: "搜索成功", data: carData, stutas: 1902 })
                }
            })

        }

        writeJson(params)

    })


    //删除地址  返回个人userId和地址addId回来

    app.post('/deleteAddress', (req, res) => {
        

        if (JSON.stringify(req.body) === '{}') {
           res.send({ msg: "传递的参数不能为空,请检查", length: 0, status: 205 });
           return
       }


       // // 验证传递的参数是否正确,否则返回参数不对  怕参数不对进行比较会产生一些后果
       if (!req.body.hasOwnProperty('userId') || !req.body.hasOwnProperty('addId')) {
           res.send({ msg: "传递的参数有误请检查", status: 206 });
           return
       }

       // return
       var fs = require('fs');
       var params = req.body//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据


       console.log('测试传递的值', params)
       //写入json文件选项
       function writeJson(params) {
           //现将json文件读出来
           fs.readFile('./data/address.json', function (err, data) {
               // console.log(data);
               if (err) {
                   res.send({ msg: "删除地址失败", stutas: 9900 })
                   return console.error(err);
               }

               var person = data.toString();//将二进制的数据转换为字符串
               person = JSON.parse(person);//将字符串转换为json对象

               // 对数据进行筛选用es6的过滤
               person.address = person.address.filter((item) => {
                   // if(item){}

                   if (!(item.userId == params.userId && item.addId == params.addId)) {
                       return item
                   }
               })

               person.total = person.address.length;//定义一下总条数，为以后的分页打基础
               console.log('person.data==>', person);
               var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
               fs.writeFile('./data/address.json', str, function (err) {
                   if (err) {
                       res.send({ msg: "删除地址失败", stutas: 9900 })
                       console.error(err);
                   }

                   res.send({ msg: "删除地址成功", stutas: 9901 })
                   console.log('----------新增成功-------------');
               })
           })
       }

       writeJson(params)
})


    //测试用的
    app.post('/text', (req, res) => {
        console.log('我是body', req.body);
        res.send('我是测试post的')
    })
}