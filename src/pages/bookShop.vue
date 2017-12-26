<template>
  <div class="bookShop">
     <mt-swipe class="swipe">
       <mt-swipe-item><img src="./2191.jpg"></mt-swipe-item>
       <mt-swipe-item><img src="./2207.jpg"></mt-swipe-item>
       <mt-swipe-item><img src="./2273.jpg"></mt-swipe-item>
       <mt-swipe-item><img src="./2277.jpg"></mt-swipe-item>
       <mt-swipe-item><img src="./2285.jpg"></mt-swipe-item>
     </mt-swipe>
     <div class="tab">
        <router-link tag="div" class="tab-item" to="/bookShop/activity">
            <span class="tab-link">活动</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/bookShop/newBook">
            <span class="tab-link">新书</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/bookShop/bookList">
            <span class="tab-link">书单</span>
        </router-link>
     </div>
     <keep-alive>
        <router-view></router-view>
     </keep-alive>
  </div>
</template>

<script>
export default {
   components:{

   }
}
</script>

<style scoped>
     .swipe{height:175px;}
     .swipe img{display:block;width:100%;}
     .tab{display:flex;}
     .tab-item{flex:1;font-size:16px;height:50px;line-height:50px;text-align:center;color:#9b9b9b;position:relative;font-size:17px;}
     .router-link-active .tab-link{color:#333;}
     .router-link-active:after{content:"";display:block;height:2px;background:#31c27c;position:absolute;bottom:0;left:0;width:100%;}
</style>