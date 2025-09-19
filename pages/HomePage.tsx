
import React from 'react';
import { NavLink } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import TestimonialSlider from '../components/TestimonialSlider';
import { VideoIcon, CommunityIcon, AnimationIcon, MotionIcon, CheckCircleIcon } from '../components/icons';

const HomePage: React.FC = () => {
  const services = [
    {
      icon: <VideoIcon />,
      title: "Video Editing",
      description: "Professional editing for YouTube, short films, ads, and social media content."
    },
    {
      icon: <CommunityIcon />,
      title: "Community Management",
      description: "Engaging your audience, building brand trust, and managing online communities."
    },
    {
      icon: <AnimationIcon />,
      title: "2D Animation",
      description: "Creating captivating explainer videos, character animations, and visual stories."
    },
    {
      icon: <MotionIcon />,
      title: "Motion Graphics",
      description: "Dynamic titles, promotional graphics, and animated branding to elevate your brand."
    }
  ];

  const whyChooseUs = [
    "Fast Delivery",
    "Creative Excellence",
    "Professional Team",
    "Affordable Pricing"
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center -mt-20">
        <div 
          className="absolute inset-0 bg-gray-900 opacity-60"
          style={{backgroundImage: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, transparent 60%)'}}
        ></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            Creative Motion Agency
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Creativity in Motion
          </p>
          <NavLink
            to="/contact"
            className="inline-block bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </NavLink>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">Our Services</h2>
          <p className="mt-4 text-lg text-gray-400">We turn your vision into a digital masterpiece.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />
          ))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://picsum.photos/800/600?random=10" alt="Creative team working" className="rounded-2xl shadow-2xl" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-6">Why Choose Us?</h2>
            <p className="text-lg text-gray-400 mb-8">
              We are a team of passionate creators dedicated to delivering high-quality content that captivates and engages your audience. Our commitment to excellence sets us apart.
            </p>
            <ul className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 text-indigo-400 mr-3" />
                  <span className="text-lg text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-400">We are trusted by companies and individuals worldwide.</p>
          </div>
          <TestimonialSlider />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
