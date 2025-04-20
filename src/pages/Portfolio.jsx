import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { HiMenu, HiX } from 'react-icons/hi';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ActivityCard from '../components/ActivityCard';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import AchievementCard from '../components/AchievementCard';

const Portfolio = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [sections, setSections] = useState([{ id: 'profile', label: 'Profile' }]);
  const [isScrolling, setIsScrolling] = useState(false);
  const prevActiveSectionRef = useRef(activeSection);
  const activeSectionChangeTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const [userData, setUserData] = useState({
    profile: {
      name: '',
      title: '',
      bio: '',
      avatar: '',
      links: [],
      githubUsername: '',
      leetcodeUsername: ''
    },
    experiences: [],
    skills: [],
    projects: [],
    achievements: [],
    education: []
  });

  // Scroll performance optimization
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        document.body.classList.add('scrolling');
        setIsScrolling(true);
      }
      
      // Clear the timeout if it exists
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to remove the scrolling class after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        document.body.classList.remove('scrolling');
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      document.body.classList.remove('scrolling');
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;

      try {
        setLoading(true);
        setError(null);

        const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
        if (!usernameDoc.exists()) throw new Error('This user does not exist');

        const uid = usernameDoc.data()?.uid;
        if (!uid) throw new Error('Invalid user data');

        const portfolioDoc = await getDoc(doc(db, 'portfolios', uid));
        if (!portfolioDoc.exists()) throw new Error('Portfolio data not found');

        const data = portfolioDoc.data();
        setUserData({
          profile: {
            name: data?.profile?.name || '',
            title: data?.profile?.title || '',
            bio: data?.profile?.bio || '',
            avatar: data?.profile?.avatar || '',
            links: Array.isArray(data?.profile?.links) ? data.profile.links : [],
            githubUsername: data?.profile?.githubUsername || '',
            leetcodeUsername: data?.profile?.leetcodeUsername || ''
          },
          experiences: Array.isArray(data?.experiences) ? data.experiences : [],
          skills: Array.isArray(data?.skills) ? data.skills : [],
          projects: Array.isArray(data?.projects) ? data.projects : [],
          achievements: Array.isArray(data?.achievements) ? data.achievements : [],
          education: Array.isArray(data?.education) ? data.education : []
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

  // Update sections based on available data
  useEffect(() => {
    if (!userData) return;

    const availableSections = [{ id: 'profile', label: 'Profile' }];

    if (userData.skills?.length > 0) {
      availableSections.push({ id: 'skills', label: 'Skills' });
    }
    if (userData.profile?.githubUsername || userData.profile?.leetcodeUsername) {
      availableSections.push({ id: 'coding', label: 'Coding Stats' });
    }
    if (userData.projects?.length > 0) {
      availableSections.push({ id: 'projects', label: 'Projects' });
    }
    if (userData.experiences?.length > 0) {
      availableSections.push({ id: 'experience', label: 'Experience' });
    }
    if (userData.education?.length > 0) {
      availableSections.push({ id: 'education', label: 'Education' });
    }
    if (userData.achievements?.length > 0) {
      availableSections.push({ id: 'achievements', label: 'Achievements' });
    }

    setSections(availableSections);
  }, [userData]);

  // Optimized scroll handling with Intersection Observer
  useEffect(() => {
    if (!sections.length) return;
    
    // Debounced state update for active section
    const debouncedSetActiveSection = (sectionId) => {
      if (prevActiveSectionRef.current === sectionId) return;
      
      if (activeSectionChangeTimeoutRef.current) {
        clearTimeout(activeSectionChangeTimeoutRef.current);
      }
      
      activeSectionChangeTimeoutRef.current = setTimeout(() => {
        setActiveSection(sectionId);
        prevActiveSectionRef.current = sectionId;
      }, 100); // Small debounce to avoid rapid state changes
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: [0, 0.1, 0.2] // Multiple thresholds for smoother detection
    };

    const observerCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      let highestEntry = null;
      let highestRatio = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          highestEntry = entry;
        }
      });
      
      if (highestEntry) {
        debouncedSetActiveSection(highestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (activeSectionChangeTimeoutRef.current) {
        clearTimeout(activeSectionChangeTimeoutRef.current);
      }
    };
  }, [sections]);

  // Memoized scroll function for better performance
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navOffset = 150;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      // Using requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    }
    setIsMenuOpen(false);
  }, []);

  const renderNavLinks = () => {
    if (!Array.isArray(sections)) return null;

    return sections.map(section => (
      <button
        key={section.id}
        onClick={() => scrollToSection(section.id)}
        className={`text-sm font-medium transition-all duration-300 px-4 py-2 my-1 lg:my-0 lg:mx-2 rounded-xl ${
          activeSection === section.id
            ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white'
            : 'hover:bg-gray-700/50 text-gray-400'
        }`}
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
          <h1 className="text-4xl font-bold text-white mb-4">Portfolio Not Found</h1>
          <p className="text-gray-400">{error || "The portfolio you're looking for doesn't exist"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {sections.length > 1 && (
        <nav className="fixed top-[64px] left-0 right-0 z-40 transition-all duration-300">
          <div className="backdrop-blur-xl bg-gray-900/60 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-center h-16">
                <div className="hidden lg:flex items-center justify-center space-x-1">
                  {renderNavLinks()}
                </div>
                <div className="lg:hidden absolute right-4">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {isMenuOpen ? <HiX className="w-5 h-5 text-white" /> : <HiMenu className="w-5 h-5 text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/80 backdrop-blur-xl">
                {renderNavLinks()}
              </div>
            </div>
          )}
        </nav>
      )}

      <main className="pt-32 relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 pb-32">
            <section id="profile" className="scroll-mt-32">
              <ProfileCard profile={userData?.profile || {}} />
            </section>
            {userData?.skills?.length > 0 && (
              <section id="skills" className="scroll-mt-32">
                <SkillsCard skills={userData.skills} />
              </section>
            )}
            {(userData?.profile?.githubUsername || userData?.profile?.leetcodeUsername) && (
              <section id="coding" className="scroll-mt-32">
                <ActivityCard
                  githubUsername={userData?.profile?.githubUsername}
                  leetcodeUsername={userData?.profile?.leetcodeUsername}
                />
              </section>
            )}
            {userData?.projects?.length > 0 && (
              <section id="projects" className="scroll-mt-32">
                <ProjectCard projects={userData.projects} />
              </section>
            )}
            {userData?.experiences?.length > 0 && (
              <section id="experience" className="scroll-mt-32">
                <ExperienceCard experiences={userData.experiences} />
              </section>
            )}
            {userData?.education?.length > 0 && (
              <section id="education" className="scroll-mt-32">
                <EducationCard education={userData.education} />
              </section>
            )}
            {userData?.achievements?.length > 0 && (
              <section id="achievements" className="scroll-mt-32 mb-16">
                <AchievementCard achievements={userData.achievements} />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
