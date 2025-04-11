// Verify data structure
console.log("Initializing mock data") // Debug log

export const mockUsers = {
  "deepak": {
    profile: {
      name: "Deepak Modi",
      title: "Full Stack Developer & CSE Undergrad",
      bio: "Engineering student passionate about building web apps, solving DSA problems, and launching developer tools.",
      avatar: "https://avatars.githubusercontent.com/u/your-avatar-id", // Replace with your GitHub avatar URL
      links: [
        { name: "GitHub", url: "https://github.com/Deepak-Modi" },
        { name: "LinkedIn", url: "https://linkedin.com/in/deepak-modi" },
        { name: "Portfolio", url: "https://deepakmodi.vercel.app" }
      ]
    },
    experiences: [
      {
        role: "Software Developer Intern",
        company: "Startup XYZ",
        startDate: "2024",
        endDate: "2025",
        description: "Worked on full-stack features, building scalable UI components and backend APIs.",
        skills: ["Next.js", "TypeScript", "PostgreSQL"]
      },
      {
        role: "Open Source Contributor",
        company: "Various Projects",
        startDate: "2023",
        endDate: null,
        description: "Contributed to open-source tools, mainly around developer productivity and web apps.",
        skills: ["React", "Tailwind", "Git"]
      }
    ],
    achievements: [
      {
        title: "LeetCode 300+ Problems Solved",
        issuer: "LeetCode",
        date: "2025",
        description: "Focused on DSA using Java, solving problems across arrays, trees, and DP.",
        url: "https://leetcode.com/deepakmodi"
      }
    ],
    projects: [
      {
        title: "NeoCompiler",
        description: "An online code editor supporting multiple languages and AI assistant.",
        image: "https://your-image-url.com", // Replace with project thumbnail
        technologies: ["Next.js", "Monaco Editor", "Piston API"],
        github: "https://github.com/Deepak-Modi/neocompiler",
        demo: "https://neocompiler.vercel.app"
      },
      {
        title: "NotesNeo",
        description: "Educational platform providing study notes for university students.",
        image: "https://your-image-url.com", // Replace with project thumbnail
        technologies: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/Deepak-Modi/notesneo",
        demo: "https://notesneo.vercel.app"
      },
      {
        title: "NeoCode",
        description: "Platform for learning DSA and Development with blogs, sheets, and compiler.",
        image: "https://your-image-url.com", // Replace with project thumbnail
        technologies: ["Next.js", "Tailwind", "Supabase"],
        github: "https://github.com/Deepak-Modi/neocode",
        demo: "https://neocode.vercel.app"
      }
    ],
    skills: [
      {
        category: "Frontend",
        items: [
          { name: "React", level: 90 },
          { name: "Next.js", level: 88 },
          { name: "Tailwind CSS", level: 95 }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", level: 85 },
          { name: "Java", level: 80 },
          { name: "PostgreSQL", level: 82 }
        ]
      }
    ]
  }

  // Add more users as needed
}

// Verify data export
console.log("Available users:", Object.keys(mockUsers)) // Debug log
