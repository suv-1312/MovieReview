import React,{useState,useEffect} from "react";

import {useNavigate} from 'react-router-dom';

import {isValidEmail} from '../../utils/helper';
import {createUser} from '../../api/auth'
import CustomLink from '../CustomLink'
import Title from '../Form/Title'
import FormInput from '../Form/FormInput'
import Submit from '../Form/Submit'
import Container from "../Container";
import {commonModalClasses} from '../../utils/theme';
import FormContainer from '../Form/FormContainer';
import {useNotification,useAuth} from '../../hooks/index';


const validateUserInfo = ({ name, email, password }) => {
  
  const isValidName = /^[a-z A-Z]+$/;

  if  (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};


export default function SignUp() {

  const [userInfo,setUserInfo] = useState({
    name:"",
    email:"",
    password:"",
  });

  const navigate  = useNavigate();
  const {authInfo} = useAuth();
  const {isLoggedIn} = authInfo;

  const {updateNotification} = useNotification();
 
  const handleChange = ({target}) => {

    const {value,name} = target;
    setUserInfo({...userInfo,[name]:value})
  
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    const {ok,error} = validateUserInfo(userInfo);

    if(!ok)
     return updateNotification('error',error);

     const response = await createUser(userInfo);

     if(response.error)
     return console.log(response.error);

     navigate('/auth/verification',{
     state: {user:response.user},
     replace:true
     });
  }

  useEffect(()=>{
    if(isLoggedIn) navigate('/');

  },[isLoggedIn])

  const {name,email,password} = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit ={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign Up</Title>

          <FormInput label = "Name" value ={name} onChange ={handleChange} placeholder = 'John Doe' name ='name'></FormInput>


          <FormInput label = "Email" value = {email} onChange ={handleChange} placeholder = 'john@gmail.com' name ='email'></FormInput>

          <FormInput label = "Password" value={password} onChange ={handleChange} placeholder = '*********' name ='password' type ='password'></FormInput>

          <Submit value = 'Sign Up'/>

         <div className = "flex justify-between">
              <CustomLink to ='/auth/forget-password'>
                  Forget Password
              </CustomLink>
              
              <CustomLink to ='/auth/Signin'>
                  Sign In
              </CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
