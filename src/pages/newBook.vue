<template>
  <div class="newBook">
      <div class="wrapper" ref="wrapper">
          <ul>
              <li v-for="newBookList in newBookLists">
                  <img v-bind:src="newBookList.rectangle_pic" alt="" class="rectangle_pic">
                  <div class="info">
                      <h3>{{newBookList.title}}</h3>
                      <p>{{newBookList.desc}}</p>
                  </div>
                  <img v-bind:src="newBookList.square_pic" alt="" class="square_pic">
                  <span class="price">{{newBookList.price}}</span>
              </li>
          </ul>
      </div>
      <div v-show="!newBookLists.length" class="loading-container">
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
            newBookLists:[]
       }
   },
   methods:{
       newBookList(){
           axios.get('src/data/newBook.json').then((res) => {
             this.newBookLists = res.data.data
             this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.wrapper,{})
                })
             })
       }
   },
   created(){
       this.newBookList()
   },
   components:{
      Loading
   }
}
</script>

<style scoped>
     .wrapper{height:600px;overflow:hidden;background:#f7f1ed;}
     .newBook ul{margin:0;padding:15px 10px;box-sizing:border-box;}
     .newBook ul li{position:relative;background:#fff;margin-bottom:20px;}
     .rectangle_pic{width:100%;display:block;}
     .info{background:#fff;height:110px;padding:0 20px 0 125px;}
     .info h3{font-size:19px;color:#494949;padding:12px 0 5px;margin:0;}
     .info p{margin:0;-webkit-line-clamp:2;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;font-size:14px;color:#9b9b9b;}
     .square_pic{position:absolute;left:20px;bottom:20px;width:90px;height:120px;}
     .price{position:absolute;right:0;bottom:97px;background:#e76648;color:#fff;font-size:16px;padding:2px 8px 2px 5px;line-height:22px;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>