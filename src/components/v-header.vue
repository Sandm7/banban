<template>
  <div class="v-header">
     <router-link tag="div" class="tab-logo tab-item" to="/">
         <img src="./logo.png" alt="豆瓣">
     </router-link>
     <div class="tab-item">
         <router-link tag="span" class="tab-link tab-link1" to="/movie">
             电影
         </router-link>
         <router-link tag="span" class="tab-link tab-link2" to="/book">
             图书
         </router-link>
         <router-link tag="span" class="tab-link tab-link3" to="/broadcast">
             广播
         </router-link>
         <router-link tag="span" class="tab-link tab-link4" to="/group">
             小组
         </router-link>
         <router-link tag="span" class="tab-link tab-link-end" to="/search">
         </router-link>
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .v-header{display:flex;border-bottom:1px solid #f3f3f3;justify-content: space-between;padding:0 18px;height:47px;align-items:center;background:#fff;z-index:99;}
    .tab-logo img{width:46px;height:22px;}
    .tab-link{margin-right:15px;font-size:15px;vertical-align:middle;}
    .tab-link-end{margin-right:0;display:inline-block;width:24px;height:18px;background-image:url(./search.png);background-size:24px 18px;}
    .tab-link1{color:#2384E8}
    .tab-link2{color:#9F7860}
    .tab-link3{color:#E4A813}
    .tab-link4{color:#2AB8CC}
</style>