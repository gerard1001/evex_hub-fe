"use client";

import { useDispatch, useSelector } from "@/src/lib/redux";
import { fetchOrgs, selectOrg } from "@/src/lib/redux/slices/orgSlice";
import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

interface IImgIdx {
  [key: number]: number;
}

interface IImgIdxBool {
  [key: number]: boolean;
}

const page = () => {
  const dispatch = useDispatch();
  const orgs = useSelector(selectOrg);

  const [currentIndex, setCurrentIndex] = useState<IImgIdx>({});

  const prevSlide = (slides: string[], pIdx: number) => {
    const isFirstSlide = currentIndex[pIdx] === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex[pIdx] - 1;
    setCurrentIndex((value) => ({
      ...value,
      [pIdx]: newIndex,
    }));
  };

  const nextSlide = (slides: string[], pIdx: number) => {
    const isLastSlide = currentIndex[pIdx] === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex[pIdx] + 1;
    setCurrentIndex((value) => ({
      ...value,
      [pIdx]: newIndex,
    }));
  };

  useEffect(() => {
    if (orgs?.value) {
      const initialIndexState = Array.from(
        { length: orgs.value.length },
        (_, i) => i
      ).reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {} as IImgIdx);

      setCurrentIndex(initialIndexState);
    }
  }, [orgs?.value]);

  useEffect(() => {
    const incrementValues = () => {
      const updatedObject: any = { ...currentIndex };

      Object.keys(updatedObject).forEach((key: any) => {
        currentIndex[key] >= orgs?.value[key]?.images?.length - 1
          ? (updatedObject[key] = 0)
          : updatedObject[key]++;
      });
      setCurrentIndex(updatedObject);
    };

    const intervalId = setInterval(incrementValues, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    dispatch(fetchOrgs());
  }, [dispatch]);

  return (
    <div className="">
      <div className="flex gap-3">
        {orgs?.value &&
          orgs?.value?.map((value: IOrg, idx: number) => {
            return (
              <div
                className="max-w-[600px] h-[500px] w-full m-auto py-16 px-4 relative group"
                key={value.id}
              >
                <div
                  style={{
                    backgroundImage: `url(${value?.images[currentIndex[idx]]})`,
                  }}
                  className="w-[full] h-full rounded-2xl bg-center bg-cover duration-500"
                ></div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft
                    onClick={() => prevSlide(value?.images, idx)}
                    size={30}
                  />
                </div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight
                    onClick={() => nextSlide(value?.images, idx)}
                    size={30}
                  />
                </div>
                {/* 
                <div className="flex top-2 justify-center py-2">
                  {value?.images.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className="text-2xl cursor-pointer"
                    >
                      <RxDotFilled />
                    </div>
                  ))}
                </div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;

interface IOrg {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  location: string;
  images: string[];
  media?: string;
}
