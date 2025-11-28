import React from 'react';
import { SectionTitle } from './SectionTitle';

const CASES = [
  {
    id: 1,
    title: "Rejuvenescimento Facial",
    desc: "Tratamento com bioestimuladores para recuperação do contorno.",
    imageBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=686&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Harmonização Labial",
    desc: "Definição sutil e hidratação profunda dos lábios.",
    imageBefore: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tratamento de Pele",
    desc: "Protocolo exclusivo para luminosidade e textura.",
    imageBefore: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1795&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop"
  }
];

export const Gallery: React.FC = () => {
  return (
    <section id="resultados" className="py-24 bg-rose-50/30">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Galeria de Resultados" 
          subtitle="Transformações sutis que realçam a beleza natural de cada paciente." 
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {CASES.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500">
              <div className="relative h-64 flex">
                <div className="w-1/2 relative border-r border-white">
                    <img src={item.imageBefore} alt="Antes" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium uppercase tracking-wide">Antes</div>
                </div>
                <div className="w-1/2 relative">
                    <img src={item.imageAfter} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-rose-900/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium uppercase tracking-wide">Depois</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <p className="text-xs text-gray-400 font-light max-w-2xl mx-auto">
                * Os resultados podem variar de acordo com o organismo de cada paciente. As imagens são meramente ilustrativas para demonstrar a proposta dos tratamentos.
            </p>
        </div>
      </div>
    </section>
  );
};