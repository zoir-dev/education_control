import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="lg" className="text-primary" />
    </div>
  );
};

export default Loading;
