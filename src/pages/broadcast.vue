<template>
  <div class="broadcast">
     <div class="wrapper" ref="wrapper">
         <div class="wrapper-box">
             <ul>
                <li v-for="broadcastList in broadcastLists">
                    <div class="desc">
                        <img src="./up95805238-16.jpg" alt="">
                        <div>
                            <p class="broadcast-title">豆瓣说</p>
                            <p class="broadcast-date">{{broadcastList.status.create_time}}</p>
                        </div>
                    </div>
                    <div class="broadcast-content">
                        <p @click="jumpBroadcastDetail(broadcastList.status.id)">{{broadcastList.status.text ? broadcastList.status.text : broadcastList.status.card.title}}</p>
                        <div class="info">
                            <span><img src="./ic_like_gray.svg">{{broadcastList.status.like_count}}</span>
                            <span><img src="./ic_comment.svg">{{broadcastList.status.comments_count}}</span>
                            <span><img src="./ic_like_gray.svg">{{broadcastList.status.reshares_count}}</span><span><img src="./more.svg"></span>
                        </div>
                    </div>
                </li>
             </ul>
             <v-footer></v-footer>
         </div>
     </div>
     <div v-show="!broadcastLists.length" class="loading-container">
       <loading></loading>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import VFooter from 'components/v-footer'
import Loading from 'components/loading/loading'
export default {
     data(){
        return {
            broadcastLists:[]
        }
     },
     methods:{
         broadcast(){
             this.$jsonp('https://m.douban.com/rexxar/api/v2/status/anonymous_timeline',{max_id:"",ck:"",for_mobile:1}).then(data =>{
                 //console.log(data)
                 this.broadcastLists = data.items
                 this.$nextTick(() =>{
                      new BScroll(this.$refs.wrapper,{})
                 })
             }).catch(err => {
             　　console.log(err)
             })
         },
         jumpBroadcastDetail(broadcastId){
            this.$router.push(
               {
                path:'/broadcastDetail',
                query: {
                  id: broadcastId
                }
              }
            )
         }
     },
     created(){
         this.broadcast()
     },
     components:{
         VFooter,
         Loading
     }
}
</script>

<style scoped>
     .broadcast{margin:0 18px;}
     .wrapper{height:600px;overflow:hidden;}
     .wrapper-box{padding-bottom:128px;}
     .broadcast ul{margin:0;padding:0;}
     .broadcast li{margin-top:20px;}
     .desc p{margin:0;}
     .desc img{width:40px;height:40px;margin-right:10px;float:left;border-radius:50%;}
     .broadcast-title{font-size:17px;color:#494949;}
     .broadcast-date{font-size:14px;color:#aaa;}
     .broadcast-content{margin-left:50px;}
     .broadcast-content p{font-size:17px;color:#494949;}
     .info{margin-top:13px;}
     .info img{width:20px;height:20px;vertical-align:bottom;margin-right:3px;}
     .info span{color:#ccc;font-size:14px;margin-right:18px;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>