import React, { act, useEffect, useState } from "react";
import "./style.css";
import { quizObject } from "../quizObject";

const Modal = ({
  correct,
  setActualQuiz,
  setNextQuiz,
  setModal,
  setQntCorrect,
}) => {
  const qntQuest = quizObject.length;

  const handleRestart = () => {
    setActualQuiz(0);
    setNextQuiz(1);
    setModal(false);
    setQntCorrect(0);
  };

  return (
    <div>
      <div className="title_end">
        <h1>
          VOCÊ ACERTOU {correct} DE {qntQuest}
        </h1>
        <button onClick={handleRestart}>Reiniciar</button>
      </div>
    </div>
  );
};

export const QuizApp = () => {
  const [actualQuiz, setActualQuiz] = useState(0);
  const [nextQuiz, setNextQuiz] = useState(1);
  const [modal, setModal] = useState(false);
  const [qntCorrect, setQntCorrect] = useState(0);
  const [widthElement, setWidthElement] = useState(100);

  const answerCorrect = quizObject.map((correct) => correct.respostaCorreta);

  const handleQuest = (answer) => {
    setActualQuiz(actualQuiz + 1);
    setNextQuiz(nextQuiz + 1);
    if (answer === answerCorrect[actualQuiz]) {
      setQntCorrect(qntCorrect + 1);
    }
  };

  useEffect(() => {
    const progressWidth = (actualQuiz / quizObject.length) * 100;
    setWidthElement(progressWidth);
  }, [actualQuiz]);

  useEffect(() => {
    const qntQuest = quizObject.map((quest) => quest.id);
    if (qntQuest.length == actualQuiz) {
      setModal(!modal);
    }
  }, [actualQuiz]);

  return (
    <div className="container">
      {!modal ? (
        quizObject.slice(actualQuiz, nextQuiz).map((quiz) => (
          <div key={quiz.id}>
            <div className="bar_progress">
              <div className="bar_filled" style={{ width: `${widthElement}%` }}></div>
            </div>
            <h1 className="title">{quiz.pergunta}</h1>
            <div className="container_btns">
              <button onClick={() => handleQuest(quiz.opcoes[0])}>
                {quiz.opcoes[0]}
              </button>
              <button onClick={() => handleQuest(quiz.opcoes[1])}>
                {quiz.opcoes[1]}
              </button>
              <button onClick={() => handleQuest(quiz.opcoes[2])}>
                {quiz.opcoes[2]}
              </button>
              <button onClick={() => handleQuest(quiz.opcoes[3])}>
                {quiz.opcoes[3]}
              </button>
            </div>
          </div>
        ))
      ) : (
        <Modal
          correct={qntCorrect}
          setActualQuiz={setActualQuiz}
          setNextQuiz={setNextQuiz}
          setModal={setModal}
          setQntCorrect={setQntCorrect}
        />
      )}
    </div>
  );
};
