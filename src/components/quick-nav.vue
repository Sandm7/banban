<template>
  <div class="quick-nav">
      <router-link tag="div" class="quick-link" to="/hotMovieList">
          <span>影院热映</span>
      </router-link>
      <router-link tag="div" class="quick-link" to="/hotBookList">
          <span>虚构类图书</span>
      </router-link>
      <router-link tag="div" class="quick-link" to="/broadcast">
          <span>豆瓣说</span>
      </router-link>
      <router-link tag="div" class="quick-link" to="/group">
          <span>豆瓣小组</span>
      </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .quick-nav{margin-top:20px;overflow:hidden;}
    .quick-link{width:50%;padding:3px;float:left;box-sizing:border-box;}
    .quick-link span{display:block;text-align:center;background:#f6f6f6;color:#494949;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:12px 0;}
</style>