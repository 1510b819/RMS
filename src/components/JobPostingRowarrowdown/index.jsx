import React from "react";
import { Img, Text } from "./..";

export default function JobPostingRowarrowdown({ sortby = "Sort by:", latest = "Latest", ...props }) {
  return (
    <div {...props}>
      <div className="flex flex-wrap gap-3">
        <Text as="p" className="self-end !text-gray-900_01">
          {sortby}
        </Text>
        <Text as="p" className="self-start !text-light_blue-800">
          {latest}
        </Text>
      </div>
      <Img src="images/img_arrow_down_gray_900_01.svg" alt="arrowdown_one" className="mr-1 mt-[5px] h-[16px]" />
    </div>
  );
}
