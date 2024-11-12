// App.tsx
import React, { useEffect } from "react";
import "./App.css"; // TailwindCSS가 포함된 파일이여야 합니다.
import SmEnterTainMent from "./components/smentertainment/smentertainment";
import AespaimgSection from "./components/aespaimgsection/aespaimgsection";
import Lenis from "lenis";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1, // 부드러운 스크롤을 위한 설정
    });

    const raf = (time: number): void => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* SmEnterTainMent 컴포넌트에 title과 description을 props로 전달 */}
      <SmEnterTainMent />
      <AespaimgSection />
    </>
  );
}

export default App;
