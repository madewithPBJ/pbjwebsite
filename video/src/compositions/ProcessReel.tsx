import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

export const PROCESS_CLIP_COUNT = 4;
export const PROCESS_CLIP_SEC = 2;
export const PROCESS_TRANSITION_FRAMES = 15;

const CLIPS = Array.from({ length: PROCESS_CLIP_COUNT }, (_, i) =>
  `clips-process/clip-${String(i + 1).padStart(2, "0")}.mp4`
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
        trimAfter={PROCESS_CLIP_SEC * fps}
      />
    </AbsoluteFill>
  );
};

export const ProcessReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const clipFrames = PROCESS_CLIP_SEC * fps;

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
          timing={linearTiming({ durationInFrames: PROCESS_TRANSITION_FRAMES })}
        />
      );
    }
    return items;
  });

  return (
    <AbsoluteFill style={{ background: "#1a0a0a" }}>
      <TransitionSeries>{children}</TransitionSeries>
      <AbsoluteFill
        style={{ background: "rgba(0,0,0,0.52)", pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
