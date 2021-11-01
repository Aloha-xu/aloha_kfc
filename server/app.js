//入口文件

//导入核心模块
const path = require('path')


//保存当前文件的绝对路径
global.__basename = __dirname;


global.config = require(path.resolve(__basename,'config/config.js'));

global.router = require(path.resolve(__basename,'router/router.js'))

// post的请求体
const bodyParser = require('body-parser');


// global.sequelize = require(path.resolve(__basename,'db/connect.js'))

const express = require('express')


let app = express();


//只要加入这个配置，在req请求对象上会多出来一个属性
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

// async function fn(){
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// fn()

// global.model = require(path.resolve(__basename,'db/model/model.js'))

//CORS 跨域资源共享
//app.all(*)表示所有请求路径必须经过
app.all('*', (req, res, next) => {

    //允许跨域地址
    res.header("Access-Control-Allow-Origin", '*');
  
    //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
    //res.header("Access-Control-Allow-Origin", "*");
  
    //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");
  
    //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  
    //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
    //res.header('Access-Control-Allow-Credentials', true);
  
    next();
  
  });


//路由接口
router(app)

//测试

app.listen(config.serverOption.port,()=>{
    console.log('监听成功',config.serverOption.port);
})