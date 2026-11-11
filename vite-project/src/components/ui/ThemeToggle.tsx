import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";
  const Icon = isDark ? RiSunLine : RiMoonLine;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-accent shadow-sm transition hover:bg-slot-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 dark:shadow-none"
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
};
