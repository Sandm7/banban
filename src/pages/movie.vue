<template>
  <div class="wrapper-box" ref="wrapper">
      <div class="movie">
         <div class="hotMovie movie-list">
         <h3><span>{{hotMovieHeader}}</span><router-link tag="span" class="more" to="/hotMovieList">更多</router-link></h3>
            <div class="wrapper" ref="wrapper1">
                <ul>
                   <li v-for="hotMovieList in hotMovieLists">
                      <img v-lazy="getImage(hotMovieList.cover.url)">
                      <p>{{hotMovieList.title}}</p>
                   </li>
                </ul>
            </div>
         </div>
         <div class="freeMovie movie-list">
            <h3><span>{{freeMovieHeader}}</span><router-link tag="span" class="more" to="/freeMovieList">更多</router-link></h3>
            <div class="wrapper" ref="wrapper2">
                <ul>
                   <li v-for="freeMovieList in freeMovieLists">
                      <img v-lazy="getImage(freeMovieList.cover.url)">
                      <p>{{freeMovieList.title}}</p>
                   </li>
                </ul>
            </div>
         </div>
         <div class="newMovie movie-list">
            <h3><span>{{newMovieHeader}}</span><router-link tag="span" class="more" to="/newMovieList">更多</router-link></h3>
            <div class="wrapper" ref="wrapper3">
                <ul>
                   <li v-for="newMovieList in newMovieLists">
                      <img v-lazy="getImage(newMovieList.cover.url)">
                      <p>{{newMovieList.title}}</p>
                   </li>
                </ul>
            </div>
         </div>
         <div class="browse">
            <h3>分类浏览</h3>
            <ul>
                <li v-for="browse in browses" @click="jumpMBrowseDetail(browse.text,browse.id)">{{browse.text}}</li>
            </ul>
         </div>
         <v-footer></v-footer>
         <div v-show="!hotMovieLists.length" class="loading-container">
           <loading></loading>
         </div>
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
         hotMovieHeader:"",
         hotMovieLists:[],
         freeMovieHeader:"",
         freeMovieLists:[],
         newMovieHeader:"",
         newMovieLists:[],
         browses:[{text:"经典",id:"filter_movie_classic_hot"},{text:"冷门佳片",id:"filter_movie_unpopular_hot"},{text:"豆瓣高分",id:"filter_movie_score_hot"},{text:"动作",id:"filter_movie_action_hot"},{text:"喜剧",id:"filter_movie_comedy_hot"},{text:"爱情",id:"filter_movie_love_hot"},{text:"悬疑",id:"filter_movie_mystery_hot"},{text:"恐怖",id:"filter_movie_horror_hot"},{text:"科幻",id:"filter_movie_sci-fi_hot"},{text:"治愈",id:"filter_movie_cure_hot"},{text:"文艺",id:"filter_movie_literature_hot"},{text:"成长",id:"filter_movie_growth_hot"},{text:"动画",id:"filter_movie_cartoon_hot"},{text:"华语",id:"filter_movie_chinese_hot"},{text:"欧美",id:"filter_movie_occident_hot"},{text:"韩国",id:"filter_movie_korea_hot"},{text:"日本",id:"filter_movie_japan_hot"}]
      }
    },
    methods:{
        hotMovie(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',{os:"ios",callback:"jsonp1",start:0,count:8,loc_id:"108288",_:"1513316022156"}).then(data =>{
                //console.log(data)
                this.hotMovieHeader = data.subject_collection.name
                this.hotMovieLists = data.subject_collection_items
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper1,{scrollX:true})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        freeMovie(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',{os:"ios",callback:"jsonp2",start:0,count:8,loc_id:"108288",_:"1513316022156"}).then(data =>{
                //console.log(data)
                this.freeMovieHeader = data.subject_collection.name
                this.freeMovieLists = data.subject_collection_items
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper2,{scrollX:true})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        newMovie(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',{os:"ios",callback:"jsonp3",start:0,count:8,loc_id:"108288",_:"1513316022156"}).then(data =>{
                //console.log(data)
                this.newMovieHeader = data.subject_collection.name
                this.newMovieLists = data.subject_collection_items
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper3,{scrollX:true})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        wrapperBox(){
            this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper,{})
                })
        },
        getImage: function(url){
          if(url !== undefined){
              return url.replace(/^http\w{0,1}:\/\//ig,'https://images.weserv.nl/?url=');
          }
        },
        jumpMBrowseDetail(groupBrowseText,groupBrowseId){
           this.$router.push(
              {
               path:'/mBrowse',
               query: {
                 text:groupBrowseText,
                 id: groupBrowseId
               }
             }
           )
        }
    },
    created(){
       this.hotMovie()
       this.freeMovie()
       this.newMovie()
       this.wrapperBox()
    },
    components:{
       VFooter,
       Loading
    }
}
</script>

<style scoped>
    .movie{margin:0 18px;height:1431px;}
    .wrapper-box{height:600px;overflow:hidden;}
    .movie-list h3{font-weight:normal;height:24px;line-height:24px;}
    .movie-list span{float:left;color:#111;font-size:16px;}
    .movie-list .more{float:right;font-size:14px;color:#42bd56;}
    .wrapper{width:100%;overflow:hidden;}
    .movie-list ul{margin:0;width:864px;padding:0;}
    .movie-list li{float:left;margin-right:8px;width:100px;}
    .movie-list img{width:100px;height:143px;}
    .movie-list p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:center;}
    .browse{overflow:hidden;}
    .browse h3{color:#111;font-size:16px;font-weight:normal;}
    .browse ul{margin:0;padding:0;}
    .browse li{width:50%;height:43px;line-height:43px;float:left;border:1px solid #eee;color:#42bd56;box-sizing:border-box;font-size:14px;text-align:center;}
    .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>