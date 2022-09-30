import classes from './ProfileForm.module.css';
import {useRef,useContext} from 'react'
import AuthContext from '../../store/authContext';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext);
  const newPswref = useRef();

  const changePasswordHandler = (e) => {
      e.preventDefault();
      const newPassword = newPswref.current.value;
  
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDBuJqLrVJWStm5LJ9fPdVwCcmuZUE9rzo',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken:true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
          if(res.ok){
             console.log('password updated successfully')
             history.replace('/')
          }
          else{
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
  };
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPswref}/>
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
