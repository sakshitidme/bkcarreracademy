export const STAFF = [
  {
    id: 1,
    name: "Nandakishor Ghuge",
    role: "Director & Chief Mentor",
    specialty: "Director & Chief Mentor",
    image: "/Stp/ghuge sir.png",
    bio: "A visionary leader with over 15 years of experience in shaping the futures of competitive exam aspirants. Nandakishor sir has been the guiding force behind the academy's success and the primary mentor for UPSC and MPSC aspirants."
  },
  {
    id: 2,
    name: "Sushant Dughad",
    role: "Reasoning Expert",
    specialty: "Reasoning",
    image: "/Stp/Sushant Dughad.jpg",
    bio: "Expert in Logical Reasoning and Mental Ability. Sushant specializes in teaching high-speed shortcuts and logical frameworks that help students solve complex puzzles in seconds."
  },
  {
    id: 3,
    name: "Preeti Dube",
    role: "Aptitude Expert",
    specialty: "REASONING & MATHS",
    image: "/Stp/Preeti Dube.jpg",
    bio: "A master of Quantitative Aptitude and Mathematics. Preeti focuses on building strong numerical foundations and teaching efficient calculation techniques for all competitive exams."
  },
  {
    id: 4,
    name: "Dnyaneshwar Rathod",
    role: "GK & Science Expert",
    specialty: "GK & SCIENCE",
    image: "/Stp/Dnyaneshwar Rathod.jpg",
    bio: "Specializing in General Science and General Knowledge. Dnyaneshwar helps students master vast GS syllabi through structured memory techniques and deep conceptual clarity."
  },
  {
    id: 5,
    name: "Dnyaneshwar Nikalje",
    role: "Senior Academic Mentor",
    specialty: "MPSC Specialist",
    image: "/Stp/Dnyaneshwar Nikalje.png",
    bio: "A dedicated specialist in MPSC patterns and Maharashtra State Services. Dnyaneshwar provides strategic mentorship on state-level administration and comprehensive subject mastery."
  },
];

export const EXAM_CATEGORIES = [
  {
    id: 1,
    title: "UPSC (IAS, IPS, IFS)",
    icon: "🏛️",
    thumb: "/upsc.png",
    description: "Conducted mainly by UPSC including IAS, IPS, IFS and Central Group 'A' exams.",
    subcategories: [
      {
        name: "UPSC Exams",
        exams: ["UPSC Civil Services (IAS, IPS, IFS)", "Indian Forest Service (IFoS)", "Engineering Services (ESE/IES)", "CAPF (Assistant Commandant)", "Combined Defence Services (CDS)", "Combined Medical Services (CMS)", "Indian Economic Service (IES) / ISS", "Special Class Railway Apprentices (SCRA)"]
      }
    ]
  },
  {
    id: 12,
    title: "MPSC (Maharashtra Services)",
    icon: "🔱",
    thumb: "/mpsc_emblem.png",
    description: "Maharashtra State Services, Administrative and Subordinate recruitment portal.",
    subcategories: [
      {
        name: "A&B",
        exams: ["RAJYASEVA"]
      },
      {
        name: "SUB",
        exams: ["PSI", "STI", "ASO", "SUB-REG"]
      },
      {
        name: "C",
        exams: ["CLK-TYP", "TAX-A", "EXC-SI", "TECH-A"]
      },
      {
        name: "TECH",
        exams: ["ENGG", "FOR", "AGRI"]
      },
      {
        name: "OTH",
        exams: ["CIV-J", "AMVI"]
      }
    ]
  },
  {
    id: 2,
    title: "SSC (Staff Selection Commission)",
    icon: "🧾",
    thumb: "/SCC.png",
    description: "Central government department recruitments for various levels.",
    subcategories: [
      {
        name: "Central Govt Departments",
        exams: ["SSC CGL (Graduate Level)", "SSC CHSL (12th level)", "SSC MTS", "SSC GD Constable", "SSC JE (Engineer)", "SSC CPO (Police SI)", "SSC Stenographer", "SSC JHT (Translator)"]
      }
    ]
  },
  {
    id: 3,
    title: "Banking & Finance Exams",
    icon: "🏦",
    thumb: "/banking.jpg",
    description: "Conducted by IBPS, SBI, RBI, NABARD for officer and clerk roles.",
    subcategories: [
      {
        name: "Banking Recruitment",
        exams: ["IBPS PO", "IBPS Clerk", "IBPS SO", "IBPS RRB (Officer/Clerk)", "SBI PO", "SBI Clerk", "RBI Grade B", "RBI Assistant", "NABARD Grade A/B"]
      }
    ]
  },
  {
    id: 4,
    title: "Railway Exams (RRB)",
    icon: "🚆",
    thumb: "/Four.jpg",
    description: "Recruitment for NTPC, Group D, Junior Engineer and ALP positions.",
    subcategories: [
      {
        name: "Railway Recruitment",
        exams: ["RRB NTPC", "RRB Group D", "RRB JE (Junior Engineer)", "RRB ALP (Assistant Loco Pilot)"]
      }
    ]
  },
  {
    id: 5,
    title: "Defence Exams",
    icon: "🪖",
    thumb: "/Defense.png",
    description: "Officer and entry level roles in Army, Navy, and Air Force.",
    subcategories: [
      {
        name: "Armed Forces",
        exams: ["NDA (after 12th)", "CDS (after graduation)", "AFCAT (Air Force)", "INET (Navy)", "Territorial Army", "Coast Guard (Navik, Assistant Commandant)"]
      }
    ]
  },
  {
    id: 6,
    title: "Teaching & Education Exams",
    icon: "🏫",
    thumb: "/tewntysix.jpg",
    description: "Teacher eligibility and recruitment for central and state schools.",
    subcategories: [
      {
        name: "Education Sector",
        exams: ["MAHA TET (Maharashtra)", "CTET (Central Teacher Eligibility Test)", "UGC NET (Assistant Professor / JRF)", "KVS / NVS Recruitment"]
      }
    ]
  },
  {
    id: 7,
    title: "Insurance Exams",
    icon: "🏢",
    thumb: "/wentyseven.png",
    description: "Administrative officer roles in LIC, NICL, and NIACL.",
    subcategories: [
      {
        name: "Insurance Sector",
        exams: ["LIC AAO", "LIC ADO", "NICL AO", "NIACL AO"]
      }
    ]
  },
  {
    id: 8,
    title: "Engineering & PSU Exams",
    icon: "⚙️",
    thumb: "/seventeen.jpeg",
    description: "Technical roles in PSUs through GATE or independent exams.",
    subcategories: [
      {
        name: "Technical/Research",
        exams: ["GATE (for PSU jobs)", "ISRO Scientist", "DRDO Scientist"]
      }
    ]
  },
  {
    id: 9,
    title: "Law & Judiciary Exams",
    icon: "⚖️",
    thumb: "/fourteeen.jpeg",
    description: "Legal studies entry and judicial service examinations.",
    subcategories: [
      {
        name: "Legal Services",
        exams: ["CLAT (Legal entry)", "Judicial Services Exam (Civil Judge)", "Public Prosecutor exams"]
      }
    ]
  },
  {
    id: 10,
    title: "Medical & Nursing Exams",
    icon: "🏥",
    thumb: "/Enhance.jpg",
    description: "State and central medical officer and nursing officer recruitment.",
    subcategories: [
      {
        name: "Healthcare",
        exams: ["Medical Officer Exam (State/UPSC CMS)", "Nursing Officer (AIIMS NORCET)", "ESIC Medical/Nursing"]
      }
    ]
  },
  {
    id: 14,
    title: "Police & Security Services",
    icon: "👮",
    thumb: "/Ashok stambh.png",
    description: "Recruitments for State Police, BSF, CISF, and paramilitary forces.",
    subcategories: [
      {
        name: "Security Forces",
        exams: ["Maharashtra Police Bharti (Portal)", "Maharashtra Police Bharti", "Maharashtra Post Services", "Maharashtra Forest Service"]
      }
    ]
  },
  {
    id: 11,
    title: "Other Important Govt Exams",
    icon: "🌾",
    thumb: "/fci.jpg",
    description: "Specialized recruitments for FCI, EPFO, SEBI and more.",
    subcategories: [
      {
        name: "Other Services",
        exams: ["FCI (Food Corporation of India)", "EPFO EO/AO", "SEBI Grade A"]
      }
    ]
  }
];

