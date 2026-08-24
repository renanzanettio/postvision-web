"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

export type Theme = "light" | "dark";
export type FontSize = "small" | "normal" | "large";
export type Language = "pt" | "en" | "es";

const THEME_KEY = "pv_theme";
const FONT_SIZE_KEY = "pv_font_size";
const LANGUAGE_KEY = "pv_language";

/**
 * Dicionário de traduções.
 *
 * Cobre a tela de Configurações (o pedido original) e alguns textos
 * compartilhados. Para traduzir o resto do site, basta ir adicionando
 * chaves novas aqui e trocando o texto estático pelo `t("chave")`
 * nos componentes — a infraestrutura (contexto + persistência) já
 * funciona para o app inteiro.
 */
const dictionaries = {
  pt: {
    "settings.title": "Configurações",
    "settings.section.accessibility": "Acessibilidade",
    "settings.theme": "Alterar tema",
    "settings.theme.light": "Claro",
    "settings.theme.dark": "Escuro",
    "settings.fontSize": "Tamanho da Fonte",
    "settings.fontSize.small": "Pequeno",
    "settings.fontSize.normal": "Normal",
    "settings.fontSize.large": "Grande",
    "settings.language": "Idioma",
    "settings.section.privacy": "Privacidade e Dados",
    "settings.history": "Histórico de análises realizadas",
    "settings.download": "Baixar Relatório de Desempenho",
    "settings.clearCache": "Limpar dados de cache",
    "settings.section.support": "Ajuda e Suporte",
    "settings.faq": "FAQ",
    "settings.feedback": "Enviar feedback",
    "settings.report": "Reportar problema",
    "settings.contact": "Contato para Suporte",
    "settings.cacheCleared": "Cache limpo com sucesso!",
    "settings.cacheClearing": "Limpando...",
    "settings.downloadPreparing": "Gerando...",
    "settings.downloadDone": "Relatório baixado!",
    "settings.downloadError": "Não foi possível gerar o relatório.",
    "history.title": "Histórico de análises",
    "history.close": "Fechar",
    "history.empty": "Nenhuma análise registrada ainda.",
    "history.loading": "Carregando histórico...",
    "history.error": "Não foi possível carregar o histórico.",
    "history.duration": "Duração",
    "history.correct": "Corretas",
    "history.incorrect": "Incorretas",
    "history.accuracy": "Precisão",
  },
  en: {
    "settings.title": "Settings",
    "settings.section.accessibility": "Accessibility",
    "settings.theme": "Change theme",
    "settings.theme.light": "Light",
    "settings.theme.dark": "Dark",
    "settings.fontSize": "Font Size",
    "settings.fontSize.small": "Small",
    "settings.fontSize.normal": "Normal",
    "settings.fontSize.large": "Large",
    "settings.language": "Language",
    "settings.section.privacy": "Privacy & Data",
    "settings.history": "Analysis history",
    "settings.download": "Download Performance Report",
    "settings.clearCache": "Clear cache data",
    "settings.section.support": "Help & Support",
    "settings.faq": "FAQ",
    "settings.feedback": "Send feedback",
    "settings.report": "Report a problem",
    "settings.contact": "Support Contact",
    "settings.cacheCleared": "Cache cleared successfully!",
    "settings.cacheClearing": "Clearing...",
    "settings.downloadPreparing": "Generating...",
    "settings.downloadDone": "Report downloaded!",
    "settings.downloadError": "Couldn't generate the report.",
    "history.title": "Analysis history",
    "history.close": "Close",
    "history.empty": "No analyses recorded yet.",
    "history.loading": "Loading history...",
    "history.error": "Couldn't load the history.",
    "history.duration": "Duration",
    "history.correct": "Correct",
    "history.incorrect": "Incorrect",
    "history.accuracy": "Accuracy",
  },
  es: {
    "settings.title": "Configuración",
    "settings.section.accessibility": "Accesibilidad",
    "settings.theme": "Cambiar tema",
    "settings.theme.light": "Claro",
    "settings.theme.dark": "Oscuro",
    "settings.fontSize": "Tamaño de Fuente",
    "settings.fontSize.small": "Pequeño",
    "settings.fontSize.normal": "Normal",
    "settings.fontSize.large": "Grande",
    "settings.language": "Idioma",
    "settings.section.privacy": "Privacidad y Datos",
    "settings.history": "Historial de análisis",
    "settings.download": "Descargar Informe de Rendimiento",
    "settings.clearCache": "Borrar datos de caché",
    "settings.section.support": "Ayuda y Soporte",
    "settings.faq": "Preguntas frecuentes",
    "settings.feedback": "Enviar comentarios",
    "settings.report": "Reportar un problema",
    "settings.contact": "Contacto de Soporte",
    "settings.cacheCleared": "¡Caché borrada con éxito!",
    "settings.cacheClearing": "Borrando...",
    "settings.downloadPreparing": "Generando...",
    "settings.downloadDone": "¡Informe descargado!",
    "settings.downloadError": "No se pudo generar el informe.",
    "history.title": "Historial de análisis",
    "history.close": "Cerrar",
    "history.empty": "Aún no hay análisis registrados.",
    "history.loading": "Cargando historial...",
    "history.error": "No se pudo cargar el historial.",
    "history.duration": "Duración",
    "history.correct": "Correctas",
    "history.incorrect": "Incorrectas",
    "history.accuracy": "Precisión",
  },
} as const;

type DictKey = keyof typeof dictionaries["pt"];

interface AppSettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: DictKey) => string;
}

const AppSettingsContext = createContext<AppSettingsContextType>({
  theme: "light",
  setTheme: () => {},
  fontSize: "normal",
  setFontSize: () => {},
  language: "pt",
  setLanguage: () => {},
  t: (key) => key,
});

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");
  const [language, setLanguageState] = useState<Language>("pt");
  const pathname = usePathname();

  // Rotas públicas (home, login, cadastro) sempre ficam no modo claro,
  // independente da preferência salva — o modo escuro é só pro dashboard.
  const isPublicRoute =
    pathname === "/" || pathname?.startsWith("/Entrar") || pathname?.startsWith("/Cadastro");

  // Carrega preferências salvas assim que monta no cliente
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const savedFontSize = localStorage.getItem(FONT_SIZE_KEY) as FontSize | null;
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language | null;

    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    if (savedFontSize === "small" || savedFontSize === "normal" || savedFontSize === "large") {
      setFontSizeState(savedFontSize);
    }
    if (savedLanguage === "pt" || savedLanguage === "en" || savedLanguage === "es") {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Aplica o tema no <html> — mas força claro nas páginas públicas
  useEffect(() => {
    const shouldApplyDark = theme === "dark" && !isPublicRoute;
    document.documentElement.classList.toggle("dark", shouldApplyDark);
  }, [theme, isPublicRoute]);

  // Aplica o tamanho de fonte no <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  // Aplica o idioma no <html lang="">
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }

  function setFontSize(newSize: FontSize) {
    setFontSizeState(newSize);
    localStorage.setItem(FONT_SIZE_KEY, newSize);
  }

  function setLanguage(newLang: Language) {
    setLanguageState(newLang);
    localStorage.setItem(LANGUAGE_KEY, newLang);
  }

  function t(key: DictKey) {
    return dictionaries[language]?.[key] ?? dictionaries.pt[key] ?? key;
  }

  return (
    <AppSettingsContext.Provider
      value={{ theme, setTheme, fontSize, setFontSize, language, setLanguage, t }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  return useContext(AppSettingsContext);
}
