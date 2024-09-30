import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [pegawais, setPegawais] = useState([]);
    const navigate = useNavigate()
    const [role,setRole]=useState()

    // Fetch data pegawai dari API
    const handleDelete = (id) => {
        const token = localStorage.getItem('token')
        // Lakukan proses delete ke API
        axios.delete(`http://127.0.0.1:8000/api/v1/pegawai/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    };

    const handleLogout = () => {
        const token = localStorage.getItem('token')
        // Lakukan proses delete ke API
        axios.post(`http://127.0.0.1:8000/api/v1/auth/logout`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        },).then((response)=>{
            console.log(response)

            localStorage.removeItem('token')
            localStorage.removeItem('role')
            navigate('/')

        }).catch((error)=>{
            console.log(error)
        })
    };

    useEffect(()=>{
        const token = localStorage.getItem('token')
        setRole(localStorage.getItem('role'))
        
        if(!token) navigate('/')

        axios.get('http://127.0.0.1:8000/api/v1/data-pegawai/',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            console.log(response)
            setPegawais(response.data)
        }).catch((error)=>{
            console.log(error)
        })

      }, [pegawais])

    return (
        <div className="container flex flex-col mx-auto px-10 py-12 gap-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Pegawai</h1>

            <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-10 right-10' to='/pegawai'>
                Logout
            </button>

            {role == 'admin' &&(
                <Link className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' to='/pegawai/tambah'>
                    Tambah
                 </Link>
            ) }
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Nama</th>
                        <th className="py-2 px-4 border">Jabatan</th>
                        <th className="py-2 px-4 border">Gaji</th>
                        {role == 'admin' && (
                            <th className="py-2 px-4 border">Aksi</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {pegawais?.map((pegawai,index) => (
                        <tr key={pegawai.id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{pegawai.nama}</td>
                            <td className="py-2 px-4 border">{pegawai.jabatan}</td>
                            <td className="py-2 px-4 border">{pegawai.gaji}</td>
                            {role == 'admin' && (
                                <td className="py-2 px-4 border">
                                <Link to={`/pegawai/edit/${pegawai.id}`} className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-blue-600">
                                    Edit
                                </Link>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                    onClick={() => handleDelete(pegawai.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
