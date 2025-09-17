"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getItemRollBar } from "@/services/mainPage";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { RollBar } from "../../../../../env/type/type";


  

const ItemRollBar = () => {
  const [itemRollBar, setItemRollBar] = useState<RollBar[]>([]);
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );
  useEffect(() => {
    const reqItemRollBar = async () => {
      const data = await getItemRollBar();

      setItemRollBar(data.books);
    };
    reqItemRollBar();
  }, []);

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
          {itemRollBar.map((story, index) => (
            <CarouselItem
              key={index}
              className="basis-3/5 sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
            >
              <Card className="shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 border-0 h-full">
                <CardContent className="flex flex-row items-center gap-4 p-3 h-full">
                  {/* Cover */}
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <img
                      src={story.img}
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
                      {story.Chapter.length} Chapters
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
