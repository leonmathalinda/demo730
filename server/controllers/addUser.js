const User = require('./userController')

var user = {
    id :'admin',
    password: '123', 
    name : 'admin',
    age : 14,
    address : 'admin'  
}

for(let i = 101;i<200;i++){
    user.id += String(i);
    user.name += String(i);
    user.address += String(i);
    console.log(user);
    var ctx = [];
    ctx.request = [];
    ctx.request.body = user;
    User.register(ctx);

    
    var user = {
        id :'admin',
        password: '123', 
        name : 'admin',
        age : 14,
        address : 'admin'  
    }
    
}