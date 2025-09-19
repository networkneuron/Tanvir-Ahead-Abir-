
import React from 'react';

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  portfolioImages: string[];
  imageSide?: 'left' | 'right';
}

const ServiceDetailSection: React.FC<ServiceDetailProps> = ({ id, title, description, longDescription, portfolioImages, imageSide = 'left' }) => {
    return (
        <section id={id} className="py-20">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageSide === 'right' ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${imageSide === 'right' ? 'lg:col-start-2' : ''}`}>
                    <h2 className="text-3xl font-extrabold text-indigo-400 mb-2">{title}</h2>
                    <p className="text-xl text-white font-semibold mb-4">{description}</p>
                    <p className="text-gray-400 leading-relaxed">{longDescription}</p>
                </div>
                <div className={`mt-10 lg:mt-0 ${imageSide === 'right' ? 'lg:col-start-1' : ''}`}>
                    <div className="grid grid-cols-2 gap-4">
                        {portfolioImages.map((src, index) => (
                            <div key={index} className="group aspect-w-1 aspect-h-1">
                                <img src={src} alt={`Portfolio ${index + 1}`} className="rounded-2xl object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const ServicesPage: React.FC = () => {
    // FIX: Explicitly type the services array to prevent TypeScript from inferring 'imageSide' as a generic string.
    const services: ServiceDetailProps[] = [
    {
      id: 'video-editing',
      title: "Video Editing",
      description: "Professional editing for YouTube, short films, ads, and social media.",
      longDescription: "Our expert video editors transform raw footage into polished, compelling stories. We handle everything from color grading and sound design to visual effects and final exports, ensuring your content stands out on any platform. Whether it's a promotional video, a short film, or social media clips, we deliver broadcast-quality results.",
      portfolioImages: ["https://picsum.photos/400/400?random=11", "https://picsum.photos/400/400?random=12", "https://picsum.photos/400/400?random=13", "https://picsum.photos/400/400?random=14"],
      imageSide: 'left',
    },
    {
      id: 'community-management',
      title: "Community Management",
      description: "Managing online communities, engaging with audience, and building brand trust.",
      longDescription: "We build and nurture thriving online communities around your brand. Our services include content moderation, audience engagement, social media management, and performance analytics. We act as the voice of your brand, fostering loyalty and driving meaningful conversations.",
      portfolioImages: ["https://picsum.photos/400/400?random=15", "https://picsum.photos/400/400?random=16", "https://picsum.photos/400/400?random=17", "https://picsum.photos/400/400?random=18"],
      imageSide: 'right',
    },
    {
      id: '2d-animation',
      title: "2D Animation",
      description: "Explainer videos, character animation, and storytelling visuals.",
      longDescription: "From charming character animations to informative explainer videos, our 2D animation service brings your ideas to life. We specialize in creating custom visuals that communicate complex messages in an engaging and memorable way. Our process covers storyboarding, illustration, animation, and sound design.",
      portfolioImages: ["https://picsum.photos/400/400?random=19", "https://picsum.photos/400/400?random=20", "https://picsum.photos/400/400?random=21", "https://picsum.photos/400/400?random=22"],
      imageSide: 'left',
    },
    {
      id: 'motion-graphics',
      title: "Motion Graphics",
      description: "Dynamic titles, promotional graphics, and animated branding.",
      longDescription: "Elevate your visual content with stunning motion graphics. We design and animate logos, lower thirds, title sequences, and other graphical elements that add a professional touch to your videos. Our motion graphics are designed to capture attention and reinforce your brand identity.",
      portfolioImages: ["https://picsum.photos/400/400?random=23", "https://picsum.photos/400/400?random=24", "https://picsum.photos/400/400?random=25", "https://picsum.photos/400/400?random=26"],
      imageSide: 'right',
    }
  ];

  return (
    <div className="bg-gray-900">
      <header className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white">Our Services</h1>
          <p className="mt-4 text-xl text-gray-300">Detailed solutions to fuel your creative projects.</p>
        </div>
      </header>
      
      <div className="divide-y divide-gray-800">
        {services.map((service, index) => (
            <ServiceDetailSection key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;