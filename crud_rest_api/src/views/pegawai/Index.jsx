import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch data pegawai dari API
    useEffect(() => {
        fetch('https://example.com/api/employees')  // Ganti dengan API kamu
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (id) => {
        // Lakukan proses delete ke API
        fetch(`https://example.com/api/employees/${id}`, { method: 'DELETE' })
            .then(() => {
                // Filter out the deleted employee
                setEmployees(employees.filter((employee) => employee.id !== id));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container flex flex-col mx-auto px-10 py-12 gap-6">
            <h1 className="text-2xl font-bold mb-4">Daftar Pegawai</h1>
            <Link className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' to='/pegawai/tambah'>
                Tambah
            </Link>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Nama</th>
                        <th className="py-2 px-4 border">Jabatan</th>
                        <th className="py-2 px-4 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="py-2 px-4 border">{employee.id}</td>
                            <td className="py-2 px-4 border">{employee.name}</td>
                            <td className="py-2 px-4 border">{employee.position}</td>
                            <td className="py-2 px-4 border">
                                <button className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-blue-600">
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
