import React from "react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

export const WWA_CLIP_COUNT = 4;
export const WWA_CLIP_SEC = 2;
export const WWA_TRANSITION_FRAMES = 15;

type ClipDef = { src: string; trimBefore?: number };

const CLIPS: ClipDef[] = [
  { src: "clips-whoweare/clip-01.mp4", trimBefore: 2.5 },
  { src: "clips-whoweare/clip-02.mp4" },
  { src: "clips-whoweare/clip-03.mp4" },
  { src: "clips-whoweare/clip-04.mp4" },
];

const ClipScene: React.FC<ClipDef> = ({ src, trimBefore = 0 }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        muted
        playbackRate={0.65}
        trimBefore={trimBefore * fps}
        trimAfter={(trimBefore + WWA_CLIP_SEC) * fps}
      />
    </AbsoluteFill>
  );
};

export const WhoWeAreReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const clipFrames = WWA_CLIP_SEC * fps;

  const children = CLIPS.flatMap((clip, i) => {
    const items: React.ReactNode[] = [
      <TransitionSeries.Sequence
        key={clip.src}
        durationInFrames={clipFrames}
        premountFor={fps}
      >
        <ClipScene {...clip} />
      </TransitionSeries.Sequence>,
    ];
    if (i < CLIPS.length - 1) {
      items.push(
        <TransitionSeries.Transition
          key={`t-${i}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: WWA_TRANSITION_FRAMES })}
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
