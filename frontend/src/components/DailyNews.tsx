import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Clock, Newspaper, Filter, ArrowRight, Calendar, Radio } from 'lucide-react';

import SkeletonCard from './SkeletonCard';

export interface NewsItem {
    id: string;
    title: string;
    category: string;
    time: string;
    image: string;
    snippet: string;
    sourceUrl: string;
}

const SAMPLE_NEWS: NewsItem[] = [
    {
        id: 'n-1',
        title: 'Supreme Court Bench Mandates Strict Guidelines for Environmental Clearance Procedures',
        category: 'POLITY',
        time: '2 Hours Ago',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        snippet: 'A three-judge constitutional bench ruled that public hearings must be documented with complete transparency before launching major infrastructure projects.',
        sourceUrl: 'https://pib.gov.in'
    },
    {
        id: 'n-2',
        title: 'Reserve Bank Keeps Policy Repo Rate Unchanged at 6.5% Amid Global Headwinds',
        category: 'ECONOMY',
        time: '4 Hours Ago',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        snippet: 'The Monetary Policy Committee highlighted consumer price stability as the main priority while maintaining inflation forecasts within the 4% target band.',
        sourceUrl: 'https://rbi.org.in'
    },
    {
        id: 'n-3',
        title: 'ISRO Unveils Next-Gen Space Station Module Blueprint for Bharatiya Antariksh Station',
        category: 'SCIENCE',
        time: '6 Hours Ago',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        snippet: 'Engineers completed initial environmental testing of life support modules destined for deployment in low-Earth orbit by 2028.',
        sourceUrl: 'https://isro.gov.in'
    },
    {
        id: 'n-4',
        title: 'India Signs Bilateral Trade Agreement to Boost Agricultural Export Corridors',
        category: 'INTERNATIONAL',
        time: '8 Hours Ago',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
        snippet: 'The landmark accord eliminates tariffs on organic crops, processed spices, and tea exports, creating fresh economic avenues for farmers.',
        sourceUrl: 'https://mea.gov.in'
    },
    {
        id: 'n-5',
        title: 'New Tiger Reserve Declared in Western Ghats Biodiversity Hotspot Region',
        category: 'ENVIRONMENT',
        time: '12 Hours Ago',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        snippet: 'The Ministry of Environment approved 850 sq km of protected forest area to secure vital corridor connections for endangered wildlife.',
        sourceUrl: 'https://moef.gov.in'
    }
];

const CATEGORIES = ['ALL', 'POLITY', 'ECONOMY', 'SCIENCE', 'INTERNATIONAL', 'ENVIRONMENT'];

interface DailyNewsProps {
    className?: string;
}

export const DailyNews: React.FC<DailyNewsProps> = ({ className = '' }) => {
    const [newsList, setNewsList] = useState<NewsItem[]>(SAMPLE_NEWS);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isLoading, setIsLoading] = useState(false);
    const [isLive, setIsLive] = useState(false);

    const todayFormattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const fetchLiveNews = async (forceRefresh = false) => {
        setIsLoading(true);
        try {
            const url = forceRefresh ? '/api/news/daily?refresh=true' : '/api/news/daily';
            const res = await fetch(url);
            const data = await res.json();
            if (data.success && data.news && data.news.length > 0) {
                setNewsList(data.news);
                setIsLive(true);
            }
        } catch (err) {
            console.error('Failed to fetch live news feed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveNews();
    }, []);

    const handleRefresh = () => {
        fetchLiveNews(true);
    };

    const filteredNews = newsList.filter((item) =>
        selectedCategory === 'ALL' ? true : item.category === selectedCategory
    );

    return (
        <section className={`my-12 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* HEADER BAR WITH TITLE, DATE & REFRESH */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-dark font-extrabold text-xs tracking-wider uppercase border border-primary/40">
                                <Newspaper size={14} className="text-primary" /> Verified Exam Briefs
                            </div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark text-white font-extrabold text-xs tracking-wider border border-dark shadow-xs">
                                <Calendar size={14} className="text-primary" /> {todayFormattedDate}
                            </div>
                            {isLive && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-extrabold text-[11px] tracking-wider uppercase border border-emerald-500/30">
                                    <Radio size={12} className="animate-pulse text-emerald-600" /> Live Feed Active
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-dark tracking-tight font-display">
                            Daily Current Affairs News
                        </h2>
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="bg-white text-dark hover:bg-primary font-black text-xs uppercase tracking-widest px-5 py-3 rounded-2xl border-2 border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
                    >
                        <RefreshCw size={16} className={isLoading ? 'animate-spin text-primary' : ''} />
                        {isLoading ? 'Fetching Live...' : 'Refresh Live News'}
                    </button>
                </div>

                {/* CATEGORY FILTER TABS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-8">
                    <Filter size={16} className="text-gray-400 shrink-0 mr-1" />
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                                    ? 'bg-dark text-primary border-2 border-dark shadow-[3px_3px_0px_0px_rgba(245,166,35,1)]'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* NEWS GRID (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredNews.map((news) => (
                                <div
                                    key={news.id}
                                    className="bg-white rounded-3xl overflow-hidden border-2 border-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    {/* Card Header & Image */}
                                    <div>
                                        <div className="relative h-48 overflow-hidden bg-gray-900">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Overlaid Category Badge */}
                                            <span className="absolute top-3 left-3 bg-dark/90 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/30 shadow-md backdrop-blur-xs">
                                                {news.category}
                                            </span>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5">
                                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 mb-2">
                                                <Clock size={12} />
                                                <span>{news.time}</span>
                                            </div>

                                            {/* Title limited to 2 lines */}
                                            <h3 className="text-base font-black text-dark group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2 font-display">
                                                {news.title}
                                            </h3>

                                            {/* Snippet limited to 3 lines */}
                                            <p className="text-xs text-gray-600 font-medium line-clamp-3 leading-relaxed">
                                                {news.snippet}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Footer Read More Link */}
                                    <div className="p-5 pt-0">
                                        <a
                                            href={news.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 group-hover:bg-primary/20 text-dark text-xs font-black uppercase tracking-wider border border-gray-200 transition-colors"
                                        >
                                            <span>Read Full Brief</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </section>
    );
};

export default DailyNews;

