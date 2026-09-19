import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import startButton from "../assets/svgs/start-button.svg";
import blankButton from "../assets/svgs/button-blank.svg";
import wiiMenuButton from "../assets/svgs/wii-menu-button.svg";

// The default "Start" button (formerly the CV link) does nothing for now.
// startLabel + startTo replace it with a text button linking to a route.
// hideStart removes the right-hand button entirely.
const ViewFooter = ({ startLabel, startTo, hideStart }) => {
    // Is screen 600px
    const isMdOrLarger = useMediaQuery({ minHeight: 600 });

    return (
        <footer
            className={`fixed bottom-0 left-0 w-full flex justify-center items-center ec-striped-bg bg-gray-100 border-t-2 border-gray-700 ${
                isMdOrLarger ? "md:py-[3.3vw]" : "md:py-[4vh]"
            } py-8 md:gap-36 gap-2`}
        >
            <Link to={"/main-menu"}>
                <div className="rounded-full border-2 border-[#00C4FF]">
                    <img
                        src={wiiMenuButton}
                        alt="wiiMenuButton"
                        className={`object-contain ${isMdOrLarger ? "md:w-96" : "md:w-[50vh]"} w-48`}
                    />
                </div>
            </Link>
            {!hideStart && startLabel && (
                <Link to={startTo}>
                    <div className="rounded-full border-2 border-[#00C4FF] cursor-pointer">
                        <div
                            className={`relative ${isMdOrLarger ? "md:w-96" : "md:w-[50vh]"} w-48 [container-type:inline-size]`}
                        >
                            <img
                                src={blankButton}
                                alt=""
                                className="w-full object-contain"
                            />
                            <span className="absolute inset-0 flex items-center justify-center pb-[1cqw] font-rodin text-[#383E3F] text-[8.5cqw] whitespace-nowrap">
                                {startLabel}
                            </span>
                        </div>
                    </div>
                </Link>
            )}
            {!hideStart && !startLabel && (
                <div
                    className="rounded-full border-2 border-[#00C4FF]"
                >
                    <img
                        src={startButton}
                        alt="startButton"
                        className={`object-contain ${isMdOrLarger ? "md:w-96" : "md:w-[50vh]"} w-48`}
                    />
                </div>
            )}
        </footer>
    );
};

ViewFooter.propTypes = {
    startLabel: PropTypes.string,
    startTo: PropTypes.string,
    hideStart: PropTypes.bool,
};

export default ViewFooter;
