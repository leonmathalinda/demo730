<template>
    <div id="Register">
        <div>
        <span class = "text">账号：</span> 
            <input class = "center" type="text" v-model="user.id">
        </div>
        <br>
       
        <div>
        <span class = "text">密码：</span>
            <input class = "center" type="password" v-model="user.password">
        </div>
        <br>
        
        
        <div>
        <span class = "text">再次输入：</span>
            
            <input class = "center" type="password"  v-model="user.password2">
            
        </div>
        
            <span id="msg" v-if="msgSwitch">
                <br>
                {{msg}}
            </span>
        <br>
        
        <div>
        <span class = "text">姓名：</span>
            <input class = "center" type="text" @click="checkPassword()" 
            v-on:keyup.tab="checkPassword()" v-model="user.name">
        </div>
        <br>
       
        <div>
        <span class = "text">年龄：</span>
            <input class = "center" type="text" @click="checkPassword()" 
            v-on:keyup.tab="checkPassword()" v-model="user.age">
        </div>
        <br>
        
        <div>
        <span class = "text">地址：</span>
            <input class = "center" type="text" @click="checkPassword()"
            v-on:keyup.tab="checkPassword()" v-model="user.address">
        </div>
        
        <br>
        

        <button @click="register()">注册</button>
        <button @click="gotoLogin()">返回登陆</button>
        
    </div>
</template>

<script>
export default {
    name:'Register',
    data(){
        return{
            user:{
                id:'',
                password:'',
                password2:'',
                name:'',
                age:null,
                address:''
            },
            msg : '',
            msgSwitch : false,
        }
    },
    methods:{
        async register(){
            await this.$store.dispatch('registerA',this.user);
            if(this.$store.state.regiRes[0].ok){
                this.$router.push({path :'/'})
            }else{
                this.user.id ='';
                this.user.password = '';
                this.user.password2 = '';
                this.msgSwitch = false;
            }
        },
        clear(){
        this.user.password2 = '';
        },
        checkPassword(){
            
            if(this.user.password == this.user.password2)
                this.msg = '';
            else{
                this.msg = '两次填写的密码不一致';
                this.user.password = '';
                this.user.password2 = '';
            }
            this.msgSwitch = true;
        },
        gotoLogin(){
            this.$router.push({path:'/'});
        }
    }
}
</script>

<style>

#msg{
    color: red;
}

</style>


