
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
function Signup(props) {

    const [inputValue, setInputValue] = useState({
    username:"",
    email:"",
    password:""
  });
    const navigate = useNavigate();

    const {username, email, password} = inputValue;
    const handleChange = (e) => {
      const {name, value} = e.target;
      setInputValue({
          ...inputValue,
          [name]:value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
          await axios.post("http://localhost:4000/user/register",{...inputValue}, {withCredentials:true});
          navigate("/Signin")
      }catch (err){
          console.log("error");
      }
      setInputValue({
          username: "",
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
          <div className="card">
            <div className="card-body">
              <div className="m-sm-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">UserName</label>
                    <input className="form-control form-control-lg" type="text" name="username" value={username} onChange={handleChange} placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control form-control-lg" type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control form-control-lg"  type="password" name="password" value={password} onChange={handleChange} placeholder="Enter password" />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">Sign up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center mb-3">
            Already have account? <Link to="/Signin">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>


    </>
  );
}

export default Signup;
