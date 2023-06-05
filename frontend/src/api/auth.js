import client from './client';

export const createUser = async (userInfo) => {
	try{
       const {data} = await client.post('/user/create',userInfo)
       return data;
	}
	catch(error){

		const {response} = error

		if(response?.data) return response.data
		
	    return {error : error.message || error};
	}
};


export const verifyUserEmail = async (userInfo) => {
	try{
       const {data} = await client.post('/user/verify-email',userInfo)
       return data;
	}
	catch(error){
        
        
		const {response} = error

		if(response?.data) return response.data
		
	    return {error : error.message || error};
	}
}

export const signInUser = async (userInfo) => {
	try{
       const {data} = await client.post('/user/signin',userInfo)
       return data;
	}
	catch(error){
        
        
		const {response} = error

		if(response?.data) return response.data
		
	    return {error : error.message || error};
	}
}

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
  	console.log("hello");
    const { data } = await client.post("/user/forget-password", {email} );
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyPasswordResetToken = async (token,userId) => {
  try {
  	
    const { data } = await client.post("/user/verify-pass-reset-token", {
    	token,
    	userId
    });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};


export const resetPassword = async (passwordInfo) => {
  try {
    
    const { data } = await client.post("/user/reset-password",passwordInfo);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};


export const resendEmailVerificationToken = async (userId) => {
  try {
    
    const { data } = await client.post("/user//resend-email-verification-token",{userId});
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};