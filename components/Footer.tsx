
import React from 'react';
import { TwitterIcon, LinkedInIcon, GithubIcon, MotionIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                     <MotionIcon className="h-8 w-8 text-indigo-400" />
                    <span className="text-xl font-bold text-white">Creative Motion</span>
                </div>
                <p className="text-gray-400">Creativity in Motion. We bring your ideas to life through stunning visuals and engaging content.</p>
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                        <TwitterIcon />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                        <LinkedInIcon />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                        <GithubIcon />
                    </a>
                </div>
            </div>
             <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                 <div>
                    <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#/services" className="text-base text-gray-400 hover:text-white">Video Editing</a></li>
                        <li><a href="#/services" className="text-base text-gray-400 hover:text-white">Community Management</a></li>
                        <li><a href="#/services" className="text-base text-gray-400 hover:text-white">2D Animation</a></li>
                        <li><a href="#/services" className="text-base text-gray-400 hover:text-white">Motion Graphics</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#/about" className="text-base text-gray-400 hover:text-white">About</a></li>
                        <li><a href="#/contact" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h3>
                     <ul className="mt-4 space-y-2 text-gray-400">
                        <li>contact@creativemotion.dev</li>
                        <li>+1 (555) 123-4567</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Creative Motion Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
