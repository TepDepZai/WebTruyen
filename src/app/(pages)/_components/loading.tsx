const LoadingPage = () => {
    return (
        <div className="relative w-full h-screen bg-[#f1c40f] overflow-hidden">
            {/* Longfazers */}
            <div className="absolute w-full h-full">
                <span className="absolute h-[2px] w-[20%] bg-black top-[20%] animate-[lf_0.6s_linear_infinite] [animation-delay:-5s]" />
                <span className="absolute h-[2px] w-[20%] bg-black top-[40%] animate-[lf2_0.8s_linear_infinite] [animation-delay:-1s]" />
                <span className="absolute h-[2px] w-[20%] bg-black top-[60%] animate-[lf3_0.6s_linear_infinite]" />
                <span className="absolute h-[2px] w-[20%] bg-black top-[80%] animate-[lf4_0.5s_linear_infinite] [animation-delay:-3s]" />
            </div>

            {/* Vehicle Body */}
            <div className="absolute left-1/2 top-1/2 -ml-[50px] animate-[speeder_0.4s_linear_infinite]">
                <span className="absolute top-[-19px] left-[60px] h-[5px] w-[35px] bg-black rounded-[2px_10px_1px_0]">
                    <span className="absolute top-0 h-[1px] w-[30px] bg-black animate-[fazer1_0.2s_linear_infinite]" />
                    <span className="absolute top-[3px] h-[1px] w-[30px] bg-black animate-[fazer2_0.4s_linear_infinite]" />
                    <span className="absolute top-[1px] h-[1px] w-[30px] bg-black animate-[fazer3_0.4s_linear_infinite] [animation-delay:-1s]" />
                    <span className="absolute top-[4px] h-[1px] w-[30px] bg-black animate-[fazer4_1s_linear_infinite] [animation-delay:-1s]" />
                </span>

                <div className="base relative">
                    <span className="absolute w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[100px] border-r-black before:content-[''] before:absolute before:w-0 before:h-0 before:border-t-0 before:border-b-[16px] before:border-b-transparent before:border-r-[55px] before:border-r-black before:top-[-16px] before:right-[-98px] after:content-[''] after:absolute after:h-[22px] after:w-[22px] after:bg-black after:rounded-full after:top-[-16px] after:right-[-110px]" />
                    <div className="face absolute h-[12px] w-[20px] bg-black rounded-t-full rotate-[-40deg] right-[-125px] top-[-15px] after:content-[''] after:absolute after:h-[12px] after:w-[12px] after:bg-black after:right-[4px] after:top-[7px] after:rotate-[40deg] after:origin-center after:rounded-bl-sm" />
                </div>
            </div>

            {/* Text */}
            <h1 className="absolute left-1/2 top-[58%] -ml-[20px] text-[12px] uppercase font-semibold font-[Open_Sans]">
                Redirecting
            </h1>
        </div>
    );
}

export default LoadingPage;