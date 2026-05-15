import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'education';
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "BK Career Academy | UPSC, MPSC & Competitive Exam Coaching Nashik",
  description = "Leading coaching institute for UPSC, MPSC, Banking, and SSC exams in Nashik. We shape careers with expert guidance and proven success.",
  keywords = "UPSC coaching Nashik, MPSC classes, Banking exam preparation, SSC CGL coaching, BK Career Academy, civil services exam Nashik",
  canonical = "https://bkeducation.in/",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  jsonLd
}) => {
  const fullTitle = title.includes('BK Career Academy') ? title : `${title} | BK Career Academy`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `https://bkeducation.in${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `https://bkeducation.in${ogImage}`} />

      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
