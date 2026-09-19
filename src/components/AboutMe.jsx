import PropTypes from "prop-types";
import ViewFooter from "./ViewFooter";

const cards = [
    {
        title: "Lego Sunflowers",
        subtitle: "Lego 40524",
        image: "/lego.png",
    },
    {
        title: "After Hours",
        subtitle: "After Hours by Martin Scorsese",
        image: "/afterhours.jpg",
    },
    { title: null },
    { title: null },
];

const Card = ({ title, subtitle, image }) => (
    <div className="flex flex-col bg-white rounded-xl border-4 border-gray-300 shadow-lg overflow-hidden min-h-0">
        {title && (
            <div className="p-3 text-center">
                <h2 className="font-rodin font-bold text-lg md:text-xl text-orange-900">
                    {title}
                </h2>
                <p className="text-sm text-gray-700 mt-1">{subtitle}</p>
            </div>
        )}
        <div className="flex-1 min-h-[160px] flex items-center justify-center p-3 overflow-hidden">
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="max-w-full max-h-full object-contain"
                />
            ) : (
                <span className="text-gray-300 font-rodin text-xl select-none">
                    To be defined
                </span>
            )}
        </div>
    </div>
);

Card.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
};

const AboutMe = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-orange-200">
            <div className="flex-1 min-h-0 px-4 pt-4 pb-48 md:pb-[calc(6.6vw+130px)] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 h-full auto-rows-[minmax(280px,1fr)]">
                    {cards.map((card, i) => (
                        <Card key={i} {...card} />
                    ))}
                </div>
            </div>
            <ViewFooter />
        </div>
    );
};

export default AboutMe;
