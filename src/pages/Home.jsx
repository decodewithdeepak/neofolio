import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowRight, HiSparkles, HiCube, HiCog, HiLightningBolt, HiTemplate, HiPencil } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Enhanced features with more details
  const features = [
    {
      icon: HiTemplate,
      title: "Modern Design",
      description: "Beautiful, responsive portfolios that stand out",
      gradient: "from-blue-500 to-purple-500",
      highlights: ["Responsive Layout", "Dark Mode", "Animated UI"]
    },
    {
      icon: HiLightningBolt,
      title: "Easy to Use",
      description: "Set up your portfolio in minutes, no coding required",
      gradient: "from-orange-500 to-pink-500",
      highlights: ["Quick Setup", "Simple Interface", "Live Preview"]
    },
    {
      icon: HiCube,
      title: "Customizable",
      description: "Personalize every aspect to match your style",
      gradient: "from-green-500 to-teal-500",
      highlights: ["Custom Themes", "Layout Options", "Font Choices"]
    },
    {
      icon: HiCog,
      title: "SEO Optimized",
      description: "Get discovered by recruiters and clients",
      gradient: "from-purple-500 to-indigo-500",
      highlights: ["Meta Tags", "Fast Loading", "Best Practices"]
    }
  ];

  const renderCTAButtons = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-4 pt-4"
    >
      {currentUser ? (
        <Link
          to="/edit-profile"
          className="group relative inline-flex items-center px-8 py-4 rounded-xl 
                   overflow-hidden backdrop-blur-sm transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70
                        group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center text-white font-medium">
            Edit Portfolio
            <HiPencil className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      ) : (
        <Link
          to="/signup"
          className="group relative inline-flex items-center px-8 py-4 rounded-xl 
                   overflow-hidden backdrop-blur-sm transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70
                        group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center text-white font-medium">
            Launch My Portfolio
            <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      )}

      <Link
        to="/examples"
        className="group relative inline-flex items-center px-8 py-4 rounded-xl 
                 overflow-hidden transition-all duration-300"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Inner background */}
        <div className="absolute inset-[1px] rounded-[10px] bg-gray-900" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Button content */}
        <span className="relative z-10 flex items-center text-white font-medium">
          <span className="relative">
            Inspire Me
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                         group-hover:w-full transition-all duration-300" />
          </span>
          <HiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-[400px] -right-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl animate-blob" />
        </div>
        <div className="absolute w-[1000px] h-[1000px] -bottom-[400px] -left-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-sm text-gray-300 flex items-center gap-2">
                Build. Share. Shine. With NeoFolio <HiSparkles className="text-yellow-500 animate-pulse" />
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Create Your
              <span className="block mt-2 relative">
                <span className="relative">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-25"></span>
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    Developer Portfolio
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              NeoFolio helps you launch a stunning developer portfolio in minutes — no code, just creativity.
            </p>

            {/* Updated CTA Buttons */}
            {renderCTAButtons()}
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group relative p-1 rounded-2xl transition-all duration-300"
              >
                {/* Gradient Border Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              rounded-2xl transition-opacity group-hover:via-white/10" />

                {/* Card Content */}
                <div className="relative p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10
                              hover:bg-white/[0.07] transition-all duration-300">
                  {/* Icon Container */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-transparent 
                                   group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                                   group-hover:from-white via-blue-500 to-purple-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-3">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 
                                transition-opacity duration-300 pointer-events-none">
                    <div className={`h-full w-full bg-gradient-to-br ${feature.gradient}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
