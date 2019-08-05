<template>
    <div>
        <h1>登陆成功！</h1>
        <br>
        <button @click="details()">账号信息</button>
        <br>
        <div v-if="print">
            <div>账号：{{user.id}}</div>
            <div>姓名：{{user.name}}</div>
            <div>年龄：{{user.age}}</div>
            <div>地址：{{user.address}}</div>
        </div>
        <!-- <div>{{id}}</div> -->
        <br>
        <button @click="page()">分页</button>
      
        <button @click="logout()">退出账号</button>

    </div>
</template>

<script>
export default {
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
        print : false,

        }
    },
    computed:{
        id(){
            return this.$store.state.currentUserId;
        }
    },
    methods:{
        logout(){
            this.$router.push({path :'/'})
        },
        async details(){
            
            console.log('details');
            let msg = [{id:this.$store.state.currentUserId}];
            
            await this.$store.dispatch('detailsA',msg);
           
            if(this.$store.state.user.id == 401){
                this.$router.push({path:'/'});
                return ;
            }
            this.user = this.$store.state.user;
            this.print = true;
            
        },
        page(){
            this.$router.push({path:'/page'})
        }
    }
}
</script>

