
import Category from "../components/category/Category"
import EditCategory from "../components/category/EditCategory"
import ViewCategory from "../components/category/ViewCategory"
import Dashboard from "../components/Dashboard"
import AddProdcut from "../components/product/Addproduct"
import ViewProduct from "../components/product/ViewProduct"
import Profile from "../components/Profile"

const PublicRouter = [

    { path: '/dashboard', component: Dashboard},
    { path: '/add-category', component: Category},
    { path: '/view-category', component: ViewCategory},
    { path: '/edit-category/:id', component: EditCategory},
    { path: '/add-product', component: AddProdcut},
    { path: '/view-product', component: ViewProduct},
    
    { path: '/profile', component: Profile},
    
]
 export default PublicRouter