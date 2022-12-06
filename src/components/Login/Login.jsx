import React from 'react';
import "./Login.css";
import {
  FacebookAuthProvider, getAuth, GithubAuthProvider,
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
}
  from "firebase/auth";
import { useState } from 'react';
import Swal from "sweetalert2";
import UserLogin from '../Users/UserLogin';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import { useLocation, useNavigate } from 'react-router-dom';
import app from '../firebase.init/firebase.init';
import { AuthProvider } from '../../UserContexts/UserContexts';
const auth = getAuth(app);
const Login = () => {
  const { setLoading } = React.useContext(AuthProvider);
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/'; //get current path 
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {  //aut , checkUser 
      if (userInfo) { //if user is preset 
        setUser(userInfo);
      }
    })
  }, [])
  //
  //google authentication
  const logInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const userName = result.user;
        setUser(userName);
        navigate(from, { replace: true });
      }).catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }
  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser({})
        window.location.reload(false);
        navigate("/login");
      }).catch((error) => {
        console.error("error=>", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

  //git authentication 

  const handleGitHubSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
      }).catch((error) => {
        console.error("Error ", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }
  //facebook 
  const handleFacebookSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
      }).catch((error) => {
        console.error("Error ", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }



  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000)
  }, [])
  return (
    <>
      {

        loader ? <HashLoader color="#36d7b7" className='loader' /> :

          <div className='text-center my-5 loginDivStyle'>
            {
              user.uid || user.email ?
                <div className='text-center userInfoDiv'>

                  <h2 className='my-4 text-info'> Log in successfully done !! </h2>
                  <div className="card mx-auto my-2" style={{ width: "25rem" }}>
                    <img src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQj0so97bfJrGrHzeHTL9-gDmbb3AS_u3xIXWeBUBoYOPFtryq1tCiV-ZmosISHymNwo&usqp=CAU"} className="card-img-top h-25" alt="user" />
                    <div className="card-body">
                      <h5 className="card-title">Username : {user.displayName ? user.displayName : "name not found"}</h5>
                      <h5 className="card-title">Email:{user.email ? user.email : "email not found"}</h5>
                      <h5 className="card-title">User id: {user.uid ? user.uid : "user id not found "}</h5>
                      <p className="card-text">Thanks to join with us we are  glad to meet with you !!</p>
                      <a href="/" className="btn btn-primary"> Go to shop </a>
                    </div>
                  </div>
                  <button className='btn btn-danger py-2 w-50 px-2 fs-4'
                    onClick={() => logOutUser()} >Log out </button>
                </div>
                // else check 
                :
                <div className='d-flex text-center flex-column justify-content-center loginButtoDiv m-auto w-25'>
                  <button className='btn btn-primary ms-4  py-2  w-75 fw-bold my-2'
                    onClick={() => logInWithGoogle()}>
                    Log in with google <FcGoogle className='fs-3 mx-2' />   </button>
                  <button onClick={handleGitHubSignIn}
                    className="btn w-75 btn-success my-2 mx-4 py-2">Log in with Github <BsGithub className='fs-3 mx-2' />
                  </button>

                  <button onClick={handleFacebookSignIn} className="btn btn-primary w-75 my-2 mx-4 py-2">Log in with Facebook
                    <BsFacebook className='fs-3 mx-2 text-info' /> </button>


                </div>
            }

            <div className="loginUSerDiv">
              <UserLogin></UserLogin>

            </div>

          </div>
      }
    </>
  );
};


export default Login;