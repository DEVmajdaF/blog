
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signin(props) {

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
        ...inputValue,
        [name]: value,
    });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        await axios.post("http://localhost:4000/user/login",{...inputValue}, {withCredentials:true});
        navigate("/home")
    }catch (err){
        console.log("error");
    }
    setInputValue({
        email:"",
        password:""
    })
  }
  return (
    <>

<main className="d-flex w-100">
  <div className="container d-flex flex-column">
    <div className="row vh-100">
      <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
        <div className="d-table-cell align-middle">
          <div className="text-center mt-4">
            <h1 className="h2">Welcome back!</h1>
            <p className="lead">
              Sign in to your account to continue
            </p>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="m-sm-3">
                <form onSubmit={handleSubmit} >
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control form-control-lg" type="email" name="email"
                           value={email}
                           onChange={handleChange}
                           placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control form-control-lg" type="password" name="password" 
                           value={password} 
                           placeholder="Enter your password"
                           onChange={handleChange} />
                  </div>
                  <div>
                    <div className="form-check align-items-center">
                      <input id="customControlInline" type="checkbox" className="form-check-input" defaultValue="remember-me" name="remember-me" defaultChecked />
                      <label className="form-check-label text-small" htmlFor="customControlInline">Remember me</label>
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center mb-3">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

 
  
  
    </>
  );
}

export default Signin;
