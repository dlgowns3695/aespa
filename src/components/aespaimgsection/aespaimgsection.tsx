import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AespaimgSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  // 타입 명시
  const triggerRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (triggerRef.current && gsapRef.current && videoRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "0% 80%",
            end: "100% 100%",
            scrub: 1,
            // markers: true,
          },
        })
        .to(
          gsapRef.current,
          { backgroundColor: "#fff", color: "#000", ease: "none", duration: 5 },
          0
        )
        // .to('.svgAni path', {stroke : "#000", ease:'none', duration:5}, 0)
        .fromTo(
          videoRef.current,
          { "clip-path": "inset(60% 60% 60% 60% round 30%)" },
          {
            "clip-path": "inset(0% 0% 0% 0% round 0%)",
            ease: "none",
            duration: 20,
          },
          0
        );
    }
  }, []);

  return (
    <>
      {/* <section
        ref={gsapRef}
        className="h-dvh bg-black text-white flex justify-center items-center border-4 border-red-600"
      >
        <div className="text-8xl uppercase leading-tight">
          <span
            className="text-transparent block"
            style={{ WebkitTextStroke: "2px #b1dd40" }}
          >
            GSAP
          </span>
          ScrollTrigger
        </div>
      </section> */}

      <section
        ref={triggerRef}
        className="w-full h-dvh relative overflow-hidden"
      >
        <div>
          {/* 모바일 IOS 등 모든환경 자동재생 */}
          <video
            ref={videoRef}
            className="w-dvw h-dvh object-cover absolute left-0 top-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="ArmageddonINTRO.mp4" />
          </video>
          <div className="absolute w-full text-center left-0 top-1/2 -translate-y-1/2 text-white">
            <h2 className="text-8xl leading-none tracking-widest">
              Creativeness is all you need
              <br />
              for Digital Design
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default AespaimgSection;
