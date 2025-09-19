import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PlusIcon, EditIcon, TrashIcon, CloseIcon } from '../../components/icons';

// Types
interface Service {
  _id: string;
  title: string;
}

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  serviceType: Service;
  imageUrl: string;
  videoUrl?: string;
}

const initialServices: Service[] = [
    { _id: '1', title: 'Video Editing'},
    { _id: '2', title: 'Community Management'},
    { _id: '3', title: '2D Animation'},
    { _id: '4', title: 'Motion Graphics'},
];

const initialPortfolioItems: PortfolioItem[] = [
    { _id: 'p1', title: 'Project Alpha', description: 'A corporate video for a tech client.', serviceType: initialServices[0], imageUrl: 'https://picsum.photos/400/400?random=51' },
    { _id: 'p2', title: 'Social Buzz', description: 'Managed social media for a startup.', serviceType: initialServices[1], imageUrl: 'https://picsum.photos/400/400?random=52' },
    { _id: 'p3', title: 'Explainer Pro', description: 'An animated explainer video.', serviceType: initialServices[2], imageUrl: 'https://picsum.photos/400/400?random=53' },
];

// Form Modal Component
interface PortfolioFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: PortfolioItem) => void;
    itemToEdit: PortfolioItem | null;
    services: Service[];
}

const PortfolioFormModal: React.FC<PortfolioFormModalProps> = ({ isOpen, onClose, onSave, itemToEdit, services }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (itemToEdit) {
            setTitle(itemToEdit.title);
            setDescription(itemToEdit.description);
            setServiceId(itemToEdit.serviceType._id);
            setVideoUrl(itemToEdit.videoUrl || '');
            setImagePreview(itemToEdit.imageUrl);
        } else {
            setTitle('');
            setDescription('');
            setServiceId(services.length > 0 ? services[0]._id : '');
            setVideoUrl('');
            setImagePreview(null);
        }
    }, [itemToEdit, isOpen, services]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedService = services.find(s => s._id === serviceId);
        if (!title || !description || !selectedService) {
            setError('Please fill all required fields.');
            return;
        }

        onSave({
            _id: itemToEdit?._id || new Date().toISOString(),
            title,
            description,
            serviceType: selectedService,
            videoUrl,
            imageUrl: imagePreview || 'https://picsum.photos/400/400?random=99',
        });
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white">{itemToEdit ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                     {error && <div className="text-red-400 text-sm p-3 bg-red-900/30 rounded-lg">{error}</div>}
                    <div>
                        <label htmlFor="portfolio-title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input type="text" id="portfolio-title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" />
                    </div>
                    <div>
                        <label htmlFor="portfolio-description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea id="portfolio-description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white"></textarea>
                    </div>
                    <div>
                        <label htmlFor="portfolio-service" className="block text-sm font-medium text-gray-300 mb-1">Related Service</label>
                        <select id="portfolio-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white">
                           <option value="" disabled>Select a service</option>
                           {services.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="portfolio-videoUrl" className="block text-sm font-medium text-gray-300 mb-1">Video URL (Optional)</label>
                        <input type="url" id="portfolio-videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" placeholder="https://youtube.com/watch?v=..."/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Image</label>
                        <div className="flex items-center gap-4">
                             {imagePreview && <img src={imagePreview} alt="Image preview" className="w-24 h-24 object-cover bg-gray-700 p-1 rounded-md" />}
                            <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors">Save Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main Page Component
const ManagePortfolioPage: React.FC = () => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

    const handleAddNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    }
    
    const handleEdit = (item: PortfolioItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    }

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            setPortfolioItems(prev => prev.filter(item => item._id !== id));
        }
    }

    const handleSave = (itemData: PortfolioItem) => {
        const isEditing = portfolioItems.some(p => p._id === itemData._id);
        if (isEditing) {
            setPortfolioItems(prev => prev.map(p => p._id === itemData._id ? itemData : p));
        } else {
            setPortfolioItems(prev => [itemData, ...prev]);
        }
        handleCloseModal();
    }
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Manage Portfolio</h1>
                        <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
                    </div>
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
                        <PlusIcon className="w-5 h-5" />
                        Add New Item
                    </button>
                </div>
                
                <div className="bg-gray-800 shadow-lg rounded-2xl overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {portfolioItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap"><img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover bg-gray-700 rounded-md" /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.serviceType?.title || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 max-w-sm truncate" title={item.description}>{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(item)} className="text-indigo-400 hover:text-indigo-300 mr-4"><EditIcon /></button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {portfolioItems.length === 0 && <p className="text-center text-gray-500 py-8">No portfolio items found. Add one to get started!</p>}
                </div>
            </div>
            <PortfolioFormModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                itemToEdit={editingItem}
                services={initialServices}
            />
        </div>
    );
};

export default ManagePortfolioPage;
