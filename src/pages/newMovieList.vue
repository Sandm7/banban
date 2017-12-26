<template>
  <div class="movieList">
      <div class="wrapper" ref="wrapper">
         <div>
             <h3 class="movieListHeader">{{movieListHeader}}</h3>
             <ul class="grid">
                <li v-for="movieListList in movieListLists">
                   <div class="ratio3_4">
                       <img v-lazy="getImage(movieListList.cover.url)" alt="">
                   </div>
                   <p>{{movieListList.title}}</p>
                </li>
             </ul>
         </div>
      </div>
      <div v-show="!movieListLists.length" class="loading-container">
        <loading></loading>
      </div>
  </div>
</template>

<script>
var num =0
import BScroll from 'better-scroll'
import Loading from 'components/loading/loading'
export default {
   data(){
       return {
            movieListHeader:"",
            movieListLists:[]
       }
   },
   methods:{
       movieList(){
           this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',{os:"ios",for_mobile:1,callback:"jsonp1",start:num,count:18,loc_id:"108288",_:"1513302961321"}).then(data =>{
               //console.log(data)
               this.movieListHeader = data.subject_collection.name
               this.movieListLists = this.movieListLists.concat(data.subject_collection_items)
               num+=18
               this.$nextTick(() => {
                   if (!this.scroll) {
                       this.scroll = new BScroll(this.$refs.wrapper,{})
                       //下拉刷新
                       this.scroll.on('touchend', (pos) => {
                           if (pos.y > 50) {
                              this.movieListLists =[]
                              num=0
                              //console.log(1)
                              this.movieList()
                           }
                       })
                       //上拉加载
                       this.scroll.on('scrollEnd', () => {
                                   // 滚动到底部
                                   if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                                     //console.log(2)
                                     this.movieList()
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
       getImage: function(url){
         if(url !== undefined){
             return url.replace(/^http\w{0,1}:\/\//ig,'https://images.weserv.nl/?url=');
         }
       }
   },
   created(){
       this.movieList()
   },
   components:{
      Loading
   }
}
</script>

<style scoped>
     .movieList{padding:0 2%;box-sizing:border-box;}
     .wrapper{height:600px;overflow:hidden;}
     .movieListHeader{font-size:24px;font-weight:normal;padding-left:4%;color:#494949;}
     .grid{margin:0;padding:0;overflow:hidden;}
     .grid li{padding:0 4%;float:left;width:33.33333%;box-sizing:border-box;margin-bottom:20px;}
     .ratio3_4{position:relative;}
     .ratio3_4{content: "";display: block;padding-top: 143%;}
     .grid img{width:100%;min-height:100%;min-width:100%;position: absolute;left:-100%;right:-100%;top:-100%;bottom:-100%;margin:auto;}
     .grid p{text-align:center;font-size:13px;color:#494949;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%;margin:0;padding-top:5px;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>