import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { url } from '../../utils/Api';
import { iMinisters } from '../../types/Interface';

 // Replace with actual URL

const AllMinisters = () => {
  const [ministers, setMinisters] = useState<iMinisters[]>([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await axios.get(`${url}/minister/allministers`);
        setMinisters(response.data.data as iMinisters[]);

        console.log("minsters-data", response.data.data)
      } catch (err) {
        console.error("Error getting ministers data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMinisters();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;



  return (
    <div className="md:w-[100%] min-h-screen bg-gray-40 p-6 mt-[100px] ml-[40px] flex items-cente justify-center bg-white">
        <div className="w-full shadow-m h-full flex flex-col gap-7 items-center p-8">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ministers.map((minister) => (
                <motion.div
                    key={minister._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    {minister.ayoAweMinImage ? (
                    <img
                        src={`${url}/uploads/${minister.ayoAweMinImage.split('/').pop()}`}
                        alt={minister.firstName}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                    ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">No Image</span>
                    </div>
                    )}
                    {/* <img
                    src={`${url}/${minister.ayoAweMinImage.replace(/\\/g, "/")}`}
                    alt={minister.firstName}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    /> */}
                    <h2 className="text-xl font-bold mt-3">{minister.title} {minister.firstName} {minister.middleName ? minister.middleName : ''} {minister.lastName}</h2>

                    <p className="text-[#000] font-bold">{minister.gender}</p>
                    
                    <p className="text-[#000] font-bold text-center">{minister.city}, {minister.state}, {minister.country}</p>
                    
                    <p className="text-sm text-[#000]">Phone Number: <span className='text-[#000] font-bold'>{minister.phoneNumber}</span></p>

                    <p className="text-sm text-[#000]">WhatsApp Number: <span className='text-[#000] font-bold'>{minister.whatsapp}</span></p>

                    <p className="text-sm text-blue-500  cursor-pointer mt-1"><span className='text-[#000]'>Email:</span> {minister.email}</p>

                    <p className="text-sm text-[#000] mt-2">Current Ministry: <span className='text-[#000] font-bold'>{minister.whichMinistry}</span></p>

                    <p className="text-sm text-[#000]">Called to Ministry?: <span className='text-[#000] font-bold'>{minister.ministryCall}</span></p>

                    {minister.other && <p className="text-sm text-[#000] italic mt-2">Note: <span className='text-[#000] font-bold'>{minister.other}</span></p>}

                    <p className="text-sm text-[#000] mt-2 text-center">Why do you want to join the training?: <span className='text-[#000] font-bold'>{minister.why}</span></p>
                </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AllMinisters;
