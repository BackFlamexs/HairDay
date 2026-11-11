export type Theme = "light" | "dark";

/** Mesma chave usada pelo script inline do index.html */
export const THEME_STORAGE_KEY = "hairday:theme";

export const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

/** Tema salvo pelo usuário ou, se não houver, a preferência do sistema */
export const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(saved)) return saved;
  } catch {
    // localStorage indisponível
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem persistência; o tema vale só para esta sessão
  }
};
