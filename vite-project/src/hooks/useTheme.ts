import { useCallback, useEffect, useState } from "react";
import { applyTheme, getInitialTheme, saveTheme, type Theme } from "../utils/theme";

/** Tema atual (claro/escuro), aplicado no <html> e salvo no localStorage */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
};
