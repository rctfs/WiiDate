import EmptyChannel from "./EmptyChannel";
import JournalChannel from "./JournalChannel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MatchaChannel from "./MatchaChannel";
import MmFooter from "./MmFooter";
import MmFooterMobile from "./MmFooterMobile";
import { useMediaQuery } from "react-responsive";
import MiiEditorChannel from "./MiiEditorChannel";
import UnderConstructionChannel from "./UnderConstructionChannel";

export default function MainMenu() {
    const [fadeIn, setFadeIn] = useState(false);
    const isMdOrLarger = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div
            className={`mm-striped-bg bg-gray-100 min-h-screen flex flex-col ${
                fadeIn ? "fade-in" : ""
            }`}
        >
            <div className="flex-grow md:h-[100vh] md:overflow-auto md:pb-0 pb-20">
                <div className="md:flex flex-wrap xl:px-32 md:pt-4 p-3 pt-14 justify-center md:pb-24">
                    <Link to={"/about-me"} className="md:w-1/4 md:p-[0.4vh]">
                        <JournalChannel />
                    </Link>
                    <Link
                        to={"/mii-editor"}
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <MiiEditorChannel />
                    </Link>
                    <Link
                        to={"/matcha"}
                        className="md:w-1/4 md:p-[0.4vh]"
                    >
                        <MatchaChannel />
                    </Link>
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="md:w-1/4 md:p-[0.4vh]">
                            <UnderConstructionChannel />
                        </div>
                    ))}
                    {isMdOrLarger && (
                        <>
                            <div className="md:w-1/4 md:p-[0.4vh]">
                                <EmptyChannel />
                            </div>
                            <div className="md:w-1/4 md:p-[0.4vh]">
                                <EmptyChannel />
                            </div>
                            <div className="md:w-1/4 md:p-[0.4vh]">
                                <EmptyChannel />
                            </div>
                            <div className="md:w-1/4 md:p-[0.4vh]">
                                <EmptyChannel />
                            </div>
                            <div className="md:w-1/4 md:p-[0.4vh]">
                                <EmptyChannel />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-auto">
                {isMdOrLarger ? <MmFooter /> : <MmFooterMobile />}
            </div>
        </div>
    );
}
