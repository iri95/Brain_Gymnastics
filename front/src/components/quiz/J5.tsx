import React from "react";
import { Button } from "antd";

interface QuizStepProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

function J5({ current, setCurrent }: QuizStepProps) {
  const onClick = () => {
    setCurrent(current + 1);
  };

  return (
    <div>
      <div>
        <p>구성행동 검사</p>
        <Button onClick={onClick}></Button>
      </div>
    </div>
  );
}

export default J5;