import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowRight, HiCube, HiCog, HiLightningBolt, HiTemplate, HiPencil, HiCode, HiOutlineExternalLink } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import CodeSnippet from '../components/CodeSnippet';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Sample testimonials
  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Frontend Developer",
      company: "TechCo",
      content: "NeoFolio helped me land my dream job! The portfolio templates are stunning and so easy to customize.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "James Chen",
      role: "Full Stack Engineer",
      company: "DevGroup",
      content: "I was up and running with a professional portfolio in less than an hour. The UI is intuitive and the results are impressive!",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "UX Designer",
      company: "DesignHub",
      content: "As a designer, I'm very particular about aesthetics. NeoFolio exceeded my expectations with its beautiful, modern templates.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const renderCTAButtons = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="flex flex-wrap justify-center gap-5 pt-8"
    >
      {currentUser ? (
        <Link
          to="/edit-profile"
          className="group relative inline-flex items-center px-8 py-4 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center text-white font-medium">
            Edit Portfolio
            <HiPencil className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      ) : (
        <Link
          to="/signup"
          className="group relative inline-flex items-center px-8 py-4 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center text-white font-medium">
            Launch Your Portfolio
            <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      )}

      <Link
        to="/examples"
        className="group relative inline-flex items-center px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Inner background */}
        <div className="absolute inset-[1px] rounded-[10px] bg-gray-900" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Button content */}
        <span className="relative z-10 flex items-center text-white font-medium">
          <span className="relative">
            View Community
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </span>
          <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1200px] h-[1200px] -top-[500px] -right-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-3xl animate-blob" />
        </div>
        <div className="absolute w-[1200px] h-[1200px] -bottom-[500px] -left-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="absolute w-[800px] h-[800px] top-[30%] left-[40%]">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/10 to-blue-600/10 blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-sm text-gray-300 flex items-center gap-2">
                ✨ Build. Share. Shine. With
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">NeoFolio</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Build Your
              <span className="block mt-3 relative">
                <span className="relative">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-30"></span>
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                    Developer Portfolio
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Create a stunning portfolio in minutes - showcase your skills, projects, and experience with ease. No need to write complex code - just focus on what matters.
            </p>


            {/* Updated CTA Buttons */}
            {renderCTAButtons()}
          </motion.div>

          {/* Code snippet display - Now using the CodeSnippet component */}
          <CodeSnippet
            isVisible={isVisible}
            animationDelay={0.8}
          />

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-28 mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Features that make you stand out
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 1.2 + index * 0.15 }}
                  className="group bg-gray-800/20 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  {/* Card Header with Icon */}
                  <div className={`h-2 w-full bg-gradient-to-r ${feature.gradient}`} />
                  
                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.gradient}`}>
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 mb-5 text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Feature Points */}
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center text-gray-400">
                          <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="max-w-5xl mx-auto px-4 pb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                What our users say
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 1.6 + index * 0.15 }}
                  className="relative p-1 rounded-2xl overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl" />

                  {/* Card Content */}
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full flex flex-col">
                    <div className="mb-4 text-gray-300 italic">"{testimonial.content}"</div>
                    <div className="mt-auto flex items-center pt-4 border-t border-gray-700/30">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{testimonial.name}</div>
                        <div className="text-xs text-gray-400">{testimonial.role} at {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="max-w-3xl mx-auto px-4 py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to showcase your talent?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who have boosted their careers with NeoFolio
            </p>
            <div className="flex justify-center">
              <Link
                to="/signup"
                className="group relative inline-flex items-center px-8 py-4 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center text-white font-medium">
                  Get Started for Free
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              No credit card required · Free hosting · Unlimited updates
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
