import "./VideoBackground.css";

const VIDEO_SRC =
  "https://cdn.pixabay.com/video/2021/11/21/98569-649310877_large.mp4";

export default function VideoBackground({ children }) {
  return (
    <div className="video-shell">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay" aria-hidden="true" />

      <svg className="glass-filter" aria-hidden="true">
        <filter id="liquidDisplacement">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            seed="3"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>

      <div className="content-layer">{children}</div>
    </div>
  );
}
