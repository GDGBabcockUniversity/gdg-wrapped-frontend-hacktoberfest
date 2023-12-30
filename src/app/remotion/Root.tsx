import Reace from "react"
import { Composition } from "remotion"
import WrappedComposition from "./WrappedComp";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WrappedComp"
        component={WrappedComposition}
        durationInFrames={3300}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
}
