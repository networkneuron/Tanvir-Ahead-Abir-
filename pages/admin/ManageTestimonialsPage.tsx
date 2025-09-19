import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PlusIcon, EditIcon, TrashIcon, CloseIcon } from '../../components/icons';

// Types
interface Testimonial {
  _id: string;
  name: string;
  role: string;
  feedback: string;
  image: string;
}

const initialTestimonials: Testimonial[] = [
    { _id: 't1', name: 'Alex Johnson', role: 'CEO, Tech Innovators', feedback: 'Working with this team was a game-changer. Their creativity and professionalism exceeded all our expectations. The final video was simply stunning!', image: 'https://picsum.photos/100/100?random=1' },
    { _id: 't2', name: 'Samantha Lee', role: 'Marketing Director, ConnectCo', feedback: 'The community management service is top-notch. Our engagement has skyrocketed, and our brand presence has never been stronger. Highly recommended!', image: 'https://picsum.photos/100/100?random=2' },
    { _id: 't3', name: 'Michael Chen', role: 'Founder, EduFuture', feedback: 'Their animation team brought our complex ideas to life with a simple and elegant explainer video. The process was seamless and the result was perfect.', image: 'https://picsum.photos/100/100?random=3' },
];

const ManageTestimonialsPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    
    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this testimonial?')) {
            setTestimonials(prev => prev.filter(t => t._id !== id));
        }
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Manage Testimonials</h1>
                        <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="w-5 h-5" />
                        Add New Testimonial
                    </button>
                </div>
                
                <div className="bg-gray-800 shadow-lg rounded-2xl overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Feedback</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {testimonials.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={t.image} alt={t.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{t.name}</div>
                                                <div className="text-sm text-gray-400">{t.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 max-w-md truncate" title={t.feedback}>{t.feedback}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-400 hover:text-indigo-300 mr-4"><EditIcon /></button>
                                        <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageTestimonialsPage;
