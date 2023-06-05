import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CustomLink from '../CustomLink'
import Title from '../Form/Title'
import FormInput from '../Form/FormInput'
import Submit from '../Form/Submit'
import Container from "../Container";
import {useTheme} from '../../hooks';
import {commonModalClasses} from '../../utils/theme';
import {isValidEmail} from '../../utils/helper';
import FormContainer from '../Form/FormContainer';
import {useNotification,useAuth} from '../../hooks/index';

const validateUserInfo = ({email, password }) => {
 
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signin() {

  const [userInfo,setUserInfo] = useState({
    email:"",
    password:"",
  });

  const {updateNotification} = useNotification();


  const navigate = useNavigate();
  const {handleLogin,authInfo} = useAuth()
  const {isPending,isLoggedIn} = authInfo;

  const handleChange = ({target}) => {

    const {value,name} = target;
    setUserInfo({...userInfo,[name]:value})
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const {ok,error} = validateUserInfo(userInfo);

    if(!ok)
     return updateNotification('error',error);

     handleLogin(userInfo.email,userInfo.password)
  }

  return (
    <FormContainer>
      <Container>
        <form onSubmit = {handleSubmit} className= {commonModalClasses + " w-72"}>
          <Title>Sign In</Title>
          <FormInput

          value = {userInfo.email} 
          onChange = {handleChange}
          label = "Email" 
          placeholder = 'john@gmail.com' 
          name ='email'>

          </FormInput>

          <FormInput

          value = {userInfo.password} 
          onChange = {handleChange}
          label = "Password" 
          placeholder = '*********' 
          name ='password'
          type = 'password'
          >

          </FormInput>

          <Submit value = 'Sign in' busy = {isPending}/>

          <div className = "flex justify-between">
              <CustomLink to ='/auth/forget-password'>
                  Forget Password
              </CustomLink>
              
              <CustomLink to ='/auth/Signup'>
                  Sign Up
              </CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
