import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams(); // Ambil ID pegawai dari URL
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    // Fetch data pegawai berdasarkan ID
    useEffect(() => {
        fetch(`https://example.com/api/employees/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setPosition(data.position);
            })
            .catch((error) => console.error('Error:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEmployee = { name, position };

        // Kirim data yang diupdate ke API
        fetch(`https://example.com/api/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Pegawai berhasil diupdate:', data);
                // Redirect atau update UI setelah berhasil update data
            })
            .catch((error) => console.error('Gagal mengupdate pegawai:', error));
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-10 right-10' to='/pegawai'>
                Kembali
            </Link>
            <div className="w-96 mx-auto p-4 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Edit Pegawai</h1>
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
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Update Pegawai
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
