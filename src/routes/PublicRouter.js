
import Category from "../components/category/Category"
import EditCategory from "../components/category/EditCategory"
import ViewCategory from "../components/category/ViewCategory"
import Dashboard from "../components/Dashboard"
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
    
]
 export default PublicRouter