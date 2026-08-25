/**
 * SEO Component - Full-featured with React Helmet
 * Handles title, meta description, keywords, Open Graph, Twitter Card,
 * canonical URL, robots, and JSON-LD structured data (Schema.org)
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://arshigps.com';
const DEFAULT_OG_IMAGE = 'https://arshigps.com/og-image.jpg';

export const SEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noindex = false,
  schema,
  twitterHandle = '@arshigps',
}) => {
  const fullTitle = title
    ? `${title} | Arshi GPS`
    : 'Arshi Enterprises – GPS Tracker | AIS 140 | Vehicle Tracking Purnia Bihar';

  const metaDesc = description ||
    'Arshi Enterprises, Purnia Bihar – Buy GPS trackers, AIS 140 certified vehicle tracking, fleet management & anti-theft systems. AGT365N, PRO-365N, Magnet GPS, Tractor GPS. Call +91 77828 08063.';

  const metaKeywords = keywords ||
    'GPS tracker Purnia, AIS 140 GPS Bihar, vehicle tracking Bihar, fleet management GPS India, AGT365N tracker, anti-theft GPS, tractor GPS tracker, school bus GPS India';

  const canonicalUrl = canonicalPath
    ? `${SITE_URL}${canonicalPath}`
    : SITE_URL;

  const imageUrl = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* ─── Primary Meta ─── */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Arshi Enterprises" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ─── Open Graph (Facebook / WhatsApp / LinkedIn) ─── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Arshi GPS" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* ─── Twitter Card ─── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={imageUrl} />

      {/* ─── JSON-LD Schema Markup ─── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

