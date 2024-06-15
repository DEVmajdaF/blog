
// import signup from '../pages/signUp';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Header() {
  const [cookies] = useCookies(['token']);

  const isAuthenticated = cookies.token;
   // Log isAuthenticated to the console when it changes
  //  useEffect(() => {
  //   if(isAuthenticated){
  //     alert("logged");
  //   }
  //   console.log('Is authenticated:', isAuthenticated);
  //   console.log('cooki:', cookies)
  // }, [isAuthenticated]);


  return (
    <>
  <header id="header" className="header d-flex align-items-center fixed-top">
  <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
    <a href="index.html" className="logo d-flex align-items-center">
      {/* Uncomment the line below if you also wish to use an image logo */}
      {/* <img src="assets/img/logo.png" alt=""> */}
      <h1>Harmony</h1>
    </a>
    <nav id="navbar" className="navbar">
      <ul>
        <li><a href="index.html">Home</a></li>
        {/* <li><a href="single-post.html">Single Post</a></li> */}
        <li className="dropdown"><a href="category.html"><span>Categories</span> <i className="bi bi-chevron-down dropdown-indicator" /></a>
          <ul>
            <li><a href="search-result.html">Health</a></li>
            <li><a href="#">Business</a></li>
            <li className="dropdown"><a href="#"><span>Lifestyle</span> <i className="bi bi-chevron-down dropdown-indicator" /></a>
              <ul>
                <li><a href="#">Deep Drop Down 1</a></li>
                <li><a href="#">Deep Drop Down 2</a></li>
                <li><a href="#">Deep Drop Down 3</a></li>
                <li><a href="#">Deep Drop Down 4</a></li>
                <li><a href="#">Deep Drop Down 5</a></li>
              </ul>
            </li>
            <li><a href="#">Drop Down 2</a></li>
            <li><a href="#">Drop Down 3</a></li>
            <li><a href="#">Drop Down 4</a></li>
          </ul>
        </li>
        {/* ok */}
        <li><a href="about.html">About</a></li>
        {/* <li><a href="contact.html">Contact</a></li> */}
        {/* ======= Search Form ======= */}
      {/* <div className="search-form-wrap js-search-form-wrap">
        <form action="search-result.html" className="search-form">
          <span className="icon bi-search" />
          <input type="text" placeholder="Search" className="form-control" />
          <a className="btn js-search-close" href="../pages/signUp.js"><span className="bi-x" /></a>
        </form>
      </div>End Search Form */}
      </ul>
    </nav>{/* .navbar */}
    <div className="position-relative">
    
    {isAuthenticated ?(
      <li className="dropdown"><a href="#"><span>Profile</span> <i className="bi bi-chevron-down dropdown-indicator" /></a>
      <ul>
        <li><a href="#"> Profile</a></li>
        <li><a href="#">Logout </a></li>
      </ul>
    </li>)
    :
      (<Link to="/signup" className="mx-2">
       <button className="btn js-search-close">signup</button>
      </Link>)

      
    
    }
    </div>
  </div>
</header>
    </>
  );
}

export default Header;
