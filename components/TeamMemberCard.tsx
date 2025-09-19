
import React from 'react';

interface TeamMemberCardProps {
  image: string;
  name: string;
  role: string;
  bio: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, role, bio }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-2 transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
      />
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-purple-400 font-medium mb-2">{role}</p>
      <p className="text-gray-400 text-sm">{bio}</p>
    </div>
  );
};

export default TeamMemberCard;
