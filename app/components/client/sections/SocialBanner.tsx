'use client';

export default function SocialBanner() {
  // Función para abrir enlaces externos
  const openSocial = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-theme-card rounded-2xl shadow-theme-md p-8 overflow-hidden relative">
      {/* Efecto de fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-theme-text-primary mb-3">
          Síguenos en redes sociales
        </h2>
        <p className="text-theme-text-secondary max-w-2xl mx-auto">
          Entérate de nuestros sorteos en vivo, ganadores y nuevos premios. No te pierdas nada.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {/* Facebook */}
        <button
          onClick={() => openSocial('https://facebook.com/sorteospremium')}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-theme-bg-alt transition-all transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </div>
          <span className="text-theme-text-primary font-medium">Facebook</span>
          <span className="text-xs text-theme-text-secondary">@SorteosPremium</span>
        </button>
        
        {/* Instagram */}
        <button
          onClick={() => openSocial('https://instagram.com/sorteospremium')}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-theme-bg-alt transition-all transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428.247-.667.642-1.272 1.153-1.772a4.91 4.91 0 011.772-1.153c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </div>
          <span className="text-theme-text-primary font-medium">Instagram</span>
          <span className="text-xs text-theme-text-secondary">@SorteosPremium</span>
        </button>
        
        {/* YouTube */}
        <button
          onClick={() => openSocial('https://youtube.com/sorteospremium')}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-theme-bg-alt transition-all transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <span className="text-theme-text-primary font-medium">YouTube</span>
          <span className="text-xs text-theme-text-secondary">Sorteos Premium</span>
        </button>
        
        {/* TikTok */}
        <button
          onClick={() => openSocial('https://tiktok.com/@sorteospremium')}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-theme-bg-alt transition-all transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.45 5.45v7.5a4.27 4.27 0 004.25 4.3 4.27 4.27 0 004.35-4.3V8.7a8.55 8.55 0 002.55.33v-3.2a4.4 4.4 0 01-2.7-.83V8.5a4.36 4.36 0 01-3.35-4.35v-2.5c0-.65.15-1.26.35-1.83A4.29 4.29 0 0012.2 5a4.27 4.27 0 004.35 4.3v-3.5h.05z" />
            </svg>
          </div>
          <span className="text-theme-text-primary font-medium">TikTok</span>
          <span className="text-xs text-theme-text-secondary">@SorteosPremium</span>
        </button>
      </div>
      
      {/* Mensaje adicional */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-theme-text-secondary text-sm">
          Síguenos ahora y participa en sorteos exclusivos para nuestros seguidores
        </p>
      </div>
    </div>
  );
}