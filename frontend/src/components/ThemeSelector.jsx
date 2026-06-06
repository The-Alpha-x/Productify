import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";

const THEMES = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
];

export default function ThemeSelector() {

    const [currentTheme, setCurrentTheme] = useState(() => {
        if (typeof window != "undefined") {
            return window.localStorage.getItem("theme") || "forest";
        } else {
            return "forest";
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
        window.localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
                    <PaletteIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Theme</span>
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
                >
                    {THEMES.map((t) => (
                        <li key={t}>
                            <button
                                onClick={() => setCurrentTheme(t)}
                                className={`flex justify-between ${currentTheme === t ? "bg-primary text-primary-content" : ""
                                    }`}
                            >
                                <span className="capitalize">{t}</span>
                                <div className="flex gap-0.5" data-theme={t}>
                                    <span className="w-2 h-4 rounded-sm bg-primary" />
                                    <span className="w-2 h-4 rounded-sm bg-secondary" />
                                    <span className="w-2 h-4 rounded-sm bg-accent" />
                                    <span className="w-2 h-4 rounded-sm bg-neutral" />
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
