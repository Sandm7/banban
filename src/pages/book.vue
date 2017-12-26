<template>
  <div class="wrapper-box" ref="wrapper">
      <div class="book">
         <div class="hotBook book-list">
            <h3><span>{{hotBookHeader}}</span><router-link tag="span" class="more" to="/hotBookList">更多</router-link></h3>
            <div class="wrapper" ref="wrapper1">
                <ul>
                   <li v-for="hotBookList in hotBookLists">
                      <img v-lazy="getImage(hotBookList.cover.url)">
                      <p>{{hotBookList.title}}</p>
                   </li>
                </ul>
            </div>
         </div>
         <div class="freeBook book-list">
            <h3><span>{{freeBookHeader}}</span><router-link tag="span" class="more" to="/freeBookList">更多</router-link></h3>
            <div class="wrapper" ref="wrapper2">
                <ul>
                   <li v-for="freeBookList in freeBookLists">
                      <img v-lazy="getImage(freeBookList.cover.url)">
                      <p>{{freeBookList.title}}</p>
                   </li>
                </ul>
            </div>
         </div>
         <div class="bookshop book-list">
             <h3><span>{{bookshopHeader}}</span><router-link tag="span" class="more" to="/bookShop">更多</router-link></h3>
             <div class="promBook">
                 <img v-lazy="getImage(bookshopProm.cover.url)">
                 <div class="promBook-content">
                     <div class="promBook-title">
                         <span>￥{{bookshopProm.price}}</span>
                         <h3>{{bookshopProm.title}}</h3>
                     </div>
                     <p>{{bookshopProm.info}}</p>
                 </div>
             </div>
             <div class="wrapper" ref="wrapper3">
                <ul>
                   <li v-for="bookshopList in bookshopLists">
                      <img v-lazy="getImage(bookshopList.cover.url)">
                      <p>{{bookshopList.title}}</p>
                      <span class="price">￥{{bookshopList.price}}</span>
                   </li>
                </ul>
            </div>
         </div>
         <div class="browse">
            <h3>分类浏览</h3>
            <ul>
                <li v-for="browse in browses" @click="jumpBBrowseDetail(browse.text,browse.id)">{{browse.text}}</li>
            </ul>
         </div>
         <v-footer></v-footer>
         <div v-show="!hotBookLists.length" class="loading-container">
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
         hotBookHeader:"",
         hotBookLists:[],
         freeBookHeader:"",
         freeBookLists:[],
         bookshopHeader:"",
         bookshopProm:{cover:{url:""}},
         bookshopLists:[],
         browses:[{text:"小说",id:"filter_movie_classic_hot"},{text:"爱情",id:"filter_movie_unpopular_hot"},{text:"历史",id:"filter_movie_score_hot"},{text:"外国文学",id:"filter_movie_action_hot"},{text:"青春",id:"filter_movie_comedy_hot"},{text:"励志",id:"filter_movie_love_hot"},{text:"随笔",id:"filter_movie_mystery_hot"},{text:"传记",id:"filter_movie_horror_hot"},{text:"推理",id:"filter_movie_sci-fi_hot"},{text:"旅行",id:"filter_movie_cure_hot"},{text:"奇幻",id:"filter_movie_literature_hot"},{text:"经管",id:"filter_movie_growth_hot"}]
      }
    },
    methods:{
        hotBook(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items',{os:"ios",callback:"jsonp1",start:0,count:8,loc_id:"0",_:"1513169908804"}).then(data =>{
                //console.log(data)
                this.hotBookHeader = data.subject_collection.name
                this.hotBookLists = data.subject_collection_items
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper1,{scrollX:true})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        freeBook(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items',{os:"ios",callback:"jsonp2",start:0,count:8,loc_id:"0",_:"1513169908805"}).then(data =>{
                //console.log(data)
                this.freeBookHeader = data.subject_collection.name
                this.freeBookLists = data.subject_collection_items
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper2,{scrollX:true})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        bookShop(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items',{os:"ios",callback:"jsonp3",start:0,count:8,loc_id:"0",_:"1513169908805"}).then(data =>{
                //console.log(data)
                this.bookshopHeader = data.subject_collection.name
                this.bookshopProm = data.header
                this.bookshopLists = data.subject_collection_items
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
        jumpBBrowseDetail(groupBrowseText,groupBrowseId){
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
       this.hotBook()
       this.freeBook()
       this.bookShop()
       this.wrapperBox()
    },
    components:{
       VFooter,
       Loading
    }
}
</script>

<style scoped>
     .book{margin:0 18px;height:1446px;}
     .wrapper-box{height:600px;overflow:hidden;}
     .book-list h3{font-weight:normal;height:24px;line-height:24px;}
     .book-list span{float:left;color:#111;font-size:16px;}
     .book-list .more{float:right;font-size:14px;color:#42bd56;}
     .wrapper{width:100%;overflow:hidden;}
     .book-list ul{margin:0;width:864px;padding:0;overflow:hidden;}
     .book-list li{float:left;margin-right:8px;width:100px;text-align:center;}
     .book-list img{width:100px;height:143px;}
     .book-list p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:center;font-size:15px;}
     .promBook{display:flex;overflow:hidden;}
     .promBook img{width:100px;height:132px;margin-right:15px;}
     .promBook-content{flex:1;overflow:hidden;}
     .promBook-title{margin:10px 0;}
     .promBook-content h3{color:#494949;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%;margin-right:40px;}
     .promBook-content span{float:right;color:#E76648;font-size:16px;}
     .promBook-content p{color:#9B9B9B;font-size:13px;text-align:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
     .bookshop ul{width:2160px;}
     .bookshop .price{font-size:12px;color:#aaa;float:none;}
     .browse{overflow:hidden;}
     .browse h3{color:#111;font-size:16px;font-weight:normal;}
     .browse ul{margin:0;padding:0;}
     .browse li{width:50%;height:43px;line-height:43px;float:left;border:1px solid #eee;color:#42bd56;box-sizing:border-box;font-size:14px;text-align:center;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>