import React from 'react';
import { blogPosts } from '../../data/blog';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';

const Blog: React.FC = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-16">
      <Seo
        title="Blog Conte | Dicas de contabilidade para PJ"
        description="Dicas e novidades sobre contabilidade, impostos e gestão para quem é PJ ou MEI."
        path="/blog"
        noindex
      />
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">Blog Conte</h1>
          <p className="text-lg text-primary-600">Dicas, novidades e conhecimento para você crescer com sua empresa.</p>
        </header>
        <section className="grid md:grid-cols-2 gap-10" aria-label="Lista de artigos do blog">
          {blogPosts.map(post => (
            <article
              key={post.slug}
              className="group border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition bg-white"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="overflow-hidden rounded-xl mb-4 bg-gray-50">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    width={600}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    itemProp="image"
                  />
                </div>
                <div className="mb-1 text-xs text-gray-500">
                  {post.tags?.[0] && <span className="uppercase tracking-wider">{post.tags[0]}</span>}
                </div>
                <h2 className="text-lg font-bold text-primary-900 group-hover:underline mb-1" itemProp="headline">{post.title}</h2>
                <p className="text-primary-700 text-sm mb-3" itemProp="description">{post.summary}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500" itemProp="author">{post.author}</span>
                  <span className="text-gray-300">•</span>
                  <time className="text-xs text-gray-400" itemProp="datePublished" dateTime={post.date}>{post.date}</time>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Blog; 