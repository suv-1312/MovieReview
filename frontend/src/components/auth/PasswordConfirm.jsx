import React,{useState,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import CustomLink from '../CustomLink'
import Title from '../Form/Title'
import FormInput from '../Form/FormInput'
import Submit from '../Form/Submit'
import Container from "../Container";
import {commonModalClasses} from '../../utils/theme';
import FormContainer from '../Form/FormContainer';
import {ImSpinner3} from 'react-icons/im';
import {useNotification} from '../../hooks/index';
import {useNavigate} from 'react-router-dom';
import {verifyPasswordResetToken,resetPassword} from '../../api/auth';

export default function PasswordConfirm(){

  const [password,setPassword] = useState({
      one :"",
      two : ""
  });

  const [isVerifying,setIsVerifying] = useState(true);
  const [isValid,setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
 
  const {updateNotification} = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  },[])

  const isValidToken = async() =>{
      const {error,valid} =  await verifyPasswordResetToken(token,id);

      setIsVerifying(false);

      if(error)
      {
        navigate('/auth/reset-password',{replace:true})
       return updateNotification('error',error);
      }

      if(!valid)
      {
          setIsValid(false);
          return navigate('/auth/reset-password',{replace:true})
      }

      setIsValid(true);
  }

  const handleChange = ({target}) => {
    const {name,value} = target;

    setPassword({...password,[name]:value})
  }

  const handleSubmit = async(e) => {

      e.preventDefault();
      
      if(!password.one.trim())
      return updateNotification('error',"password is missing");

      if(password.one.trim().length < 8)
      return updateNotification('error',"password must be 8 characters long");

      if(password.one!==password.two)
      return updateNotification('error',"password do not match");

      const {error,message} = await resetPassword({newPassword:password.one,userId:id,token});

        if(error)
         return updateNotification('error',error);
      
        updateNotification('success',message);   

        navigate('/auth/signin',{replace:true});
  }
  
  if(isVerifying)
    return(
        <FormContainer>
          <Container>
            <div className = "flex space-x-2 items-center">
               <h1 className = "text-4xl font-semibold dark:text-white text-primary">Please Wait We are verifying your token</h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary"/> 
            </div>  
          </Container>
        </FormContainer>
    );


    if(!isValid)
    return(
        <FormContainer>
          <Container>
               <h1 className = "text-4xl font-semibold dark:text-white text-primary">Token is invalid</h1> 
          </Container>
        </FormContainer>
    );


	return (
    <FormContainer>
      <Container>
        <form onSubmit = {handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Enter New PassWord</Title>
          
          <FormInput 
          value = {password.one}
          onChange={handleChange}
          label = "New Password" 
          placeholder = '**********' 
          name ='one' 
          type = 'password'
          />

          <FormInput 
          value = {password.two}
          onChange={handleChange}
          label = "Confirm Password" 
          placeholder = '**********' 
          name ='two' 
          type = 'password'
          />

          <Submit value = 'Confirm Password'/>

          
        </form>
      </Container>
    </FormContainer>
  );
}