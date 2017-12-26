<template>
  <div class="activity">
       <div class="wrapper" ref="wrapper">
           <ul>
               <li v-for="activityList in activityLists">
                   <div class="poster">
                       <img v-bind:src="activityList.share_pics_rectangle" alt="" class="share_pics_rectangle">
                       <div class="poster-title">
                           <h3>#{{activityList.title}}</h3>
                           <p>{{activityList.share_title}}</p>
                       </div>
                   </div>
                   <div class="content">
                       <p class="content-header">{{activityList.share_content}}</p>
                       <p class="content-info"><img src="./people.png">{{activityList.partake_counts}}人参与</p>
                   </div>
               </li>
           </ul>
       </div>
       <div v-show="!activityLists.length" class="loading-container">
         <loading></loading>
       </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Loading from 'components/loading/loading'
export default {
   data(){
       return {
            activityLists:[]
       }
   },
   methods:{
       activityList(){
           axios.get('src/data/activity.json').then((res) => {
             this.activityLists = res.data.data
             this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.wrapper,{})
                })
             })
       }
   },
   created(){
       this.activityList()
   },
   components:{
      Loading
   }
}
</script>

<style scoped>
      .wrapper{height:600px;overflow:hidden;background:#f7f1ed;}
      .activity ul{margin:0;padding:15px 10px;box-sizing:border-box;}
      .activity ul li{background:#fff;margin-bottom:20px;}
      .poster{position:relative;}
      .poster-title{position:absolute;top:38px;text-align:center;width:100%;}
      .poster-title h3{font-size:21px;color:#fff;font-weight:500;margin:0;padding:0;}
      .poster-title p{font-size:15px;color:#fff;margin:0;padding:0;}
      .share_pics_rectangle{width:100%;height:121px;display:block;}
      .content-header{font-size:14px;color:#9b9b9b;padding:0 20px;-webkit-line-clamp:2;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;}
      .content-info img{width:18px;height:18px;vertical-align:top;}
      .content-info{font-size:14px;color:#494949;padding:10px 20px 20px;}
      .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>