import React, { useState, useEffect, useRef } from "react";
import "./smentertainment.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmEnterTainMent: React.FC = () => {
  gsap.registerPlugin(ScrollTrigger);
  const textRefs = useRef<HTMLDivElement[]>([]); // 요소들을 배열로 관리
  const triggerRef = useRef<HTMLDivElement>(null); // 가장 바깥 컨테이너

  // 애니메이션 적용
  useEffect(() => {
    if (textRefs.current.length > 0) {
      // gsap 애니메이션 적용
      gsap.to(textRefs.current, {
        scrollTrigger: {
          trigger: triggerRef.current, // 부모 요소에서 트리거
          start: "5% top", // 스크롤 시작 지점
          end: "bottom bottom", // 끝나는 지점
          scrub: true, // 스크롤과 함께 애니메이션 진행
          // markers: true, // 개발용 마커 (배포 시 제거 가능)
        },
        scale: 0.8, // 요소 크기 축소
      });
    }

    if (triggerRef.current) {
      // 초기 상태로 필터(블러 효과) 0px 설정
      gsap.set(triggerRef.current, { filter: "blur(0px)" });

      // 블러 효과 및 투명도 애니메이션
      gsap.to(triggerRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current, // 트리거 요소
          start: "5% top", // 스크롤 시작 지점
          end: "bottom bottom", // 끝나는 지점
          scrub: true, // 스크롤과 애니메이션 연동

          // 필터 효과 조정 (블러)
          onUpdate: (self) => {
            const blurValue = self.progress * 10; // progress에 따라 블러 값 계산
            gsap.to(triggerRef.current, {
              filter: `blur(${blurValue}px)`, // 블러 값 적용
            });
          },

          // 투명도 애니메이션
          onLeave: () => {
            // 스크롤이 `end` 지점에 도달할 때
            if (triggerRef.current) {
              triggerRef.current.style.opacity = "0"; // 즉시 투명도 0 적용
            }
            console.log("Leave 투명도0");
          },
          onEnterBack: () => {
            // 스크롤이 `start` 지점 위로 돌아올 때
            if (triggerRef.current) {
              triggerRef.current.style.opacity = "1"; // 즉시 투명도 1 적용
            }
            console.log("EnterBack 투명도1");
          },
        },
      });
    }
  }, []);

  const titleImages1 = [
    "/titleSvg/Zr.svg",
    "/titleSvg/Ar.svg",
    "/titleSvg/Hr.svg",
    "/titleSvg/Rr.svg",
    "/titleSvg/Ar.svg",
    "/titleSvg/Zr.svg",
    "/titleSvg/Ir.svg",
    "/titleSvg/Ar.svg",
    "/titleSvg/Er.svg",
    "/titleSvg/Ir.svg",
  ];

  const titleImages2 = [
    "/titleSvg/Zg.svg",
    "/titleSvg/Ag.svg",
    "/titleSvg/Hg.svg",
    "/titleSvg/Rg.svg",
    "/titleSvg/Ag.svg",
    "/titleSvg/Zg.svg",
    "/titleSvg/Ig.svg",
    "/titleSvg/Ag.svg",
    "/titleSvg/Eg.svg",
    "/titleSvg/Ig.svg",
  ];

  const titleImages3 = [
    "/titleSvg/Zb.svg",
    "/titleSvg/Ab.svg",
    "/titleSvg/Hb.svg",
    "/titleSvg/Rb.svg",
    "/titleSvg/Ab.svg",
    "/titleSvg/Zb.svg",
    "/titleSvg/Ib.svg",
    "/titleSvg/Ab.svg",
    "/titleSvg/Eb.svg",
    "/titleSvg/Ib.svg",
  ];

  // mouseX와 mouseY 상태 추가
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // 마우스 위치 업데이트, (70vw안에 들어왔는지 체크)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const centerX = window.innerWidth / 2;
      const leftLimit = centerX - window.innerWidth * 0.35;
      const rightLimit = centerX + window.innerWidth * 0.35;

      setMousePosition({ x: mouseX, y: mouseY });

      if (mouseX >= leftLimit && mouseX <= rightLimit) {
        setIsMouseInside(true);
      } else {
        setIsMouseInside(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 이미지 거리비율에 따른 크기 변화
  useEffect(() => {
    const { x: mouseX } = mousePosition;

    // 색상별 최대 크기 비율
    const maxRatios = [
      1.15, // red (titleImages1)
      1.2, // green (titleImages2)
      1.25, // blue (titleImages3)
    ];

    if (isMouseInside) {
      imageRefs.current.forEach((image, index) => {
        if (image) {
          const imageX = image.offsetLeft + image.offsetWidth / 2;
          const distance = Math.abs(mouseX - imageX); // 마우스와 이미지의 중심 간의 절대 거리
          const maxDistance = window.innerWidth * 0.35; // 감지되는 영역의 최대 거리 (70vw의 35%)

          // 거리 비율 계산 (0 ~ 1 사이의 비율)
          const ratio = Math.min(distance / maxDistance, 1); // 비율이 커질수록 이미지 크기가 작아짐

          // 색상별 비율 적용
          let maxRatio;
          if (index < titleImages1.length) {
            // red 색상
            maxRatio = maxRatios[0];
          } else if (index < titleImages1.length + titleImages2.length) {
            // green 색상
            maxRatio = maxRatios[1];
          } else {
            // blue 색상
            maxRatio = maxRatios[2];
          }

          // scaleY는 마우스와 가까울수록 maxRatio에 가깝고, 멀어질수록 1에 가깝도록 설정
          const scaleY = 1 + (1 - ratio) * (maxRatio - 1);

          // 비율을 기준으로 크기 설정 (scale(1, y) 형태로 크기 변화)
          image.style.transform = `scale(1, ${scaleY})`;
        }
      });
    } else {
      // 마우스가 영역 밖에 있을 경우 초기 상태로 설정
      imageRefs.current.forEach((image) => {
        if (image) {
          image.style.transform = `scale(1, 1)`; // 기본 크기
        }
      });
    }
  }, [mousePosition, isMouseInside]);

  // 이미지를 렌더링하는 함수
  // 내부 return: map 메서드의 콜백 함수가 각 <img> 요소를 반환하여 배열로 생성.
  // 외부 return: map 메서드로 만든 <img> 요소 배열을 renderImages 함수에서 반환.
  const renderImages = (images: string[], startIndex: number) => {
    return images.map((src, index) => {
      return (
        <img
          key={startIndex + index} // 고유한 키 값 부여
          ref={(el) => (imageRefs.current[startIndex + index] = el)} // imageRefs에 각 이미지를 추가
          src={src}
          alt={`Image ${startIndex + index}`}
          className="transform scale-1 mx-3 h-[14vw] transition-all ease-out duration-300"
        />
      );
    });
  };

  return (
    <>
      <div ref={triggerRef} className=" relative w-full h-[200vh] ">
        <div className=" sticky top-0 left-0 h-screen  ">
          <div className="relative left-0 top-0 w-full h-screen">
            <div className="w-auto h-auto ">
              <div className=" absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
                <div
                  ref={(el) => el && textRefs.current.push(el)}
                  className="w-[70vw]  m-auto text-center flex justify-center"
                >
                  {renderImages(titleImages1, 0)} {/* 첫 번째 배열 렌더링 */}
                </div>
              </div>

              <div className=" absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
                <div
                  ref={(el) => el && textRefs.current.push(el)}
                  className=" w-[70vw]  m-auto text-center flex justify-center"
                >
                  {renderImages(titleImages2, titleImages1.length)}
                  {/* 두 번째 배열 렌더링 */}
                </div>
              </div>

              <div className=" absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
                <div
                  ref={(el) => el && textRefs.current.push(el)}
                  className=" w-[70vw]  m-auto text-center flex justify-center"
                >
                  {renderImages(
                    titleImages3,
                    titleImages1.length + titleImages2.length
                  )}
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div
                ref={(el) => el && textRefs.current.push(el)}
                className="text-3xl text-[#fff] flex gap-4 relative top-[20vh] "
              >
                <div className="">sm X</div>
                <div className="">a</div>
                <div className="">e</div>
                <div className="">s</div>
                <div className="">p</div>
                <div className="">a</div>
              </div>
            </div>
          </div>

          <div className="sDown">
            <div className="sDownFill" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmEnterTainMent;
