"use client";
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: object[];
}

export default function SEO({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage = '/og.jpg',
  ogUrl,
  canonicalUrl,
  structuredData = []
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute.split('=')[0], attribute.split('=')[1].replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', 'name="description"', description);
    
    if (keywords.length > 0) {
      updateMetaTag('meta[name="keywords"]', 'name="keywords"', keywords.join(', '));
    }

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property="og:title"', ogTitle || title);
    updateMetaTag('meta[property="og:description"]', 'property="og:description"', ogDescription || description);
    updateMetaTag('meta[property="og:image"]', 'property="og:image"', ogImage);
    updateMetaTag('meta[property="og:type"]', 'property="og:type"', 'website');
    
    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'property="og:url"', ogUrl);
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name="twitter:title"', ogTitle || title);
    updateMetaTag('meta[name="twitter:description"]', 'name="twitter:description"', ogDescription || description);
    updateMetaTag('meta[name="twitter:image"]', 'name="twitter:image"', ogImage);

    // Add structured data
    if (structuredData.length > 0) {
      // Remove old structured data scripts
      document.querySelectorAll('script[type="application/ld+json"][data-seo]').forEach(script => {
        script.remove();
      });

      // Add new structured data
      structuredData.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonicalUrl, structuredData]);

  return null;
}