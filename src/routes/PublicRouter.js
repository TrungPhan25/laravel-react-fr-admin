
import AddBlog from "../components/blog/AddBlog"
import EditBlog from "../components/blog/EditBlog"
import ViewBlog from "../components/blog/ViewBlog"
import Category from "../components/category/Category"
import EditCategory from "../components/category/EditCategory"
import ViewCategory from "../components/category/ViewCategory"
import Dashboard from "../components/Dashboard"
import EditDonor from "../components/donor/EditDonor"
import ViewDonor from "../components/donor/ViewDonor"
import EditOrder from "../components/order/EditOrder"
import ViewOrder from "../components/order/ViewOrder"
import AddProdcut from "../components/product/Addproduct"
import EditProduct from "../components/product/EditProduct"
import ViewProduct from "../components/product/ViewProduct"
import Profile from "../components/Profile"
import AddSlider from "../components/slider/AddSilder"
import EditSlider from "../components/slider/EditSlider"
import ViewSlider from "../components/slider/ViewSlider"

const PublicRouter = [

    { path: '/dashboard', component: Dashboard},
    { path: '/add-category', component: Category},
    { path: '/view-category', component: ViewCategory},
    { path: '/edit-category/:id', component: EditCategory},
    { path: '/add-product', component: AddProdcut},
    { path: '/view-product', component: ViewProduct},
    { path: '/edit-product/:id', component: EditProduct},
    { path: '/add-slider', component: AddSlider},
    { path: '/view-slider', component: ViewSlider},
    { path: '/edit-slider/:id', component: EditSlider},
    { path: '/profile', component: Profile},
    // order
    { path: '/orders', component: ViewOrder},
    { path: '/edit-order/:id', component: EditOrder},
    // donor
    { path: '/donors', component: ViewDonor},
    { path: '/edit-donor/:id', component: EditDonor},
    //blog
    { path: '/add-blog', component: AddBlog},
    { path: '/view-blog', component: ViewBlog},
    { path: '/edit-blog/:id', component: EditBlog},


    
]
 export default PublicRouter