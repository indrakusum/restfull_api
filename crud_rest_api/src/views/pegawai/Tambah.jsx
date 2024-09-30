import { useState } from 'react';
import { Link } from 'react-router-dom';

const Tambah = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = { name, position };

        // Lakukan POST request ke API untuk menambah pegawai
        fetch('https://example.com/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Pegawai berhasil ditambah:', data);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Jabatan</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
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
