import React, { useState, useEffect, useRef } from "react";
import "./smentertainment.css";

const SmEnterTainMent: React.FC = () => {
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // 마우스 위치 업데이트
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
      1.11, // red (titleImages1)
      1.15, // green (titleImages2)
      1.2, // blue (titleImages3)
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
          console.log(`Image ${index}: scaleY = ${scaleY}`);
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
    <div className="header fixed top-0 left-0 h-screen w-screen bg-black border-4">
      <div className="tsCtr relative left-0 top-0 w-full h-screen">
        <div className="t absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
          <div className="tCtr w-[70vw] m-auto text-center flex justify-center">
            {renderImages(titleImages1, 0)} {/* 첫 번째 배열 렌더링 */}
          </div>
        </div>

        <div className="t absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
          <div className="tCtr w-[70vw] m-auto text-center flex justify-center">
            {renderImages(titleImages2, titleImages1.length)}
            {/* 두 번째 배열 렌더링 */}
          </div>
        </div>

        <div className="t absolute top-1/2 left-0 right-0 text-center translate-y-[-50%] mix-blend-screen">
          <div className="tCtr w-[70vw] m-auto text-center flex justify-center">
            {renderImages(
              titleImages3,
              titleImages1.length + titleImages2.length
            )}
          </div>
        </div>
      </div>

      <div className="job">
        <div className="jobText" style={{ bottom: "224px" }}>
          <div className="jobTextChar">P</div>
          <div className="jobTextChar">P</div>
          <div className="jobTextChar">H</div>
          <div className="jobTextChar">O</div>
          <div className="jobTextChar">T</div>
          <div className="jobTextChar">O</div>
          <div className="jobTextChar">G</div>
          <div className="jobTextChar">R</div>
          <div className="jobTextChar">A</div>
          <div className="jobTextChar">P</div>
          <div className="jobTextChar">H</div>
          <div className="jobTextChar">E</div>
          <div className="jobTextChar">R</div>
        </div>
      </div>

      <div className="sDown">
        <div className="sDownFill" />
      </div>
    </div>
  );
};

export default SmEnterTainMent;
