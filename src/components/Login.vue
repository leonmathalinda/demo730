<template>
    <div id="Login">
        <div>账号：<input type="text" v-model="user.id"></div>
        <br>
        <div>密码：<input type="password" @click="clear()" v-model="user.password"></div>
        <br>
        <button @click="login()">登陆</button>
        <button @click="regi">注册</button>

    </div>
</template>

<script>
import axios from 'axios'
import storage from '../model/storage'
export default {
    name: 'Login',
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
        logiRes : '',
        regiRes : '',
        conceal : '',
        userlist : []
        }
    },
    methods:{
        getMsgFromKoa(){
        this.$store.dispatch('getMsgA');
        },
        async login(){

            await this.$store.dispatch('loginA',this.user);
            
            
            if(this.$store.state.logiRes[0].ok){
                this.$router.push({path :'/successful'})
            }
        },
        register(){  
            this.$store.dispatch('registerA',this.user);
        },
        clear(){
        this.user.password = '';
        },
        regi(){
        this.$router.push({path :'/register'})
        }
    },mounted(){
        var user = storage.get('user');
            if(user)
                this.user = user;
        
    }
    

}
</script>


<style>
#Login {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



