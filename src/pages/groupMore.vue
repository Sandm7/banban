<template>
  <div class="groupMore">
      <div class="wrapper" ref="wrapper">
          <ul>
              <h3 class="group-header">{{tag}}</h3>
              <li v-for="groupMore in groupMores" class="group-list" @click="jumpGroupDetail(groupMore.id)">
                  <div class="group-meta">
                      <img v-bind:src="groupMore.avatar">
                      <span class="group-name">{{groupMore.name}}</span>
                      <span class="group-member">{{groupMore.member_count}}人</span>
                  </div>
                  <p class="group-topic">{{groupMore.desc_abstract}}</p>
              </li>
              <p v-if="!groupMores.length&&noData">没有找到相关小组</p>
          </ul>
      </div>
      <div v-show="!groupMores.length&&!noData" class="loading-container">
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
           tag:"",
           groupMores:[],
           noData:false
       }
    },
    methods:{
       groupMoreData(){
            this.$jsonp('https://m.douban.com/rexxar/api/v2/group/rec_groups_by_tag',{tag:this.tag,start:0,count:25,ck:"",for_mobile:1}).then(data =>{
                //console.log(data)
                this.groupMores = data.groups
                this.noData = true
                this.$nextTick(() =>{
                     new BScroll(this.$refs.wrapper,{})
                })
            }).catch(err => {
            　　console.log(err)
            })
        },
        jumpGroupDetail(groupDetailId){
            this.$router.push(
               {
                path:'/groupDetail',
                query: {
                  id: groupDetailId
                }
              }
            )
         }
    },
    created(){
       this.tag=this.$route.query.tag
    },
    watch:{
      tag:'groupMoreData'
    },
    components:{
         VFooter,
         Loading
     }
}
</script>

<style scoped>
     .groupMore{margin:0 18px;}
     .wrapper{height:600px;overflow:hidden;}
     .group-header{font-size:18px;color:#111;margin:0;margin-top:14px;font-weight:normal;}
     .groupMore ul{margin:0;padding:0;}
     .group-list{border-bottom:1px solid #e8e8e8;padding-top:15px;}
     .group-meta{display:flex;align-items:center;}
     .group-meta img{border-radius:3px;width:40px;height:40px;border:1px solid #f1f1f1;}
     .group-name{flex:1;;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 10px;font-size:18px;color:#111;}
     .group-member{font-size:15px;color:#ccc;}
     .group-topic{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px;color:#aaa;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>