export const COURSES = [
  { id: 1,  title: "UPSC Civil Services (IAS, IPS, IFS)", category: "Civil Services", instructor: "Dr. Elena Vance",    isNew: false, image: "/home/card1.png" },
  { id: 2,  title: "SSC CGL (Graduate Level)",         category: "SSC",            instructor: "Prof. Marcus Thorne", isNew: true,  image: "/home/card2.png" },
  { id: 3,  title: "Bank, IBPS, EPFO & SEBI Grade A Mastery", category: "Banking & Finance", instructor: "Dr. Sarah Chen",      isNew: true,  image: "/home/card3.png" },
  { id: 4,  title: "RRB NTPC Comprehensive",            category: "Railways",       instructor: "Dr. Julian Blackwood", isNew: false, image: "/home/card4.png" },
  { id: 5,  title: "NDA & CDS Officer Program",         category: "Defence",        instructor: "Dr. Elena Vance",     isNew: false, image: "/home/card5.png" },
  { id: 6,  title: "UGC NET & CTET Mastery",            category: "Teaching",       instructor: "Prof. Marcus Thorne", isNew: true,  image: "/home/card6.png" },
  { id: 7,  title: "GATE Engineering Excellence",       category: "Engineering",    instructor: "Dr. Sarah Chen",      isNew: false, image: "/home/card7.png" },
  { id: 8,  title: "Judicial Services Exam Prep",       category: "Law",            instructor: "Dr. Julian Blackwood", isNew: false, image: "/home/card8.png" },
  { id: 100, title: "Maharashtra State Police Bharti", category: "Police",         instructor: "Academy Special",    isNew: true,  image: "/home/card1.png" },
];

export const INSTRUCTORS = [
  {
    name: "Dr. Elena Vance",
    role: "Founding Partner, Titan Global",
    bio: "Ex-CEO of Fortune 10 giants, dedicated to shaping the next generation of board-level leaders.",
    image: "https://picsum.photos/seed/vance/400/400"
  },
  {
    name: "Prof. Marcus Thorne",
    role: "Chief Strategist, Sovereign Capital",
    bio: "Pioneer in global market dynamics and institutional wealth management strategies.",
    image: "https://picsum.photos/seed/thorne/400/400"
  },
  {
    name: "Dr. Sarah Chen",
    role: "Head of Transformation, Silicon Valley",
    bio: "Leading architect of digital evolution for the world's most innovative technology conglomerates.",
    image: "https://picsum.photos/seed/chen/400/400"
  }
];
