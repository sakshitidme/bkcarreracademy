import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Users, MessageSquare, Shield, LogOut, 
  Settings, Layout, Database, Activity, 
  Plus, Edit, Trash2, Check, AlertCircle, Globe,
  FileText, Image as ImageIcon, Search, Filter, Ticket, Book, Download, GraduationCap, Eye, EyeOff
} from 'lucide-react';

interface AdminPortalProps {
  onBack: () => void;
  onUpdate?: () => void;
}

export default function AdminPortal({ onBack, onUpdate }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('bk_admin_token'));
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'registrations' | 'tickets' | 'content' | 'logs' | 'courses' | 'admissions' | 'downloads' | 'exams' | 'hero' | 'counseling'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [contentList, setContentList] = useState<any[]>([]);
  const [logsList, setLogsList] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [examsList, setExamsList] = useState<any[]>([]);
  const [counselingLeads, setCounselingLeads] = useState<any[]>([]);
  const [courseForm, setCourseForm] = useState({ 
    title: '', 
    category: 'UPSC', 
    subCategory: '', 
    instructor: '', 
    isFeatured: true, 
    image: null as File | null,
    examDate: '',
    dynamicSections: [{ title: '', content: '' }]
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newTicketAlert, setNewTicketAlert] = useState<any>(null);
  const [newCounselingAlert, setNewCounselingAlert] = useState<any>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [selectedAdmissionIds, setSelectedAdmissionIds] = useState<string[]>([]);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [selectedEnquiryIds, setSelectedEnquiryIds] = useState<string[]>([]);
  const [heroForm, setHeroForm] = useState({
    title: 'Banking',
    buttonUrl: 'https://www.youtube.com/@bkcareeracademy2025',
    media: [
      { mediaType: 'youtube' as const, src: 'Jof92fozWuk', title: 'Success Story 1', poster: '' },
      { mediaType: 'youtube' as const, src: 'z18YX4x1Lw8', title: 'Success Story 2', poster: '' },
      { mediaType: 'youtube' as const, src: 'wn7i39rNblw', title: 'Success Story 3', poster: '' }
    ]
  });

  const [popupsList, setPopupsList] = useState<any[]>([]);
  const [popupForm, setPopupForm] = useState({
    title: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'youtube',
    image: null as File | null,
    notice: '',
    link: '',
    isActive: true,
    order: 0
  });





  // Auth Effect
  useEffect(() => {
    // DIAGNOSTIC CONNECTION TEST
    const testConn = async () => {
      try {
        const r = await fetch('/api/ping');
        const d = await r.json();
        console.log("API CONNECTION TEST:", d.message);
      } catch (e) {
        console.error("API CONNECTION FAILED:", e);
      }
    };
    testConn();

    if (token) {
      // Decode or verify token
      setIsAuthenticated(true);
      setAdminUser({ username: 'Admin' });
      fetchRegistrations();
      fetchTickets();
      fetchDashboard();
      fetchAdmissions();
      fetchDownloads();
      fetchEnquiries();
      fetchCourses();
      fetchExams();
      fetchHero();
      fetchPopups();
      fetchCounselingLeads();
      const poll = setInterval(() => {
        fetchTickets();
        fetchRegistrations();
        fetchAdmissions();
        fetchDownloads();
        fetchEnquiries();
        fetchCounselingLeads();
      }, 10000); // Polling every 10 seconds for real-time feel
      
      // Clean up poll on unmount
      return () => clearInterval(poll);
    }
  }, [token]);

  const handleAuthError = (status: number) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('bk_admin_token');
      setToken(null);
      setIsAuthenticated(false);
      alert('Session Expired or Invalid. Please login again.');
      return true;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (data.success) {
        localStorage.setItem('bk_admin_token', data.token);
        setToken(data.token);
        setAdminUser(data.admin);
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Verification Failed');
      }
    } catch (err) {
      setError('System connection failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bk_admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const fetchDashboard = async () => {
    try {
      const resp = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch stats');
      }
      const data = await resp.json();
      if (data.success) setStats(data.stats || {});
    } catch (err) { 
      console.error('Dashboard Fetch Error:', err); 
    }
  };

  const fetchTickets = async () => {
    if (!token) return;
    try {
      const resp = await fetch('/api/admin/tickets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch tickets');
      }
      const data = await resp.json();
      if (data.success) {
        const ticketsData = data.tickets || [];
        setTickets(ticketsData);
        // ONLY alert for tickets that are both UNREAD and PENDING
        const newTicket = ticketsData.find((t: any) => t.isUnread && (t.status === 'pending' || !t.status));
        if (newTicket && !newTicketAlert) {
          setNewTicketAlert(newTicket);
          setTimeout(() => setNewTicketAlert(null), 10000);
        }
      }
    } catch (err) { 
      console.error('Tickets Fetch Error:', err); 
    } finally {
      setSelectedTicketIds([]);
    }
  };

  const handleBulkDeleteTickets = async () => {
    if (!window.confirm(`Delete ${selectedTicketIds.length} selected tickets permanently?`)) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/tickets/bulk-delete', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ids: selectedTicketIds })
      });
      if (resp.ok) {
        setSelectedTicketIds([]);
        fetchTickets();
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };


  const markTicketsSeen = async () => {
    try {
      await fetch('/api/admin/tickets/seen', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNewTicketAlert(null);
      fetchTickets();
    } catch (err) { console.error(err); }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/registrations', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch registrations');
      }
      const data = await resp.json();
      if (data.success) setRegistrations(data.registrations || []);
    } catch (err) { 
      console.error('Registrations Fetch Error:', err); 
    } finally { 
      setLoading(false); 
      setSelectedLeadIds([]);
    }
  };

  const handleBulkDeleteLeads = async () => {
    if (!window.confirm(`Delete ${selectedLeadIds.length} selected leads permanently?`)) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/registrations/bulk-delete', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ids: selectedLeadIds })
      });
      if (resp.ok) {
        setSelectedLeadIds([]);
        fetchRegistrations();
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  
  const fetchAdmissions = async () => {
    try {
      const resp = await fetch('/api/admin/admissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch admissions');
      }
      const data = await resp.json();
      if (data.success) setAdmissions(data.admissions || []);
    } catch (err) { 
      console.error('Admissions Fetch Error:', err); 
    } finally {
      setSelectedAdmissionIds([]);
    }
  };

  const handleBulkDeleteAdmissions = async () => {
    if (!window.confirm(`Delete ${selectedAdmissionIds.length} selected admissions permanently?`)) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/admissions/bulk-delete', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ids: selectedAdmissionIds })
      });
      if (resp.ok) {
        setSelectedAdmissionIds([]);
        fetchAdmissions();
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };


  const fetchDownloads = async () => {
    try {
      const resp = await fetch('/api/admin/downloads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch downloads');
      }
      const data = await resp.json();
      if (data.success) setDownloads(data.downloads || []);
    } catch (err) { 
      console.error('Downloads Fetch Error:', err); 
    }
  };

  const fetchEnquiries = async () => {
    if (!token) return;
    try {
      const resp = await fetch('/api/admin/enquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch enquiries');
      }
      const data = await resp.json();
      if (data.success) setEnquiries(data.enquiries || []);
    } catch (err) { 
      console.error('Enquiries Fetch Error:', err); 
    } finally {
      setSelectedEnquiryIds([]);
    }
  };

  const fetchCounselingLeads = async () => {
    if (!token) return;
    try {
      const resp = await fetch('/api/admin/counseling', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!resp.ok) {
        if (handleAuthError(resp.status)) return;
        throw new Error('Failed to fetch counseling leads');
      }
      const data = await resp.json();
      if (data.success) {
        const leads = data.leads || [];
        setCounselingLeads(leads);
        const newLead = leads.find((l: any) => l.isUnread);
        if (newLead && !newCounselingAlert) {
          setNewCounselingAlert(newLead);
          setTimeout(() => setNewCounselingAlert(null), 10000);
        }
      }
    } catch (err) { 
      console.error('Counseling Fetch Error:', err); 
    }
  };

  const handleBulkDeleteEnquiries = async () => {
    if (!window.confirm(`Delete ${selectedEnquiryIds.length} selected enquiries permanently?`)) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/admin/enquiries/bulk-delete', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ids: selectedEnquiryIds })
      });
      if (resp.ok) {
        setSelectedEnquiryIds([]);
        fetchEnquiries();
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };


  const fetchCourses = async () => {
    try {
      const [coursesResp, upscResp] = await Promise.all([
        fetch('/api/content/courses'),
        fetch('/api/content/upsc_hub')
      ]);
      const [coursesData, upscData] = await Promise.all([
        coursesResp.json(),
        upscResp.json()
      ]);
      
      const combined = [...(coursesData.items || []), ...(upscData.items || [])];
      setCoursesList(combined);
    } catch (err) { console.error('Fetch Courses Error:', err); }
  };

  const fetchExams = async () => {
    try {
      const resp = await fetch('/api/content/exams');
      const data = await resp.json();
      if (data.success) setExamsList(data.items || []);
    } catch (err) { console.error('Fetch Exams Error:', err); }
  };

  const resetCourseForm = () => {
    setCourseForm({ 
      title: '', category: 'UPSC', subCategory: '', instructor: '', isFeatured: true, image: null, examDate: '',
      dynamicSections: [{ title: '', content: '' }]
    });
  };


  const [examForm, setExamForm] = useState({
    category: 'UPSC (IAS, IPS, IFS)',
    fullDetails: '',
    examDate: '',
    image: null as File | null
  });

  const resetExamForm = () => {
    setExamForm({ category: 'UPSC (IAS, IPS, IFS)', fullDetails: '', examDate: '', image: null });
  };

  const handleAddExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', examForm.category);
      formData.append('category', examForm.category);
      // Use category as subCategory so it matches exactly what user clicked in frontend list
      formData.append('subCategory', examForm.category); 
      formData.append('instructor', 'Expert Faculty'); // Default
      formData.append('isFeatured', 'true');
      formData.append('dynamicSections', JSON.stringify([{ title: 'Complete Syllabus & Strategy', content: examForm.fullDetails }]));
      if (examForm.examDate) {
        formData.append('examDate', examForm.examDate);
      }
      
      if (examForm.image) {
        formData.append('image', examForm.image);
      }

      const resp = await fetch('/api/content/exams', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await resp.json();
      if (data.success) {
        resetExamForm();
        fetchExams();
        alert("DATA ADDED TO PORTAL! New layer created. Previous data is preserved.");
      } else {
        alert("Failed to add exam: " + data.message);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', courseForm.title);
      formData.append('category', courseForm.category);
      formData.append('subCategory', courseForm.subCategory);
      formData.append('instructor', courseForm.instructor);
      formData.append('isFeatured', String(courseForm.isFeatured));
      formData.append('dynamicSections', JSON.stringify(courseForm.dynamicSections));
      if (courseForm.examDate) {
        formData.append('examDate', courseForm.examDate);
      }
      
      if (courseForm.image) {
        formData.append('image', courseForm.image);
      }

      // Determine correct endpoint based on category
      let endpoint = courseForm.category === 'UPSC' ? '/api/content/upsc_hub' : '/api/content/courses';
      if (activeTab === 'exams') endpoint = '/api/content/exams';

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await resp.json();
      if (data.success) {
        resetCourseForm();
        if (activeTab === 'exams') fetchExams();
        else fetchCourses();
        alert("DATA ADDED TO PORTAL! New layer created. Previous data is preserved.");
      } else {
        alert("Failed to add course: " + data.message);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error adding course: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };


  const fetchHero = async () => {
    try {
      const resp = await fetch('/api/content/hero');
      const data = await resp.json();
      if (data.success && data.items.length > 0) {
        const hero = data.items[0];
        setHeroForm({
          title: hero.title || 'Banking',
          buttonUrl: hero.buttonUrl || 'https://www.youtube.com/@bkcareeracademy2025',
          media: hero.media && hero.media.length > 0 ? hero.media : [
            { mediaType: 'youtube', src: 'Jof92fozWuk', title: 'Success Story 1', poster: '' },
            { mediaType: 'youtube', src: 'z18YX4x1Lw8', title: 'Success Story 2', poster: '' },
            { mediaType: 'youtube', src: 'wn7i39rNblw', title: 'Success Story 3', poster: '' }
          ]
        });
      }
    } catch (err) { console.error('Failed to fetch hero content'); }
  };

  const fetchPopups = async () => {
    try {
      const resp = await fetch('/api/popups', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await resp.json();
      if (data.success) {
        setPopupsList(data.data || []);
      }
    } catch (err) { console.error('Failed to fetch popups'); }
  };

  const handleUpdateHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch('/api/content/hero', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...heroForm,
          isFeatured: true
        })
      });
      const data = await resp.json();
      if (data.success) {
        alert("Hero section updated successfully!");
        fetchHero();
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) { alert("System error"); }
    finally { setLoading(false); }
  };

  const addSection = () => {
    setCourseForm({
      ...courseForm,
      dynamicSections: [...courseForm.dynamicSections, { title: '', content: '' }]
    });
  };

  const removeSection = (index: number) => {
    const newSections = courseForm.dynamicSections.filter((_, i) => i !== index);
    setCourseForm({ ...courseForm, dynamicSections: newSections });
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const newSections = [...courseForm.dynamicSections];
    newSections[index][field] = value;
    setCourseForm({ ...courseForm, dynamicSections: newSections });
  };
  
  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this entry?")) return;
    try {
      const resp = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await resp.json();
      if (data.success) {
        fetchCourses();
        fetchExams();
      } else {
        alert("Failed to delete: " + data.message);
      }
    } catch (err) { console.error(err); }
  };


  const toggleTicketStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
      const resp = await fetch(`/api/admin/tickets/${id}/status`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus, isUnread: false }) // Also mark as seen
      });
      if (resp.ok) fetchTickets();
    } catch (err) { console.error('Failed to update ticket status'); }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    ).join('\n');
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printAdmissionRecord = async (a: any) => {
    // Helper to get Base64 for images in PDF
    const getBase64FromUrl = async (url: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (e) { return null; }
    };

    const photoBase64 = a.photoUrl ? await getBase64FromUrl(a.photoUrl) : null;
    const sigBase64 = a.signatureUrl ? await getBase64FromUrl(a.signatureUrl) : null;
    
    let logoBase64 = '';
    try {
      const response = await fetch('/bk.png');
      const blob = await response.blob();
      logoBase64 = await getBase64FromUrl(URL.createObjectURL(blob));
    } catch (e) {}

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    let courses = [];
    try { 
      courses = typeof a.courses === 'string' && a.courses.startsWith('[') ? JSON.parse(a.courses) : (Array.isArray(a.courses) ? a.courses : [a.courses]); 
    } catch(e) { courses = [a.courses]; }

    printWindow.document.write(`
      <html>
        <head>
          <title>Admission - ${a.firstNameLocal || a.firstName} ${a.surnameLocal || a.surname}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
            @page { margin: 0; size: A4 portrait; }
            @media print {
              html, body { height: auto !important; overflow: visible !important; background: white !important; }
            }
          </style>
        </head>
        <body class="p-8 max-w-4xl mx-auto">
          <!-- Institutional Header -->
          <div class="grid grid-cols-3 items-start gap-4 border-b-2 border-[#800000]/10 pb-4 mb-6 relative">
            <!-- Left: Branding -->
            <div class="flex flex-col items-start space-y-2">
              <h1 class="text-xl font-black text-[#800000] leading-tight uppercase tracking-tight"><span class="text-red-600">BK</span> Educational & Welfare Society</h1>
              <p class="text-xs font-black text-gray-500 uppercase tracking-widest"><span class="text-red-600">BK</span> Group of Education</p>
              <div class="flex items-center gap-1 text-[#800000] font-black mt-2">
                <span class="text-sm tracking-widest">+91 80801 95558</span>
              </div>
            </div>

            <!-- Center: Logo & Tagline -->
            <div class="flex flex-col items-center text-center">
              <p class="text-sm italic text-gray-800 mb-2">॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥</p>
              <p class="text-base font-black text-[#800000] uppercase tracking-widest mb-2">We Shape Careers...</p>
              ${logoBase64 ? `<img src="${logoBase64}" class="w-28 h-28 object-contain shadow-lg rounded-xl border border-gray-100 p-2" />` : ''}
            </div>

            <!-- Right: Reg No & Address (no label) -->
            <div class="flex flex-col items-end text-right gap-3">
              <div class="bg-[#800000]/5 border border-[#800000]/20 px-3 py-1.5 rounded-lg text-center">
                <p class="text-[8px] font-black text-[#800000] uppercase tracking-tighter leading-none mb-0.5">Registration No</p>
                <p class="text-sm font-black text-[#800000] leading-none">${a.registrationNo && a.registrationNo.startsWith('BK') ? `<span class="text-red-600">BK</span>${a.registrationNo.substring(2)}` : (a.registrationNo || '---')}</p>
              </div>
              <div class="max-w-[200px]">
                <p class="text-sm font-black text-gray-900 uppercase tracking-tight leading-tight text-right">
                  2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra
                </p>
              </div>
            </div>
          </div>

          <!-- Application Status & Photo -->
          <div class="flex justify-between items-start mb-10">
            <div>
              <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 class="text-2xl font-black uppercase text-gray-900 mb-1 tracking-wider">Application Record</h2>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Record Fetched from Admin Portal</p>
            </div>
            ${photoBase64 ? `
              <div class="w-28 h-32 bg-gray-50 rounded-xl border-2 border-[#800000]/10 overflow-hidden shadow-lg">
                <img src="${photoBase64}" class="w-full h-full object-cover"/>
              </div>
            ` : '<div class="w-28 h-32 border-2 border-gray-200 border-dashed rounded-xl flex items-center justify-center text-[8px] text-gray-400 font-bold">PHOTO</div>'}
          </div>

          <!-- Data Grid -->
          <div class="grid grid-cols-2 gap-12 mb-10">
            <!-- Candidate Info -->
            <div class="space-y-4">
              <h4 class="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-200 pb-2">Candidate Information</h4>
              <div class="space-y-3">
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Full Name</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.salutation || ''} ${a.firstNameLocal || a.firstName} ${a.middleNameLocal || a.middleName || ''} ${a.surnameLocal || a.surname}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Date of Birth</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.dob} (${a.age} Years)</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Gender</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.gender || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">School/College</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.schoolName || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Phone</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.mobileSelf}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Parent's Phone</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.fatherMobile || a.mobileParents || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Email</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.email || '---'}</p></div>
              </div>
            </div>
            
            <!-- Academic Selection -->
            <div class="space-y-4">
              <h4 class="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-200 pb-2">Academic Selection</h4>
              <div class="space-y-3">
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Target Exam</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.examCategory || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Specific Course</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${courses.join(', ') || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Learning Mode</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.learningMode || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Category</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.category || '---'}</p></div>
                <div><p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Place</p><p class="font-bold text-gray-900 uppercase tracking-tight text-sm">${a.place || '---'}</p></div>
              </div>
            </div>
          </div>

          <!-- Declaration & Signature -->
          <div class="bg-gray-50 p-6 rounded-[30px]">
            <p class="text-[10px] font-bold text-gray-500 leading-relaxed italic text-center mb-6">
              "I hereby declare that all information provided is true to the best of my knowledge. I agree to abide by the rules and regulations of BK Career Academy."
            </p>
            <div class="flex justify-between items-end border-t border-gray-200 pt-4">
              <div>
                <p class="text-[10px] font-black uppercase text-gray-900 tracking-tighter">Submission Date</p>
                <p class="text-xs font-bold text-gray-500">${new Date(a.createdAt || new Date()).toLocaleDateString()}</p>
              </div>
              <div class="text-center flex flex-col items-center">
                ${sigBase64 ? `<img src="${sigBase64}" class="h-10 object-contain mb-1" />` : '<div class="h-10 mb-1"></div>'}
                <div class="w-32 h-0.5 bg-gray-300 mb-2"></div>
                <p class="text-[9px] font-black uppercase tracking-widest text-gray-900">Candidate Signature</p>
              </div>
            </div>
          </div>
          
          <script>
            window.onload = () => {
              // Wait for Tailwind to process
              setTimeout(() => {
                window.print();
              }, 2000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4 sm:px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[95vw] sm:max-w-md bg-white p-6 sm:p-10 border-4 border-brand">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-black text-ink uppercase">System Admin</h2>
            <p className="text-[10px] font-mono uppercase text-muted mt-2">Secure Gateway 2026</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border-2 border-ink p-4 font-mono text-sm uppercase" placeholder="Access ID" />
            <div className="relative">
              <input 
                required 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full border-2 border-ink p-4 font-mono text-sm" 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-brand transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <div className="text-red-600 text-[10px] font-mono uppercase">{error}</div>}
            <button disabled={loading} className="w-full bg-ink text-brand font-display font-bold py-5 uppercase hover:bg-brand hover:text-ink transition-all">
              {loading ? 'Authenticating...' : 'Establish Connection →'}
            </button>
            <button type="button" onClick={onBack} className="w-full text-muted font-mono text-[10px] uppercase underline">Return to Surface</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <AnimatePresence>
        {newTicketAlert && (
          <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="fixed bottom-10 right-10 z-[200] w-80 bg-white border-4 border-brand p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand text-ink">
                <Ticket className="animate-bounce" size={24} />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-black uppercase text-brand mb-1">Incoming Ticket</div>
                <div className="text-sm font-bold uppercase">{newTicketAlert.name}</div>
                <div className="text-[11px] font-mono mt-1 line-clamp-2">{newTicketAlert.issue}</div>
                <button onClick={() => { setActiveTab('tickets'); markTicketsSeen(); }} className="mt-4 w-full bg-ink text-brand py-2 text-[10px] font-bold uppercase">View Details</button>
              </div>
              <button onClick={() => { markTicketsSeen(); setNewTicketAlert(null); }}><X size={18} /></button>
            </div>
          </motion.div>
        )}
        {newCounselingAlert && (
          <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="fixed bottom-32 right-10 z-[200] w-80 bg-white border-4 border-orange-500 p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500 text-white">
                <GraduationCap className="animate-bounce" size={24} />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-black uppercase text-orange-600 mb-1">New Counseling Request</div>
                <div className="text-sm font-bold uppercase">{newCounselingAlert.name}</div>
                <div className="text-[11px] font-mono mt-1">Goal: {newCounselingAlert.examCategory}</div>
                <button onClick={() => { setActiveTab('counseling'); setNewCounselingAlert(null); }} className="mt-4 w-full bg-ink text-brand py-2 text-[10px] font-bold uppercase">View Details</button>
              </div>
              <button onClick={() => setNewCounselingAlert(null)}><X size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="h-20 bg-white border-b-4 border-ink sticky top-0 z-[100] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-ink bg-brand shadow-[2px_2px_0_0_#1A1A1A]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Layout size={20} />}
          </button>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand border-4 border-ink flex items-center justify-center">
             <span className="font-display font-black text-lg md:text-xl text-red-600">BK</span>
          </div>
          <h1 className="text-sm md:text-xl font-display font-black uppercase tracking-tighter">Control Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-ink/60 hover:text-ink text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors mr-4"
          >
            ← View Website
          </button>
          <button onClick={handleLogout} className="bg-ink text-white px-4 md:px-6 py-2 md:py-3 font-display font-bold text-[10px] md:text-xs uppercase hover:bg-brand hover:text-ink transition-all">Logout</button>
        </div>
      </header>

      <div className="flex relative min-h-[calc(100vh-80px)]">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[105] md:hidden"
            />
          )}
        </AnimatePresence>

        <aside className={`fixed md:relative top-0 left-0 bottom-0 w-64 border-r-4 border-ink bg-white flex flex-col pt-8 z-[110] transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          {[
            { id: 'dashboard', icon: Database, label: 'Dashboard' },
            { id: 'registrations', icon: Users, label: 'Leads' },
            { id: 'admissions', icon: Download, label: 'Download Forms' },
            { id: 'tickets', icon: Ticket, label: 'Tickets' },
            { id: 'enquiries', icon: MessageSquare, label: 'Enquiries' },
            { id: 'counseling', icon: GraduationCap, label: 'Counseling' },
            { id: 'courses', icon: GraduationCap, label: 'Courses' },
            { id: 'exams', icon: Globe, label: 'Government Exams' },
            { id: 'hero', icon: Layout, label: 'Hero Section' },
            { id: 'popups', icon: ImageIcon, label: 'Popup Manager' }
          ].map(item => (
            <button key={item.id} onClick={() => { 
                setActiveTab(item.id as any); 
                setIsMobileMenuOpen(false);
                if (item.id === 'registrations') fetchRegistrations(); 
                if (item.id === 'admissions') fetchAdmissions();
                if (item.id === 'downloads') fetchDownloads();
                if (item.id === 'tickets') fetchTickets(); 
                if (item.id === 'enquiries') fetchEnquiries();
                if (item.id === 'courses') fetchCourses();
                if (item.id === 'exams') fetchExams();
                if (item.id === 'hero') fetchHero();
                if (item.id === 'popups') fetchPopups();
                if (item.id === 'counseling') fetchCounselingLeads();
            }} className={`flex items-center gap-4 p-6 border-b border-ink/5 ${activeTab === item.id ? 'bg-brand text-ink border-l-[12px] border-ink' : 'text-ink/40'}`}>
              <item.icon size={20} />
              <span className="font-display font-bold uppercase text-[10px] tracking-widest">{item.label}</span>
              {item.id === 'tickets' && tickets.some(t => t.isUnread) && <div className="ml-auto w-2 h-2 rounded-full bg-red-600 animate-ping" />}
              {item.id === 'counseling' && counselingLeads.some(l => l.isUnread) && <div className="ml-auto w-2 h-2 rounded-full bg-red-600 animate-ping" />}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
               <div className="flex items-center gap-4 mb-2">
                 <h2 className="text-3xl font-display font-black uppercase">Command Center</h2>
                 <div className="flex items-center gap-2 bg-green-100 px-3 py-1 border border-green-600/30">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-green-600 uppercase">System Live</span>
                 </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { id: 'registrations', label: 'Total Leads', value: (registrations || []).length || stats?.registrations || 0, icon: Users, color: 'bg-green-500' },
                    { id: 'admissions', label: 'Admissions', value: (admissions || []).length || stats?.admissions || 0, icon: GraduationCap, color: 'bg-indigo-500' },
                    { id: 'tickets', label: 'Pending Tickets', value: (tickets || []).filter((t: any) => t.status === 'pending').length, icon: Ticket, color: 'bg-red-500' },
                    { id: 'counseling', label: 'Counseling Leads', value: (counselingLeads || []).length || stats?.counseling || 0, icon: GraduationCap, color: 'bg-orange-500' }
                  ].map((stat, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setActiveTab(stat.id as any);
                        if (stat.id === 'registrations') fetchRegistrations();
                        if (stat.id === 'admissions') fetchAdmissions();
                        if (stat.id === 'downloads') fetchDownloads();
                        if (stat.id === 'tickets') fetchTickets();
                        if (stat.id === 'counseling') fetchCounselingLeads();
                      }}
                      className="text-left bg-white border-2 border-ink p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[8px_8px_0px_0px_#F7931A] hover:-translate-y-1 transition-all group"
                    >
                       <div className={`p-2 w-fit mb-4 ${stat.color} text-white group-hover:scale-110 transition-transform`}><stat.icon size={18} /></div>
                       <div className="text-3xl md:text-4xl font-display font-black leading-none">{stat.value}</div>
                       <div className="text-[10px] font-mono uppercase mt-2 text-ink/60">{stat.label}</div>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'tickets' && (
             <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <h2 className="text-3xl font-display font-black uppercase">Support Tickets</h2>
                   <div className="flex items-center gap-4">
                      {selectedTicketIds.length > 0 && (
                        <button 
                          onClick={handleBulkDeleteTickets}
                          className="bg-red-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-white hover:text-red-600 border-2 border-red-600"
                        >
                          Delete ({selectedTicketIds.length})
                        </button>
                      )}
                      <button onClick={markTicketsSeen} className="px-4 py-2 bg-ink text-brand text-[10px] font-bold uppercase">Mark All Seen</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                   {tickets.length === 0 ? <div className="p-8 text-center border-2 border-dashed border-ink/20 opacity-50 uppercase font-mono text-xs">No support tickets recorded yet</div> : tickets.map((t: any) => {
                      const student = registrations.find(r => r.phone === t.phone);
                      const isSelected = selectedTicketIds.includes(t._id);
                      return (
                        <div key={t._id} className={`bg-white border-4 p-6 transition-all relative ${isSelected ? 'border-brand bg-brand/5 shadow-[8px_8px_0_0_#000]' : t.isUnread ? 'border-brand shadow-[8px_8px_0px_0px_rgba(255,193,7,1)]' : 'border-ink shadow-[4px_4px_0px_1px_rgba(0,0,0,0.1)]'}`}>
                           {/* Checkbox */}
                           <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white border-4 border-ink p-1">
                             <input 
                               type="checkbox" 
                               checked={isSelected}
                               onChange={() => setSelectedTicketIds(prev => isSelected ? prev.filter(id => id !== t._id) : [...prev, t._id])}
                               className="w-5 h-5 accent-brand"
                             />
                           </div>
                           <div className="flex justify-between items-start mb-4">
                              <div className="space-y-1">
                                 <div className="flex items-center gap-3">
                                   <h4 className="text-lg font-black uppercase tracking-tight">{t.name}</h4>
                                   <a 
                                     href={`https://www.google.com/search?q=${encodeURIComponent(t.name + " student")}`} 
                                     target="_blank" 
                                     className="text-muted hover:text-brand transition-colors"
                                     title="Search student on internet"
                                   >
                                     <Globe size={14} />
                                   </a>
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <div className="text-[10px] font-mono text-muted">{t.phone}</div>
                                   <a 
                                     href={`https://wa.me/${t.phone.replace(/\D/g, '')}`} 
                                     target="_blank" 
                                     className="text-green-600 hover:scale-110 transition-transform"
                                     title="Message on WhatsApp"
                                   >
                                     <MessageSquare size={14} fill="currentColor" />
                                   </a>
                                 </div>
                                 <div className="text-[9px] font-mono text-ink/30 uppercase">{new Date(t.createdAt).toLocaleString()}</div>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                 {t.isUnread && (
                                    <motion.div 
                                      animate={{ scale: [1, 1.1, 1] }}
                                      transition={{ repeat: Infinity, duration: 1.5 }}
                                      className="bg-brand text-ink text-[9px] font-black px-2 py-1 border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]"
                                    >
                                      NEW
                                    </motion.div>
                                 )}
                                 <button 
                                   onClick={() => toggleTicketStatus(t._id, t.status || 'pending')}
                                   className={`px-3 py-1 text-[9px] font-bold uppercase border-2 transition-all ${
                                     (t.status || 'pending') === 'resolved' 
                                       ? 'bg-green-100 border-green-600 text-green-700' 
                                       : 'bg-red-50 border-red-600 text-red-700 hover:bg-red-600 hover:text-white'
                                   }`}
                                 >
                                   {(t.status || 'pending') === 'resolved' ? '✓ RESOLVED' : '! PENDING'}
                                 </button>
                              </div>
                           </div>
                           
                           <div className="bg-background p-4 border-2 border-ink/5 italic text-sm mb-4 leading-relaxed">"{t.issue}"</div>
                           
                           {student && (
                             <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-ink/[0.02] border-2 border-dashed border-ink/10 relative">
                                <div className="absolute -top-3 left-4 bg-ink text-brand text-[8px] font-black px-2 py-0.5 border border-brand">VERIFIED STUDENT DATA</div>
                                <div>
                                   <div className="text-[8px] font-mono uppercase text-muted">Course Goal</div>
                                   <div className="text-[10px] font-bold uppercase">{student.category} - {student.subCategory}</div>
                                </div>
                                <div>
                                   <div className="text-[8px] font-mono uppercase text-muted">Email</div>
                                   <div className="text-[10px] font-bold lowercase">{student.email}</div>
                                </div>
                                <div className="col-span-2">
                                   <div className="text-[8px] font-mono uppercase text-muted">Location</div>
                                   <div className="text-[10px] font-bold uppercase">{student.address}, {student.city}, {student.state} - {student.pincode}</div>
                                </div>
                             </div>
                           )}

                           <div className="flex gap-4">
                              <a href={`tel:${t.phone}`} className="flex-grow bg-ink text-white py-3 text-center text-[10px] font-black uppercase hover:bg-brand hover:text-ink transition-all">Call Student</a>
                              <a 
                                href={`https://wa.me/${t.phone.replace(/\D/g, '')}`} 
                                target="_blank"
                                className="px-8 border-2 border-ink text-[10px] font-black uppercase flex items-center justify-center hover:bg-green-50 transition-all"
                              >
                                WhatsApp
                              </a>
                           </div>
                        </div>
                      );
                   })}
                </div>
             </div>
          )}

          {activeTab === 'registrations' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-display font-black uppercase">Student Leads</h2>
                  <div className="flex items-center gap-4">
                    {selectedLeadIds.length > 0 && (
                      <button 
                        onClick={handleBulkDeleteLeads}
                        className="bg-red-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-white hover:text-red-600 border-2 border-red-600"
                      >
                        Delete ({selectedLeadIds.length})
                      </button>
                    )}
                    <button 
                      onClick={() => exportToCSV(registrations, 'BK_Student_Leads')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-green-700"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                </div>
                <div className="bg-white border-4 border-ink overflow-x-auto">
                   <table className="w-full text-left min-w-[600px]">
                      <thead className="bg-[#0F1115] text-brand uppercase font-mono text-[10px]">
                         <tr>
                           <th className="p-4 w-10">
                             <input 
                               type="checkbox" 
                               checked={selectedLeadIds.length === registrations.length && registrations.length > 0}
                               onChange={() => {
                                 if (selectedLeadIds.length === registrations.length) setSelectedLeadIds([]);
                                 else setSelectedLeadIds(registrations.map(r => r._id));
                               }}
                             />
                           </th>
                           <th className="p-4">Student</th><th className="p-4">Goal</th><th className="p-4">Contact</th><th className="p-4">Date</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/10 text-[11px] font-bold uppercase">
                         {registrations.map((r: any) => (
                            <tr key={r._id} className={`hover:bg-brand/5 ${selectedLeadIds.includes(r._id) ? 'bg-brand/10' : ''}`}>
                               <td className="p-4">
                                 <input 
                                   type="checkbox" 
                                   checked={selectedLeadIds.includes(r._id)}
                                   onChange={() => {
                                     setSelectedLeadIds(prev => prev.includes(r._id) ? prev.filter(id => id !== r._id) : [...prev, r._id]);
                                   }}
                                 />
                               </td>
                               <td className="p-4">{r.name}</td>
                               <td className="p-4 text-brand">{r.category}</td>
                               <td className="p-4">{r.phone}</td>
                               <td className="p-4 opacity-50">{new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                            </tr>
                         ))}

                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {activeTab === 'admissions' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Download <span className="text-brand">Student Forms</span></h2>
                  <div className="flex items-center gap-4">
                    {selectedAdmissionIds.length > 0 && (
                      <button 
                        onClick={handleBulkDeleteAdmissions}
                        className="bg-red-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-white hover:text-red-600 border-2 border-red-600"
                      >
                        Delete ({selectedAdmissionIds.length})
                      </button>
                    )}
                    <button 
                      onClick={() => exportToCSV(admissions, 'BK_Admissions')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-green-700"
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>
                </div>
                <div className="bg-white border-4 border-ink overflow-x-auto">
                   <table className="w-full text-left min-w-[700px]">
                      <thead className="bg-[#0F1115] text-brand uppercase font-mono text-[10px]">
                         <tr>
                           <th className="p-4 w-10">
                             <input 
                               type="checkbox" 
                               checked={selectedAdmissionIds.length === admissions.length && admissions.length > 0}
                               onChange={() => {
                                 if (selectedAdmissionIds.length === admissions.length) setSelectedAdmissionIds([]);
                                 else setSelectedAdmissionIds(admissions.map(a => a._id));
                               }}
                             />
                           </th>
                           <th className="p-4">Reg No</th><th className="p-4">Form No</th><th className="p-4">Applicant Name</th><th className="p-4">Courses</th><th className="p-4">Contact</th><th className="p-4">Date</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/10 text-[11px] font-bold uppercase">
                         {admissions.map((a: any) => (
                            <tr key={a._id} className={`hover:bg-brand/5 ${selectedAdmissionIds.includes(a._id) ? 'bg-brand/10' : ''}`}>
                               <td className="p-4">
                                 <input 
                                   type="checkbox" 
                                   checked={selectedAdmissionIds.includes(a._id)}
                                   onChange={() => {
                                     setSelectedAdmissionIds(prev => prev.includes(a._id) ? prev.filter(id => id !== a._id) : [...prev, a._id]);
                                   }}
                                 />
                               </td>
                               <td className="p-4 font-mono text-[10px] text-ink/60">
                                 {a.registrationNo && a.registrationNo.startsWith('BK') ? (
                                   <><span className="text-red-600">BK</span>{a.registrationNo.substring(2)}</>
                                 ) : (
                                   a.registrationNo || 'N/A'
                                 )}
                               </td>
                                <td className="p-4 font-mono text-[10px] text-ink/60">{a.formNo || 'N/A'}</td>
                                <td className="p-4">
                                 <div className="text-brand font-black">{a.firstNameLocal || a.firstName} {a.surnameLocal || a.surname}</div>
                                 <div className="text-[8px] text-muted font-mono uppercase">DOB: {a.dob} | Gender: {a.gender}</div>
                               </td>
                               <td className="p-4 text-brand">
                                 {(() => {
                                   try {
                                     if (!a.courses) return 'N/A';
                                     const parsed = typeof a.courses === 'string' && a.courses.startsWith('[') ? JSON.parse(a.courses) : a.courses;
                                     return Array.isArray(parsed) ? parsed.join(', ') : String(parsed);
                                   } catch (e) {
                                     return 'N/A';
                                   }
                                 })()}
                               </td>
                               <td className="p-4">
                                 <div>{a.mobileSelf}</div>
                                 <div className="text-[8px] lowercase opacity-60 font-mono">{a.email}</div>
                               </td>
                               <td className="p-4">
                                 <div className="flex gap-2">
                                   {a.photoUrl && <a href={`${a.photoUrl}`} target="_blank" className="bg-ink text-white px-2 py-1 text-[8px] hover:bg-brand hover:text-ink">Photo</a>}
                                   {a.signatureUrl && <a href={`${a.signatureUrl}`} target="_blank" className="bg-ink text-white px-2 py-1 text-[8px] hover:bg-brand hover:text-ink">Sign</a>}
                                   <button 
                                     onClick={() => printAdmissionRecord(a)}
                                     className="bg-brand text-ink px-4 py-2 text-[10px] font-black uppercase hover:bg-ink hover:text-brand transition-all flex items-center gap-2 shadow-[2px_2px_0_0_#1A1A1A]"
                                   >
                                     <Download size={14} /> Download PDF
                                   </button>
                                 </div>
                               </td>
                            </tr>
                         ))}

                         {admissions.length === 0 && (
                           <tr><td colSpan={6} className="p-8 text-center text-xs opacity-50 border-dashed">NO ADMISSIONS RECORDED YET</td></tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {activeTab === 'downloads' && (
             <div className="space-y-6">
                <h2 className="text-3xl font-display font-black uppercase">Form Downloads Tracker</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border-2 border-ink p-6">
                    <div className="text-xl font-bold uppercase mb-2">Total Downloads</div>
                    <div className="text-5xl font-black text-brand">{downloads.length}</div>
                  </div>
                  <div className="col-span-1 md:col-span-2 bg-white border-2 border-ink p-6 max-h-96 overflow-y-auto">
                    <h3 className="text-sm font-bold uppercase mb-4">Activity Log</h3>
                    {downloads.map((d: any) => (
                      <div key={d._id} className="flex justify-between items-center py-3 border-b border-ink/10 last:border-0 hover:bg-brand/5 px-2 transition-colors">
                        <div className="flex items-center gap-4">
                          <Download size={16} className="text-brand shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-ink">{d.studentName || 'Guest Student'}</span>
                            <span className="text-[9px] font-mono uppercase text-muted tracking-tighter">{d.formType}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-muted bg-background px-2 py-1 border border-ink/5">{new Date(d.timestamp).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          )}
          {activeTab === 'counseling' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-display font-black uppercase">Counseling Registry</h2>
                  <button 
                    onClick={() => exportToCSV(counselingLeads, 'BK_Counseling_Leads')}
                    className="flex items-center gap-2 bg-[#F7931A] text-ink px-6 py-3 text-[11px] font-black uppercase hover:bg-ink hover:text-brand transition-all border-4 border-ink shadow-[4px_4px_0_0_#1A1A1A]"
                  >
                    <Download size={16} /> Export Full Dataset (Excel/CSV)
                  </button>
                </div>
                 <div className="grid grid-cols-1 gap-6">
                    {counselingLeads.length === 0 ? (
                       <div className="p-12 text-center bg-white border-8 border-dashed border-ink/20 opacity-50 uppercase font-display font-black text-xl italic">No Counseling leads captured yet</div>
                    ) : (
                      counselingLeads.map((lead: any) => (
                          <div key={lead._id} className="bg-white border-4 border-ink p-8 flex flex-col lg:flex-row gap-8 items-start hover:shadow-[12px_12px_0_0_#F7931A] transition-all">
                             <div className="w-16 h-16 bg-ink text-brand flex items-center justify-center shrink-0 border-4 border-ink shadow-[4px_4px_0_0_#F7931A] rotate-3">
                                <GraduationCap size={32} />
                             </div>
                             <div className="flex-grow space-y-4 w-full">
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink/10 pb-4">
                                   <div className="flex items-center gap-4">
                                      <span className="text-2xl font-black uppercase italic tracking-tighter leading-none">{lead.name}</span>
                                      <span className="bg-brand text-ink px-3 py-1 text-[10px] font-black uppercase border-2 border-ink">{lead.primaryInterest}</span>
                                   </div>
                                   <span className="text-[10px] font-mono font-bold bg-ink text-white px-3 py-1">{new Date(lead.timestamp).toLocaleString()}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-ink/40 tracking-widest">Academic Status</p>
                                    <p className="text-xs font-bold uppercase">{lead.currentClass} • {lead.stream}</p>
                                    <p className="text-[10px] font-mono text-muted">{lead.institution}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-ink/40 tracking-widest">Guidance Focus</p>
                                    <p className="text-xs font-bold uppercase text-brand">{lead.guidanceType}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-ink/40 tracking-widest">Session Preferred</p>
                                    <p className="text-xs font-bold uppercase">{lead.mode} Mode</p>
                                    <p className="text-[10px] font-mono text-muted">{lead.preferredDate} @ {lead.preferredTime}</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-mono font-black uppercase pt-2">
                                   <div className="flex items-center gap-3"><span className="text-brand">WhatsApp:</span> {lead.whatsapp}</div>
                                   <div className="flex items-center gap-3"><span className="text-brand">Email:</span> {lead.email}</div>
                                </div>
                             </div>
                             <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                                <a href={`tel:${lead.whatsapp}`} className="flex-1 bg-ink text-white px-8 py-4 text-center text-[10px] font-black uppercase hover:bg-brand hover:text-ink transition-all shadow-[4px_4px_0_0_#F7931A]">Call Now</a>
                                <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" className="flex-1 border-4 border-ink px-8 py-4 text-center text-[10px] font-black uppercase hover:bg-green-50 transition-all shadow-[4px_4px_0_0_#1A1A1A]">WhatsApp</a>
                             </div>
                          </div>
                      ))
                    )}
                 </div>
             </div>
           )}

           {activeTab === 'enquiries' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-display font-black uppercase">Recent Enquiries</h2>
                  <button 
                    onClick={() => exportToCSV(enquiries, 'BK_Enquiries')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-green-700"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                 <div className="grid grid-cols-1 gap-4">
                    {enquiries.length === 0 ? (
                       <div className="p-8 text-center bg-white border-2 border-dashed border-ink/20 opacity-50 uppercase font-mono text-xs">No active enquiries recorded</div>
                    ) : (
                       enquiries.map((enq: any) => (
                          <div key={enq._id} className="bg-white border-2 border-ink p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                             <div className="w-12 h-12 bg-brand text-ink flex items-center justify-center shrink-0 border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]">
                                <MessageSquare size={20} />
                             </div>
                             <div className="flex-grow space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                   <span className="text-lg font-black uppercase tracking-tight">{enq.name}</span>
                                   <span className="text-[10px] font-mono bg-ink text-brand px-2 py-0.5 border border-brand">{enq.category}</span>
                                   <span className="text-[10px] font-mono bg-brand/10 text-brand px-2 py-0.5 border border-brand/20">{enq.subCategory}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono text-muted uppercase">
                                   <div className="flex items-center gap-2"><span className="text-ink/30 italic">Phone:</span> {enq.phone}</div>
                                   <div className="flex items-center gap-2"><span className="text-ink/30 italic">Email:</span> {enq.email}</div>
                                   <div className="flex items-center gap-2"><span className="text-ink/30 italic">Date:</span> {new Date(enq.timestamp).toLocaleString()}</div>
                                </div>
                                {enq.address && (
                                   <div className="text-[10px] font-mono bg-background p-3 border border-ink/5 italic">
                                      <span className="text-ink/30 not-italic uppercase font-bold mr-2">Address:</span>
                                      {enq.address}
                                   </div>
                                )}
                             </div>
                             <div className="flex gap-2 w-full md:w-auto">
                                <a href={`tel:${enq.phone}`} className="flex-grow md:flex-none bg-ink text-white px-6 py-3 text-center text-[10px] font-black uppercase hover:bg-brand hover:text-ink transition-all">Call</a>
                                <a href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`} target="_blank" className="flex-grow md:flex-none border-2 border-ink px-6 py-3 text-center text-[10px] font-black uppercase hover:bg-green-50 transition-all">WhatsApp</a>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
             </div>
           )}

            {activeTab === 'courses' && (
              <div className="space-y-12 pb-20">
                <div className="bg-white border-8 border-ink p-10 shadow-[16px_16px_0_0_#1A1A1A]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b-8 border-ink pb-6 gap-4">
                    <div>
                      <h3 className="text-4xl font-display font-black uppercase italic leading-none">Course & Hub <span className="text-brand">Management</span></h3>
                      <p className="text-[10px] font-mono uppercase text-ink/40 mt-2">Strategic Deployment Center for Academy Portals</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={resetCourseForm}
                      className="px-6 py-2 bg-ink text-white font-black uppercase text-[10px] hover:bg-brand hover:text-ink transition-all shadow-[4px_4px_0_0_#F7931A]"
                    >
                      Reset Deployment
                    </button>
                  </div>

                  <form onSubmit={handleAddCourse} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <div className="bg-brand text-ink px-4 py-1 font-black uppercase text-[10px] w-fit border-2 border-ink shadow-[2px_2px_0_0_#000]">Basic Configuration</div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Portal Identity</label>
                          <input required type="text" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. UPSC Hub 2026" className="w-full border-4 border-ink p-4 font-mono bg-white focus:ring-8 focus:ring-brand/10 transition-all text-sm" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Exam Category</label>
                            <select value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} className="w-full border-4 border-ink p-4 font-mono uppercase bg-white text-sm">
                              {['UPSC', 'MPSC', 'Banking', 'NDA', 'Police Bharti', 'Railway Bharti', 'Staff Selection', 'Other'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Specialized Service</label>
                            <select value={courseForm.subCategory} onChange={e => setCourseForm({...courseForm, subCategory: e.target.value})} className="w-full border-4 border-ink p-4 font-mono uppercase bg-white text-sm">
                              <option value="">Select Service</option>
                              {courseForm.category === 'UPSC' && (
                                <>
                                  <option value="UPSC CIVIL SERVICES (IAS, IPS, IFS)">UPSC CIVIL SERVICES (IAS, IPS, IFS)</option>
                                  <option value="INDIAN FOREST SERVICE (IFOS)">INDIAN FOREST SERVICE (IFOS)</option>
                                  <option value="ENGINEERING SERVICES (ESE/IES)">ENGINEERING SERVICES (ESE/IES)</option>
                                  <option value="CAPF (ASSISTANT COMMANDANT)">CAPF (ASSISTANT COMMANDANT)</option>
                                  <option value="COMBINED DEFENCE SERVICES (CDS)">COMBINED DEFENCE SERVICES (CDS)</option>
                                  <option value="COMBINED MEDICAL SERVICES (CMS)">COMBINED MEDICAL SERVICES (CMS)</option>
                                  <option value="INDIAN ECONOMIC SERVICE (IES) / ISS">INDIAN ECONOMIC SERVICE (IES) / ISS</option>
                                  <option value="SPECIAL CLASS RAILWAY APPRENTICES (SCRA)">SPECIAL CLASS RAILWAY APPRENTICES (SCRA)</option>
                                </>
                              )}
                              {courseForm.category !== 'UPSC' && <option value="General">General</option>}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Assigned Team/Mentor</label>
                          <input required type="text" value={courseForm.instructor} onChange={e => setCourseForm({...courseForm, instructor: e.target.value})} placeholder="e.g. Dr. Bhagwan" className="w-full border-4 border-ink p-4 font-mono bg-white text-sm" />
                        </div>
                        <div className="border-4 border-ink p-6 bg-ink/5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black uppercase leading-tight">Cover Identity</p>
                            <p className="text-[8px] font-mono uppercase text-ink/40 mt-1">Recommended: 1200x800px</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <label htmlFor="course-img" className="bg-ink text-white px-6 py-2 font-black uppercase text-[10px] cursor-pointer hover:bg-brand hover:text-ink transition-all">Select Image</label>
                            <input type="file" id="course-img" className="hidden" onChange={e => setCourseForm({...courseForm, image: e.target.files?.[0] || null})} />
                            {courseForm.image && <Check className="text-green-600" size={20} />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* EXAM DATE & TIME - Courses */}
                    <div className="lg:col-span-2 p-8 border-4 border-ink bg-ink relative mt-4">
                      <div className="absolute -top-4 left-6 bg-brand text-ink px-4 py-1 font-black uppercase text-[10px] border-2 border-ink shadow-[2px_2px_0_0_#000]">EXAM DATE & PAPER TIME (COUNTDOWN)</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Exam Date</label>
                          <div className="flex gap-4">
                            <input 
                              type="text"
                              placeholder="YYYY"
                              maxLength={4}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const year = e.target.value.replace(/\D/g, '');
                                const current = (courseForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (courseForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setCourseForm({...courseForm, examDate: `${year}-${current[1] || '01'}-${current[2] || '01'}T${time}`});
                              }}
                            />
                            <input 
                              type="text"
                              placeholder="MM"
                              maxLength={2}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const month = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                const current = (courseForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (courseForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setCourseForm({...courseForm, examDate: `${current[0] || '2024'}-${month}-${current[2] || '01'}T${time}`});
                              }}
                            />
                            <input 
                              type="text"
                              placeholder="DD"
                              maxLength={2}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const day = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                const current = (courseForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (courseForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setCourseForm({...courseForm, examDate: `${current[0] || '2024'}-${current[1] || '01'}-${day}T${time}`});
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Paper Start Time (Hour:Minute)</label>
                          <input 
                            type="time"
                            value={courseForm.examDate ? (courseForm.examDate.split('T')[1] || '09:00') : '09:00'}
                            onChange={e => {
                              const date = courseForm.examDate?.split('T')[0] || new Date().toISOString().split('T')[0];
                              setCourseForm({...courseForm, examDate: date + 'T' + e.target.value});
                            }}
                            className="w-full border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink focus:ring-8 focus:ring-brand/30 transition-all"
                          />
                        </div>
                      </div>
                      {courseForm.examDate && courseForm.examDate.includes('T') && (
                        <div className="mt-4 p-3 bg-brand/10 border border-brand/30 rounded">
                          <p className="text-brand font-mono text-[10px] uppercase tracking-widest">
                            ✓ Countdown will show: {new Date(courseForm.examDate).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      <div className="bg-ink text-brand px-4 py-1 font-black uppercase text-[10px] w-fit border-2 border-ink shadow-[2px_2px_0_0_#F7931A]">Dynamic Modules</div>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {courseForm.dynamicSections.map((sec, idx) => (
                          <div key={idx} className="bg-white border-4 border-ink p-6 relative group hover:shadow-[8px_8px_0_0_#1A1A1A] transition-all">
                            <button type="button" onClick={() => removeSection(idx)} className="absolute -top-4 -right-4 bg-red-600 text-white w-8 h-8 border-4 border-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:rotate-90">
                              <Trash2 size={14} />
                            </button>
                            <div className="space-y-4">
                              <input type="text" value={sec.title} onChange={e => updateSection(idx, 'title', e.target.value)} placeholder="Module Title (e.g. Stage 1: Strategy)" className="w-full border-b-4 border-ink p-2 font-black text-xs focus:border-brand transition-colors bg-transparent outline-none" />
                              <textarea value={sec.content} onChange={e => updateSection(idx, 'content', e.target.value)} placeholder="Strategic details for this module..." className="w-full h-24 bg-ink/[0.03] p-4 text-[10px] font-body focus:bg-white transition-all resize-none border-none outline-none" />
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={addSection} className="w-full py-6 border-4 border-dashed border-ink/20 text-ink/20 font-black uppercase text-xs hover:border-brand hover:text-brand transition-all">+ Initialize New Module</button>
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col sm:flex-row gap-6 mt-10 pt-10 border-t-8 border-ink">
                      <label className="flex items-center gap-6 border-4 border-ink p-6 bg-white cursor-pointer hover:bg-brand/5 transition-all flex-grow group">
                        <input type="checkbox" checked={courseForm.isFeatured} onChange={e => setCourseForm({...courseForm, isFeatured: e.target.checked})} className="w-8 h-8 accent-brand" />
                        <div>
                          <p className="font-black uppercase text-sm group-hover:text-brand transition-colors">Featured Portal Entry</p>
                          <p className="text-[8px] font-mono uppercase text-ink/30">Highlight this entry on the home page</p>
                        </div>
                      </label>
                      <button type="submit" disabled={loading} className="bg-brand text-ink font-black uppercase border-4 border-ink px-20 py-6 hover:-translate-y-2 transition-all shadow-[16px_16px_0_0_#1A1A1A] active:translate-y-0 active:shadow-none disabled:opacity-50 text-xl tracking-tighter">
                        {loading ? 'Transmitting...' : 'Deploy to Website'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="space-y-16">
                  {/* UPSC SECTION */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <div className="bg-[#F7931A] text-ink px-12 py-4 font-black uppercase text-lg rounded-full shadow-[12px_12px_0_0_#1A1A1A] border-4 border-ink italic tracking-tighter">
                        UPSC Exam Services
                      </div>
                      <div className="h-2 flex-grow bg-ink/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      {coursesList.filter(c => c.category === 'UPSC').map((course) => (
                        <div key={course._id} className="bg-white border-8 border-ink group hover:shadow-[24px_24px_0_0_#F7931A] transition-all flex flex-col h-full relative">
                          <div className="h-56 bg-ink border-b-8 border-ink relative overflow-hidden">
                            <img src={course.image || '/home/card1.png'} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                            <div className="absolute top-4 left-4 bg-brand text-ink px-4 py-2 font-black text-[10px] uppercase border-4 border-ink shadow-[4px_4px_0_0_#1A1A1A]">
                              Active Portal
                            </div>
                          </div>
                          <div className="p-10 flex-grow flex flex-col">
                            <h4 className="text-3xl font-display font-black uppercase italic leading-none mb-8 group-hover:text-brand transition-colors line-clamp-2">{course.title}</h4>
                            <div className="space-y-4 mb-10">
                              <div className="flex items-center gap-4">
                                <div className="w-4 h-4 bg-brand border-2 border-ink rotate-45" />
                                <span className="text-xs font-black uppercase tracking-widest text-ink/80">{course.subCategory}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="w-4 h-4 bg-brand border-2 border-ink rotate-45" />
                                <span className="text-[10px] font-mono font-bold uppercase text-ink/40">Team: {course.instructor}</span>
                              </div>
                            </div>
                            <div className="mt-auto pt-8 border-t-8 border-ink/5 flex justify-between items-center">
                              <div className="flex gap-2">
                                {course.dynamicSections?.length > 0 && (
                                  <span className="bg-ink text-white px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">{course.dynamicSections.length} Sections Loaded</span>
                                )}
                              </div>
                              <button onClick={() => handleDeleteCourse(course._id)} className="w-14 h-14 border-4 border-ink bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-[6px_6px_0_0_#1A1A1A] hover:shadow-none flex items-center justify-center">
                                <Trash2 size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GENERAL SECTION */}
                  <div className="space-y-10 pt-16 border-t-8 border-ink/5">
                    <div className="bg-ink text-white px-12 py-4 font-black uppercase text-sm shadow-[10px_10px_0_0_#F7931A] border-4 border-brand w-fit italic">
                      General Academy Streams
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {coursesList.filter(c => c.category !== 'UPSC').map((course) => (
                        <div key={course._id} className="bg-white border-4 border-ink p-6 hover:bg-ink group transition-all flex items-center gap-6 cursor-default">
                          <div className="w-16 h-16 bg-brand shrink-0 border-2 border-ink overflow-hidden shadow-[4px_4px_0_0_#000] group-hover:shadow-none transition-all">
                            <img src={course.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          </div>
                          <div className="flex-grow">
                            <h5 className="font-black text-[11px] uppercase leading-tight group-hover:text-white transition-colors">{course.title}</h5>
                            <p className="text-[9px] font-mono text-ink/30 group-hover:text-brand transition-colors mt-2">{course.category}</p>
                          </div>
                          <button onClick={() => handleDeleteCourse(course._id)} className="text-ink/10 group-hover:text-red-500 transition-colors hover:scale-125 transition-transform">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="space-y-12 pb-20">
                <div className="bg-white border-8 border-ink p-10 shadow-[16px_16px_0_0_#1A1A1A]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b-8 border-ink pb-6 gap-4">
                    <div>
                      <h3 className="text-4xl font-display font-black uppercase italic leading-none">Government Exam <span className="text-brand">Portal</span></h3>
                      <p className="text-[10px] font-mono uppercase text-ink/40 mt-2">Simplified 3-Block Deployment System</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={resetExamForm}
                      className="px-6 py-2 bg-ink text-white font-black uppercase text-[10px] hover:bg-brand hover:text-ink transition-all shadow-[4px_4px_0_0_#F7931A]"
                    >
                      Reset Deployment
                    </button>
                  </div>

                  <form onSubmit={handleAddExam} className="space-y-10">
                    
                    {/* BLOCK 1: CATEGORY & IMAGE */}
                    <div className="p-8 border-4 border-ink bg-ink/5 relative group">
                      <div className="absolute -top-4 left-6 bg-brand text-ink px-4 py-1 font-black uppercase text-[10px] border-2 border-ink shadow-[2px_2px_0_0_#000]">BLOCK 1: EXAM CATEGORY & IMAGE</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/60">Select Exam Category</label>
                          <select value={examForm.category} onChange={e => setExamForm({...examForm, category: e.target.value})} className="w-full border-4 border-ink p-4 font-mono uppercase bg-white text-sm focus:ring-4 focus:ring-brand">
                            {[
                              'UPSC (IAS, IPS, IFS)', 
                              'MPSC (Maharashtra Services)',
                              'SSC (Staff Selection Commission)',
                              'Banking & Finance Exams',
                              'Railway Exams (RRB)',
                              'Defence Exams',
                              'Teaching & Education Exams',
                              'Insurance Exams',
                              'Engineering & PSU Exams',
                              'Law & Judiciary Exams',
                              'Medical & Nursing Exams',
                              'Police & Security Services',
                              'Other Important Govt Exams'
                            ].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/60">Upload Display Image</label>
                          <input type="file" accept="image/*" onChange={e => { if(e.target.files && e.target.files[0]) setExamForm({...examForm, image: e.target.files[0]}) }} className="w-full border-4 border-ink p-3 font-mono bg-white text-xs file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-2 file:border-ink file:bg-brand file:text-ink file:font-black file:uppercase file:text-[10px]" />
                        </div>
                      </div>
                    </div>

                    {/* EXAM DATE & TIME BLOCK */}
                    <div className="p-8 border-4 border-ink bg-ink relative group">
                      <div className="absolute -top-4 left-6 bg-brand text-ink px-4 py-1 font-black uppercase text-[10px] border-2 border-ink shadow-[2px_2px_0_0_#000]">EXAM DATE & PAPER TIME</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Exam Date</label>
                          <div className="flex gap-4">
                            <input 
                              type="text"
                              placeholder="YYYY"
                              maxLength={4}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const year = e.target.value.replace(/\D/g, '');
                                const current = (examForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (examForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setExamForm({...examForm, examDate: `${year}-${current[1] || '01'}-${current[2] || '01'}T${time}`});
                              }}
                            />
                            <input 
                              type="text"
                              placeholder="MM"
                              maxLength={2}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const month = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                const current = (examForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (examForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setExamForm({...examForm, examDate: `${current[0] || '2024'}-${month}-${current[2] || '01'}T${time}`});
                              }}
                            />
                            <input 
                              type="text"
                              placeholder="DD"
                              maxLength={2}
                              className="w-1/3 border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink"
                              onChange={e => {
                                const day = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                const current = (examForm.examDate || '2024-01-01T09:00').split('T')[0].split('-');
                                const time = (examForm.examDate || '2024-01-01T09:00').split('T')[1];
                                setExamForm({...examForm, examDate: `${current[0] || '2024'}-${current[1] || '01'}-${day}T${time}`});
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Paper Start Time (Hour:Minute)</label>
                          <input 
                            type="time" 
                            value={examForm.examDate ? (examForm.examDate.split('T')[1] || '09:00') : '09:00'}
                            onChange={e => {
                              const date = examForm.examDate?.split('T')[0] || new Date().toISOString().split('T')[0];
                              setExamForm({...examForm, examDate: date + 'T' + e.target.value});
                            }}
                            className="w-full border-4 border-brand p-4 font-display font-bold text-xl bg-white text-ink focus:ring-8 focus:ring-brand/30 transition-all"
                          />
                        </div>
                      </div>
                      {examForm.examDate && examForm.examDate.includes('T') && (
                        <div className="mt-4 p-3 bg-brand/10 border border-brand/30 rounded">
                          <p className="text-brand font-mono text-[10px] uppercase tracking-widest">
                            ✓ Countdown will show: {new Date(examForm.examDate).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                          </p>
                        </div>
                      )}
                    </div>



                    <div className="pt-6 border-t-8 border-ink flex justify-end">
                      <button disabled={loading} type="submit" className="w-full md:w-auto bg-brand text-ink font-display font-black text-2xl uppercase tracking-wider py-6 px-16 shadow-[8px_8px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all border-4 border-ink disabled:opacity-50">
                        {loading ? 'DEPLOYING...' : 'DEPLOY EXAM DATA'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Exams List Display */}
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="bg-ink text-brand px-12 py-4 font-black uppercase text-lg rounded-full shadow-[12px_12px_0_0_#F7931A] border-4 border-ink italic tracking-tighter">
                      Published Government Exams
                    </div>
                    <div className="h-2 flex-grow bg-ink/10" />
                  </div>
                  {(() => {
                    const ALL_CATEGORIES = [
                      'UPSC (IAS, IPS, IFS)', 
                      'MPSC (Maharashtra Services)', 
                      'SSC (Staff Selection Commission)', 
                      'Banking & Finance Exams', 
                      'Railway Exams (RRB)', 
                      'Defence Exams', 
                      'Teaching & Education Exams', 
                      'Insurance Exams', 
                      'Engineering & PSU Exams', 
                      'Law & Judiciary Exams', 
                      'Medical & Nursing Exams', 
                      'Police & Security Services',
                      'Other Important Govt Exams'
                    ];
                    return ALL_CATEGORIES.map(cat => {
                      const catExams = examsList.filter(e => e.category === cat);
                      return (
                        <div key={cat} className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className={`px-6 py-2 font-black uppercase text-[10px] border-2 border-ink shadow-[3px_3px_0_0_#1A1A1A] italic tracking-widest ${catExams.length > 0 ? 'bg-brand text-ink' : 'bg-ink/10 text-ink/30'}`}>
                              {cat}
                            </div>
                            <div className="h-[2px] flex-grow bg-ink/10" />
                            {catExams.length > 0 && (
                              <span className="text-[9px] font-mono font-bold text-brand bg-ink px-3 py-1">{catExams.length} DATA SET{catExams.length > 1 ? 'S' : ''} LIVE</span>
                            )}
                          </div>
                          {catExams.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 border-l-4 border-brand/30">
                              {catExams.map((exam) => (
                                <div key={exam._id} className="bg-white border-4 border-ink p-5 hover:bg-ink group transition-all flex items-center gap-4 cursor-default">
                                  <div className="w-12 h-12 bg-brand shrink-0 border-2 border-ink overflow-hidden shadow-[3px_3px_0_0_#000] group-hover:shadow-none transition-all">
                                    <img src={exam.image || '/home/card1.png'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <h5 className="font-black text-[10px] leading-tight group-hover:text-white transition-colors">{exam.title}</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                      <p className="text-[8px] font-mono text-ink/30 group-hover:text-brand transition-colors uppercase">Layer added: {new Date(exam.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })} {new Date(exam.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => handleDeleteCourse(exam._id)} 
                                    className="bg-red-50 text-red-600 p-2 border border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0_0_rgba(220,38,38,0.2)]"
                                    title="Remove this specific data layer"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="pl-4 border-l-4 border-ink/5 py-2 text-[9px] font-mono uppercase text-ink/20 tracking-widest">
                              No data deployed yet — use the form above to add content
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
            
            {activeTab === 'hero' && (
              <div className="space-y-8 max-w-4xl">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-display font-black uppercase">Hero Section Management</h2>
                  <span className="bg-brand text-ink px-3 py-1 text-[10px] font-black uppercase border-2 border-ink">Design v4</span>
                </div>

                <div className="bg-white border-4 border-ink p-8 shadow-[12px_12px_0_0_#1A1A1A]">
                  <form onSubmit={handleUpdateHero} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Hero Main Title (e.g. MAHA-TET)</label>
                        <input required type="text" value={heroForm.title} onChange={e => setHeroForm({...heroForm, title: e.target.value})} className="w-full border-4 border-ink p-4 font-display font-bold text-3xl uppercase text-brand shadow-[4px_4px_0_0_#ccc]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Watch Video URL (Secondary Button)</label>
                        <input required type="text" value={heroForm.buttonUrl} onChange={e => setHeroForm({...heroForm, buttonUrl: e.target.value})} className="w-full border-4 border-ink p-4 font-mono text-sm bg-ink/5" placeholder="https://youtube.com/..." />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase text-brand bg-ink px-4 py-1 border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]">Phone Media Items</div>
                        <button type="button" onClick={() => setHeroForm({...heroForm, media: [...heroForm.media, { mediaType: 'youtube', src: '', title: '', poster: '' }]})} className="text-[10px] font-black uppercase border-2 border-ink px-4 py-1 hover:bg-brand transition-all">Add Media Item</button>
                      </div>

                      {heroForm.media.map((item, idx) => (
                        <div key={idx} className="bg-ink/5 border-4 border-ink p-6 relative group">
                          <button type="button" onClick={() => setHeroForm({...heroForm, media: heroForm.media.filter((_, i) => i !== idx)})} className="absolute -top-4 -right-4 bg-red-600 text-white w-8 h-8 border-4 border-ink flex items-center justify-center">
                            <X size={14} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <label className="text-[8px] font-black uppercase tracking-widest opacity-40">Media Type</label>
                              <select value={item.mediaType} onChange={e => {
                                const newMedia = [...heroForm.media];
                                newMedia[idx].mediaType = e.target.value as any;
                                setHeroForm({...heroForm, media: newMedia});
                              }} className="w-full border-2 border-ink p-2 font-mono text-xs uppercase">
                                <option value="youtube">YouTube Short/Video</option>
                                <option value="video">Direct Video (MP4)</option>
                                <option value="image">Static Image</option>
                              </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-[8px] font-black uppercase tracking-widest opacity-40">Source (YouTube ID or full URL)</label>
                              <input type="text" value={item.src} onChange={e => {
                                const newMedia = [...heroForm.media];
                                newMedia[idx].src = e.target.value;
                                setHeroForm({...heroForm, media: newMedia});
                              }} className="w-full border-2 border-ink p-2 font-mono text-xs" placeholder={item.mediaType === 'youtube' ? 'e.g. z18YX4x1Lw8' : 'e.g. /uploads/video.mp4'} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-ink text-brand font-display font-black text-2xl py-6 uppercase hover:bg-brand hover:text-ink transition-all shadow-[8px_8px_0_0_#ccc] active:translate-y-1 active:shadow-none">
                      {loading ? 'Transmitting Changes...' : 'Update Hero v4 Section →'}
                    </button>
                  </form>
                </div>

                <div className="p-6 bg-yellow-50 border-4 border-yellow-200 text-yellow-800 font-body text-xs italic">
                  Note: The Hero section is now optimized for the new clean, premium v4 layout. Changes will reflect instantly on the homepage after saving.
                </div>
              </div>
            )}

            {activeTab === 'popups' && (
              <div className="space-y-8 max-w-4xl">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-display font-black uppercase">Popup Manager</h2>
                  <span className="bg-brand text-ink px-3 py-1 text-[10px] font-black uppercase border-2 border-ink">Marketing</span>
                </div>

                <div className="bg-white border-4 border-ink p-8 shadow-[12px_12px_0_0_#1A1A1A]">
                  <h3 className="text-xl font-display font-black uppercase mb-6">Add New Popup</h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                      let bodyData: any;
                      let headers: any = { 'Authorization': `Bearer ${token}` };

                      if (popupForm.mediaType === 'image' && popupForm.image) {
                        const formData = new FormData();
                        formData.append('title', popupForm.title);
                        formData.append('mediaType', popupForm.mediaType);
                        formData.append('notice', popupForm.notice);
                        formData.append('link', popupForm.link);
                        formData.append('isActive', String(popupForm.isActive));
                        formData.append('order', String(popupForm.order));
                        formData.append('image', popupForm.image);
                        bodyData = formData;
                      } else {
                        headers['Content-Type'] = 'application/json';
                        bodyData = JSON.stringify(popupForm);
                      }

                      const res = await fetch('/api/popups', {
                        method: 'POST',
                        headers,
                        body: bodyData
                      });
                      if (res.ok) {
                        setPopupForm({ title: '', mediaUrl: '', mediaType: 'image', image: null, notice: '', link: '', isActive: true, order: 0 });
                        fetchPopups();
                      } else {
                        const errData = await res.json();
                        alert(`Error adding popup: ${errData.error || errData.message}`);
                      }
                    } catch (err) { alert('Error adding popup'); }
                    setLoading(false);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Popup Title (Internal)</label>
                        <input required type="text" value={popupForm.title} onChange={e => setPopupForm({...popupForm, title: e.target.value})} className="w-full border-4 border-ink p-4 font-display font-bold text-lg bg-ink/5" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Media Type</label>
                        <select value={popupForm.mediaType} onChange={e => setPopupForm({...popupForm, mediaType: e.target.value as any, mediaUrl: '', image: null})} className="w-full border-4 border-ink p-4 font-mono text-sm bg-ink/5 uppercase">
                          <option value="image">Upload Image</option>
                          <option value="youtube">YouTube Video Link</option>
                        </select>
                      </div>
                      
                      {popupForm.mediaType === 'youtube' ? (
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">YouTube URL</label>
                          <input required type="text" value={popupForm.mediaUrl} onChange={e => setPopupForm({...popupForm, mediaUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." className="w-full border-4 border-ink p-4 font-mono text-sm bg-ink/5" />
                        </div>
                      ) : (
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Upload Image File</label>
                          <input 
                            required 
                            type="file" 
                            accept="image/*"
                            onChange={e => {
                              if (e.target.files && e.target.files[0]) {
                                setPopupForm({...popupForm, image: e.target.files[0]});
                              }
                            }} 
                            className="w-full border-4 border-ink p-4 font-mono text-sm bg-ink/5" 
                          />
                        </div>
                      )}

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">One Line Notice (Optional Banner Text)</label>
                        <input type="text" value={popupForm.notice} onChange={e => setPopupForm({...popupForm, notice: e.target.value})} className="w-full border-4 border-ink p-4 font-display font-bold text-lg bg-ink/5" placeholder="e.g. Special Announcement for 10th & 12th Students!" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/40">Button Action Link (Optional)</label>
                        <input type="url" value={popupForm.link} onChange={e => setPopupForm({...popupForm, link: e.target.value})} className="w-full border-4 border-ink p-4 font-mono text-sm bg-ink/5" placeholder="https://forms.gle/..." />
                      </div>
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-ink text-brand font-display font-black text-xl py-4 uppercase hover:bg-brand hover:text-ink transition-all shadow-[8px_8px_0_0_#ccc] active:translate-y-1 active:shadow-none">
                      {loading ? 'Adding...' : 'Add Popup'}
                    </button>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-display font-black uppercase">Active & Inactive Popups</h3>
                  {popupsList.length === 0 ? (
                    <div className="p-8 text-center border-4 border-dashed border-ink/20 opacity-50 uppercase font-mono text-xs">No popups created yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {popupsList.map((popup) => (
                        <div key={popup._id} className={`bg-white border-4 border-ink p-6 relative ${popup.isActive ? '' : 'opacity-60 grayscale'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-black text-xl uppercase tracking-tighter">{popup.title}</h4>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${popup.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {popup.isActive ? '● Live' : '○ Hidden'}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={async () => {
                                  await fetch(`/api/popups/${popup._id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                    body: JSON.stringify({ isActive: !popup.isActive })
                                  });
                                  fetchPopups();
                                }}
                                className="p-2 border-2 border-ink hover:bg-ink hover:text-white transition-colors"
                              >
                                {popup.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <button 
                                onClick={async () => {
                                  if (window.confirm('Delete popup?')) {
                                    await fetch(`/api/popups/${popup._id}`, {
                                      method: 'DELETE',
                                      headers: { 'Authorization': `Bearer ${token}` }
                                    });
                                    fetchPopups();
                                  }
                                }}
                                className="p-2 border-2 border-ink bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs font-mono mb-2 truncate">Media: {popup.mediaUrl}</div>
                          {popup.notice && <div className="text-sm bg-brand/10 p-2 font-bold mb-2">Notice: {popup.notice}</div>}
                          {popup.link && <div className="text-xs text-blue-600 underline truncate">Link: {popup.link}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    );
  }
