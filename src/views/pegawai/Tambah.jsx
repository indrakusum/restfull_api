import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Tambah = () => {
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [gaji, setGaji] = useState('');
    // const [token, setToken] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
       
        // Lakukan POST request ke API untuk menambah pegawai
        axios.post('http://127.0.0.1:8000/api/v1/pegawai',{
            nama:nama,
            jabatan:jabatan,
            gaji:gaji
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((data) => {
                console.log('Pegawai berhasil ditambah:', data);
                navigate('/pegawai')
                // Redirect atau update UI setelah berhasil menambah data
            })
            .catch((error) => console.error('Gagal menambah pegawai:', error));
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-10 right-10' to='/pegawai    '>
                Kembali
            </Link>
            <div className="w-96 mx-auto p-4 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Tambah Pegawai</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Nama</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Jabatan</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Gaji</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={gaji}
                            onChange={(e) => setGaji(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md "
                    >
                        Tambah Pegawai
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Tambah;
