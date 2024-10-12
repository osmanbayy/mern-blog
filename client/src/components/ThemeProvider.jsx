/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="text-gray-700 bg-white dark:text-gray-200 dark:bg-[rgb(35,22,44)] min-h-screen">
        {children}
      </div>
    </div>
  );
}
