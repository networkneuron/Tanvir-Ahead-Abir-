import React, { useState } from 'react';
import { TwitterIcon, LinkedInIcon, GithubIcon } from '../components/icons';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ type: '', message: '' });

    // Simulate async submission with a 1-second delay
    setTimeout(() => {
        try {
            // Get existing messages from local storage or initialize an empty array
            const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

            // Create new message object with a unique ID and timestamp
            const newMessage = {
                _id: new Date().toISOString(),
                ...formData,
                isRead: false,
                createdAt: new Date().toISOString(),
            };

            // Add new message to the beginning of the array and save back to local storage
            existingMessages.unshift(newMessage);
            localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

            setFormStatus({ type: 'success', message: 'Thank you for your message! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' }); // Reset form

        } catch (err: any) {
            setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsLoading(false);
            // Clear status message after 6 seconds
            setTimeout(() => setFormStatus({ type: '', message: '' }), 6000);
        }
    }, 1000);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white">Get In Touch</h1>
          <p className="mt-4 text-xl text-gray-300">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-gray-800 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            {formStatus.message && (
              <p className={`mt-4 text-center ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {formStatus.message}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-300">
                <p>Email: <a href="mailto:contact@creativemotion.dev" className="text-indigo-400 hover:underline">contact@creativemotion.dev</a></p>
                <p>Phone: <a href="tel:+15551234567" className="text-indigo-400 hover:underline">+1 (555) 123-4567</a></p>
                <p>Location: 123 Creative Lane, Digital City, 40404</p>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><TwitterIcon className="w-8 h-8" /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><LinkedInIcon className="w-8 h-8" /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"><GithubIcon className="w-8 h-8" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
