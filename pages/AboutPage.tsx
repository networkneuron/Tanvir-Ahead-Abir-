
import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      image: 'https://picsum.photos/200/200?random=31',
      name: 'Jane Doe',
      role: 'Founder & Creative Director',
      bio: 'With over 10 years of experience in digital media, Jane leads our creative vision with passion and expertise.',
    },
    {
      image: 'https://picsum.photos/200/200?random=32',
      name: 'John Smith',
      role: 'Head of Production',
      bio: 'John is the mastermind behind our flawless production pipeline, ensuring every project is delivered on time.',
    },
    {
      image: 'https://picsum.photos/200/200?random=33',
      name: 'Emily White',
      role: 'Lead Animator',
      bio: 'Emily brings characters and stories to life with her exceptional animation skills and creative flair.',
    },
    {
      image: 'https://picsum.photos/200/200?random=34',
      name: 'Chris Green',
      role: 'Community Strategist',
      bio: 'Chris is an expert in building and engaging online communities, turning followers into brand advocates.',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Agency Story Section */}
      <section className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">About Creative Motion</h1>
                <p className="mt-6 text-lg text-purple-300">Our Story, Vision, and Mission</p>
            </div>
            <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                    Founded in 2020, Creative Motion was born from a shared passion for storytelling and digital art. We saw a need for a creative partner that not only produces high-quality content but also understands the nuances of brand communication in the digital age.
                </p>
                <p>
                    <strong>Our Mission:</strong> To empower brands and creators by transforming their ideas into compelling visual experiences that resonate with audiences and drive results.
                </p>
                <p>
                    <strong>Our Vision:</strong> To be a leading creative agency known for innovation, quality, and a collaborative spirit, helping to shape the future of digital content.
                </p>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white">Meet Our Team</h2>
          <p className="mt-4 text-lg text-gray-400">The creative minds behind our success.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
