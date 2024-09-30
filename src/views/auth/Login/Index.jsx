import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Index = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan email dan password
    console.log('Email:', email);
    console.log('Password:', password);

    axios.post('http://127.0.0.1:8000/api/v1/auth/login',{
      email: email,
      password: password
    }).then((response)=>{
      console.log(response)
      setMessage(response.data.message)
      localStorage.setItem('token',response.data.access_token)
      localStorage.setItem('role',response.data.role)
      navigate('/pegawai')

    }).catch((error)=>{
      console.log(error)
      setMessage(error.response.data.message)
      setErrors(error.response.data.errors)
    })
  };


  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token) navigate('/pegawai')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {message && (
            <p className='text-slate-900 p-2'>{message}</p>
          )}
          <div className="mb-4 mt-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors && (
              <p className='text-red-400'>{errors?.email}</p>
            )
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors && (
              <p className='text-red-400'>{errors?.password}</p>
            )
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
