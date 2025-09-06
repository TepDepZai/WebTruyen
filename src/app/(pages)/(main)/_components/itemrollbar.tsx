import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

const stories = [
  {
    title: "Đại Quản gia của ta là ma hoàng",
    cover:
      "https://thuvienanime.net/wp-content/uploads/2023/04/dai-quan-gia-la-ma-hoang-thuvienanime-1.jpg",
    newchap: "Chap 100",
  },
  {
    title: "One Piece",
    cover: "https://n19.mbmyj.org/media/mbim/b86/b86c86d3b4a3d1b923c916b865d4516a909650b2_429_578_60704.webp",
    newchap: "Chap 1112",
  },
  {
    title: "Solo Leveling",
    cover: "https://n02.mbznp.org/media/mbim/077/07762696df393a9a9043dc1aa06cb8ed6a08449d_392_578_44580.webp",
    newchap: "Chap 200",
  },
  {
    title: "Thám Tử Lừng Danh Conan",
    cover: "https://k01.mbrtz.org/media/mbim/c26/c265df7cfa425dde4bc70d9f02b668f98a3764ca_600_759_119212.webp",
    newchap: "Chap 1110",
  },
  {
    title: "Naruto",
    cover: "https://n04.mbqgu.org/thumb/W600/ampi/872/8722d9c56c5412fb92e9fde72c24bd958932642f_540_720_130673.jpeg",
    newchap: "Hoàn thành",
  },
];

const ItemRollBar = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  return (
    <div className="w-full mx-auto relative rounded-xl overflow-hidden">
      <Carousel
        className="w-full p-2"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {stories.map((story, index) => (
            <CarouselItem
              key={index}
              className="basis-3/5 sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
            >
              <Card className="shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 border-0 h-full">
                <CardContent className="flex flex-row items-center gap-4 p-3 h-full">
                  {/* Cover */}
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <img
                      src={story.cover}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-lg shadow-lg ring-2 ring-transparent hover:ring-yellow-400 transition-all duration-300"
                    />
                    <span className="absolute top-1 left-1 bg-gradient-to-r from-pink-500 to-yellow-400 text-[11px] font-bold text-white px-2 py-0.5 rounded shadow-md">
                      #{index + 1}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <span className="text-sm md:text-base font-bold text-white line-clamp-2 drop-shadow-lg">
                      {story.title}
                    </span>
                    <span className="inline-block mt-2 text-[11px] md:text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-400/90 text-gray-900 w-fit shadow-sm">
                      {story.newchap}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ItemRollBar;
