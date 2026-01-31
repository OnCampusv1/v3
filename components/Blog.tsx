import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The State of Campus Hiring 2024",
    excerpt: "Why Tier-2 colleges are becoming the new hunting ground for top startups.",
    author: "Sanket Singh",
    date: "Oct 12, 2024",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "5 Skills Recruiters Look for in Freshers",
    excerpt: "Beyond coding: Communication, ownership, and first-principles thinking.",
    author: "Meera Iyer",
    date: "Oct 08, 2024",
    category: "Advice",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "How NIT Trichy achieved 100% placement",
    excerpt: "A case study on digital transformation of the placement cell.",
    author: "OnCampus Team",
    date: "Sep 28, 2024",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-[#0D1C22] mb-4">The Blog</h1>
        <p className="text-xl text-gray-600">Stories, insights, and guides for the campus ecosystem.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-8">
              <span className="text-xs font-bold text-[#0D1C22] bg-[#D7F037] px-3 py-1 rounded-full">{post.category}</span>
              <h3 className="text-2xl font-bold text-[#0D1C22] mt-4 mb-3 leading-tight group-hover:underline">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <User size={14} /> {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} /> {post.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;