import React from "react";
import { MdWeb } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";

const ProjectCard = ({ project, isActive }) => {
  return (
    <div
      className={`
        relative w-[310px] max-w-[340px] max-h-[425px] rounded-lg p-4 pb-0 flex flex-col justify-between
        transition-all duration-300 ease-in-out transform
        ${
          isActive
            ? "scale-100 md:shadow-2xl ring-4 md:ring-blue-400"
            : "scale-80 opacity-40"
        }
      `}
      style={{
        // Removed direct background color and blur from here to apply a single, more transparent layer
        // The background will be more transparent for the glossy effect
        backgroundColor: "rgba(26, 43, 61, 0.4)", // More transparent base for glossy effect
        border: "2px solid rgba(0, 200, 255, 0.6)", // Slightly transparent border
        color: "white",
        backdropFilter: "blur(15px)", // Apply blur directly to the card for the glossy effect
        textAlign: "center",
        boxShadow: isActive ? "0 0 20px rgba(0, 200, 255, 0.7), 0 0 8px rgba(0, 200, 255, 0.5)" : "none", // Enhanced glow
        overflow: "hidden",
        backgroundImage: `
          radial-gradient(circle at 15% 85%, rgba(100, 10, 120, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 85% 15%, rgba(100, 10, 20, 0.3) 0%, transparent 60%)
        `, // Subtle cool violet patches, now more transparent
      }}
    >
      {/* Main Content - No changes here, content will be "under" the glossy effect */}
      <div className="flex flex-col items-center flex-grow mb-1">
        {/* Image */}
        <div
          className="w-full rounded-md overflow-hidden mb-2" // Added margin-bottom
          style={{ aspectRatio: "2 / 1" }}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white p-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-200 mb-3 line-clamp-4 overflow-hidden px-1"> {/* Slightly adjusted text color and added horizontal padding */}
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto mb-1">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              style={{
                // Background and shadow for tech tags remain for definition against glossy card
                background: "linear-gradient(135deg, #1f2937, #111827)",
                boxShadow:
                  "inset 1px 1px 3px #0f0f1f, 0 2px 6px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)", // Slightly more visible border
              }}
              className="text-[0.7rem] text-gray-100 px-2 py-1 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 hover:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons Section - UI Fixes */}
      <div
        className=" 
          w-[112%] p-2 -mx-4 
          border-t border-gray-600 flex justify-around items-center
          bg-gray-900 bg-opacity-40 // Background for the button section
          rounded-b-lg // Keep the rounded corners at the bottom
        "
        style={{
          // Ensure the background extends properly
          // The background of this div will sit *over* the main card's glossy background
          // You could also consider making this transparent and relying solely on the card's backdrop-filter
          // but if you want a distinct button section background, this is how.
          borderTop: '1px solid rgba(255, 255, 255, 0.1)' // Lighter, more subtle top border
        }}
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold
            px-4 py-2 rounded-full shadow-lg
            hover:from-blue-600 hover:to-blue-800 hover:shadow-xl transform hover:scale-105
            transition-all duration-200 ease-in-out text-sm ring-2 ring-transparent hover:ring-blue-300 focus:outline-none focus:ring-blue-300
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
            flex items-center gap-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold
            px-4 py-2 rounded-full shadow-lg
            hover:from-gray-700 hover:to-gray-900 hover:shadow-xl transform hover:scale-105
            transition-all duration-200 ease-in-out text-sm ring-2 ring-transparent hover:ring-gray-400 focus:outline-none focus:ring-gray-400
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