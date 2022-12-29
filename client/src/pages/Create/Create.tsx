import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useProjectsControllerCreate } from "../../generated/serverComponents";
import { useNavigate } from "react-router";

import "./Create.scss";

enum Step {
  ProjectTitle = "ProjectTitle",
  FirstQuestion = "FirstQuestion",
  SecondQuestion = "SecondQuestion",
}

function Create() {
  const navigate = useNavigate();
  const { mutateAsync: createProject } = useProjectsControllerCreate();

  const [step, setStep] = useState<Step>(Step.ProjectTitle);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectTitleError, setProjectTitleError] = useState<string | null>(
    null
  );
  const [firstQuestionTitle, setFirstQuestionTitle] = useState<string>("");
  const [firstQuestionTitleError, setFirstQuestionTitleError] = useState<
    string | null
  >(null);
  const [firstQuestionAnswers, setFirstQuestionAnswers] = useState<string[]>([
    "",
    "",
  ]);
  const [firstQuestionAnswersError, setFirstQuestionAnswersError] = useState<
    string | null
  >(null);

  const [secondQuestionTitle, setSecondQuestionTitle] = useState<string>("");
  const [secondQuestionTitleError, setSecondQuestionTitleError] = useState<
    string | null
  >(null);
  const [secondQuestionAnswers, setSecondQuestionAnswers] = useState<string[]>([
    "",
    "",
  ]);
  const [secondQuestionAnswersError, setSecondQuestionAnswersError] = useState<
    string | null
  >(null);

  const isFormValid = (): boolean => {
    const tempProjectTitleError = projectTitle
      ? null
      : "A project title is required";
    setProjectTitleError(tempProjectTitleError);
    const tempFirstQuestionTitleError = firstQuestionTitle?.trim()
      ? null
      : "A title for the first question is required";
    setFirstQuestionTitleError(tempFirstQuestionTitleError);
    const tempSecondQuestionTitleError = secondQuestionTitle?.trim()
      ? null
      : "A title for the second question is required";
    setSecondQuestionTitleError(tempSecondQuestionTitleError);
    const firstQuestionEnoughValidAnswers =
      firstQuestionAnswers
        .map((answer) => answer.trim())
        .filter((answer) => !!answer).length >= 2;
    const tempFirstQuestionAnswersError = firstQuestionEnoughValidAnswers
      ? null
      : "At least 2 answers are needed";
    setFirstQuestionAnswersError(tempFirstQuestionAnswersError);
    const secondQuestionEnoughValidAnswers =
      secondQuestionAnswers
        .map((answer) => answer.trim())
        .filter((answer) => !!answer).length >= 2;
    const tempSecondQuestionAnswersError = secondQuestionEnoughValidAnswers
      ? null
      : "At least 2 answers are needed";
    setSecondQuestionAnswersError(tempSecondQuestionAnswersError);

    if (tempProjectTitleError) {
      setStep(Step.ProjectTitle);
    }

    if (tempFirstQuestionTitleError || tempFirstQuestionAnswersError) {
      setStep(Step.FirstQuestion);
    }

    if (tempSecondQuestionTitleError || tempSecondQuestionAnswersError) {
      setStep(Step.SecondQuestion);
    }

    return (
      !tempProjectTitleError &&
      !tempFirstQuestionTitleError &&
      !tempFirstQuestionAnswersError &&
      !tempSecondQuestionTitleError &&
      !tempSecondQuestionAnswersError
    );
  };

  const submitForm = async () => {
    if (isFormValid()) {
      const response = await createProject({
        body: {
          title: projectTitle,
          questions: [
            {
              title: firstQuestionTitle,
              answers: firstQuestionAnswers,
            },
            {
              title: secondQuestionTitle,
              answers: secondQuestionAnswers,
            },
          ],
        },
      });
      navigate("/projects/" + response.id);
    }
  };

  const renderAnswers = (
    answers: string[],
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>,
    error: string | null
  ) => {
    return (
      <>
        <div>
          {answers.map((answer, answerIndex) => {
            return (
              <div
                key={answerIndex}
                className={
                  "c-form-field" + (error ? " c-form-field--error" : "")
                }
                title={error || undefined}
              >
                <label>Answer {answerIndex + 1}</label>
                <div>
                  <input
                    type="text"
                    value={answer}
                    onChange={(evt) => {
                      const newAnswers = [...answers];
                      newAnswers[answerIndex] = evt.target.value;
                      setAnswers(newAnswers);
                    }}
                  ></input>{" "}
                  {
                    <button
                      className="c-button c-button__delete-answer"
                      disabled={answers.length <= 2}
                      title={
                        answers.length <= 2
                          ? "Each question needs at least 2 answers"
                          : undefined
                      }
                      onClick={(evt) => {
                        if (
                          (evt.target as HTMLElement).hasAttribute("disabled")
                        ) {
                          return;
                        }
                        setAnswers((lastAnswers) => {
                          const newAnswers = [...lastAnswers];
                          newAnswers.splice(answerIndex, 1);
                          return newAnswers;
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  }
                </div>
              </div>
            );
          })}
        </div>
        {answers.length < 10 && (
          <button
            className="c-button c-button__add-answer"
            onClick={() =>
              setAnswers((lastAnswers) => {
                return [...lastAnswers, ""];
              })
            }
            aria-label="ADD ANSWER"
          >
            <FontAwesomeIcon icon={faPlus} /> ADD ANSWER
          </button>
        )}
      </>
    );
  };

  const renderProjectTitleStep = () => {
    return (
      <div
        className={
          "c-form-field c-form-field__project-title" +
          (projectTitleError ? " c-form-field--error" : "")
        }
        title={projectTitleError || undefined}
      >
        <label>Title of the research project</label>
        <p>
          This will only be show on the results page. It describes what
          you&apos;re trying to investigate.
        </p>
        <input
          type="text"
          value={projectTitle}
          onChange={(evt) => setProjectTitle(evt.target.value)}
        />
      </div>
    );
  };

  const renderQuestionStep = (
    label: string,
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    titleError: string | null,
    answers: string[],
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>,
    answersError: string | null
  ) => {
    return (
      <div>
        <div
          className={
            "c-form-field c-form-field__question-title" +
            (titleError ? " c-form-field--error" : "")
          }
          title={titleError || undefined}
        >
          <label>{label}</label>
          <input
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </div>
        {renderAnswers(answers, setAnswers, answersError)}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case Step.ProjectTitle:
        return renderProjectTitleStep();
      case Step.FirstQuestion:
        return renderQuestionStep(
          "First question title",
          firstQuestionTitle,
          setFirstQuestionTitle,
          firstQuestionTitleError,
          firstQuestionAnswers,
          setFirstQuestionAnswers,
          firstQuestionAnswersError
        );
      case Step.SecondQuestion:
        return renderQuestionStep(
          "Second question title",
          secondQuestionTitle,
          setSecondQuestionTitle,
          secondQuestionTitleError,
          secondQuestionAnswers,
          setSecondQuestionAnswers,
          secondQuestionAnswersError
        );
    }
  };

  const nextStepOrSubmit = async () => {
    switch (step) {
      case Step.ProjectTitle:
        setStep(Step.FirstQuestion);
        return;
      case Step.FirstQuestion:
        setStep(Step.SecondQuestion);
        return;
      case Step.SecondQuestion:
        await submitForm();
        return;
    }
  };

  return (
    <div className="c-create-page">
      <ul className="c-steps">
        <li
          className={step === Step.ProjectTitle ? "c-step--active" : ""}
          onClick={() => setStep(Step.ProjectTitle)}
        >
          PROJECT
        </li>
        <li
          className={step === Step.FirstQuestion ? "c-step--active" : ""}
          onClick={() => setStep(Step.FirstQuestion)}
        >
          FIRST QUESTION
        </li>
        <li
          className={step === Step.SecondQuestion ? "c-step--active" : ""}
          onClick={() => setStep(Step.SecondQuestion)}
        >
          SECOND QUESTION
        </li>
      </ul>
      {renderStep()}
      <button
        className="c-button c-button--large c-button__create-project"
        onClick={nextStepOrSubmit}
      >
        {step === Step.SecondQuestion ? "CREATE RESEARCH PROJECT" : "NEXT"}
      </button>
    </div>
  );
}

export default Create;
