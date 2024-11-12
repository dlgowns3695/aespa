// App.tsx
import React from "react";
import "./App.css"; // TailwindCSS가 포함된 파일이여야 합니다.
import SmEnterTainMent from "./components/smentertainment/smentertainment";

function App() {
  return (
    <>
      {/* SmEnterTainMent 컴포넌트에 title과 description을 props로 전달 */}
      <SmEnterTainMent />
    </>
  );
}

export default App;
