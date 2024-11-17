import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AespaimgSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const winterRef1 = useRef<HTMLDivElement>(null);
  const winterRef2 = useRef<HTMLDivElement>(null);
  const winterRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let winterAnimation1: gsap.core.Timeline | null = null;
    let winterAnimation2: gsap.core.Timeline | null = null;
    let winterAnimation3: gsap.core.Timeline | null = null;

    if (winterRef1.current) {
      winterAnimation1 = gsap
        .timeline({
          scrollTrigger: {
            trigger: winterRef1.current,
            start: "top center", // 이미지가 뷰포트 하단에 닿을 때 시작
            end: "+=100%", // 이미지가 화면 상단에 닿을 때 종료 (상단에서 pin이 되도록)
            scrub: 1, // 스크롤에 맞춰 애니메이션 진행
            pin: true, // 이미지가 상단에 닿을 때 고정되도록 설정
            markers: true, // 디버깅용
          },
        })
        .fromTo(
          winterRef1.current,
          {
            "clip-path": "inset(20% 20% 20% 20% round 16px)",
            scale: 0.7, // 처음에 작은 상태로 시작
          },
          {
            "clip-path": "inset(10% 10% 10% 10% round 16px)",
            scale: 1, // 점점 커짐
            ease: "none",
          }
        )
        .to(winterRef1.current, {
          scale: 0.7, // 스케일 축소
          opacity: 0, // 투명해짐
          ease: "power2.out", // 부드러운 종료
        });
    }

    if (winterRef2.current) {
      winterAnimation2 = gsap
        .timeline({
          scrollTrigger: {
            trigger: winterRef2.current,
            start: "top center", // 이미지가 뷰포트 하단에 닿을 때 시작
            end: "+=100%", // 이미지가 화면 상단에 닿을 때 종료
            scrub: 1,
            pin: true,
            markers: true,
          },
        })
        .fromTo(
          winterRef2.current,
          {
            "clip-path": "inset(20% 20% 20% 20% round 16px)",
            scale: 0.3,
          },
          {
            "clip-path": "inset(10% 10% 10% 10% round 16px)",
            scale: 0.8,
            ease: "none",
          }
        )
        .to(winterRef2.current, {
          scale: 0.6,
          opacity: 0,
          ease: "power2.out",
        });
    }

    if (winterRef3.current) {
      winterAnimation3 = gsap
        .timeline({
          scrollTrigger: {
            trigger: winterRef3.current,
            start: "top center", // 이미지가 뷰포트 하단에 닿을 때 시작
            end: "+=100%", // 이미지가 화면 상단에 닿을 때 종료
            scrub: 1,
            pin: true,
            markers: true,
          },
        })
        .fromTo(
          winterRef3.current,
          {
            "clip-path": "inset(20% 20% 20% 20% round 16px)",
            scale: 0.5,
          },
          {
            "clip-path": "inset(10% 10% 10% 10% round 16px)",
            scale: 1,
            ease: "none",
          }
        )
        .to(winterRef3.current, {
          scale: 0.7,
          opacity: 0,
          ease: "power2.out",
        });
    }

    return () => {
      winterAnimation1?.scrollTrigger?.kill();
      winterAnimation2?.scrollTrigger?.kill();
      winterAnimation3?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className="border-4 w-full h-[300vh] relative mt-[-100vh]">
      {/* 첫 번째 이미지 */}
      <div
        ref={winterRef1}
        className="scale-[0.5] rounded-3xl object-cover absolute left-0 top-0 flex justify-center"
      >
        <img src={`${process.env.PUBLIC_URL}/winter.jpg`} alt="winter" />
      </div>

      {/* 두 번째 이미지: 왼쪽 하단 */}
      <div
        ref={winterRef2}
        className="scale-[0.3] rounded-3xl object-cover absolute top-[80vh] left-[-50vw] flex justify-center"
      >
        <img src={`${process.env.PUBLIC_URL}/winter.jpg`} alt="winter" />
      </div>

      {/* 세 번째 이미지: 오른쪽 하단 */}
      <div
        ref={winterRef3}
        className="scale-[0.5] rounded-3xl object-cover absolute top-[150vh] left-[50vw] flex justify-center"
      >
        <img src={`${process.env.PUBLIC_URL}/winter.jpg`} alt="winter" />
      </div>
    </section>
  );
};

export default AespaimgSection;
