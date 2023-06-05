import React,{useState} from 'react';
import CustomLink from '../CustomLink'
import Title from '../Form/Title'
import FormInput from '../Form/FormInput'
import Submit from '../Form/Submit'
import Container from "../Container";
import {commonModalClasses} from '../../utils/theme';
import FormContainer from '../Form/FormContainer';
import {useNotification} from '../../hooks/index';
import {isValidEmail} from '../../utils/helper'
import {forgetPassword} from '../../api/auth';

export default function PasswordForget(){
  
   const [email,setEmail] = useState('');
  
   const {updateNotification} = useNotification();


   const handleChange = ({target}) => {

    const {value} = target;
    setEmail(value);
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)) return updateNotification('error','Invalid Email');
    
    const {error,message} =  await forgetPassword(email);

    if(error)
    {
      return updateNotification('error',error);
    } 


    updateNotification('success',message);
    
  }


	 return (
    <FormContainer>
      <Container>
        <form onSubmit= {handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Please enter Your Email</Title>
          <FormInput 
          onChange = {handleChange} 
          value = {email}
          label = "Email" placeholder = 'john@gmail.com' 
          name ='email'></FormInput>

          <Submit value = 'Send Link'/>

          <div className = "flex justify-between">
              <CustomLink to ='/auth/signin'>
                  Sign In
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