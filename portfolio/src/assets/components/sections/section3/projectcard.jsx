const ProjectCard = ({ project, isActive }) => {
  return (
    <div
      className={`absolute w-64 h-80 rounded-lg p-4 flex flex-col items-center justify-between transition-all duration-300 ease-in-out
        ${isActive ? 'scale-110 shadow-lg ring-4 ring-blue-400' : 'scale-90 opacity-70'}
      `}
      style={{
        backgroundColor: '#1a2b3d',
        border: '2px solid #00C8FF',
        color: 'white',
        textAlign: 'center',
        boxShadow: isActive ? '0 0 15px #00C8FF, 0 0 30px #00C8FF' : 'none',
      }}
    >
      <img src={project.imageUrl} alt={project.title} className="w-full h-20 object-cover rounded mb-2" />
      <h3 className="text-lg font-bold text-blue-300 mb-1">{project.title}</h3>
      <p className="text-sm text-gray-300 mb-2 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {project.technologies.map((tech, i) => (
          <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors">
          Live
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded-full transition-colors">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;