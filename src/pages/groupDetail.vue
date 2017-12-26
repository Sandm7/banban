<template>
  <div class="groupDetail" v-bind:style="{backgroundColor:backgroundColor}">
      <h3><img v-bind:src="groupDetailData.avatar" alt=""><span>{{groupDetailData.name}}</span></h3>
      <p>{{groupDetailData.member_count}}个{{groupDetailData.member_name}}</p>
  </div>
</template>

<script>
export default {
   data(){
       return {
         id:"",
         groupDetailData:{},
         backgroundColor:"#51C21C"
       }
   },
   methods:{
       groupDetail(){
           this.id=this.$route.query.id
           this.$jsonp('https://m.douban.com/rexxar/api/v2/group/'+this.id,{ck:"",for_mobile:1}).then(data =>{
               //console.log(data)
               this.groupDetailData = data
               this.backgroundColor = data.background_mask_color
           }).catch(err => {
           　　console.log(err)
           })
       }
   },
   created(){
         this.id=this.$route.query.id
   },
   watch:{
     id:'groupDetail'
   }
}
</script>

<style scoped>
     .groupDetail{padding:35px 0;color:#fff;text-align:center;}
     .groupDetail h3{vertical-align:bottom;}
     .groupDetail img{width:25px;height:25px;margin-right:8px;vertical-align:bottom;}
     .groupDetail span{font-size:24px;font-weight:500;}
     .groupDetail p{font-size:12px;margin:15px 0 20px;}
</style>