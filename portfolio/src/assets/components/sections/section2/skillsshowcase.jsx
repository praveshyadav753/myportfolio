import { motion } from "framer-motion";

const skills = [
  { name: "WebGL", level: 60 },
  { name: "ReactJS", level: 75 },
  { name: "JavaScript", level: 90 },
  { name: "HTML + CSS", level: 95 },
  { name: "3D Modelling", level: 65 },
];

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-black border border-cyan-400 text-neonBlue rounded-xl shadow-glow font-orbitron p-6 w-[350px] md:w-[400px] mx-auto relative overflow-hidden"
    >
      {/* Glowing scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500 opacity-5 animate-pulse pointer-events-none" />

      {/* Avatar & Info */}
      <div className="flex items-center mb-6 space-x-4">
        <div className="w-20 h-20 rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-700 to-black flex items-center justify-center text-3xl">
          🧑‍💻
        </div>
        <div className="text-sm space-y-1">
          <p><span className="text-cyan-400">Name:</span> David</p>
          <p><span className="text-cyan-400">Age:</span> 23</p>
          <p><span className="text-cyan-400">From:</span> Germany</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-2">
        <h3 className="text-xl text-cyan-300 border-b border-cyan-700 mb-4">SKILLS</h3>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between text-sm">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-cyan-900 rounded-full">
              <div
                className="h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
