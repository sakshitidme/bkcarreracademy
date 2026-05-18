
export interface ResourceLink {
  title: string;
  url?: string;
  children?: ResourceLink[];
  isSubmenu?: boolean;
}

export interface ExamResource {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  officialWebsite: string;
  resources: {
    title: string;
    items: ResourceLink[];
  }[];
}

export const GOVT_RESOURCES: ExamResource[] = [
  {
    id: 'mpsc',
    name: 'MPSC',
    category: 'MPSC',
    logo: '/mpsc_emblem.png',
    description: 'Maharashtra Public Service Commission official resource center for notifications, results, syllabus, previous question papers, schedules, answer keys and candidate information.',
    officialWebsite: 'https://mpsc.gov.in',
    resources: [
      {
        title: 'CANDIDATE INFORMATION',
        items: [
          { title: 'Advertisements / Notifications / Corrigendums', url: 'https://mpsc.gov.in/adv_notification/8' },
          { 
            title: 'Results', 
            isSubmenu: true,
            children: [
              { title: 'Provisional Selection List', url: 'https://mpsc.gov.in/provisional_selection_list/105' },
              { title: 'Results of Examinations/Recruitment', url: 'https://mpsc.gov.in/result_of_exam/11' },
              { title: 'Merit List', url: 'https://mpsc.gov.in/results_merit_list/14' },
              { title: 'Final Recommendation List', url: 'https://mpsc.gov.in/results_final_recomm_list/15' },
              { title: 'Recommendation from waiting List', url: 'https://mpsc.gov.in/results_recomm_waiting_list/16' },
              { title: 'Candidates Scoring Below Qualifying Marks', url: 'https://mpsc.gov.in/candidates_scoring_below_qualifying_marks/97' }
            ] 
          },
          { title: 'Previous Question Papers', url: 'https://mpsc.gov.in/prev_que_papers/9' },
          { title: 'Specimen Answer Booklet', url: 'https://mpsc.gov.in/specimen_answer_booklet/112' },
          { title: 'Debarred / Blacklisted Candidate', url: 'https://mpsc.gov.in/debarred_blacklisted_candidates/47' },
          { title: 'Scribe and/or Compensatory time', url: 'https://mpsc.gov.in/scribe_and/or_compensatory_time/102' },
          { title: 'List of Not Eligible Candidates after scrutiny', url: 'https://mpsc.gov.in/results_not_qualified/13' },
          { 
            title: 'Instructions', 
            isSubmenu: true,
            children: [
              { title: 'General Instruction', url: 'https://mpsc.gov.in/general_instruction/34' },
              { title: 'Persons with Benchmark Disabilities(PwBD)', url: 'https://mpsc.gov.in/persons_with_benchmark_disabilities/35' },
              { title: 'Guidelines for Examination', url: 'https://mpsc.gov.in/general_instruction/83' }
            ] 
          },
          { title: 'List of Eligible Candidates after scrutiny', url: 'https://mpsc.gov.in/list_of_eligible_candidates_for_interview-direct_recruitment/109' },
          { 
            title: 'Schedule', 
            isSubmenu: true,
            children: [
              { title: 'Tentative Schedule of Competitive Examinations', url: 'https://mpsc.gov.in/tentative_schedule_for_competitive_exam/19' },
              { title: 'Current Status of Competitive Examinations', url: 'https://mpsc.gov.in/current_status_of_competitive_exam/20' },
              { title: 'Schedule for Interviews', url: 'https://mpsc.gov.in/schedule_interviews/21' },
              { title: 'Schedule for Physical Tests', url: 'https://mpsc.gov.in/schedule_physical_test/22' }
            ] 
          },
          { title: 'Announcement and Circular', url: 'https://mpsc.gov.in/announcement_and_circular/4' },
          { 
            title: 'Examination', 
            isSubmenu: true,
            children: [
              { title: 'Scheme of Examination', url: 'https://mpsc.gov.in/examination_scheme/17' },
              { title: 'Syllabus of Examination', url: 'https://mpsc.gov.in/examination_syllabus/18' }
            ] 
          },
          { title: 'Duties and Responsibilities of various Posts', url: 'https://mpsc.gov.in/duties_responsibilities/10' },
          { title: 'Answer Keys of Examinations', url: 'https://mpsc.gov.in/answer_keys_of_examinations/45' }
        ]
      }
    ]
  },
  {
    id: 'upsc',
    name: 'UPSC',
    category: 'UPSC',
    logo: '/upsc.png',
    description: 'Union Public Service Commission official gateway for Civil Services, Engineering Services, and other central government recruitment resources.',
    officialWebsite: 'https://upsc.gov.in',
    resources: [
      {
        title: 'EXAMINATION RESOURCES',
        items: [
          { title: 'Calendar', url: 'https://upsc.gov.in/examinations/exam-calendar' },
          { title: 'Active Examinations', url: 'https://upsc.gov.in/examinations/active-exams' },
          { title: 'Forthcoming Examinations', url: 'https://upsc.gov.in/examinations/forthcoming-exams' },
          { title: 'Previous Year Question Papers', url: 'https://upsc.gov.in/examinations/previous-question-papers' },
          { title: 'Cut-off Marks', url: 'https://upsc.gov.in/examinations/cutoff-marks--' },
          { title: 'Answer Keys', url: 'https://upsc.gov.in/examinations/answer-key' },
          { title: 'Marks Information', url: 'https://upsconline.gov.in/marksheet/exam/marksheet_system/' },
          { title: 'Marks of Recommended Candidates', url: 'https://upsc.gov.in/examinations/marks-recommended-candidates' },
          { title: 'Marks of Recommended Candidates (Reserve List)', url: 'https://upsc.gov.in/examinations/marks-recommended-candidates-reserve-list' },
          { title: 'UPSC Pratibha Setu', url: 'https://upsconline.gov.in/miscellaneous/pdoiac/' },
          { title: 'Specimen Question Cum Answer Booklets', url: 'https://upsc.gov.in/examination/model-question-and-answer-booklets' },
          { title: 'Common mistakes committed by the candidates in Conventional Papers', url: 'https://upsc.gov.in/examination/common-mistakes-committed-candidates-conventional-papers' },
          { title: 'Revised Syllabus and Scheme', url: 'https://upsc.gov.in/examinations/revised-syllabus-scheme' },
          { title: 'Representation on Question Papers', url: 'https://upsc.gov.in/examination/time-frame-representation' },
          { title: 'Demo Files', url: 'https://upsc.gov.in/examinations/demo-files-computer-based-combined-medical-service-examination' }
        ]
      }
    ]
  },
  {
    id: 'ssc',
    name: 'SSC',
    category: 'SSC',
    logo: '/SCC.png',
    description: 'Staff Selection Commission portal for CGL, CHSL, MTS, and other national recruitment announcements and results.',
    officialWebsite: 'https://ssc.gov.in',
    resources: [
      {
        title: 'CANDIDATE CORNER',
        items: [
          { 
            title: 'Browse by Examinations', 
            isSubmenu: true,
            children: [
              { title: 'Selection Posts Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/xsd91hjkshdk92xk' },
              { title: 'Combined Graduate Level Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/59g9y0svo3zgwiu' },
              { title: 'Stenographer Grade \'C\' and \'D\' Examination, 2024', url: 'https://ssc.gov.in/for-candidates/cgl-exam/g21irqg6pmtxbag' },
              { title: 'Junior Engineer (Civil, Mechanical & Electrical) Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/s40d16nackd16h0' },
              { title: 'Combined Higher Secondary Level (10+2) Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/q7sw4cqpvyitarc' },
              { title: 'Constable (GD) in CAPFs, SSF, Rifleman (GD) in Assam Rifles and Sepoy in NCB', url: 'https://ssc.gov.in/for-candidates/cgl-exam/nri55c0igl5cs45' },
              { title: 'Combined Hindi Translators Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/f2tt2k1tpp3qpb5' },
              { title: 'Sub-Inspector in Delhi Police and CAPFs Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/yafd7c3qloz8ixl' },
              { title: 'Others', url: 'https://ssc.gov.in/for-candidates/cgl-exam/yafd7c3qloz8ixl' },
              { title: 'Departmental Examination', url: 'https://ssc.gov.in/for-candidates/browse-by-examinations/departmental' }
            ]
          },
          { title: "SSC's Scribe Procedure", url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Scribe%20Procedure%20Notice251024.pdf' },
          { title: 'Script Evaluation', url: 'https://ssc.gov.in/for-candidates/script-evaluation' },
          { title: 'Examination Calendar', url: 'https://ssc.gov.in/for-candidates/examination-calendar' },
          { title: 'Scheme of Examination', url: 'https://ssc.gov.in/for-candidates/scheme-of-examination' },
          { title: 'Syllabus', url: 'https://ssc.gov.in/for-candidates/syllabus' },
          { title: 'Special Instruction', url: 'https://ssc.gov.in/for-candidates/special-instruction' },
          { title: 'Previous Year Question Paper', url: 'https://ssc.gov.in/for-candidates/previous-year-question-paper' },
          { title: 'Format of Certificates', url: 'https://ssc.gov.in/for-candidates/form-of-certificates' },
          { title: 'Tentative Vacancy', url: 'https://ssc.gov.in/for-candidates/tentative-vacancy' },
          { title: 'Normalization Method', url: 'https://ssc.gov.in/for-candidates/normalization-method' },
          { title: 'Mock Test', url: 'https://ssccbt.com/sscmocktest/mocktest.aspx' }
        ]
      }
    ]
  },
  {
    id: 'banking',
    name: 'Banking & Finance',
    category: 'BANKING',
    logo: '/book/Banking & Finance.png',
    description: 'Institute of Banking Personnel Selection and SBI career gateways for PO, Clerk, and Specialist Officer positions.',
    officialWebsite: 'https://www.ibps.in',
    resources: [
      {
        title: 'BANKING RESOURCES',
        items: [
          { title: 'All Articles', url: 'https://www.mahendras.org/blogs' },
          { title: 'Cut Off Analysis', url: 'https://www.mahendras.org/blogs/category/cut-off' },
          { title: 'Exam Analysis', url: 'https://www.mahendras.org/blogs/category/exam-analysis' },
          { title: 'FAQ', url: 'https://www.mahendras.org/blogs/category/faq' },
          { title: 'Latest Vacancies', url: 'https://www.mahendras.org/blogs/category/latest-vacancies' },
          { title: 'News', url: 'https://www.mahendras.org/blogs/category/news' },
          { 
            title: 'Previous Year Papers', 
            isSubmenu: true,
            children: [
              { title: 'IBPS Clerk Mains Previous Paper', url: 'https://www.mahendras.org/blogs/category/ibps-clerk-mains-previous-paper-2025-26' },
              { title: 'IBPS Clerk Prelims Previous Paper', url: 'https://www.mahendras.org/blogs/category/ibps-clerk-prelims-previous-paper-2025-26' },
              { title: 'IBPS PO Mains Previous Paper', url: 'https://www.mahendras.org/blogs/category/ibps-po-mains-previous-paper-2025-26' },
              { title: 'IBPS PO Prelims Previous Paper', url: 'https://www.mahendras.org/blogs/category/ibps-po-previous-paper-2025-26' }
            ]
          },
          { title: 'Results', url: 'https://www.mahendras.org/blogs/category/results' },
          { title: 'Syllabus', url: 'https://tamilnaducareerservices.tn.gov.in/asset/docs/syllabus/ibps.pdf' }
        ]
      }
    ]
  },
  {
    id: 'railway',
    name: 'Railway (RRB)',
    category: 'RAILWAY',
    logo: '/book/Railway (RRB).jpg',
    description: 'Railway Recruitment Board official portal for NTPC, Group D, ALP, and Technical Grade examinations.',
    officialWebsite: 'https://rrbsecunderabad.gov.in',
    resources: [
      {
        title: 'RAILWAY PORTALS',
        items: [
          { title: 'Centralized Employment Notification', url: 'https://rrbsecunderabad.gov.in/employment-notice/' },
          { title: 'Notices', url: 'https://rrbsecunderabad.gov.in/notices/' },
          { 
            title: 'Results', 
            isSubmenu: true,
            children: [
              { title: 'Schedule of Document Verification', url: 'https://rrbsecunderabad.gov.in/result_category/schedule_of_document_verification/' },
              { title: 'Results of Computer Based Tests', url: 'https://rrbsecunderabad.gov.in/result_category/results-of-computer-based-tests/' },
              { title: 'Final Results', url: 'https://rrbsecunderabad.gov.in/result_category/final_results/' }
            ]
          },
          { title: 'Other RRB’s', url: 'https://rrbsecunderabad.gov.in/other-rrb/' },
          { title: 'Right To Information', url: 'https://rrbsecunderabad.gov.in/right-to-information/' },
          { title: 'Downloads', url: 'https://rrbsecunderabad.gov.in/download/' },
          { 
            title: 'Archives', 
            isSubmenu: true,
            children: [
              { title: 'Archived Employment Notices', url: 'https://rrbsecunderabad.gov.in/archive_type/employment-notices/' },
              { title: 'Question Papers', url: 'https://rrbsecunderabad.gov.in/archive_type/question-papers/' },
              { title: 'Exam Syllabus', url: 'https://rrbsecunderabad.gov.in/archive_type/exam-syllabus/' },
              { title: 'Results', url: 'https://rrbsecunderabad.gov.in/archive_type/results/' },
              { title: 'Others', url: 'https://rrbsecunderabad.gov.in/archive_type/others/' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'defence',
    name: 'Defence Services',
    category: 'DEFENCE',
    logo: '/book/Defense.png',
    description: 'Official gateways for Indian Army, Navy, and Air Force officer entry through NDA, CDS, and AFCAT.',
    officialWebsite: 'https://upsc.gov.in',
    resources: [
      {
        title: 'DEFENCE RESOURCES',
        items: [
          { title: 'Join Indian Air Force', url: 'https://indianairforce.nic.in/' },
          { title: 'Join Indian Army', url: 'https://indianarmy.nic.in/' },
          { title: 'Join Indian Navy', url: 'https://indiannavy.nic.in/' }
        ]
      }
    ]
  },
  {
    id: 'teaching',
    name: 'Teaching & Education',
    category: 'TEACHING',
    logo: '/tewntysix.jpg',
    description: 'Central Teacher Eligibility Test and recruitment portals for KVS, NVS, and state education departments.',
    officialWebsite: 'https://ctet.nic.in',
    resources: [
      {
        title: 'TEACHING GATEWAYS',
        items: [
          { title: 'CTET Official Portal', url: 'https://ctet.nic.in' },
          { title: 'KVS Recruitment', url: 'https://kvsangathan.nic.in/employment' },
          { title: 'UGC NET', url: 'https://ugcnet.nta.nic.in' },
          { title: 'NVS Careers', url: 'https://navodaya.gov.in/nvs/en/Recruitment' }
        ]
      }
    ]
  },
  {
    id: 'police_bharti',
    name: 'Police Bharti',
    category: 'POLICE',
    logo: '/Ashok stambh.png',
    description: 'Maharashtra Police Recruitment portal for Constable, Driver, and SRPF positions. Official gateways for physical tests, written exams, and results.',
    officialWebsite: 'https://www.mahapolice.gov.in',
    resources: [
      {
        title: 'POLICE BHARTI RESOURCES',
        items: [
          { title: 'Maharashtra Police Official Website', url: 'https://www.mahapolice.gov.in' },
          { title: 'Police Bharti / Recruitment Official Page', url: 'https://www.mahapolice.gov.in/recruitment/' },
          { title: 'Balbharati Official Books (Free)', url: 'https://ebalbharati.in/main/public/' },
          { title: 'NCERT Official Books (Free PDF)', url: 'https://ncert.nic.in/textbook.php' },
          { title: 'Maharashtra State Board Books', url: 'https://ebalbharati.in/main/public/' },
          { title: 'Current Affairs (Government Source)', url: 'https://pib.gov.in' },
          { title: 'Employment / Government Jobs Portal', url: 'https://www.ncs.gov.in' }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance Exams',
    category: 'INSURANCE',
    logo: '/wentyseven.png',
    description: 'Official recruitment portals for LIC, GIC, NIACL, and other public sector insurance companies.',
    officialWebsite: 'https://licindia.in',
    resources: [
      {
        title: 'INSURANCE GATEWAYS',
        items: [
          { title: 'LIC India Careers', url: 'https://licindia.in/Bottom-Links/Careers' },
          { title: 'GIC Re Recruitment', url: 'https://www.gicofindia.com/en/career' },
          { title: 'NIACL Careers', url: 'https://www.newindia.co.in/portal/readMore/Recruitment' },
          { title: 'IRDAI Official', url: 'https://www.irdai.gov.in' },
          { title: 'Syllabus', url: 'https://licindia.in/documents/d/guest/syllabus-for-main-examination' },
          { title: 'Investor Relations', url: 'https://licindia.in/web/guest/investor-relations' },
          { title: 'LIC Official Home', url: 'https://licindia.in/en/web/guest/home' }
        ]
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Nursing',
    category: 'MEDICAL',
    logo: '/Enhance.jpg',
    description: 'National and state level medical entrance and recruitment portals including NEET, AIIMS, and ESIC.',
    officialWebsite: 'https://exams.nta.ac.in/NEET/',
    resources: [
      {
        title: 'MEDICAL RESOURCES',
        items: [
          { title: 'NTA NEET Official', url: 'https://exams.nta.ac.in/NEET/' },
          { title: 'AIIMS Exams Portal', url: 'https://www.aiimsexams.ac.in' },
          { title: 'ESIC Recruitment', url: 'https://www.esic.nic.in/recruitments' },
          { title: 'National Medical Commission', url: 'https://www.nmc.org.in' }
        ]
      }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & PSU',
    category: 'ENGINEERING',
    logo: '/seventeen.jpeg',
    description: 'Gateways for GATE, IES, and technical recruitment in PSUs like ONGC, BHEL, and NTPC.',
    officialWebsite: 'https://gate2024.iisc.ac.in',
    resources: [
      {
        title: 'ENGINEERING GATEWAYS',
        items: [
          { title: 'GATE Official (IISc/IIT)', url: 'https://gate.iitkgp.ac.in' },
          { title: 'UPSC ESE (Engineering Services)', url: 'https://upsc.gov.in/examinations/Engineering-Services-Examination' },
          { title: 'ONGC Careers', url: 'https://www.ongcindia.com/wps/wcm/connect/en/career/' },
          { title: 'BHEL Recruitment', url: 'https://careers.bhel.in' }
        ]
      }
    ]
  },
  {
    id: 'law',
    name: 'Law & Judiciary',
    category: 'LAW',
    logo: '/fourteeen.jpeg',
    description: 'Official portals for CLAT, AILET, and Judicial Services recruitment at state and national levels.',
    officialWebsite: 'https://consortiumofnlus.ac.in',
    resources: [
      {
        title: 'LEGAL RESOURCES',
        items: [
          { title: 'CLAT Official Portal', url: 'https://consortiumofnlus.ac.in' },
          { title: 'Supreme Court Recruitment', url: 'https://main.sci.gov.in/recruitment' },
          { title: 'High Court of Bombay', url: 'https://bombayhighcourt.nic.in/recruitment.php' },
          { title: 'Bar Council of India', url: 'http://www.barcouncilofindia.org' }
        ]
      }
    ]
  },
  {
    id: 'mbacet',
    name: 'MBA CET',
    category: 'MANAGEMENT',
    logo: '/CET.png',
    description: 'State Common Entrance Test Cell, Maharashtra official portal for MBA/MMS CET notifications, syllabus, hall tickets, and CAP counseling rounds.',
    officialWebsite: 'https://cetcell.mahacet.org/',
    resources: [
      {
        title: 'CET CELL RESOURCES',
        items: [
          { title: 'Notices', url: 'https://cetcell.mahacet.org/notices/' },
          { title: 'Time-Table', url: 'https://cetcell.mahacet.org/time-table/' },
          { title: 'Government Resolutions', url: 'https://cetcell.mahacet.org/government-resolutions/' },
          { 
            title: 'Information Brochure', 
            isSubmenu: true,
            children: [
              { title: 'CET Information Brochure', url: 'https://cetcell.mahacet.org/cet-3/' },
              { title: 'CAP Information Brochure', url: 'https://cetcell.mahacet.org/cap-2/' }
            ]
          },
          { title: 'Syllabus and Marking Scheme', url: 'https://cetcell.mahacet.org/syllabus-and-marking-scheme/' },
          { title: 'Tenders/Quotations', url: 'https://cetcell.mahacet.org/tenders/' },
          { 
            title: 'Institute', 
            isSubmenu: true,
            children: [
              { title: 'Admission Portal A.Y.2025-26', url: 'https://cetcell.mahacet.org/cap-_2025-26/' },
              { title: 'Helpdesk', url: 'https://cetcell.mahacet.org/helpline/' }
            ]
          }
        ]
      }
    ]
  }
];
