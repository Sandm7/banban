<template>
  <div class="detail">
     <div class="wrapper" ref="wrapper">
         <div class="wrapper-box">
             <div class="card">
                 <h3>看，他好像一个青椒啊</h3>
                 <p class="user-title"><span>豆瓣时间</span><span class="timestamp">2017-12-15</span></p>
                 <div>
                     <p>文/严复初</p>
                     <p>雷思温是一个青椒。</p>
                     <p>这个判断句出现在大学校园就不是病句。青椒，指的是高校青年教师，这个原本属于茄科植物的蔬菜，如今指向了一个颇为庞大的群体：他们生于八零年代前后，一路攻读，取得学位后在高校谋得教职。</p>
                     <p>你很难从外形上将他们和大学生区分开——稚气未脱，学校图书馆、宿舍和食堂里都有他们的身影，他们在校园里思考和讨论问题，用研究成果证明存在价值。</p>
                     <img src="./p47283126.jpg">
                     <p>青椒雷思温的照片看上去还像是一个大学生，但他已经是中国人民大学哲学院的一名讲师。在他的研究领域一栏，古代中世纪哲学和早期现代哲学像两面虚掩的门，高冷而悠远。三行简单的履历显示这位守门人的学术道路：中国人民大学管理学本科，北京大学外国哲学硕士，比利时（荷语）鲁汶大学哲学硕士、博士。</p>
                     <p>很少有人知道，雷思温曾经组建过乐队，对音乐近乎狂热。</p>
                     <p>如今他依旧喜欢音乐，但他已经习惯了在哲学里寻找久违的激情——“音乐充满了规律性和结构性，哲学著作也是一样。”</p>
                     <img src="./p47283134.jpg">
                 </div>
             </div>
             <ul>
                <li v-for="hotNew in hotNews" class="detail-list">
                   <div class="detail-list-left">
                       <h3>{{hotNew.title}}</h3>
                       <span>{{hotNew.subtitle}}</span>
                   </div>
                   <img v-if="hotNew.cover_url" v-lazy="hotNew.cover_url">
                </li>
             </ul>
             <div v-show="!hotNews.length" class="loading-container">
               <loading></loading>
             </div>
             <v-footer></v-footer>
         </div>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Loading from 'components/loading/loading'
import VFooter from 'components/v-footer'
export default {
    data(){
      return {
          hotNews:[]
      }
    },
    methods:{
        loadDetail(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/gallery/topic_selections',{for_mobile:1}).then(data =>{
                //console.log(data)
                this.hotNews=data.items
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
       this.loadDetail()
    },
    components:{
       Loading,
       VFooter
    }
}
</script>

<style scoped>
     .detail{margin:0 18px;}
     .wrapper{height:600px;overflow:hidden;}
     .wrapper-box{padding-bottom:128px;}
     .card{margin-bottom:50px;}
     .card h3{font-size:24px;}
     .card .timestamp{color:#ccc;margin-left:5px;}
     .card p{font-size:18px;color:#494949;}
     .card .user-title{font-size:15px;}
     .card img{display:block;width:100%;}
     .detail ul{margin:0;padding:0;}
     .detail ul li{padding:18px 0;}
     .detail-list{display:flex;}
     .detail-list-left{flex:1;}
     .detail-list-left h3{font-size:17px;font-weight:600;margin:0;color:#494949;margin-bottom:10px;}
     .detail-list-left span{color:#9b9b9b;font-size:13px;}
     .detail-list img{width:70px;height:70px;margin-left:25px;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>