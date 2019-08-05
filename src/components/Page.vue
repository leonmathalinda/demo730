<template>
    <div>
        分页
        <br>
        <button @click="getUser()">获取所有用户</button>
        <button @click="getUser2()">获取所有用户2</button>
        <List v-bind:data="users"></List>
        <List2 v-bind:data="url"></List2>
    </div>
</template>

<script>
import List from "./List";
import List2 from "./List2"
export default {
    components:{
        List,
        List2
    },
    data(){
        return{
        title:'11111111',
        users:[],
        url:'/api/getUser',
        }
    },
    methods:{
        async getUser(){
            let res = await this.$axios.get('/api/users');
            if(res.status == 200){
                this.users = res.data;
                console.log(this.users);
                console.log(this.users.length);
            }
        },
        getUser2(){
            this.url = '/api/user2'
        }
    }

}
</script>

<style>

</style>

