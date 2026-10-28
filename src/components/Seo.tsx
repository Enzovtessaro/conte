import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../lib/links';

const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: object | object[];
  /** Share image path on this site, 1200x630. */
  image?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, path, noindex, type = 'website', jsonLd, image }) => {
  const imageUrl = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Conte" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
