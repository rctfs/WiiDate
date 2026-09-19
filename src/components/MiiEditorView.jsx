import { useEffect, useRef, useState } from "react";
import ViewFooter from "./ViewFooter";

const RUFFLE_SRC = "/ruffle/ruffle.js";
const SWF_BASE = "/MiiEditor/";
const SWF_URL = `${SWF_BASE}classicGUI.swf`;

// Loads the self-hosted Ruffle script once and resolves with window.RufflePlayer.
let rufflePromise = null;
const loadRuffle = () => {
    if (window.RufflePlayer) return Promise.resolve(window.RufflePlayer);
    if (!rufflePromise) {
        rufflePromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = RUFFLE_SRC;
            script.onload = () => resolve(window.RufflePlayer);
            script.onerror = () => {
                rufflePromise = null;
                reject(new Error("Could not load Ruffle"));
            };
            document.head.appendChild(script);
        });
    }
    return rufflePromise;
};

const MiiEditorView = () => {
    const containerRef = useRef();
    const [status, setStatus] = useState("loading"); // loading | ready | error

    useEffect(() => {
        let player;
        let cancelled = false;

        loadRuffle()
            .then((RufflePlayer) => {
                if (cancelled) return;
                const ruffle = RufflePlayer.newest();
                player = ruffle.createPlayer();
                player.style.width = "100%";
                player.style.height = "100%";
                // Relative asset paths inside the SWF (assets.swf, etc.) resolve from here.
                player.config = {
                    base: SWF_BASE,
                    autoplay: "on",
                    unmuteOverlay: "hidden",
                    letterbox: "on",
                    warnOnUnsupportedContent: false,
                };
                containerRef.current.appendChild(player);
                player.addEventListener("loadedmetadata", () => {
                    if (!cancelled) setStatus("ready");
                });
                return player.ruffle().load(SWF_URL);
            })
            .catch((err) => {
                console.error(err);
                if (!cancelled) setStatus("error");
            });

        return () => {
            cancelled = true;
            if (player) player.remove();
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full bg-sky-100">
            <div className="text-center py-4">
                <h1 className="font-rodin font-bold text-3xl md:text-5xl text-sky-900">
                    Date Outfit Picker
                </h1>
            </div>

            <div className="flex-grow px-4 pb-44 md:pb-40">
                <div className="relative w-full max-w-5xl mx-auto h-[60vh] md:h-[65vh] bg-white rounded-xl border-4 border-gray-300 shadow-xl overflow-hidden">
                    {status === "loading" && (
                        <p className="absolute inset-0 flex items-center justify-center font-rodin text-xl text-gray-500">
                            Loading...
                        </p>
                    )}
                    {status === "error" && (
                        <p className="absolute inset-0 flex items-center justify-center text-center px-6 font-rodin text-xl text-red-600">
                            The Date Outfit Picker could not be loaded.
                        </p>
                    )}
                    <div ref={containerRef} className="w-full h-full" />
                </div>
            </div>

            <div className="mt-auto">
                <ViewFooter />
            </div>
        </div>
    );
};

export default MiiEditorView;
