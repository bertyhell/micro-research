import React, { useState } from "react";
import {
  useAnswerControllerFindUnanswered,
  useAnswerControllerSubmitAnswerToProject,
} from "../../generated/serverComponents";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorView/ErrorView";
import {
  AnswerDto,
  QuestionDto,
} from "../../generated/serverSchemas";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

import "./Answer.scss";

const MICRO_RESEARCH_ANSWERED_IDS = "MICRO_RESEARCH_ANSWERED_IDS";

function Answer() {
  const navigate = useNavigate();

  const getAnsweredIds = () => {
    return (localStorage.getItem(MICRO_RESEARCH_ANSWERED_IDS) || "")
      .split(",")
      .map((id) => id.trim());
  };
  const unansweredProject = useAnswerControllerFindUnanswered(
    {
      queryParams: {
        answeredIds: getAnsweredIds(),
      },
    },
    { retry: 0 }
  );
  const { mutateAsync: submitAnswers } =
    useAnswerControllerSubmitAnswerToProject();
  const [firstAnswerId, setFirstAnswerId] = useState<null | string>(null);

  const sendProjectAnswer = async (
    firstAnswerResponseId: string,
    secondAnswerResponseId: string
  ) => {
    if (!unansweredProject?.data?.id) {
      console.error("Failed to submit answers, since project id is undefined");
      return;
    }
    await submitAnswers({
      queryParams: {
        projectId: unansweredProject.data?.id,
        firstAnswerId: firstAnswerResponseId,
        secondAnswerId: secondAnswerResponseId,
      },
    });
    const answeredIds = [...getAnsweredIds(), unansweredProject.data.id].filter(
      (id) => !!id
    );
    localStorage.setItem(MICRO_RESEARCH_ANSWERED_IDS, answeredIds.join(","));
    navigate("/projects/" + unansweredProject.data?.id);
  };

  const handleAnswer = async (answerOption: AnswerDto) => {
    if (!firstAnswerId) {
      // first answer
      setFirstAnswerId(answerOption.id);
    } else {
      // second answer
      await sendProjectAnswer(firstAnswerId, answerOption.id);
    }
  };

  const renderQuestion = (question: QuestionDto) => {
    return (
      <div>
        <h1>{question.title}</h1>
        <ul className="c-answer-list">
          {question.answers.map((answerOption) => {
            return (
              <li
                className="c-answer-list__answer-option"
                key={answerOption.id}
                onClick={() => handleAnswer(answerOption)}
              >
                {answerOption.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  if (unansweredProject.isLoading) {
    return <Spinner />;
  }
  if (unansweredProject.error || !unansweredProject.data) {
    if (
      JSON.stringify(unansweredProject.error?.payload).includes(
        "NO_MORE_UNANSWERED_QUESTIONS"
      )
    ) {
      return (
        <ErrorPage
          message="There are no more unanswered questions for you to answer. Good job, time to take a nap."
          icon={faBed}
        ></ErrorPage>
      );
    }
    return <ErrorPage></ErrorPage>;
  }
  if (!firstAnswerId) {
    return renderQuestion(unansweredProject.data.questions[0]);
  } else {
    return renderQuestion(unansweredProject.data.questions[1]);
  }
}

export default Answer;
