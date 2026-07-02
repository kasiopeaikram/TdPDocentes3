import { useState, useEffect } from 'react';
import {
  ChevronDown,
  BookOpen,
  ClipboardList,
  School,
  Eye,
  Home,
  Brain,
  Heart,
  ArrowUp,
  Menu,
  X,
  FileText,
  Video,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Users,
  Quote,
  Sun,
  Moon,
} from 'lucide-react';

const menuItems = [
  { id: 'bibliografia', label: 'Bibliografia', icon: BookOpen },
  { id: 'actividades', label: 'Actividades', icon: ClipboardList },
  { id: 'escuela', label: 'Escuela', icon: School },
  { id: 'observaciones', label: 'Observaciones', icon: Eye },
  { id: 'residencias', label: 'Residencias', icon: Home },
  { id: 'ia', label: 'IA', icon: Brain },
  { id: 'cierre', label: 'Cierre', icon: Heart },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = menuItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen gradient-bg dark:bg-[#0f0a1e] transition-colors duration-300">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass dark:border-b dark:border-violet-900/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-violet flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-violet-900 dark:text-violet-200 hidden sm:block">
                Taller de Practicas Docentes III
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300'
                      : 'text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/40 hover:text-violet-800 dark:hover:text-violet-200'
                  }`}
                >
                  <item.icon className="w-4 h-4 inline-block mr-1" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* ========== INTERRUPTOR: Modo Oscuro ========== */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Alternar modo oscuro"
                className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, #4c1d95, #6d28d9)'
                    : 'linear-gradient(135deg, #a78bfa, #c4b5fd)',
                }}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
                    darkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {darkMode ? (
                    <Moon className="w-3.5 h-3.5 text-violet-700" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  )}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/40 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#1a0f35]/95 backdrop-blur-lg border-t border-violet-100 dark:border-violet-900/50 animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/40 transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ==================== PORTADA ==================== */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 dark:bg-violet-900/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pastel-yellow/40 dark:bg-violet-800/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <br></br>
            <br></br>
            <h1 className="text-5xl md:text-7xl font-bold text-violet-900 dark:text-violet-100 mb-4 leading-tight">
              Taller de Practicas
              <br />
              <span className="text-gradient">Docentes III</span>
            </h1>
            <div className="mt-8 flex items-center justify-center gap-6">
              {/* ========== IMAGEN: Foto circular del profesor ========== */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-violet-200 dark:bg-violet-800 flex-shrink-0 border-4 border-violet-300 dark:border-violet-600 shadow-lg">
                <img
                  src="img/0_inicio/0.png"
                  alt="Foto del profesor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium text-violet-600 dark:text-violet-400">Profesor de Cátedra:</p>
                {/* ========== TEXTO: Nombre del Profesor ========== */}
                <p className="text-lg text-violet-800 dark:text-violet-200 font-semibold">
                  Brian Dirr
                </p>
              </div>
            </div>
            {/* ========== TITULO: Alumnas ========== */}
            <p className="mt-10 text-lg font-semibold text-violet-700 dark:text-violet-300">Alumnas:</p>

            <div className="mt-4 flex flex-wrap justify-center gap-6">
              {/* ========== ALUMNA 1: Karina Abalos ========== */}
              <div className="flex items-center gap-4 bg-white/80 dark:bg-violet-950/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-soft card-hover">
                {/* ========== IMAGEN: Foto circular de Karina ========== */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-violet-200 dark:bg-violet-800 flex-shrink-0 border-2 border-violet-200 dark:border-violet-600 shadow-md">
                  <img
                    src="img/0_inicio/1.png"
                    alt="Karina Abalos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-violet-800 dark:text-violet-200">Karina Abalos</p>
              </div>
              {/* ========== ALUMNA 2: Tatiana Cespedes ========== */}
              <div className="flex items-center gap-4 bg-white/80 dark:bg-violet-950/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-soft card-hover">
                {/* ========== IMAGEN: Foto circular de Tatiana ========== */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-violet-200 dark:bg-violet-800 flex-shrink-0 border-2 border-violet-200 dark:border-violet-600 shadow-md">
                  <img
                    src="img/0_inicio/2.png"
                    alt="Tatiana Cespedes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-violet-800 dark:text-violet-200">Tatiana Cespedes</p>
              </div>
            </div>
                <br></br><br></br><br></br>
                  <div className="text-center mb-12">
                    <h2 className="section-title">𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐚𝐜𝐢𝐨́𝐧</h2>
                  </div>
                <p className="text-lg text-violet-800 dark:text-violet-200 font-semibold">
                  Este espacio digital documenta el proceso de formación desarrollado en Taller de Prácticas Docentes III. En él compartimos nuestras experiencias, observaciones institucionales, propuestas didácticas, recursos y reflexiones construidas durante las prácticas docentes de campo a cargo de la <b><u>Profesora Inés Rodriguez</u></b>. Nuestro propósito es evidenciar el aprendizaje alcanzado y la construcción progresiva del rol docente, inspirados en una enseñanza innovadora, reflexiva y centrada en los estudiantes.
                </p>
            {/* ========== IMAGEN: Imagen principal de portada ========== */}
            <div className="mt-12">
              <div className="w-full max-w-2xl mx-auto h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg bg-violet-100 dark:bg-violet-900/40">
                <img
                  src="img/0_inicio/menu.png"
                  alt="Educacion Inclusiva - Mel Ainscow"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
                

          </div>
        </div>
      </section>

      {/* ==================== SECCION 1: BIBLIOGRAFIA ==================== */}
      <section id="bibliografia" className="py-20 bg-white dark:bg-[#0f0a1e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Bibliografia</h2>
            {/* ========== TEXTO: Descripcion de la seccion bibliografia ========== */}
            <p className="text-violet-600 dark:text-violet-400 max-w-2xl mx-auto">
              Esta unidad reúne la bibliografía introductoria e Incluye los textos base que orientan el desarrollo de las actividades y reflexiones.
            </p>
          </div>
          <br></br><br></br>
            <div className="text-center mb-12">
              <h2 className="section-title"><u>𝑨𝒄𝒄𝒆𝒅𝒆́ 𝒂 𝒍𝒂𝒔 𝑼𝒏𝒊𝒅𝒂𝒅𝒆𝒔 𝒂 𝑻𝒓𝒂𝒗𝒆́𝒔 𝒅𝒆 𝐂𝐥𝐢𝐜𝐤𝐬</u></h2>
            </div>
          {/* ==================== 4 CAPITULOS INDIVIDUALES ==================== */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* ========== CAPITULO 1 ========== */}
            <a
              href="https://drive.google.com/drive/folders/1Sp6ryi5pFk5DwvW0U8K-I3UJ2QDF7EDe"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-card dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-2xl p-6 shadow-soft card-hover cursor-pointer group block"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {/* ========== TEXTO: Titulo Capitulo 1 ========== */}
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Unidad 1</h3>
              {/* ========== TEXTO: Descripcion Capitulo 1 ========== */}
              <p className="text-sm text-violet-500 dark:text-violet-400">
                Esta unidad reúne la bibliografía introductoria e Incluye los textos base que orientan el desarrollo de las actividades y reflexiones.
              </p>
            </a>

            {/* ========== CAPITULO 2 ========== */}
            <a
              href="https://drive.google.com/drive/folders/1giFv3dKjQvMKPsclJXKfm6Ru06739jGp"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-card dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-2xl p-6 shadow-soft card-hover cursor-pointer group block"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {/* ========== TEXTO: Titulo Capitulo 2 ========== */}
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Unidad 2</h3>
              {/* ========== TEXTO: Descripcion Capitulo 2 ========== */}
              <p className="text-sm text-violet-500 dark:text-violet-400">
                Esta unidad presenta los textos que amplían y profundizan los temas abordados en clase
              </p>
            </a>

            {/* ========== CAPITULO 3 ========== */}
            <a
              href="https://drive.google.com/drive/folders/1j60cnWChXLKeOOSLdDFxVPRX3-NKA-xq"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-card dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-2xl p-6 shadow-soft card-hover cursor-pointer group block"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {/* ========== TEXTO: Titulo Capitulo 3 ========== */}
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Unidad 3</h3>
              {/* ========== TEXTO: Descripcion Capitulo 3 ========== */}
              <p className="text-sm text-violet-500 dark:text-violet-400">
                Esta unidad contiene la bibliografía destinada al estudio de situaciones educativas, estrategias de intervención y propuestas didácticas.
              </p>
            </a>

            {/* ========== CAPITULO 4 ========== */}
            <a
              href="https://drive.google.com/drive/folders/10nLtBd3Lmz-T4KvFMtUslnn9zG29fmQ6"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-card dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-2xl p-6 shadow-soft card-hover cursor-pointer group block"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {/* ========== TEXTO: Titulo Capitulo 4 ========== */}
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Apuntes de Cátedra</h3>
              {/* ========== TEXTO: Descripcion Capitulo 4 ========== */}
              <p className="text-sm text-violet-500 dark:text-violet-400">
                En este apartado se incluye material de apoyo, apuntes elaborados compartidos por la cátedra como complemento de la bibliografía obligatoria.
              </p>
            </a>
          </div>
        
          {/* Autor */}
          <div className="bg-pastel-violet/50 dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              {/* ========== IMAGEN: Foto de Mel Ainscow ========== */}
              <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center overflow-hidden">
                <img
                  src=""
                  alt="Melina Furman"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">En esta sección se presentan recursos y materiales que promueven una enseñanza innovadora, inclusiva y comprometida con los desafíos de la educación actual.</p>
              </div>
            </div>
          </div>

          {/* ==================== 3 DOCUMENTOS PDF ==================== */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* ========== PDF 1 ========== */}
            <div className="bg-white dark:bg-violet-950/60 rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
              <div className="w-full h-48 bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center">
                <img src="img/1_bibliografia/1.png" alt="Melina Furman" className="w-full h-full object-cover" title="Documento PDF 1" />
              </div>
              <div className="p-4 border-t border-violet-200 dark:border-violet-800/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-violet-500" />
                  <div>
                    <p className="font-medium text-violet-800 dark:text-violet-200">"ENSEÑAR DISTINTO" Melina Furman </p>
                    {/* ========== TEXTO: Nombre del archivo PDF 1 ========== */}
                    <p className="text-sm text-violet-500 dark:text-violet-400">Melina_Furman.pdf</p>
                  </div>
                  <a href="pdf/1_bibliografia/Melina_Furman.pdf" download className="ml-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    Descargar
                  </a>
                </div>
              </div>
            </div>

            {/* ========== PDF 2 ========== */}
            <div className="bg-white dark:bg-violet-950/60 rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
              <div className="w-full h-48 bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center">
                <img src="img/1_bibliografia/2.png" alt="Melina Furman" className="w-full h-full object-cover" title="Documento PDF 1"/>
              </div>
              <div className="p-4 border-t border-violet-200 dark:border-violet-800/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-violet-500" />
                  <div>
                    <p className="font-medium text-violet-800 dark:text-violet-200">La Inteligencia Artificial en la Educación</p>
                    {/* ========== TEXTO: Nombre del archivo PDF 2 ========== */}
                    <p className="text-sm text-violet-500 dark:text-violet-400">IA_en_la_educacion.pdf</p>
                  </div>
                  <a href="pdf/1_bibliografia/IA_en_la_educacion.pdf" download className="ml-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    Descargar
                  </a>
                </div>
              </div>
            </div>

            {/* ========== PDF 3 ========== */}
            <div className="bg-white dark:bg-violet-950/60 rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
              <div className="w-full h-48 bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center">
                <img src="img/1_bibliografia/3.png" alt="Melina Furman" className="w-full h-full object-cover" title="Documento PDF 1"/>
              </div>
              <div className="p-4 border-t border-violet-200 dark:border-violet-800/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-violet-500" />
                  <div>
                    <p className="font-medium text-violet-800 dark:text-violet-200">Guía de Orientación Docente Prov. de Bs As</p>
                    {/* ========== TEXTO: Nombre del archivo PDF 3 ========== */}
                    <p className="text-sm text-violet-500 dark:text-violet-400">Guía_de_Orientación.pdf</p>
                  </div>
                  <a href="pdf/1_bibliografia/Guia_de_Orientacion.pdf" download className="ml-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== VIDEO: Video sobre Aula Inclusiva ========== */}
          <div className="bg-gradient-to-br from-violet-100 to-pastel-yellow-light dark:from-violet-950/60 dark:to-violet-900/40 dark:border dark:border-violet-800/50 rounded-3xl p-8">
            <h3 className="subsection-title flex items-center gap-2 mb-6">
              <Video className="w-6 h-6 text-violet-600" />
              Video: Aula Inclusiva
            </h3>
            {/* Reemplazar VIDEO_ID con el ID del video de YouTube */}
            <div className="w-full h-96 max-w-3xl mx-auto rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-900/40">
              <iframe
                src="https://www.youtube.com/embed/pgejZsoxb18"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Aula Inclusiva"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCION 2: ACTIVIDADES ==================== */}
      <section id="actividades" className="py-20 bg-gradient-to-b from-white to-pastel-violet/30 dark:from-[#0f0a1e] dark:to-[#130d25] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <ClipboardList className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Actividades del Taller de Practicas</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ========== ACTIVIDAD 1: ESI ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft card-hover overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">ESI, Puertas de Entrada y Bullying</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* ========== TEXTO: Descripcion de ESI ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>Cada situación que ocurre en la escuela puede convertirse en una oportunidad para enseñar. El bullying, la convivencia, el respeto por la diversidad y la resolución de conflictos son puertas de entrada que favorecen el abordaje transversal de la Educación Sexual Integral</p>
                </div>
                <div className="bg-pastel-yellow/50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2">Leyes relacionadas:</h4>
                  {/* ========== TEXTO: Leyes de ESI ========== */}
                  <div className="text-sm text-violet-700 dark:text-violet-300">
                    <p>Ley 26.150  - Programa Nacional de Educacion Sexual Integral.</p>
                    <p className="mt-1">Ley 26.206 - Ley de Educacion Nacional.</p>
                  </div>
                </div>
                 {/* ========== TEXTO: Puentes de ensenanza ESI ========== */}

                <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                  <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2">Actividades realizadas:</h4>
                    <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                      <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2"><a href="https://drive.google.com/drive/folders/1hlC2FoMf3Wkl-tT-bdNUqqZbyyOwX7VG?usp=sharing" target='blank_'>📝 <u>Véase la Actividad Aquí</u></a></h4>
                    </div>
                </div>

              </div>
            </div>

            {/* ========== ACTIVIDAD 2: Actividad Inclusiva ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft card-hover overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-violet-700 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Actividad Inclusiva</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* ========== TEXTO: Descripcion de Actividad Inclusiva ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>"La verdadera inclusión comienza cuando dejamos de preguntarnos cómo es el estudiante y empezamos a pensar cómo debe transformarse la enseñanza para que todos puedan aprender"</p>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                  <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2">Actividades realizadas:</h4>
                    <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                      <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2"><a href="https://drive.google.com/drive/folders/1j-imyHF3dBSnFrspHGLWyqAaAnow2n-z?usp=sharing" target='blank_'>📝 <u>Véase la Actividad Aquí</u></a></h4>
                    </div>
                </div>
              </div>
            </div>

            {/* ========== ACTIVIDAD 3: Circulos de Cooperacion ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft card-hover overflow-hidden">
              <div className="bg-gradient-to-r from-violet-700 to-violet-800 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Circulos de Comprención "Marie Kondo"</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* ========== TEXTO: Descripcion de Circulos de Cooperacion ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>Los Círculos de Comprensión constituyen una herramienta para organizar y priorizar los contenidos que realmente favorecen aprendizajes profundos. Su implementación en el aula implica que el docente seleccione aquello que es irrenunciable, lo que los estudiantes deben conocer y aquello con lo que deben familiarizarse, evitando la sobrecarga de contenidos</p>
                </div>
                {/* ========== IMAGENES: Galeria de Circulos de Cooperacion (2 imagenes) ========== */}
                
                <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                  <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2">Actividades realizadas:</h4>
                    <div className="bg-violet-50 dark:bg-violet-900/30 rounded-xl p-4">
                      <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2"><a href="https://drive.google.com/drive/folders/1d3tjm45JD5hTG7DZtUzAcHsFXNuV79GL?usp=sharing" target='blank_'>📝 <u>Véase la Actividad Aquí</u></a></h4>
                    </div>
                </div>
              </div>
            </div>

            {/* ========== ACTIVIDAD 4: Cuadernos Etnograficos ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft card-hover overflow-hidden">
              <div className="bg-gradient-to-r from-violet-800 to-violet-900 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Cuadernos Etnograficos</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* ========== IMAGENES: Galeria de Cuadernos Etnograficos (2 imagenes) ========== */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/2_actividades/1.jpeg" alt="Foto 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/2_actividades/2.jpeg" alt="Foto 2" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCION 3: ESCUELA ==================== */}
      <section id="escuela" className="py-20 bg-white dark:bg-[#0f0a1e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <School className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Escuela Secundaria Nº18 "Santa María De Buenos Aires"</h2>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-pastel-yellow-light dark:from-violet-950/60 dark:to-violet-900/40 dark:border dark:border-violet-800/50 rounded-3xl overflow-hidden shadow-glow">
            {/* ========== IMAGEN: Foto principal de la escuela ========== */}
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-violet-100 dark:bg-violet-900/40">
              <img src="img/3_escuela/1.png" alt="Escuela N18 Pizurno" className="w-full h-full object-cover" />
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-violet-900 dark:text-violet-100 mb-6">
                |Datos
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* ========== TEXTO: Ubicacion de la escuela ========== */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-violet-500 mt-1" />
                    <div>
                      <p className="font-medium text-violet-800 dark:text-violet-200">Ubicacion:</p>
                      <p className="text-violet-600 dark:text-violet-400">B1704 Ramos Mejía, Provincia de Buenos Aires</p>
                    </div>
                  </div>
                  {/* ========== TEXTO: Direccion de la escuela ========== */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-violet-500 mt-1" />
                    <div>
                      <p className="font-medium text-violet-800 dark:text-violet-200">Direccion:</p>
                      <p className="text-violet-600 dark:text-violet-400">Prof. Juan Pizzurno 950</p>
                    </div>
                  </div>
                  {/* ========== TEXTO: Horarios de la escuela ========== */}
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-violet-500 mt-1" />
                    <div>
                      <p className="font-medium text-violet-800 dark:text-violet-200">Horarios:</p>
                      <p className="text-violet-600 dark:text-violet-400">07:25 am - 18:00 pm </p>
                    </div>
                  </div>
                </div>

                {/* ========== MAPA: Google Maps de la escuela ========== */}
                <div className="bg-white dark:bg-violet-950/60 rounded-2xl p-4 shadow-soft">
                  <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Ubicacion en el mapa
                  </h4>
                  <div className="w-full h-48 rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-900/40">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.383009119322!2d-58.54762242001353!3d-34.64202936841827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc80c71f28091%3A0xb870de95458eb462!2sProf.%20Juan%20Pizzurno%20950%2C%20B1704%20Ramos%20Mej%C3%ADa%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1782972874756!5m2!1ses!2sar"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa Escuela N18 Pizurno"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCION 4: OBSERVACIONES Y DIAGNOSTICO ==================== */}
      <section id="observaciones" className="py-20 bg-gradient-to-b from-white to-pastel-violet/40 dark:from-[#0f0a1e] dark:to-[#130d25] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eye className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Observaciones y Diagnostico del Grupo</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* ========== OBSERVACIONES: Karina Abalos ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Karina Abalos</h3>
                    <p className="text-violet-100 text-sm">Observaciones</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* ========== TEXTO: Observaciones de Karina ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>En Construcción...</p>
                  <p className="mt-3">En Construcción...</p>
                </div>
                {/* ========== IMAGENES: Fotografias de Karina ========== */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-32 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/4_observaciones/abalos/1.png" alt="Foto Karina 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/4_observaciones/abalos/1.png" alt="Foto Karina 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* ========== PDF: Documentos de Karina ========== */}
                <div className="bg-white dark:bg-violet-900/30 rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
                  <div className="w-full h-32 bg-violet-50 dark:bg-violet-900/40">
                    <iframe src="pdf/4_observaciones/abalos/En_Construccion.pdf" className="w-full h-full" title="Documento Karina" />
                  </div>
                  <div className="p-3 border-t border-violet-200 dark:border-violet-800/50">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-violet-500" />
                      <span className="text-sm text-violet-600 dark:text-violet-400">documento-karina.pdf</span>
                      <a href="pdf/4_observaciones/abalos/En_Construccion.pdf" download className="ml-auto text-xs px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700">Descargar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== OBSERVACIONES: Tatiana Cespedes ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-violet-600 to-violet-700 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Tatiana Cespedes</h3>
                    <p className="text-violet-100 text-sm">Observaciones</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* ========== TEXTO: Observaciones de Tatiana ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>En Construcción...</p>
                  <p className="mt-3">En Construcción...</p>
                </div>
                {/* ========== IMAGENES: Fotografias de Tatiana ========== */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-32 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/4_observaciones/cespedes/1.png" alt="Foto Tatiana 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                    <img src="img/4_observaciones/cespedes/1.png" alt="Foto Tatiana 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* ========== PDF: Documentos de Tatiana ========== */}
                <div className="bg-white dark:bg-violet-900/30 rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
                  <div className="w-full h-32 bg-violet-50 dark:bg-violet-900/40">
                    <iframe src="pdf/4_observaciones/cespedes/En_Construccion.pdf" className="w-full h-full" title="Documento Tatiana" />
                  </div>
                  <div className="p-3 border-t border-violet-200 dark:border-violet-800/50">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-violet-500" />
                      <span className="text-sm text-violet-600 dark:text-violet-400">documento-tatiana.pdf</span>
                      <a href="pdf/4_observaciones/cespedes/En_Construccion.pdf" download className="ml-auto text-xs px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700">Descargar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== DIAGNOSTICO DEL GRUPO ========== */}
          <div className="bg-gradient-to-br from-violet-100 to-pastel-yellow dark:from-violet-950/60 dark:to-violet-900/40 dark:border dark:border-violet-800/50 rounded-3xl p-8 md:p-12 shadow-glow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-violet flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-violet-900 dark:text-violet-100">Diagnostico del Grupo</h3>
                <p className="text-violet-600 dark:text-violet-400">Analisis conjunto de las estudiantes</p>
              </div>
            </div>
            {/* ========== TEXTO: Diagnostico del grupo ========== */}
            <div className="text-violet-700 dark:text-violet-300">
              <p>En Construcción...</p>
              <p className="mt-4">En Construcción...</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCION 5: RESIDENCIAS ==================== */}
      <section id="residencias" className="py-20 bg-white dark:bg-[#0f0a1e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Home className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Residencias</h2>
            <p className="text-violet-600 dark:text-violet-400 max-w-2xl mx-auto">
              En Construcción...
            </p>
          </div>
          <ResidenciasTabs />
        </div>
      </section>

      {/* ==================== SECCION 6: IA EN LA ENSENANZA ==================== */}
      <section id="ia" className="py-20 bg-gradient-to-b from-pastel-violet/30 to-white dark:from-[#130d25] dark:to-[#0f0a1e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Brain className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">La Inteligencia Artificial en la Enseñanza</h2>
            {/* ========== TEXTO: Descripcion de la seccion IA ========== */}
            <p className="text-violet-600 dark:text-violet-400 max-w-2xl mx-auto">
              "El futuro de la educación no dependerá de cuánta Inteligencia Artificial utilicemos, sino de cómo enseñemos a nuestros estudiantes a pensar con criterio, actuar con ética y aprender de manera autónoma junto a ella"
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* ========== TARJETA 1: Aprendizaje Personalizado ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl p-6 shadow-soft card-hover">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Aprendizaje Personalizado</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400">La Inteligencia Artificial permite adaptar actividades y recursos según las necesidades, intereses y ritmos de aprendizaje de cada estudiante. Esto favorece una enseñanza más flexible, inclusiva y centrada en el desarrollo de las capacidades individuales.</p>
            </div>

            {/* ========== TARJETA 2: Evaluacion Automatizada ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl p-6 shadow-soft card-hover">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center mb-4">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Evaluacion Automatizada</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400">
Las herramientas basadas en IA facilitan la elaboración de evaluaciones, la corrección de actividades objetivas y el análisis del progreso de los estudiantes. De esta manera, el docente puede dedicar más tiempo al acompañamiento pedagógico y a la retroalimentación personalizada.</p>
            </div>

            {/* ========== TARJETA 3: Inclusion Educativa ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl p-6 shadow-soft card-hover">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">Inclusion Educativa</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400">La IA contribuye a eliminar barreras para el aprendizaje mediante recursos accesibles como lectores de texto, subtítulos automáticos, traducción de idiomas y apoyos para estudiantes con diversas necesidades educativas, promoviendo una educación más equitativa e inclusiva.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ========== TEXTO: Contenido principal sobre IA ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl p-8 shadow-glow">
              <h3 className="subsection-title flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-violet-600" />
                Reflexión
              </h3>
              <div className="text-violet-700 dark:text-violet-300 space-y-4">
                <p>La inteligencia artificial (IA) ofrece grandes ventajas, como automatizar tareas, ahorrar tiempo y facilitar el acceso a la información. Sin embargo, también tiene desventajas, como la posible pérdida de empleos, la dependencia de la tecnología y los riesgos para la privacidad. Por ello, es importante utilizarla de forma responsable.</p>
              </div>
            </div>

            {/* ========== IMAGEN: Imagen ilustrativa IA (mas grande) ========== */}
            <div className="h-full min-h-80 rounded-xl overflow-hidden bg-violet-100 dark:bg-violet-900/40">
              <img src="img/6_ia/1.png" alt="Imagen IA" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCION 7: CIERRE Y REFLEXION ==================== */}
      <section id="cierre" className="py-20 bg-gradient-to-b from-white to-pastel-violet/50 dark:from-[#0f0a1e] dark:to-[#1a1035] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h2 className="section-title">Cierre y Reflexion Pedagogica</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* ========== REFLEXION: Karina ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reflexion de Abalos</h3>
                    <p className="text-violet-100 text-sm">Reflexion personal</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* ========== TEXTO: Reflexion de Karina ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>En Construcción...</p>
                </div>
              </div>
            </div>

            {/* ========== REFLEXION: Tatiana ========== */}
            <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/40 rounded-3xl shadow-soft overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-violet-600 to-violet-700 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reflexion de Cespedes</h3>
                    <p className="text-violet-100 text-sm">Reflexion personal</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* ========== TEXTO: Reflexion de Tatiana ========== */}
                <div className="text-violet-700 dark:text-violet-300">
                  <p>En Construcción...</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========== FRASE DESTACADA ========== */}
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-3xl p-8 md:p-12 text-center shadow-glow">
            <Quote className="w-12 h-12 text-violet-200 mx-auto mb-6" />
            {/* ========== TEXTO: Cita destacada ========== */}
            <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed max-w-4xl mx-auto">
              “El objetivo de la educación es crear personas capaces de hacer cosas nuevas, y no simplemente repetir lo que otras generaciones hicieron.”
            </blockquote>
            <p className="mt-6 text-violet-200">Jean Piaget</p>
            {/* ========== TEXTO: Frase adicional ========== */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-900 dark:bg-[#0a0618] text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="font-semibold">Alumnas</span>
              </div>
              <p className="text-violet-200 text-sm">Karina Abalos</p>
              <p className="text-violet-200 text-sm">Tatiana Cespedes</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contactos</h4>
              <p className="text-violet-200 text-sm">kasiopea06@gmail.com</p>
              <p className="text-violet-200 text-sm">tatiana1984soledad@gmail.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Institucion</h4>
              <a href='https://www.instituto46.edu.ar/' target='blank_' rel="noopener noreferrer"><p className="text-violet-200 text-sm"><u>I.S.F.D. y T. Nº46 "2 De Abril" (Ramos Mejía)</u></p></a>
            </div>
          </div>
          <div className="border-t border-violet-700 dark:border-violet-900 pt-8 text-center text-violet-300 text-sm">
            <p>2026 - Taller de Prácticas III | Carrera de Biología</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full gradient-violet text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl z-50"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

// Componente de tabs para Residencias
function ResidenciasTabs() {
  const [activeTab, setActiveTab] = useState<'karina' | 'tatiana'>('karina');

  return (
    <div className="bg-white dark:bg-violet-950/60 dark:border dark:border-violet-800/50 rounded-3xl shadow-glow overflow-hidden">
      <div className="flex border-b border-violet-100 dark:border-violet-800/50">
        <button
          onClick={() => setActiveTab('karina')}
          className={`flex-1 py-4 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'karina'
              ? 'bg-violet-600 text-white'
              : 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50'
          }`}
        >
          <Users className="w-5 h-5" />
          Residencia de Karina Abalos
        </button>
        <button
          onClick={() => setActiveTab('tatiana')}
          className={`flex-1 py-4 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'tatiana'
              ? 'bg-violet-600 text-white'
              : 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50'
          }`}
        >
          <Users className="w-5 h-5" />
          Residencia de Tatiana Cespedes
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'karina' ? <ResidenciaContent name="Karina" /> : <ResidenciaContent name="Tatiana" />}
      </div>
    </div>
  );
}

function ResidenciaContent({ name }: { name: string }) {
  return (
    <div className="space-y-8">
      {/* ========== PLANIFICACION ========== */}
      <div className="bg-gradient-to-br from-violet-50 to-pastel-yellow-light dark:from-violet-900/30 dark:to-violet-950/60 rounded-2xl p-6">
        <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-violet-600" />
          Planificacion
        </h4>
        {/* ========== TEXTO: Planificacion de la residencia ========== */}
        <div className="text-violet-700 dark:text-violet-300">
          <p>En Construcción...</p>
          <p className="mt-3">En Construcción....</p>
        </div>
      </div>

      {/* ========== RED CONCEPTUAL ========== */}
      <div className="bg-white dark:bg-violet-950/40 rounded-2xl p-6 border-2 border-violet-100 dark:border-violet-800/50">
        <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-600" />
          Red Conceptual
        </h4>
        {/* ========== IMAGEN: Red conceptual ========== */}
        <div className="w-full h-64 rounded-xl overflow-hidden bg-violet-100 dark:bg-violet-900/40">
          <img src="" alt={`Red conceptual de ${name}`} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ========== IMAGENES: Galeria de la residencia ========== */}
        <div className="bg-white dark:bg-violet-950/40 rounded-2xl p-6 border-2 border-violet-100 dark:border-violet-800/50">
          <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-violet-600" />
            Imagenes
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {['1', '2', '3', '4'].map((n) => (
              <div key={n} className="aspect-square rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/40">
                <img src="" alt={`Imagen ${n} ${name}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ========== DOCUMENTOS: PDFs de la residencia ========== */}
        <div className="bg-white dark:bg-violet-950/40 rounded-2xl p-6 border-2 border-violet-100 dark:border-violet-800/50">
          <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-600" />
            Documentos
          </h4>
          <div className="space-y-3">
            {['1', '2', '3'].map((n) => (
              <div key={n} className="rounded-xl border-2 border-violet-200 dark:border-violet-800/50 overflow-hidden">
                <div className="h-28 bg-violet-50 dark:bg-violet-900/40">
                  <iframe src="" className="w-full h-full" title={`Documento ${n} ${name}`} />
                </div>
                <div className="p-2 border-t border-violet-200 dark:border-violet-800/50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-500" />
                  <span className="text-sm text-violet-600 dark:text-violet-400 flex-1">documento-{n}.pdf</span>
                  <a href="" download className="text-xs px-2 py-1 bg-violet-600 text-white rounded hover:bg-violet-700">Descargar</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== VIDEOS: Videos de la residencia ========== */}
      <div className="bg-white dark:bg-violet-950/40 rounded-2xl p-6 border-2 border-violet-100 dark:border-violet-800/50">
        <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-violet-600" />
          Videos
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-48 rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-900/40">
            <iframe src="https://www.youtube.com/embed/VIDEO_ID_RESIDENCIA_1" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Video 1 ${name}`} />
          </div>
          <div className="h-48 rounded-xl overflow-hidden bg-violet-50 dark:bg-violet-900/40">
            <iframe src="https://www.youtube.com/embed/VIDEO_ID_RESIDENCIA_2" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Video 2 ${name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
