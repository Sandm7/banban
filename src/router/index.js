import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/index'
import Movie from 'pages/movie'
import Book from 'pages/book'
import Broadcast from 'pages/broadcast'
import Group from 'pages/group'
import Search from 'pages/search'
import Detail from 'pages/detail'
import HotMovieList from 'pages/hotMovieList'
import FreeMovieList from 'pages/freeMovieList'
import NewMovieList from 'pages/newMovieList'
import HotBookList from 'pages/hotBookList'
import FreeBookList from 'pages/freeBookList'
import BookShop from 'pages/bookShop'
import Activity from 'pages/activity'
import NewBook from 'pages/newBook'
import BookList from 'pages/bookList'
import GroupDetail from 'pages/groupDetail'
import BroadcastDetail from 'pages/broadcastDetail'
import GroupMore from 'pages/groupMore'
import MBrowse from 'pages/mBrowse'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/movie',
      component: Movie
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/broadcast',
      component: Broadcast
    },
    {
      path: '/group',
      component: Group
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/hotMovieList',
      component: HotMovieList
    },
    {
      path: '/freeMovieList',
      component: FreeMovieList
    },
    {
      path: '/newMovieList',
      component: NewMovieList
    },
    {
      path: '/hotBookList',
      component: HotBookList
    },
    {
      path: '/freeBookList',
      component: FreeBookList
    },
    {
      path: '/bookShop',
      component: BookShop,
      children:[
          {
            path: '/',
            redirect: 'newBook'
          },
          {
            path: 'activity',
            component: Activity
          },
          {
            path: 'newBook',
            component: NewBook
          },
          {
            path: 'bookList',
            component: BookList
          }
      ]
    },
    {
      path: '/groupDetail',
      component: GroupDetail
    },
    {
      path: '/broadcastDetail',
      component: BroadcastDetail
    },
    {
      path: '/groupMore',
      component: GroupMore
    },
    {
      path: '/mBrowse',
      component: MBrowse
    }
  ]
})
