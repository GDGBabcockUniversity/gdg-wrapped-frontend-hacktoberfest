import { useState } from "react";
import { Sequence } from "remotion";
import VideoPage from "@/app/video/page";

export default function WrappedComposition() {
  const [isDone, setIsDone] = useState<boolean>(false)
  return (
    <>
      <Sequence>
        <VideoPage />
      </Sequence>
    </>
  );
}
