import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PlusIcon, EditIcon, TrashIcon, CloseIcon } from '../../components/icons';

// Define Service type
type ServiceCategory = 'Video Editing' | 'Community Management' | '2D Animation' | 'Motion Graphics';
interface Service {
  _id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: string; // Base64 or placeholder URL
}

const serviceCategories: ServiceCategory[] = [
    'Video Editing', 
    'Community Management', 
    '2D Animation', 
    'Motion Graphics'
];

const initialServices: Service[] = [
    { _id: '1', title: 'Video Editing', description: 'Professional editing for YouTube, short films, ads, and social media content.', category: 'Video Editing', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM4MTg3ZmEiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xNSAxbDQuNTUzLTIuMjc2QTEgMSAwIDAxMjEgOC42MTh2Ni43NjRhMSAxIDAgMDEtMS40NDcuODk0TDE1IDE0TTUgMThoOGEyIDIgMCAwMDItMlY4YTItMiAwIDAwLTItMkg1YTItMiAwIDAwLTIgMnY4YTItMiAwIDAwMiAyeiIgLz4KPC9zdmc+' },
    { _id: '2', title: 'Community Management', description: 'Engaging your audience, building brand trust, and managing online communities.', category: 'Community Management', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM4MTg3ZmEiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xNyAyMGg1di0yYTQgNCAwIDAwLTQgLTRoLTFNMTcgMjBIN20xMCAwdi0yYTQgNCAwIDAwLTIuNS0zLjcxMk03IDIwSDJ2LTJhNCA0IDAgMDE0LTRoMU03IDIwdi0yYTQgNCAwIDAxMi41LTMuNzEyTTcgMTQuMjVBNCA0IDAgMDExMiAxMG0wIDBhNCA0IDAgMDA1LTIuNzVNNyAxNC4yNUE0IDQgMCAwMDEyIDEwTTEyIDE0YTQgNCAwIDEwMC04IDQgNCAwIDAwMCA4eiIgLz4KPC9zdmc+' },
    { _id: '3', title: '2D Animation', description: 'Creating captivating explainer videos, character animations, and visual stories.', category: '2D Animation', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM4MTg3ZmEiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik03IDR2MTZNMTcgNHYxNk0zIDhoNG0xMCAwaDRNMyAxMmgxOE0zIDE2aDRtMTAgMGg0IiAvPgo8L3N2Zz4=' },
];


// Service Form Modal Component
interface ServiceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Service) => void;
    serviceToEdit: Service | null;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ isOpen, onClose, onSave, serviceToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<ServiceCategory>(serviceCategories[0]);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (serviceToEdit) {
            setTitle(serviceToEdit.title);
            setDescription(serviceToEdit.description);
            setCategory(serviceToEdit.category);
            setIconPreview(serviceToEdit.icon);
        } else {
            setTitle('');
            setDescription('');
            setCategory(serviceCategories[0]);
            setIconPreview(null);
        }
    }, [serviceToEdit, isOpen]);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!title || !description) {
            setError('Title and description are required.');
            return;
        }

        onSave({
            _id: serviceToEdit?._id || new Date().toISOString(),
            title,
            description,
            category,
            icon: iconPreview || '',
        });
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white">{serviceToEdit ? 'Edit Service' : 'Add New Service'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                     {error && <div className="text-red-400 text-sm p-3 bg-red-900/30 rounded-lg">{error}</div>}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value as ServiceCategory)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
                           {serviceCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Icon (SVG or PNG)</label>
                        <div className="flex items-center gap-4">
                             {iconPreview && <img src={iconPreview} alt="Icon preview" className="w-16 h-16 bg-gray-700 p-1 rounded-md" />}
                            <input type="file" onChange={handleIconChange} accept="image/svg+xml, image/png" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors">Save Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Main Page Component
const ManageServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddNew = () => {
      setEditingService(null);
      setIsModalOpen(true);
  }
  
  const handleEdit = (service: Service) => {
      setEditingService(service);
      setIsModalOpen(true);
  }

  const handleDelete = async (id: string) => {
      if(window.confirm('Are you sure you want to delete this service?')) {
          setServices(prev => prev.filter(s => s._id !== id));
      }
  }

  const handleSave = (serviceData: Service) => {
      const isEditing = services.some(s => s._id === serviceData._id);
      if (isEditing) {
          setServices(prev => prev.map(s => s._id === serviceData._id ? serviceData : s));
      } else {
          setServices(prev => [serviceData, ...prev]);
      }
      handleCloseModal();
  }
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingService(null);
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Manage Services</h1>
            <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
          </div>
          <button onClick={handleAddNew} className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
            <PlusIcon className="w-5 h-5" />
            Add New Service
          </button>
        </div>
        
        <div className="bg-gray-800 shadow-lg rounded-2xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Icon</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {services.map((service) => (
                        <tr key={service._id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap"><img src={service.icon} alt={service.title} className="w-10 h-10 p-1 bg-gray-700 rounded-md" /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{service.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{service.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-400 max-w-sm truncate" title={service.description}>{service.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => handleEdit(service)} className="text-indigo-400 hover:text-indigo-300 mr-4"><EditIcon /></button>
                                <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {services.length === 0 && <p className="text-center text-gray-500 py-8">No services found. Add one to get started!</p>}
        </div>

      </div>
       <ServiceFormModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            serviceToEdit={editingService}
        />
    </div>
  );
};

export default ManageServicesPage;
