import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './Home';
import App from '../App';
import About from './About';
import Contact from './Contact';
import Add from './Add';
import Services from './Services';
import All from '../category/All';
import DetailsPage from '../category/DetailsPage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from '../context/PrivateRoute';
import CreateBlog from '../category/CreateBlog';
import MyBlog from '../category/MyBlog';
import UpdateBlog from '../category/UpdateBlog';
const router=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
            index:true,
            Component:Home,
            },
             {
            path:"/details/:id",
            Component:DetailsPage,
            }, 
             {
              path:"services",
              Component:Services,
            },
            {
              path:"add",
              Component:Add,
            },
            {
                path:"about" ,
                Component:About,
            },
            {
                path:"contact",
                Component:Contact,
            },
            {
                path:"all",
                Component:All,
            },  
            {
                path:"login",
                Component:Login,
            },
            {
                path:"/register",
                Component:Register,
            },   
            {
                path:"blog",
                element:(
                    <PrivateRoute>
                    <Outlet/>
                    </PrivateRoute>
                ),
                children:[
                    {
                        path:"create",
                        Component:CreateBlog,
                    },
                    {
                        path:"myblog",
                        Component:MyBlog,
                    },
                    {
                        path:"update/:id",
                        Component:UpdateBlog,
                    },
                ]
            }         
          
           ]
    },
    
]);
export default router;