import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

export const CLIP_COUNT = 9;
export const CLIP_SEC = 2;
export const TRANSITION_FRAMES = 15;

// Drop your clips into video/public/clips/ named clip-01.mp4 through clip-10.mp4
const CLIPS = Array.from({ length: CLIP_COUNT }, (_, i) =>
  `clips/clip-${String(i + 1).padStart(2, "0")}.mp4`
);

const ClipScene: React.FC<{ src: string }> = ({ src }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        muted
        playbackRate={0.65}
        trimAfter={CLIP_SEC * fps}
      />
    </AbsoluteFill>
  );
};

export const HeroReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const clipFrames = CLIP_SEC * fps;

  const children = CLIPS.flatMap((clip, i) => {
    const items: React.ReactNode[] = [
      <TransitionSeries.Sequence
        key={clip}
        durationInFrames={clipFrames}
        premountFor={fps}
      >
        <ClipScene src={clip} />
      </TransitionSeries.Sequence>,
    ];
    if (i < CLIPS.length - 1) {
      items.push(
        <TransitionSeries.Transition
          key={`t-${i}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
      );
    }
    return items;
  });

  return (
    <AbsoluteFill style={{ background: "#1a0a0a" }}>
      <TransitionSeries>{children}</TransitionSeries>
      {/* Consistent dark overlay across all clips */}
      <AbsoluteFill
        style={{ background: "rgba(0,0,0,0.52)", pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
