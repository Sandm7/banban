<template>
  <div class="index">
     <div class="wrapper" ref="wrapper">
         <div>
             <quick-nav></quick-nav>
             <ul>
                <li v-for="recommend_feed in recommend_feeds" @click="jumpDetail">
                    <div class="feed-content">
                       <div class="feed-content-left">
                           <h3>{{recommend_feed.title}}</h3>
                           <p>{{recommend_feed.target.desc}}</p>
                       </div>
                       <img v-if="recommend_feed.target.cover_url" v-lazy="getImage(recommend_feed.target.cover_url)">
                    </div>
                    <div class="author">
                        <span class="author-name">by {{recommend_feed.target.author.name}}</span>
                        <span class="author-from">{{recommend_feed.source_cn}}</span>
                    </div>
                </li>
             </ul>
             <div v-show="!recommend_feeds.length" class="loading-container">
               <loading></loading>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Loading from 'components/loading/loading'
import QuickNav from 'components/quick-nav'
export default {
    data(){
       return {
           recommend_feeds:[],
           newDate:""
       }
    },
    methods:{
        loadData(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/recommend_feed',{alt:"json",next_date:this.newDate,loc_id:"108288",gender:"",birthday:"",udid:"9fcefbf2acf1dfc991054ac40ca5114be7cd092f",for_mobile:1}).then(data => {
            　　//console.log(data)
                this.recommend_feeds = this.recommend_feeds.concat(data.recommend_feeds)
                //console.log(this.recommend_feeds)
                this.newDate = data.date
                this.$nextTick(() => {
                   if (!this.scroll) {
                       this.scroll = new BScroll(this.$refs.wrapper,{})
                       //下拉刷新
                       this.scroll.on('touchend', (pos) => {
                           if (pos.y > 50) {
                              this.newDate=""
                              this.recommend_feeds =[]
                              //console.log(1)
                              this.loadData()
                           }
                       })
                       //上拉加载
                       this.scroll.on('scrollEnd', () => {
                                   // 滚动到底部
                                   if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                                     //console.log(2)
                                     this.pulldown()
                                   }
                                 })
                      } else {
                        this.scroll.refresh()
                      }
                   })
            }).catch(err => {
            　　console.log(err)
            })
        },
        pulldown(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/recommend_feed',{alt:"json",next_date:this.newDate,loc_id:"108288",gender:"",birthday:"",udid:"9fcefbf2acf1dfc991054ac40ca5114be7cd092f",for_mobile:1}).then(data =>{
                //console.log(data)
                this.recommend_feeds = this.recommend_feeds.concat(data.recommend_feeds)
                this.$nextTick(() =>{
                     if (!this.scroll) {
                     this.scroll = new BScroll(this.$refs.wrapper,{})
                     }else {
                        this.scroll.refresh()
                      }
                })
                //console.log(this.recommend_feeds)
                this.newDate = data.date
            }).catch(err => {
            　　console.log(err)
            })
        },
        jumpDetail(){
             this.$router.push(
               {path:'/Detail'}
             )
        },
        getImage: function(url){
          if(url !== undefined){
              return url.replace(/^http\w{0,1}:\/\//ig,'https://images.weserv.nl/?url=');
          }
        }
    },
    created(){
         this.loadData()
    },
    components:{
        QuickNav,
        Loading
    }
}
</script>

<style scoped>
     .index{margin:0 18px;}
    .wrapper{height:600px;overflow:hidden;}
    .wrapper ul{margin:0;padding:0;}
    .wrapper ul li{padding:25px 0;}
    .feed-content{display:flex;}
    .feed-content-left{flex:1;}
    .feed-content-left h3{font-size:17px;font-weight:500;margin:0;color:#494949;}
    .feed-content-left p{font-size:12px;color:#aaa;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;}
    .feed-content img{width:87px;height:87px;margin-left:25px;}
    .author{font-size:12px;color:#ccc;overflow:hidden;}
    .author-name{float:left;}
    .author-from{float:right;}
    .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>
