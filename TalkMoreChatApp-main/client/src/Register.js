

import './sign.css';
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input } from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [lgn, setlgn] = useState({name:'',email:'',password:''});
  const [pic, setpic] = useState(); 

   const [picLoading, setPicLoading] = useState(false);

const chnge = (e) =>{
  console.log(picLoading);
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
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "TalkMore");
      data.append("cloud_name", "drvqmymwq");
      fetch("https://api.cloudinary.com/v1_1/drvqmymwq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    
	if (!lgn.email || !lgn.password || !lgn.name) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    else{
	 const {name,email, password} = lgn;
        const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
           '/api/user/register',
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
		if(data.success){
			  toast({
        title: "Register Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      navigate('/login');
		}
		else{
toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
		}
  }
}
  return (

    <>

    <section className='main'>
	  <div className='second'>

      <div className="forimg">
        <img
          src={require("./picforsignup.jpg")}
          className="img-fluid"
          alt="nothing"
        ></img>
      </div>
      <div className="detailmain">
        
        <text>Name</text>
       <input  name='name' type='text' placeholder="Enter your Name" required='required' value={lgn.name} onChange={chnge}></input>
        <text>Email</text>
     <input name="email" type='email' required="required" value={lgn.email} placeholder='Enter you Email'  onChange={chnge}/>
        <text>Password</text>
       <input name="password" type='password' required="required"  value = {lgn.password} placeholder='**********' onChange={chnge}/>

        <Input type="file" placeholder="Put ur file here" accept='image/*'   value = {lgn.pic}  onChange={(e) => setpic(e.target.files[0])}></Input>
        <button onClick={submitHandler} >Register</button>
        <p>
          Alredy Signed-Up ?
          <span  onClick={()=> navigate('/login')}
            style={{ color: " rgb(92, 92, 200)", cursor: "pointer" }}
          >
           Login here
          </span>
        </p>
      </div>
         </div>
         </section>
    </>
  );
};

export default  Register ;
