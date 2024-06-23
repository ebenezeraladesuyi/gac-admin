import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { iSermon } from '../../types/Interface';
import axios from 'axios';
import { url } from '../../utils/Api';
import { DatasIsaLoading } from '../isLoading/DataIsLoading';

const Sermon = () => {

    const [formData, setFormData] = React.useState<iSermon>({
        title: '',
        audio: '',
        author: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          // Create FormData to send both file and other form data
          const formDataToSend = new FormData();
          formDataToSend.append('title', formData.title);
          formDataToSend.append('audio', formData.audio!); // Use ! to assert non-nullability
          formDataToSend.append('author', formData.author);
    
          const response = await axios.post(`${url}/audio/uploadaudio`, formDataToSend);
    
          console.log('Audio uploaded successfully:', response.data);
    
          setFormData({
            title: '',
            audio: '', // Reset back to null for file upload input
            author: '',
          });
          setError(null);
    
          toast.success('Audio uploaded successfully');
    
        } catch (error) {
          console.error('Failed to upload audio:', error);
          setError('Failed to upload audio');
    
          toast.error('Error uploading audio. Please try again.');
    
        } finally {
          setLoading(false);
        }
      };

    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { 
                name, 
                value, 
                files 
            } = e.target;
    
        // For file input, update formData with the file itself
        if (name === 'audio' && files) {
          setFormData({ ...formData, [name]: files[0] }); // Use files[0] to get the selected file
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    


  return (
    <div className="md:w-[70%] min-h-screen bg-gray-40 p-6 mt-[100px] ml-[100px] flex items-cente justify-center bg-white">
        <div className="w-[60%] h-full flex flex-col gap-7 items-center p-8">
            <h6 className="font-bold text-[25px]">Upload Audio</h6>

            <form  onSubmit={handleSubmit} className=" w-full flex flex-col gap-5">

                <div className="w-full flex flex-col gap-2">
                    <h6 className="text-[17px]">Title</h6>
                    <input type="text" className="w-full h-[40px] border-[1px] border-gray-200 rounded-[25px] outline-none p-6 text-[13px]" 
                    name='title' value={formData.title} onChange={handleChange}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <h6 className="text-[17px]">Preacher/Author</h6>
                    <input type="text" className="w-full h-[40px] border-[1px] border-gray-200 rounded-[25px] outline-none p-6 text-[13px]"  
                    name='author' value={formData.author} onChange={handleChange}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <h6 className="text-[17px]">Audio File</h6>
                    <input
                    type="file"
                    accept="audio/*"
                    className="w-full h-[60px] border-[1px] border-gray-200 rounded-[25px] outline-none p-4"
                    name='audio' onChange={handleChange}
                    />
                </div>

                { loading ? (
                    <div className='w-full flex items-center justify-center'>
                        <DatasIsaLoading />
                    </div>
                ) : (
                    <button type="submit" className="w-full h-[55px] rounded-[25px] bg-[#23a1db] text-white ouline-none font-bold text-[18px]">
                        Upload
                    </button>
                )}

                {error && <p className='text-[5px]'>{error}</p>}

            </form>
        </div>
    </div>
  )
}

export default Sermon