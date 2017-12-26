<template>
  <div class="bookList">
      <div class="wrapper" ref="wrapper">
         <div>
             <h3 class="bookListHeader">{{bookListHeader}}</h3>
             <ul class="list">
                <li v-for="bookListList in bookListLists">
                   <img v-lazy="getImage(bookListList.cover.url)" alt="">
                   <div class="info">
                       <h4>{{bookListList.title}}</h4>
                       <p>{{bookListList.info}}</p>
                   </div>
                </li>
             </ul>
         </div>
      </div>
      <div v-show="!bookListLists.length" class="loading-container">
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
            bookListHeader:"",
            bookListLists:[]
       }
   },
   methods:{
       bookList(){
           this.$jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items',{os:"ios",for_mobile:1,callback:"jsonp1",start:num,count:18,loc_id:"108288",_:"1513312950647"}).then(data =>{
               //console.log(data)
               this.bookListHeader = data.subject_collection.name
               this.bookListLists = this.bookListLists.concat(data.subject_collection_items)
               num+=18
               this.$nextTick(() => {
                   if (!this.scroll) {
                       this.scroll = new BScroll(this.$refs.wrapper,{})
                       //下拉刷新
                       this.scroll.on('touchend', (pos) => {
                           if (pos.y > 50) {
                              this.bookListLists =[]
                              num=0
                              //console.log(1)
                              this.bookList()
                           }
                       })
                       //上拉加载
                       this.scroll.on('scrollEnd', () => {
                                   // 滚动到底部
                                   if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                                     //console.log(2)
                                     this.bookList()
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
       this.bookList()
   },
   components:{
      Loading
   }
}
</script>

<style scoped>
     .bookList{margin:0 18px;}
     .wrapper{height:600px;overflow:hidden;}
     .bookList h3{margin:16px 0 6px;}
     .bookListHeader{font-size:24px;font-weight:normal;color:#494949;}
     .list{margin:0;padding:0;}
     .list li{display:flex;border-bottom:1px solid #ccc;padding:20px 0;}
     .list img{width:100px;height:150px;margin-right:15px;}
     .list .info{flex:1;}
     .info h4{font-size:17px;color:#494949;margin:0;padding:5px 0;}
     .info p{font-size:12px;color:#9b9b9b;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>