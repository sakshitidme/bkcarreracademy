import React from 'react';
import SEO from '../components/common/SEO';
import FeaturedMindMap from '../components/FeaturedMindMap';

export const DailyMindMapsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-20">
            <SEO
                title="Daily Mind Maps | BK Career Academy"
                description="Explore visual mind maps for UPSC, MPSC, and Competitive Exams. High-yield interactive concept breakdowns."
                canonical="https://bkeducation.in/daily-mind-maps"
            />

            {/* FEATURED INTERACTIVE MIND MAP */}
            <FeaturedMindMap />
        </div>
    );
};

export default DailyMindMapsPage;
