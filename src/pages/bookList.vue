<template>
  <div class="bookList">
      <div class="wrapper" ref="wrapper">
          <ul>
              <li v-for="bookList in bookLists" class="special-wrap">
                 <h3>{{bookList.title}}</h3>
                 <p>{{bookList.desc}}</p>
                 <div class="cards">
                      <img v-bind:src="bookList.img1" alt=""><img v-bind:src="bookList.img2" alt=""><img v-bind:src="bookList.img3" alt="">
                 </div>
              </li>
          </ul>
      </div>
      <div v-show="!bookLists.length" class="loading-container">
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
            bookLists:[]
       }
   },
   methods:{
        bookList(){
           axios.get('src/data/bookList.json').then((res) => {
             //console.log(res.data.data)
             this.bookLists = res.data.data
             this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.wrapper,{})
                })
             })
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
     .bookList ul{margin:0;padding:15px 10px;box-sizing:border-box;}
     .wrapper{height:600px;overflow:hidden;background:#f7f1ed;}
     .special-wrap{background:#fff;margin-bottom:20px;padding:20px;box-sizing:border-box;}
     .special-wrap h3{font-size:19px;color:#494949;font-weight:600;margin:0;}
     .special-wrap p{font-size:13px;color:#9b9b9b;margin:10px 0;}
     .cards img{width:50px;height:70px;margin-right:5px;border:none;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>