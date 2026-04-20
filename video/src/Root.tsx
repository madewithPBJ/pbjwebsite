import { Composition, registerRoot } from "remotion";
import { HeroReel, CLIP_COUNT, CLIP_SEC, TRANSITION_FRAMES } from "./compositions/HeroReel";
import { ProcessReel, PROCESS_CLIP_COUNT, PROCESS_CLIP_SEC, PROCESS_TRANSITION_FRAMES } from "./compositions/ProcessReel";
import { WhoWeAreReel, WWA_CLIP_COUNT, WWA_CLIP_SEC, WWA_TRANSITION_FRAMES } from "./compositions/WhoWeAreReel";

const FPS = 30;
const heroFrames = CLIP_COUNT * CLIP_SEC * FPS - (CLIP_COUNT - 1) * TRANSITION_FRAMES;
const processFrames = PROCESS_CLIP_COUNT * PROCESS_CLIP_SEC * FPS - (PROCESS_CLIP_COUNT - 1) * PROCESS_TRANSITION_FRAMES;
const wwaFrames = WWA_CLIP_COUNT * WWA_CLIP_SEC * FPS - (WWA_CLIP_COUNT - 1) * WWA_TRANSITION_FRAMES;

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroReel"
        component={HeroReel}
        durationInFrames={heroFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProcessReel"
        component={ProcessReel}
        durationInFrames={processFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="WhoWeAreReel"
        component={WhoWeAreReel}
        durationInFrames={wwaFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
