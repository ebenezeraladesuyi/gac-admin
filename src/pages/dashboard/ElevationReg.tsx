import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { DatasIsaLoading } from '../isLoading/DataIsLoading';
import { url } from '../../utils/Api';

interface Student {
  _id: string;
  name: string;
  sex: 'male' | 'female';
  phoneNumber: string;
  department: string;
  level: '100' | '200' | '300' | '400' | '500' | '600' | '700';
  createdAt: string;
}

const ElevationReg = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/elevation/getall`);
      console.log("res", response)
      setStudents(response.data.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      toast.error('Failed to load student data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await axios.delete(`${url}/elevation/delete/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete student:', error);
      toast.error('Failed to delete student');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStudents();
  };

  return (
    <div className="md:w-[70%] min-h-screen p-6 mt-[100px] ml-[100px] bg-[#fff]">
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[25px] font-bold text-[#1c3f65]">Elevation Conference Registrations</h1>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-[#51a0ed] text-[#fff] rounded-lg hover:bg-[#51a0ed]/90 transition-colors"
            disabled={refreshing}
          >
            {refreshing ? <FiRefreshCw className="animate-spin" /> : <FiRefreshCw />}
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="w-full flex justify-center mt-10">
            <DatasIsaLoading />
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg border border-[#e0e0e0]">
            <table className="min-w-full divide-y divide-[#e0e0e0]">
              <thead className="bg-[#1c3f65]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider w-[30%]">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider">Gender</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider">Level</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#fff] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#fff] divide-y divide-[#e0e0e0]">
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id} className="hover:bg-[#f5f9ff]">
                      <td className="px-6 py-4 text-sm text-[#1c3f65] w-[30%]">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1c3f65] capitalize">{student.sex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1c3f65]">{student.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1c3f65]">{student.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1c3f65]">{student.level}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1c3f65]">
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-[#ff4444] hover:text-[#cc0000] p-1 rounded-full hover:bg-[#ff4444]/10"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-[#1c3f65]">
                      No students registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-[#1c3f65]/70">
          <div>Total Registrations: {students.length}</div>
          <div>Last updated: {new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ElevationReg;