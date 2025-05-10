import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import { Helmet } from 'react-helmet-async';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-primary-700 underline">Voltar para o blog</Link>
        </div>
      </div>
    );
  }

  const canonical = typeof window !== 'undefined' ? window.location.origin + `/blog/${post.slug}` : `https://sejaconte.com.br/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author },
    "description": post.summary,
    "image": [post.coverImage],
    "mainEntityOfPage": canonical
  };

  return (
    <main className="min-h-screen bg-white py-16">
      <Helmet>
        <title>{post.title} | Blog Conte</title>
        <meta name="description" content={post.summary} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={post.coverImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <meta name="twitter:image" content={post.coverImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav aria-label="breadcrumb" className="mt-16 mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li>/</li>
            <li aria-current="page" className="text-primary-900 font-semibold">{post.title}</li>
          </ol>
        </nav>
        <article itemScope itemType="https://schema.org/BlogPosting">
          <header className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={320}
              loading="eager"
              decoding="async"
              className="w-full h-64 object-cover rounded-2xl mb-6"
              itemProp="image"
            />
            <div className="flex items-center gap-4 mb-2">
              <span className="text-primary-900 font-bold" itemProp="author">{post.author}</span>
              <span className="text-gray-400">•</span>
              <time className="text-gray-500 text-sm" itemProp="datePublished" dateTime={post.date}>{post.date}</time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4" itemProp="headline">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map(tag => (
                <span key={tag} className="bg-gray-100 text-primary-700 px-3 py-1 rounded-full text-xs">{tag}</span>
              ))}
            </div>
          </header>
          <section className="prose prose-lg max-w-none text-primary-900" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </main>
  );
};

export default BlogPostPage; 