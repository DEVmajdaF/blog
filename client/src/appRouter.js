import Home from "./pages/home";
import Post from "./pages/getpost";
import Signin from "./pages/signIn";
import Signup from "./pages/signUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



const AppRouter = () => {
    return (
        <div>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/post" element={<Post/>} />
                        <Route path="/Signin" element={<Signin/>} />
                        <Route path="/SignUp" element={<Signup/>} />
                    </Routes>
            </Router>
        </div>
    );
};


export default AppRouter;