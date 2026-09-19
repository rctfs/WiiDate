// Same look and behaviour as EmptyChannel (grey border, striped white, not interactive),
// with the builder Mario and a message inside.
const UnderConstructionChannel = () => {
    return (
        <div
            className="ec-striped-bg bg-white rounded-lg px-4 mt-1 border-4 border-gray-300 flex flex-col items-center justify-center gap-1 channel-height select-none"
            aria-disabled="true"
        >
            <img
                src="/Builder_Mario.webp"
                alt="Under construction"
                className="md:w-[5vw] w-20 object-contain"
            />
            <p className="font-rodin text-gray-300 font-bold text-center md:text-[0.95vw] text-sm leading-tight">
                Under construction come back later
            </p>
        </div>
    );
};

export default UnderConstructionChannel;
