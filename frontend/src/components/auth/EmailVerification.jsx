import React from 'react';
import {useState,useEffect,useRef} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import Title from '../Form/Title'
import Submit from '../Form/Submit'
import Container from "../Container";
import {commonModalClasses} from '../../utils/theme';
import FormContainer from '../Form/FormContainer'
import {verifyUserEmail,resendEmailVerificationToken} from '../../api/auth'
import {useNotification,useAuth} from '../../hooks/index';

const OTP_LENGTH = 6;
let currentOTPindex;

const isValidOTP = (otp) => {
    
    let valid = false;

    for(let val of otp)
    {
      valid = !isNaN(parseInt(val))
      if(!valid)
      break;
    }

    return valid;
}

export default function EmailVerification(){
    const [otp,setOtp] = useState(new Array(OTP_LENGTH).fill(''));

    const [activeOtpIndex,setActiveOtpIndex] = useState(0);

    const {isAuth,authInfo} = useAuth();
    const {isLoggedIn,profile} = authInfo; 
    const isVerified = profile?.isVerified;
    const inputRef = useRef();

    const {updateNotification} = useNotification();

    const {state} = useLocation();
    const user = state?.user

    const navigate = useNavigate();


    const focusNextInputField = (index) => {
          setActiveOtpIndex(index+1);
    }

    const focusPreviousInputField = (index) => {

          let nextIdx;
          const diff = index -1;
          nextIdx = diff !==0 ?diff:0;

          setActiveOtpIndex(nextIdx);
    }



    const handleOtpChange = ({target}) => {
        const {value} = target;
        const newOtp = [...otp]
        newOtp[currentOTPindex] = value.substring(value.length-1,value.length)

        if(!value)
        focusPreviousInputField(currentOTPindex)
        else
        focusNextInputField(currentOTPindex);

        setOtp([...newOtp]);
    };

    const handleOTPResend = async() => {
      const {error,message} =  await resendEmailVerificationToken(user.id);

      if(error)
       return updateNotification('error',error);

       return updateNotification('success',message);
    }


    const handleKeyDown = ({key},index) => {
        currentOTPindex = index;
        if(key === "Backspace"){
          focusPreviousInputField(currentOTPindex);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         if(!isValidOTP(otp))
          return updateNotification('error','Invalid OTP');

         const {error,message,user:userResponse} = await verifyUserEmail({
         OTP:otp.join(''),
         userId:user.id
         });
        
          if(error) updateNotification('error',error);

          updateNotification('success',message);

          localStorage.setItem('auth-token',userResponse.token);

          isAuth();
    }

    useEffect(() => {
        inputRef.current ?.focus()
    },[activeOtpIndex])


    useEffect(() => {
       if(!user) navigate('/not-found')
       if(isLoggedIn && isVerified) navigate('/')
    },[user,isLoggedIn,isVerified]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit = {handleSubmit} className={commonModalClasses}>
         <div>
           <Title>Please enter the OTP to verify Acount</Title>
          <p className = 'text-center dark: text-light-subtle'>OTP has been sent to your email</p>
         </div>

         <div  className= "flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref = {activeOtpIndex === index ? inputRef : null}

                  key ={index}

                  type="number"

                  value = {otp[index] || ''}

                  onChange = {handleOtpChange}

                  onKeyDown = {(e) => handleKeyDown(e,index)}

                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white
                  text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
         </div>
         
          <div className = "">
            <Submit value = 'Verify Account'/>
          <button onClick = {handleOTPResend} type = "button" className = "dark:text-white text-blue-500 font-semibold hover:underline mt-2">I don't have OTP</button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}