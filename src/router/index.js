import { createWebHistory, createRouter } from 'vue-router'
import addWardrobeItem from '../components/addnew'
import loginPage from '../components/auth/login'
import addBlogPost from '../components/addblogpost'
import BlogPage from '../components/blogPage'
import homeUserPage from '../components/homeUserPage'
import allWardrobeItems from '../components/allitems'
import singleItem from '../components/singleitem'
import editItem from '../components/editItem'


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
        name: 'allWardrobeItems',
        path: '/allitems/:email',
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
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router