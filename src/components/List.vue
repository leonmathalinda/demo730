<template>
    <div v-if="dataShow.length!=0">
        <br>
        <div v-if="data">
            <input type="text"   v-model="search">
            <button @click="searchData()">搜索</button>
            <br>
        </div>
        <br>
        <table id="list" border="1">
            <tr>
                <td v-for="(i,key) in dataShow[0]">
                    {{key}}
                </td>
            </tr>
            <tr v-for="item in dataShow">
                <td v-for="i in item">
                    {{i}}
                </td>
            </tr>
        </table>
     
        <br>
        <div id="pageNum">
            <button @click="prePage()">上一页</button>
            <span id="showPage" v-if="dataShow">
                第{{(currentPage + 1) +'/' +pageNum}}页
            </span>
            <button  @click="nextPage()">下一页</button>

            <span>跳转到第<input id="page" type="text" v-model="X">页
            <button @click="gotoPageX()">go</button>
            </span>
        </div>
        <br>
        
    </div>
</template>

<script>
import LoginVue from './Login.vue';
export default {
    props:['data'],
    data(){
        return{
        data:[],
        
        //查询的信息
        search:'',
        //返回的查询结果
        searchRes:'',

        searchSwitch : false,
        totalData: this.users,
        // 所有页面的数据
        totalPage: [],
        // 每页显示数量
        pageSize: 10,
        // 共几页
        pageNum: 1,
        // 当前显示的数据
        dataShow: "",
        // 默认当前显示第一页
        currentPage: 0,
        X:'',
        }
    },
    computed:{ 
        get(){
            this.pageNum = Math.ceil(this.data.length / this.pageSize) || 1;
            this.pageNum = Math.ceil(this.data.length / this.pageSize) || 1;
                for (let i = 0; i < this.pageNum; i++) {
                    this.totalPage[i] = this.data.slice(this.pageSize * i, this.pageSize * (i + 1))
                    }
            this.dataShow = this.totalPage[this.currentPage];  
        },
    },
    methods:{
        
        nextPage() {
            if (this.currentPage == this.pageNum - 1) return ;
            this.dataShow = this.totalPage[++this.currentPage];

        },
        prePage() {
            if (this.currentPage == 0) return ;
            this.dataShow = this.totalPage[--this.currentPage];
        },
        searchData(){
            // debugger
            this.data = this.data.filter((item) =>{
                return Object.keys(item).some(
                    (key) =>{
                        console.log(String(item[key]).toLowerCase());
                        String(this.search).toLowerCase()
                        return String(item[key]).toLowerCase().indexOf(
                            String(this.search).toLowerCase()
                        ) > -1 
                    }
                )
            })
            this.searchRes = this.data.filter(value => value.num == this.search);
            console.log(this.searchRes);
        },
        gotoPageX(){
            
            if( Number(this.X)>0 && Number(this.X) <= this.pageNum){
            
                
                this.currentPage = this.X-1;
                this.dataShow = this.totalPage[this.currentPage];
            }else if (Number(this.X)<0) {
                this.currentPage = 0;
                this.X = 1;
                this.dataShow = this.totalPage[this.currentPage];
            }else if (Number(this.X) > this.pageNum) {
                this.currentPage = this.pageNum-1;
                this.X = this.currentPage+1;
                this.dataShow = this.totalPage[this.currentPage];
            }else{
                alert('输入页数有误，请重新输出！！')
            }
        },
        
        // // if (search) {
        // this.searchData = this.products.filter(function(product) {
        // console.log(product)
        // return Object.keys(product).some(function(key) {
        // console.log(key)
        // return String(product[key]).toLowerCase().indexOf(search) > -1
        // })
        // })
    },
    watch:{
        get(newV,oldV){
            console.log(newV,oldV);
        }
    }
}
</script>

<style>
#list{
   
    /* width: 1000px; */
    text-align:center;
    margin:0 auto;
    border-collapse: collapse;
}
td{
    padding: 0px;
    height: 30px;
    width: 150px;
}



#page{
    width: 20px;
}

#pageNum{
    
}
</style>

