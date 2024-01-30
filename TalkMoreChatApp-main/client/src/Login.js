import './sign.css';

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from './context/Chatprovider';
// import { checkTargetForNewValues } from 'framer-motion';
const Login = () => {
 const {setUser}= ChatState(); 
  const navigate = useNavigate();
  const toast = useToast();
  const [lgn, setlgn] = useState({email:'',password:''});
const chnge = (e) =>{
    const{name,value} = e.target;
       setlgn(preValue=>{
        return {
			...preValue,
            [name] : value
        }
       })
  }

const submitHandler = async (e) => {
	 e.preventDefault(); 
	if (!lgn.email || !lgn.password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
	 const {email, password} = lgn;
     if(lgn.email!=="" && lgn.password!=="" ){
        const res = await fetch('/api/user/login',{
          method: "POST",
          headers : {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,
            password
          })
        });
        const dat = await res.json();
		if(dat.success){
			  toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      
     setUser(dat); 
  
      localStorage.setItem('token',dat.token);
      localStorage.setItem('id',JSON.stringify(dat)); 
      navigate('/chat');
		}
		else{
toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
		}
}
		else{
toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

		}

}
  return (
	<section className='main'>
	  <div className='second'>
		<div className='forimg'>
					  <img src={require('./picforsignup.jpg')} className="img-fluid" alt='nothing'></img>
				  </div><div className='detailmain'>
						  <text>Email</text>
						 <input name="email" type='email' required="required" value={lgn.email} placeholder='Enter you Email'  onChange={chnge}/>
						  <text>Password</text>
						  	<input name="password" type='password' required  value = {lgn.password} placeholder='**********' onChange={chnge}/>
						  <button onClick={submitHandler} >Login</button>
						  <span >Forgot Password ? </span>
						  <p>Dont have an account ? <span onClick={()=> navigate('/')} style={{ color: ' rgb(92, 92, 200)',cursor:'pointer' }}> Regsiter here  </span></p>
					  </div>
	  </div>
	</section>
	
  )
	 };

export default Login;


