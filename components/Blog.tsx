import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const POSTS = [
  {
    id: 1,
    title: "Skincare no Inverno: O que muda?",
    excerpt: "Descubra como adaptar sua rotina de cuidados para manter a pele hidratada e protegida nos dias mais frios.",
    date: "12 AGO 2024",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Benefícios do Colágeno",
    excerpt: "Entenda por que a reposição de colágeno é fundamental após os 30 anos e quais os melhores procedimentos.",
    date: "05 SET 2024",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tendências em Naturalidade",
    excerpt: "A nova era da estética preza por resultados imperceptíveis. Conheça os procedimentos queridinhos do momento.",
    date: "28 SET 2024",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
  }
];

export const Blog: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Dicas & Bem-estar" 
          subtitle="Conteúdo exclusivo para você se cuidar melhor todos os dias." 
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {POSTS.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="space-y-3">
                <span className="text-xs font-medium text-rose-400 tracking-widest">{post.date}</span>
                <h3 className="font-serif text-2xl text-gray-900 group-hover:text-rose-500 transition-colors">
                    {post.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
                
                <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-3 transition-all border-b border-rose-200 pb-0.5">
                        Ler artigo <ArrowRight className="w-4 h-4 text-rose-400" />
                    </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};