import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { startJ6 } from "../../utiles/news";
import { answerJ6 } from "../../utiles/news";

interface QuizStepProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
interface j6 {
  example: [];
}
function J6({ current, setCurrent }: QuizStepProps) {
  const [j6, setJ6] = useState<j6>();
  const [currentExIndex, setCurrentExIndex] = useState<number>(0);
  const [index, setIndex] = useState(0);
  const [id, setId] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // form의 자동 제출을 막습니다.
      setAnswer((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const getj6 = async () => {
    try {
      const response = await startJ6("김동현");
      console.log(response);
      setJ6(response.data);
      setId(response.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const postj6 = async () => {
    try {
      const response = await answerJ6("김동현", id, answer);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getj6();
  }, []);

  const onClick = () => {
    setCurrent(current + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <p className="text-5xl top-20 font-bold">단어목록회상 검사</p>
      <div className="text-3xl mb-5 leading-loose ">
        <p>
          몇 분 전에 제가 단어가 인쇄되어 잇는 10개의 카드를 보여 드리면서,{" "}
          <br />그 단어들을 읽고 외우도록 했었습니다. <br />
          이제 그 10개의 단어 중 가 능한 많은 수의 단어를 기억해 보시는 겁니다.
          <br />
          준비되었습니까? 자, 그 10개의 단어 중 기억나는 단어를 모두 말씀해
          보세요.
        </p>
        <div>
          <input
            type="text"
            placeholder="단어를 적고 엔터를 쳐주세요"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
        </div>
      </div>
      <Button
        className="font-bold text-xl"
        style={{
          position: "fixed",
          right: "3%",
          bottom: "3%",
          width: "150px",
          height: "60px",
        }}
        onClick={postj6}
      >
        정답 제출
      </Button>
    </div>
  );
}

export default J6;
