import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AespaimgSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerRef = useRef<HTMLDivElement>(null);
  const winterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      // 전체 섹션의 pin 설정
      gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top", // 섹션이 화면 상단에 닿을 때 고정
          end: "100% 100%",
          scrub: 1,
          // pin: true,
          // markers: true, // 디버깅용
        },
      });
    }

    if (winterRef.current) {
      // 이미지의 clip-path 애니메이션 설정
      gsap
        .timeline({
          scrollTrigger: {
            trigger: winterRef.current,
            start: "top bottom", // 이미지가 뷰포트 하단에 닿을 때 시작
            end: "bottom top", // 이미지가 화면 상단에 닿을 때 종료
            scrub: 1,
            // markers: true, // 디버깅용
          },
        })
        .fromTo(
          winterRef.current,
          {
            "clip-path": "inset(20% 20% 20% 20% round 16px)",
            scale: 0.7,
          },
          {
            "clip-path": "inset(10% 10% 10% 10% round 16px)",
            scale: 0.85,
            ease: "none",
            duration: 5,
          }
        );
    }
  }, []);

  return (
    <section className="border-4 w-full h-[200vh] object-cover relative  top-[-100vh] ">
      <div ref={triggerRef} className="w-full h-dvh sticky top-0 ">
        <div
          ref={winterRef}
          className="w-full h-dvh rounded-3xl object-cover absolute left-0 top-0 flex justify-center"
        >
          <img src={`${process.env.PUBLIC_URL}/winter.jpg`} alt="winter" />
        </div>
      </div>
    </section>
  );
};

export default AespaimgSection;
