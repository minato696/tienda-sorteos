// Archivo: app/lib/themes.ts

type ColorSet = {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  background: {
    main: string;
    alt: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverted: string;
  };
  ui: {
    card: string;
    border: string;
    hover: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
};

type Theme = {
  name: string;
  colors: ColorSet;
};

// Tema vibrante (predeterminado)
const vibrantTheme: Theme = {
  name: 'vibrant',
  colors: {
    primary: '#6320EE',      // Morado intenso
    secondary: '#E61E8C',    // Rosa intenso
    accent: '#00D4FF',       // Cian brillante
    highlight: '#FFB800',    // Amarillo dorado
    background: {
      main: '#F8F9FF',       // Blanco azulado
      alt: '#ECEEFF',        // Gris muy claro con tinte azul
    },
    text: {
      primary: '#1A1C37',    // Casi negro azulado
      secondary: '#4A4B62',  // Gris oscuro
      inverted: '#FFFFFF',   // Blanco
    },
    ui: {
      card: '#FFFFFF',       // Blanco
      border: '#E2E3F3',     // Gris muy claro
      hover: '#F0F1FF',      // Gris azulado claro
    },
    status: {
      success: '#2DD4BF',    // Verde azulado
      warning: '#FBBF24',    // Amarillo
      error: '#F43F5E',      // Rojo rosado
      info: '#3B82F6',       // Azul
    }
  }
};

// Tema Emocionante
const excitingTheme: Theme = {
  name: 'exciting',
  colors: {
    primary: '#FF3131',      // Rojo brillante
    secondary: '#FF901F',    // Naranja intenso
    accent: '#FFDE59',       // Amarillo brillante
    highlight: '#2FDD92',    // Verde menta
    background: {
      main: '#FFFBF5',       // Blanco cálido
      alt: '#FFF4E9',        // Beige muy claro
    },
    text: {
      primary: '#2A2A2A',    // Casi negro
      secondary: '#666666',  // Gris oscuro
      inverted: '#FFFFFF',   // Blanco
    },
    ui: {
      card: '#FFFFFF',       // Blanco
      border: '#EDEDED',     // Gris muy claro
      hover: '#FFF8EE',      // Beige muy claro
    },
    status: {
      success: '#00C853',    // Verde brillante
      warning: '#FFB300',    // Amarillo ámbar
      error: '#FF1744',      // Rojo intenso
      info: '#2979FF',       // Azul brillante
    }
  }
};

// Tema Elegante
const elegantTheme: Theme = {
  name: 'elegant',
  colors: {
    primary: '#6A0DAD',      // Púrpura elegante
    secondary: '#E53935',    // Rojo elegante
    accent: '#00ACC1',       // Turquesa
    highlight: '#FFD700',    // Dorado
    background: {
      main: '#F9FAFB',       // Blanco grisáceo
      alt: '#F3F4F6',        // Gris muy claro
    },
    text: {
      primary: '#111827',    // Casi negro
      secondary: '#4B5563',  // Gris oscuro
      inverted: '#FFFFFF',   // Blanco
    },
    ui: {
      card: '#FFFFFF',       // Blanco
      border: '#E5E7EB',     // Gris claro
      hover: '#F9FAFB',      // Gris muy claro
    },
    status: {
      success: '#10B981',    // Verde esmeralda
      warning: '#F59E0B',    // Ámbar
      error: '#EF4444',      // Rojo
      info: '#3B82F6',       // Azul
    }
  }
};

// Tema Fiesta
const partyTheme: Theme = {
  name: 'party',
  colors: {
    primary: '#8A2BE2',      // Violeta azul
    secondary: '#FF1493',    // Rosa intenso
    accent: '#00FFFF',       // Cian
    highlight: '#FFFF00',    // Amarillo brillante
    background: {
      main: '#F0F8FF',       // Azul alice
      alt: '#E6F0FF',        // Azul muy claro
    },
    text: {
      primary: '#000080',    // Azul marino
      secondary: '#4169E1',  // Azul real
      inverted: '#FFFFFF',   // Blanco
    },
    ui: {
      card: '#FFFFFF',       // Blanco
      border: '#B0C4DE',     // Azul acero claro
      hover: '#E6E6FA',      // Lavanda
    },
    status: {
      success: '#32CD32',    // Verde lima
      warning: '#FFD700',    // Oro
      error: '#FF4500',      // Rojo anaranjado
      info: '#1E90FF',       // Azul dodger
    }
  }
};

const themes: Theme[] = [
  vibrantTheme,  // Posición 0 - tema predeterminado
  excitingTheme,
  elegantTheme,
  partyTheme,
];

// Función para obtener un tema por nombre
export function getThemeByName(name: string): Theme {
  return themes.find(theme => theme.name === name) || themes[0];
}

// Exportamos todos los temas y el tema predeterminado
export const defaultTheme = vibrantTheme;
export const allThemes = themes;