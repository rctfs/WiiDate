import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const GENERAL_TRACK = "/audio/general-theme.mp3";
const PICKER_TRACK = "/audio/date-outfit-picker.mp3";
const PICKER_PATH = "/mii-editor";

// Background music: one song across the site, another on the Date Outfit Picker page.
// Browsers block autoplay, so playback starts after the visitor's first interaction.
const MusicPlayer = () => {
    const { pathname } = useLocation();
    const general = useRef(null);
    const picker = useRef(null);
    const unlocked = useRef(false);
    const pathRef = useRef(pathname);

    // Plays the song that belongs to the current page and pauses the other.
    const sync = () => {
        if (!unlocked.current) return;
        const isPicker = pathRef.current === PICKER_PATH;
        const [active, inactive] = isPicker
            ? [picker.current, general.current]
            : [general.current, picker.current];
        inactive.pause();
        active.play().catch(() => {});
    };

    useEffect(() => {
        general.current = new Audio(GENERAL_TRACK);
        picker.current = new Audio(PICKER_TRACK);
        general.current.loop = true;
        picker.current.loop = true;
        picker.current.preload = "none";

        const unlock = () => {
            unlocked.current = true;
            sync();
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };
        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);

        return () => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
            general.current.pause();
            picker.current.pause();
        };
    }, []);

    useEffect(() => {
        pathRef.current = pathname;
        sync();
    }, [pathname]);

    return null;
};

export default MusicPlayer;
