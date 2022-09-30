import { useState,useRef, useContext } from 'react';
import AuthContext from '../../store/authContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [loading,setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);



  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail= emailRef.current.value;
    const password = passwordRef.current.value;

      setLoading(true);
    if(isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBuJqLrVJWStm5LJ9fPdVwCcmuZUE9rzo',
      {
        method: 'POST',
        body:JSON.stringify({
          email: enteredEmail,
          password: password,
          returnSecureToken:true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setLoading(false);
        
        if(res.ok){
          // console.log('token',res)
          return res.json().then((data)=>{
            console.log('successfully store', data.idToken);
            authCtx.login(data.idToken)
          });
        }else{
          return res.json().then((data)=>{
            //error message
            let loginError = ' Authentication failed';
            if(data && data.error && data.error.message){
              loginError = data.error.message
            }
              alert(loginError);
          })
        }

      })

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBuJqLrVJWStm5LJ9fPdVwCcmuZUE9rzo',
      {
          method: 'POST',
          body:JSON.stringify({
            email: enteredEmail,
            password: password,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(res => {
          setLoading(false);
          if(res.ok){

          }else{
            return res.json().then((data) => {
              //error modal
              let errorMsg = 'Authentication failed';
              if(data && data.error && data.error.message){
                errorMsg = data.error.message
              }
              alert(errorMsg);
              console.log(data);
            })
          }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
        { !loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {loading && <p style={{color:'white'}}>Sending Request.....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
