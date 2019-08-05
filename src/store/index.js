import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import storage from '../model/storage'
import { log } from 'util';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        msg : '1',
        res :'',
        regiRes : '',
        logiRes : '',
        currentUserId : '',
        user:{
            id:'',
            password:'',
            password2:'',
            name:'',
            age:null,
            address:''
        },
    },
    mutations:{
        getMsgM(state,msg){
            state.msg = msg;
        },
        registerM(state,msg){
            state.regiRes = msg;
        },
        loginM(state,msg){
            state.logiRes = msg;
        },
        userid(state,id){
            state.currentUserId = id;
        },
        detailsM(state, user){
            // console.log("detailsM");
            state.user = user[0];
        }
    },
    actions:{
        getMsgA(context){
            axios.get('/json',{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'ContextType':'application/json',
                }
            }).then(function(res){
                if(res.status == 200){
                    console.log(res);
                    return res.data;
                }
            }).then(function(json){
                context.commit('getMsgM' ,Array.from(json));
            })
        },
        async registerA(context,data){
             let res = await axios.post('/api/register', data)
                if(res.status == 200){
                    context.commit('registerM' ,Array.from(res.data));;
                if(res.data[0].ok){
                    alert("注册成功");
                    storage.set('user',data);
                }else{
                    alert("注册失败："+res.data[0].msg);
                }
                
            }
        },
        async loginA(context,data){
            
            let res = await axios.post('/api/login', data)
            if(res.status == 200){
                context.commit('loginM',Array.from(res.data));
                let id = JSON.parse(res.config.data).id;
                
                if(res.data[0].ok){
                    localStorage.setItem('token',res.data[1].token);
                    alert("登陆成功");
                    context.commit('userid',id);
                    
                    storage.set('user',data);
                }else{
                    alert("登陆失败："+res.data[0].msg);
                }
            }
        },
        async detailsA(context,msg){
            // console.log('========');
            let res;
            try{
                res = await axios.post('/api/details',msg);
                // console.log(res);
                // if(!res)
                    context.commit('detailsM',Array.from(res.data));
            }catch(e){
                
                let code = e.response.status;
                context.commit('detailsM',[{'id':code}]);

            }
            // if(res.status == 401){
            //     console.log("401401401401401401401401")
            // }
            
            // console.log(res.data);
        }
        
    }
});



export default store;