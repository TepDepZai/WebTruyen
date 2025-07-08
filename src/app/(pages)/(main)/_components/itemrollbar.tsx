import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

const stories = [
    {
        title: "Đại Quản gia của ta là ma hoàng",
        cover: "https://thuvienanime.net/wp-content/uploads/2023/04/dai-quan-gia-la-ma-hoang-thuvienanime-1.jpg",
        newchap: "Chap 100"
    },
    {
        title: "One Piece",
        cover: "https://static.cdnno.com/poster/one-piece/150.jpg",
        newchap: "Chap 1112"
    },
    {
        title: "Solo Leveling",
        cover: "https://static.cdnno.com/poster/solo-leveling/150.jpg",
        newchap: "Chap 200"
    },
    {
        title: "Thám Tử Lừng Danh Conan",
        cover: "https://static.cdnno.com/poster/tham-tu-lung-danh-conan/150.jpg",
        newchap: "Chap 1110"
    },
    {
        title: "Naruto",
        cover: "https://static.cdnno.com/poster/naruto/150.jpg",
        newchap: "Hoàn thành"
    },
];

const ItemRollBar = () => {
    const plugin = React.useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: true
        }),
    );

    return (
        <div className="w-full mx-auto relative rounded-lg overflow-hidden">
            <Carousel
                className="w-full p-2"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{ loop: true }}>
                <CarouselContent>
                    {stories.map((story, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-3/5 sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
                        >
                            <div className="">
                                <Card className="shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer bg-gradient-to-br from-[#153089] to-[#c6d9ec] border-0 h-full">
                                    <CardContent className="flex flex-row items-center gap-4 p-3 h-full">
                                        {/* Ảnh bên trái */}
                                        <div className="relative w-20 h-28 flex-shrink-0">
                                            <img
                                                src={story.cover}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-white"
                                            />
                                            <span className="absolute top-1 left-1 bg-black/70 text-xs text-white px-2 py-0.5 rounded shadow">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        {/* Thông tin truyện bên phải */}
                                        <div className="flex flex-col justify-center flex-1 min-w-0">
                                            <span className="text-base font-bold text-white text-left line-clamp-2 drop-shadow-lg">
                                                {story.title}
                                            </span>
                                            <span className="text-xs text-yellow-200 mt-2 font-semibold">
                                                {story.newchap}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default ItemRollBar;