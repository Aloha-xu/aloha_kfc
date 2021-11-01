const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
  // 在这里定义模型属性
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    comment:'用户id'
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    comment:'用户名'
    // allowNull 默认为 true
  },
  email: {
    type: DataTypes.STRING(46),
    allowNull: false,
    defaultValue:'',
    comment:'邮箱',
    // allowNull 默认为 true
  },
  password: {
    type: DataTypes.STRING(46),
    allowNull: false,
    defaultValue:'',
    comment:'密码',
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
//   定义表名
  tableName: 'user' // 我们需要选择模型名称
});


// 
User.sync({ force: false });


module.exports = User