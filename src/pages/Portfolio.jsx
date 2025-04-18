import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { HiMenu, HiX } from 'react-icons/hi';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';
import ActivityCard from '../components/ActivityCard';
import EducationCard from '../components/EducationCard';

const Portfolio = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [sections, setSections] = useState([{ id: 'profile', label: 'Profile' }]);

  // Initialize userData with default empty values
  const [userData, setUserData] = useState({
    profile: {
      name: '',
      title: '',
      bio: '',
      avatar: '',
      links: [],
      githubUsername: '', // Add this
      leetcodeUsername: '' // Add this
    },
    experiences: [],
    skills: [],
    projects: [],
    achievements: [],
    education: [] // Add education to initial state
  });

  // Update sections based on available data
  useEffect(() => {
    if (!userData) return;

    const availableSections = [{ id: 'profile', label: 'Profile' }];

    // Add coding stats section if either username exists
    if (userData.profile?.githubUsername || userData.profile?.leetcodeUsername) {
      availableSections.push({ id: 'coding', label: 'Coding Stats' });
    }

    if (userData.education?.length > 0) {
      availableSections.push({ id: 'education', label: 'Education' });
    }

    // Add other sections
    if (userData.experiences?.length > 0) {
      availableSections.push({ id: 'experience', label: 'Experience' });
    }
    if (userData.skills?.length > 0) {
      availableSections.push({ id: 'skills', label: 'Skills' });
    }
    if (userData.projects?.length > 0) {
      availableSections.push({ id: 'projects', label: 'Projects' });
    }
    if (userData.achievements?.length > 0) {
      availableSections.push({ id: 'achievements', label: 'Achievements' });
    }
    

    setSections(availableSections);
  }, [userData]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;

      try {
        setLoading(true);
        setError(null);
        
        // Get UID from username
        const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
        
        if (!usernameDoc.exists()) {
          throw new Error('This user does not exist');
        }

        // Get portfolio data using UID
        const uid = usernameDoc.data()?.uid;
        if (!uid) {
          throw new Error('Invalid user data');
        }

        const portfolioDoc = await getDoc(doc(db, 'portfolios', uid));
        
        if (!portfolioDoc.exists()) {
          throw new Error('Portfolio data not found');
        }

        const data = portfolioDoc.data();
        
        // Ensure all arrays exist with defaults
        setUserData({
          profile: {
            name: data?.profile?.name || '',
            title: data?.profile?.title || '',
            bio: data?.profile?.bio || '',
            avatar: data?.profile?.avatar || '',
            links: Array.isArray(data?.profile?.links) ? data.profile.links : [],
            githubUsername: data?.profile?.githubUsername || '', // Add this
            leetcodeUsername: data?.profile?.leetcodeUsername || '' // Add this
          },
          experiences: Array.isArray(data?.experiences) ? data.experiences : [],
          skills: Array.isArray(data?.skills) ? data.skills : [],
          projects: Array.isArray(data?.projects) ? data.projects : [],
          achievements: Array.isArray(data?.achievements) ? data.achievements : [],
          education: Array.isArray(data?.education) ? data.education : [] // Add this
        });

      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  // Improved scroll handling with Intersection Observer
  useEffect(() => {
    if (!sections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Adjust the intersection margins
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section elements
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Improved smooth scroll with offset
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navOffset = 150; // Adjusted offset for better positioning
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const renderNavLinks = () => {
    // Safety check for sections
    if (!Array.isArray(sections)) return null;

    return sections.map(section => (
      <button
        key={section.id}
        onClick={() => scrollToSection(section.id)}
        className={`
          text-sm font-medium transition-all duration-300
          px-4 py-2 my-1 lg:my-0 lg:mx-2 rounded-xl
          ${activeSection === section.id
            ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
          }
        `}
      >
        {section.label}
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="backdrop-blur-xl bg-purple-400/10 rounded-xl border border-white/20 p-8 max-w-md w-full text-center mx-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-400">
            {error || "The portfolio you're looking for doesn't exist"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Dynamic Navigation */}
      {sections.length > 1 && (
        <nav className="fixed top-[64px] left-0 right-0 z-40 transition-all duration-300">
          <div className="backdrop-blur-xl bg-gray-900/60 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              {/* Center navigation for all screens */}
              <div className="flex items-center justify-center h-16">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-center space-x-1">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        relative px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-300 group
                        ${activeSection === section.id
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                        }
                      `}
                    >
                      {activeSection === section.id && (
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg -z-10" />
                      )}
                      <span className="relative z-10">{section.label}</span>
                      {activeSection === section.id && (
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                        <div className="lg:hidden absolute right-4">
                          <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 transition-colors"
                          >
                          {isMenuOpen ? (
                            <HiX className="w-5 h-5 text-white" />
                          ) : (
                            <HiMenu className="w-5 h-5 text-white" />
                          )}
                          </button>
                        </div>
                        </div>
                      </div>
                      </div>

                      {/* Mobile Menu - Centered Content */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/80 backdrop-blur-xl">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full text-center px-3 py-2 rounded-lg text-sm font-medium
                      ${activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Content Sections */}
      <main className="pt-32 relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 pb-32">
            {/* Profile Section - Always show */}
            <section id="profile" className="scroll-mt-32">
              <ProfileCard profile={userData?.profile || {}} />
            </section>

            {/* Coding Stats Section - Only show if usernames are provided */}
            {(userData?.profile?.githubUsername || userData?.profile?.leetcodeUsername) && (
              <section id="coding" className="scroll-mt-32">
                <ActivityCard 
                  githubUsername={userData?.profile?.githubUsername}
                  leetcodeUsername={userData?.profile?.leetcodeUsername}
                />
              </section>
            )}

            {/* Experience Section */}
            {userData?.experiences?.length > 0 && (
              <section id="experience" className="scroll-mt-32">
                <ExperienceCard experiences={userData.experiences} />
              </section>
            )}

            {/* Education Section */}
            {userData?.education?.length > 0 && (
              <section id="education" className="scroll-mt-32">
                <EducationCard education={userData.education} />
              </section>
            )}

            {/* Skills Section */}
            {userData?.skills?.length > 0 && (
              <section id="skills" className="scroll-mt-32">
                <SkillsCard skills={userData.skills} />
              </section>
            )}

            {/* Projects Section */}
            {userData?.projects?.length > 0 && (
              <section id="projects" className="scroll-mt-32">
                <ProjectCard projects={userData.projects} />
              </section>
            )}

            {/* Achievements Section */}
            {userData?.achievements?.length > 0 && (
              <section id="achievements" className="scroll-mt-32 mb-16">
                <AchievementCard achievements={userData.achievements} />
              </section>
            )}

          </div>
        </div>
      </main>

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-normal filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/5 rounded-full mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Portfolio;