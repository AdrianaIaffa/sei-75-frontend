import { createWebHistory, createRouter } from 'vue-router'
import addWardrobeItem from '../components/addnew'
import loginPage from '../components/auth/login'
import addBlogPost from '../components/addblogpost'
import BlogPage from '../components/blogPage'
import homeUserPage from '../components/homeUserPage'
import allWardrobeItems from '../components/allitems'
import singleItem from '../components/singleitem'
import editItem from '../components/editItem'
import homePage from '../components/homePage'
import outfitPlanner from '../components/outfitPlanner'
import blogPost from '../components/blogPost'
import allOutfits from '../components/allOutfits'


const routes = [
    {
        name: 'addWardrobeItem',
        path: '/addnew',
        component: addWardrobeItem
    },
    {
		name: 'loginPage',
		path: '/login',
		component: loginPage
	},
    {
        name: 'BlogPage',
        path: '/blogPage',
        component: BlogPage
    },
    {
        name: 'addBlogPost',
        path: '/addblogpost',
        component: addBlogPost
    },
    {
        name: 'homeUserPage',
        path: '/homeUserPage',
        component: homeUserPage
    },
    {
        name: 'blogPost',
        path: '/blogPost',
        component: blogPost
    },
    {
        name: 'allWardrobeItems',
        path: '/allitems/:userEmail',
        component: allWardrobeItems
    },
    {
        name: 'singleItem',
        path: '/singleitem/:id',
        component: singleItem
    },
    {
        name: 'editItem',
        path: '/editItem/:id',
        component: editItem
    },
    {
        name: 'homePage',
        path: '/homePage.vue',
        component: homePage
    },
    {
        name: 'outfitPlanner',
        path: '/outfitPlanner/:userEmail',
        component: outfitPlanner
    },
    {
        name: 'allOutfits',
        path: '/allOutfits/:userEmail',
        component: allOutfits
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router