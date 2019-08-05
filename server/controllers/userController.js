const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const UserController = {
    async login(ctx){ 
        let _user =  await UserModel.findOne({id:ctx.request.body.id})
        if(!_user){
            ctx.body = 
            [{"ok": false, "msg": "用户名有误"}];
        }else{
            if(_user.password == ctx.request.body.password){
                const token = jwt.sign({
                    name: _user.name,
                    _id: _user._id
                }, 'my_token', { expiresIn: '1h' });
                ctx.body = 
                [{"ok": "true", "msg": "登录成功"},{token}];
            }else{
                ctx.body = 
                [{"ok": false, "msg": "密码有误"}];
            }
        }  
    },
    async register(ctx){
        ctx.body = ctx.request.body;
        let _user =  await UserModel.find({id:ctx.request.body.id})
        if(_user.length == 0){
            // this.insert(ctx.body);
            let obj = ctx.body;
            var user = new UserModel({
                id :obj.id,
                password: obj.password, 
                name : obj.name,
                age : obj.age,
                address : obj.address  
            });
            user.save(function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                }
            });
            ctx.response.body = 
            [{"ok": true, "msg": "注册成功"}];
        }else{
            ctx.response.body = 
            [{"ok": false, "msg": "此用户已存在"}];
        }
    },
    async details(ctx){
       
        let _user =  await UserModel.find({id:ctx.request.body[0].id})
        ctx.body = JSON.stringify(_user);
    },
    async findAll(ctx) {
        let _user =  await UserModel.find({})
        // console.log(_user);
        ctx.body = JSON.stringify(_user);
    
    },
    async find(ctx) {
        console.log(ctx.request.body.limit);
        console.log(ctx.request.body.skip);
        console.log("ctx.request.body");
        let findUser =  await UserModel.find({});
        let length = findUser.length;
        findUser =  await UserModel.find({}).limit(
                ctx.request.body.limit).skip(
            ctx.request.body.skip);
        let pages = Math.ceil(length/ctx.request.body.limit) || 1;
        findUser.push({'pages':pages});
        ctx.body = JSON.stringify(findUser);
    
    },
}


module.exports = UserController;