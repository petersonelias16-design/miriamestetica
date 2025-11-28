import React from 'react';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Camila R.",
    initials: "CR",
    text: "A experiência na Miriah foi transformadora. Buscava algo natural e o resultado superou minhas expectativas. O ambiente é acolhedor e a equipe muito profissional.",
    service: "Harmonização Facial"
  },
  {
    id: 2,
    name: "Patrícia S.",
    initials: "PS",
    text: "Faço meus tratamentos de pele aqui há 2 anos. Minha pele nunca esteve tão radiante. É meu momento de paz na semana.",
    service: "Protocolos de Pele"
  },
  {
    id: 3,
    name: "Fernanda M.",
    initials: "FM",
    text: "Profissionalismo impecável. A Dra. explicou tudo com clareza e me senti muito segura. Amei o resultado do bioestimulador!",
    service: "Bioestimuladores"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-50 rounded-br-full -z-10 opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="O que dizem nossas clientes" 
          subtitle="Histórias reais de confiança e autoestima renovada." 
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl border border-rose-50 shadow-lg shadow-rose-100/20 hover:shadow-rose-100/50 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="mb-6 relative">
                 <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-300 group-hover:bg-rose-100 group-hover:text-rose-400 transition-colors">
                    <Quote className="w-5 h-5 fill-current" />
                 </div>
              </div>
              
              <p className="font-serif text-lg text-gray-700 italic mb-6 leading-relaxed">
                "{t.text}"
              </p>
              
              <div className="w-12 h-[1px] bg-rose-200 mb-6"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-800 font-serif font-bold text-sm mb-2">
                  {t.initials}
                </div>
                <h4 className="font-serif text-lg text-gray-900">{t.name}</h4>
                <span className="text-xs text-rose-400 font-medium uppercase tracking-wider mt-1">{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};