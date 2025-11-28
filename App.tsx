
import React, { useState } from 'react';
import { SectionTitle } from './components/SectionTitle';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { MapPin, Phone, Clock, Instagram, Menu, X, ArrowRight } from 'lucide-react';

// Service data
const SERVICES = [
  {
    title: "Harmonização Facial",
    description: "Realce seus traços naturais com procedimentos minimamente invasivos que equilibram a simetria facial.",
    icon: "✨"
  },
  {
    title: "Bioestimuladores",
    description: "Recupere o colágeno e a firmeza da pele com tecnologia avançada para um rejuvenescimento duradouro.",
    icon: "💧"
  },
  {
    title: "Protocolos Corporais",
    description: "Tratamentos exclusivos para contorno corporal, celulite e gordura localizada com resultados visíveis.",
    icon: "🌸"
  },
  {
    title: "Limpeza de Pele Premium",
    description: "Um ritual de purificação e hidratação profunda para restaurar o brilho natural da sua pele.",
    icon: "🌿"
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-white flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-rose-100 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl text-rose-900 tracking-wide font-medium">Miriah</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Início', 'Serviços', 'Resultados', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-rose-500 font-light text-sm tracking-wide transition-colors">
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/5511914176847" 
              className="px-6 py-2 bg-rose-900 text-white rounded-full text-sm hover:bg-rose-800 transition-all shadow-md shadow-rose-200"
            >
              Agendar
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">
             {['Início', 'Serviços', 'Resultados', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-gray-800 hover:text-rose-500"
              >
                {item}
              </a>
            ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="início" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -z-10 rounded-l-[100px]"></div>
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium tracking-widest uppercase">
              Estética Avançada
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[1.1]">
              Realce sua beleza <br/>
              <span className="italic font-light text-rose-400">naturalmente.</span>
            </h1>
            <p className="font-light text-gray-600 text-lg leading-relaxed max-w-md">
              Protocolos exclusivos pensados para revelar a sua melhor versão. Tecnologia e cuidado em um ambiente acolhedor.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#contato" className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all flex items-center gap-2">
                Agendar Consulta <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#serviços" className="px-8 py-3 border border-gray-200 text-gray-600 rounded-full hover:border-rose-300 hover:text-rose-500 transition-all">
                Conhecer Tratamentos
              </a>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl shadow-rose-100 relative z-10">
                <img 
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" 
                    alt="Mulher com pele radiante" 
                    className="w-full h-full object-cover"
                />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[20px] border-white rounded-full bg-rose-200 z-20 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <SectionTitle 
            title="Nossos Protocolos" 
            subtitle="Procedimentos desenhados para harmonizar, rejuvenescer e cuidar de você." 
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-white border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="font-serif text-xl text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm font-light text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials */}
      <Testimonials />

      {/* Blog */}
      <Blog />

      {/* Stats/Trust */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
              {[
                  { num: "5k+", label: "Procedimentos Realizados" },
                  { num: "98%", label: "Satisfação dos Clientes" },
                  { num: "10+", label: "Anos de Experiência" },
                  { num: "100%", label: "Dedicação a Você" }
              ].map((stat, i) => (
                  <div key={i} className="p-4">
                      <div className="font-serif text-4xl md:text-5xl text-rose-300 mb-2">{stat.num}</div>
                      <div className="text-gray-400 text-xs tracking-widest uppercase">{stat.label}</div>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 bg-rose-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-[40px] shadow-xl shadow-rose-100 overflow-hidden flex flex-col md:flex-row">
             <div className="p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="font-serif text-4xl text-gray-900 mb-6">Agende sua avaliação</h2>
                <p className="font-light text-gray-600 mb-8">
                    Venha nos conhecer e descubra o tratamento ideal para você. Estamos esperando sua visita com um café especial.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-rose-200 transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">WhatsApp</p>
                            <p className="text-lg text-gray-800 font-medium">(11) 91417-6847</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group hover:translate-x-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Endereço</p>
                            <p className="text-lg text-gray-800 font-medium">Rua Oscar Freire, 1234 - Jardins, SP</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group hover:translate-x-1 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Horário</p>
                            <p className="text-lg text-gray-800 font-medium">Seg a Sex: 09h às 20h</p>
                        </div>
                    </div>
                </div>
             </div>
             <div className="md:w-1/2 bg-rose-200 relative min-h-[400px]">
                <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
                    alt="Interior da clínica" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-rose-900/10 mix-blend-multiply"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
                <span className="font-serif text-2xl text-rose-900 font-bold">Miriah</span>
                <p className="text-xs text-gray-400 mt-2">© 2024 Miriah Estética. Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors"><Phone className="w-5 h-5" /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
