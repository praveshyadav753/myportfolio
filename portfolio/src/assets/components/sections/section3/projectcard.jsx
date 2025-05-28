import React from 'react';
import { MdWeb } from 'react-icons/md';
import { DiGithubBadge } from 'react-icons/di';

const ProjectCard = ({ project, isActive }) => {
  return (
    <div
      className={`
        relative w-[300] max-w-[340px] max-h-[425px] rounded-lg p-4 flex flex-col justify-between
        transition-all duration-300 ease-in-out transform
        ${isActive ? 'scale-100 md:shadow-xl ring-4 md:ring-blue-400' : 'scale-80 opacity-40'}
      `}
      style={{
        backgroundColor: '#1a2b3d',
        border: '2px solid #00C8FF',
        color: 'white',
        textAlign: 'center',
        boxShadow: isActive ? '0 0px 10px #00C8FF, 0 0 1px #00C8FF' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow mb-4">
        {/* Image */}
        <div
          className="w-full rounded-md overflow-hidden"
          style={{ aspectRatio: '1.95 / 1' }}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-blue-300 p-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-3 line-clamp-4 overflow-hidden">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto mb-1">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div
        className="
          w-full pt-2 border-t border-gray-400 flex justify-around items-center
          bg-gray-800 bg-opacity-40 rounded-b-lg pb-2
        "
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1 bg-blue-600 text-white font-semibold
            px-4 py-2 rounded-full shadow-md
            hover:bg-blue-700 hover:shadow-lg transform hover:scale-105
            transition-all duration-200 ease-in-out text-sm
          "
        >
          <MdWeb size={18} />
          Live
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1 bg-gray-700 text-white font-semibold
            px-4 py-2 rounded-full shadow-md
            hover:bg-gray-800 hover:shadow-lg transform hover:scale-105
            transition-all duration-200 ease-in-out text-sm
          "
        >
          <DiGithubBadge size={20} />
          Code
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
