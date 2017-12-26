<template>
  <div class="broadcastDetail">
      <div class="wrapper" ref="wrapper">
         <div>
              <div>
                  <div class="desc">
                      <img src="./up95805238-16.jpg" alt="">
                      <div>
                          <p class="broadcast-title">豆瓣说</p>
                          <p class="broadcast-date">{{broadcastDetailData.create_time}}</p>
                      </div>
                  </div>
                  <div class="broadcast-content">
                      <p>{{broadcastDetailData.text}}</p>
                      <img class="landscape" v-bind:src="getImage(imgUrl)" alt="">
                      <div class="info">
                          <span><img src="./ic_like_gray.svg">{{broadcastDetailData.like_count}}</span>
                          <span><img src="./ic_comment.svg">{{broadcastDetailData.comments_count}}</span>
                          <span><img src="./ic_like_gray.svg">{{broadcastDetailData.reshares_count}}</span><span><img src="./more.svg"></span>
                      </div>
                  </div>
              </div>
              <div class="comment-list">
                 <p class="huiying">回应{{pinglunNum}}</p>
                 <ul>
                     <li v-for="pinglun in pingluns">
                         <div class="desc">
                             <img v-bind:src="pinglun.author.avatar" alt="">
                             <div>
                                 <p class="broadcast-title">{{pinglun.author.name}}</p>
                                 <p class="broadcast-date">{{pinglun.create_time}}</p>
                             </div>
                         </div>
                         <p class="content">{{pinglun.text}}</p>
                     </li>
                 </ul>
              </div>
              <v-footer></v-footer>
         </div>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import VFooter from 'components/v-footer'
export default {
       data(){
           return {
              id:"",
              broadcastDetailData:{},
              imgUrl:"",
              pingluns:"",
              pinglunNum:""
           }
       },
       methods:{
           broadcastDetail(){
               this.id=this.$route.query.id
               this.$jsonp('https://m.douban.com/rexxar/api/v2/status/'+this.id,{ck:"",for_mobile:1}).then(data =>{
                   //console.log(data)
                   this.broadcastDetailData = data
                   this.imgUrl= data.images[0].normal.url
               }).catch(err => {
               　　console.log(err)
               })
               this.$jsonp('https://m.douban.com/rexxar/api/v2/status/'+this.id+'/comments',{start:0,count:10,ck:"",for_mobile:1}).then(data =>{
                   //console.log(data)
                   this.pingluns = data.comments
                   this.pinglunNum= data.total
                   this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper,{})
                })
               }).catch(err => {
               　　console.log(err)
               })
           },
           getImage: function(url){
             if(url !== undefined){
                 return url.replace(/^http\w{0,1}:\/\//ig,'https://images.weserv.nl/?url=');
             }
           }
       },
       created(){
          this.id=this.$route.query.id
       },
       watch:{
         id:'broadcastDetail'
       },
       components:{
          VFooter
       }
}
</script>

<style scoped>
     .broadcastDetail{margin:0 18px;}
     .wrapper{height:600px;overflow:hidden;}
     .comment-list ul{margin:0;padding:0;}
     .desc{margin-top:20px;}
     .desc p{margin:0;}
     .desc img{width:40px;height:40px;margin-right:10px;float:left;border-radius:50%;}
     .broadcast-title{font-size:17px;color:#494949;}
     .comment-list .broadcast-title{font-size:15px;}
     .broadcast-date{font-size:14px;color:#aaa;}
     .comment-list .broadcast-date{font-size:12px;}
     .broadcast-content{padding-bottom:20px;border-bottom:1px solid #E8E8E8}
     .broadcast-content p{font-size:17px;color:#494949;}
     .landscape{width:100%;max-height:300px;}
     .info{margin-top:13px;}
     .info img{width:20px;height:20px;vertical-align:bottom;margin-right:3px;}
     .info span{color:#ccc;font-size:14px;margin-right:18px;}
     .comment-list .content{margin:10px 0 10px 50px;color:#494949;font-size:15px;}
     .comment-list li{margin-bottom:20px;}
     .comment-list .huiying{color:#aaa;margin:45px 0 18px;}
     .comment-list img{border-radius:50%;width:36px;height:36px;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>