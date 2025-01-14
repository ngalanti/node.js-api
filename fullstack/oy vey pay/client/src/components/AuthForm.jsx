import React, { useState, useRef } from 'react';
import './AuthForm.css';
import { signIn, signUp } from '../api/auth';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router'

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isPendig,setIsPendig]=useState(false)

  const navigate = useNavigate();

  const fullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const fullName = fullNameRef.current?.value;
    const username = usernameRef.current.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current.value;

    const payload = {
        fullName,
        username,
        email,
        password,
      };


    try {
        setIsPendig(true);
      if (isLogin) {
       
        const data = await signIn(payload);
        toast.success(data.message); 
        window.location.href = '/';
        return;
      }
      const data = await signUp(payload);
      toast.success(data.message); 
      window.location.href = '/';
    } catch (error) {
      toast.error(error.message);
    } finally{
        setIsPendig(false);
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter your fullname"
                  required
                  ref={fullNameRef}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  ref={emailRef}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              ref={usernameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="btn" disabled={isPendig}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Sign Up' : ' Login'}
          </span>
        </p>
      </div>
    </div>
  );
}; 
