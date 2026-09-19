import { useEffect, useRef } from "react";
import ViewFooter from "./ViewFooter";

const CALENDLY_URL =
    "https://calendly.com/rui-torres-fernandes/terceiro-date-matcha";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

// Loads Calendly's widget script once and resolves with window.Calendly.
let calendlyPromise = null;
const loadCalendly = () => {
    if (window.Calendly) return Promise.resolve(window.Calendly);
    if (!calendlyPromise) {
        calendlyPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = CALENDLY_SCRIPT;
            script.async = true;
            script.onload = () => resolve(window.Calendly);
            script.onerror = () => {
                calendlyPromise = null;
                reject(new Error("Could not load Calendly"));
            };
            document.head.appendChild(script);
        });
    }
    return calendlyPromise;
};

const ScheduleView = () => {
    const containerRef = useRef();

    useEffect(() => {
        let cancelled = false;
        const container = containerRef.current;

        loadCalendly()
            .then((Calendly) => {
                if (cancelled) return;
                container.innerHTML = "";
                Calendly.initInlineWidget({
                    url: CALENDLY_URL,
                    parentElement: container,
                });
            })
            .catch(console.error);

        return () => {
            cancelled = true;
            container.innerHTML = "";
        };
    }, []);

    return (
        <div className="flex flex-col h-screen w-full bg-green-100">
            <div className="flex-1 min-h-0 px-4 pt-4 pb-48 md:pb-[calc(6.6vw+130px)] overflow-y-auto">
                <div
                    ref={containerRef}
                    className="w-full max-w-5xl mx-auto"
                    style={{ minWidth: 320, height: 700 }}
                />
            </div>
            <ViewFooter hideStart />
        </div>
    );
};

export default ScheduleView;
