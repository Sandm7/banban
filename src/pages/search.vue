<template>
  <div class="search">
      <h3 class="welcome">欢迎加入瓣瓣</h3>
      <div v-if="!toggle">
          <mt-field label="昵称" placeholder="请输入昵称" type="text" v-model="username" :state="usernameState"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" :state="passwordState" class="password"></mt-field>
          <button class="login btn" @click="login">注册</button>
          <button class="registration btn" @click="registration">登录</button>
      </div>
      <div v-else class="elseName">{{toggle}}</div>
      <button @click="tuichu" class="tuichu">切换账号</button>
  </div>
</template>

<script>
export default {
     data(){
        return {
           username:"",
           password:"",
           usernameState:"",
           passwordState:"",
           toggle:""
        }
     },
     methods:{
          tuichu(){
             localStorage.clear()
             this.toggle=""
             this.username=""
             this.password=""
          },
          login(){
               if(!this.username){
                   this.$messagebox.alert('昵称不能为空')
               }else{
                   if(!this.password){
                       this.$messagebox.alert('密码不能为空')
                   }else{
                       localStorage.setItem("username",this.username)
                       localStorage.setItem("password",this.password)
                       this.$toast({
                           message:'注册成功,请登录',
                           position:'middle',
                           duration:1000
                       })
                   }
               }
          },
          registration(){
               let localUsername = localStorage.getItem("username")
               let localPassword = localStorage.getItem("password")
                   if(this.username!==localUsername){
                        this.$messagebox.alert('昵称不正确')
                   }else{
                        if(this.password!==localPassword){
                            this.$messagebox.alert('密码不正确')
                        }else{
                              this.$router.push({
                                  path:'/'
                              })
                        }
                   }

          }
     },
     created(){
        this.toggle= localStorage.getItem("username")
     },
     watch:{
        username:function(val){
            if(!val){
                this.usernameState="error"
            }else{
                this.usernameState="success"
            }
        },
        password:function(val){
            if(!val){
                this.passwordState="error"
            }else{
                this.passwordState="success"
            }
        },
        '$route':function(){
              this.toggle= localStorage.getItem("username")
        }
     }
}
</script>

<style scoped>
     .search{margin:0 18px;}
     .welcome{font-size:40px;color:#42bd56;font-weight:300;text-align:center;}
     .password{border-bottom:1px solid #d9d9d9;}
     .search .btn{height:44px;line-height:44px;text-align:center;font-size:16px;background:#42bd56;color:#fff;border-radius:3px;width:48%;padding:0;border:none;margin-top:10px;}
     .search .login{margin-right:2%;}
     .elseName{font-size:40px;color:#42bd56;font-weight:300;text-align:center;}
     .tuichu{height:44px;line-height:44px;text-align:center;font-size:16px;background:#42bd56;color:#fff;border-radius:3px;width:100%;padding:0;border:none;margin-top:10px;}
</style>