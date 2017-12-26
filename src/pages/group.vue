<template>
  <div class="group">
     <div class="wrapper" ref="wrapper">
         <div class="wrapper-box">
             <ul>
                 <li v-for="recGroupList in recGroupLists">
                    <h3 class="group-header">{{recGroupList.name}}</h3>
                    <ul>
                        <li v-for="groupList in recGroupList.groups" class="group-list" @click="jumpGroupDetail(groupList.id)">
                            <div class="group-meta">
                                <img v-bind:src="groupList.avatar">
                                <span class="group-name">{{groupList.name}}</span>
                                <span class="group-member">{{groupList.member_count}}人</span>
                            </div>
                            <p class="group-topic">{{groupList.desc_abstract}}</p>
                        </li>
                    </ul>
                    <div class="more-group" @click="jumpGroupMore(recGroupList.name)">更多相关小组</div>
                 </li>
             </ul>
             <v-footer></v-footer>
         </div>
     </div>
     <div v-show="!recGroupLists.length" class="loading-container">
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
            recGroupLists:[]
        }
     },
     methods:{
        group(){
             this.$jsonp('https://m.douban.com/rexxar/api/v2/group/rec_groups_for_newbies',{ck:"",for_mobile:1}).then(data =>{
                 //console.log(data)
                 this.recGroupLists = data.rec_groups[0].classified_groups
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
         },
         jumpGroupMore(groupMoreTag){
            this.$router.push(
               {
                path:'/groupMore',
                query: {
                  tag: groupMoreTag
                }
              }
            )
         }
     },
     created(){
         this.group()
     },
     components:{
         VFooter,
         Loading
     }
}
</script>
<style scoped>
     .group{margin:0 18px;height:100%;}
     .wrapper{height:600px;overflow:hidden;}
     .wrapper-box{padding-bottom:128px;}
     .group-header{font-size:18px;color:#111;margin:0;margin-top:14px;font-weight:normal;}
     .group ul{margin:0;padding:0;}
     .group-list{border-bottom:1px solid #e8e8e8;padding-top:15px;}
     .group-meta{display:flex;align-items:center;}
     .group-meta img{border-radius:3px;width:40px;height:40px;border:1px solid #f1f1f1;}
     .group-name{flex:1;;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 10px;font-size:18px;color:#111;}
     .group-member{font-size:15px;color:#ccc;}
     .group-topic{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px;color:#aaa;}
     .more-group{font-size:15px;color:#42bd56;padding:12px 0;text-align:center;border:1px solid #e8e8e8;border-top:none;}
     .loading-container{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);margin-left:-18px;}
</style>