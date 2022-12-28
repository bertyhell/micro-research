import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useProjectsControllerCreate } from "../../generated/serverComponents";
import { useNavigate } from "react-router";

import "./Create.scss";

function Create() {
  const navigate = useNavigate();
  const { mutateAsync: createProject } = useProjectsControllerCreate();

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

    return (
      !tempProjectTitleError &&
      !tempFirstQuestionTitleError &&
      !tempSecondQuestionTitleError &&
      !tempFirstQuestionAnswersError &&
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
          >
            ADD ANSWER
          </button>
        )}
      </>
    );
  };

  return (
    <div className="c-create-page">
      <div
        className={
          "c-form-field c-form-field__project-title" +
          (projectTitleError ? " c-form-field--error" : "")
        }
        title={projectTitleError || undefined}
      >
        <label>
          Title of the research project{" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            title="will not be shown to person answering
          the questions"
            style={{ opacity: 0.3 }}
          />
        </label>
        <input
          type="text"
          value={projectTitle}
          onChange={(evt) => setProjectTitle(evt.target.value)}
        />
      </div>
      <div className="c-columns">
        <div>
          <div
            className={
              "c-form-field c-form-field__question-title" +
              (firstQuestionTitleError ? " c-form-field--error" : "")
            }
            title={firstQuestionTitleError || undefined}
          >
            <label>First question</label>
            <input
              type="text"
              value={firstQuestionTitle}
              onChange={(evt) => setFirstQuestionTitle(evt.target.value)}
            />
          </div>
          {renderAnswers(
            firstQuestionAnswers,
            setFirstQuestionAnswers,
            firstQuestionAnswersError
          )}
        </div>
        <div>
          <div
            className={
              "c-form-field c-form-field__question-title" +
              (secondQuestionTitleError ? " c-form-field--error" : "")
            }
            title={secondQuestionTitleError || undefined}
          >
            <label>Second question</label>
            <input
              type="text"
              value={secondQuestionTitle}
              onChange={(evt) => setSecondQuestionTitle(evt.target.value)}
            />
          </div>
          {renderAnswers(
            secondQuestionAnswers,
            setSecondQuestionAnswers,
            secondQuestionAnswersError
          )}
        </div>
      </div>
      <button
        className="c-button c-button--large c-button__create-project"
        onClick={submitForm}
      >
        CREATE RESEARCH PROJECT
      </button>
    </div>
  );
}

export default Create;
