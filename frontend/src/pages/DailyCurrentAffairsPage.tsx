import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/common/SEO';

import DailyNews from '../components/DailyNews';
import FeaturedMindMap from '../components/FeaturedMindMap';
import EditorialVocabulary from '../components/EditorialVocabulary';

export const DailyCurrentAffairsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-20">
            <SEO
                title="Daily Current Affairs & Mind Maps | BK Career Academy"
                description="Daily verified news briefs, high-yield mind maps, and editorial vocabulary quizzes for UPSC, MPSC, Banking, and Competitive Exams in Nashik."
                canonical="https://bkeducation.in/daily-current-affairs"
            />



            {/* CONTENT SECTIONS IN EXACT REQUIRED ORDER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* 1. DAILY NEWS FIRST */}
                <DailyNews />

                {/* 2. FEATURED MIND MAP SECOND */}
                <FeaturedMindMap />

                {/* 3. EDITORIAL VOCABULARY AT BOTTOM */}
                <EditorialVocabulary />
            </motion.div>
        </div>
    );
};

export default DailyCurrentAffairsPage;
