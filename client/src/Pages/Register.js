import React, {useState} from 'react' ;
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [input ,setInput]= useState({
    username : "",
    email : "",
    password : ""
  });

  const HandleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/vi/user/register",input) ;
      alert(res.data.message);
      navigate("/login");
}
  catch(error)
  {
    alert(error.response.data.message);
  }
  };
  return (
    <div className='container shadow'>
      <h2 className='text-center  my-3'> Sign up Here  </h2>

    <div className='col-md-12 my-3 d-flexitems-center justify-content-center'> 
    
    <div className='row'>
      <form onSubmit={HandleSubmit}>
        <div className='mb-3'>
          <label className='form-label' htmlFor='formGroupExampleInput'> Name</label>
          <input
           type='text '
           name='username'
           value={input.username}
           onChange={(e) => 
            setInput({...input,[e.target.name]:e.target.value})}
           className='form-control'
           id='formGroupExampleInput'
           placeholder='Enter Name'/>
        </div>
        <div className='mb-3'>
          <label htmlFor='formGroupExampleInput' className='form-label'> Email</label>
          <input
           type='text '
           name='email'
           value={input.email}
           onChange={(e) => 
            setInput({...input,[e.target.name]:e.target.value})}
           className='form-control'
           placeholder='Enter Email'/>
        </div>
        <div>
        <div className='mb-3'>
          <label htmlFor='formGroupExampleInput' className='form-label'> Password</label>
          <input
           type='password '
           name='password'
           value={input.password}
           onChange={(e) => 
            setInput({...input,[e.target.name]:e.target.value})}
           className='form-control'
           id='formGroupExampleInput'
           placeholder='Enter Password'/>
        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-primary btn-block'> Sign up</button>
               
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  )  ;;
}

export default Register ;