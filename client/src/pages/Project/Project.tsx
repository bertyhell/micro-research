import React from "react";
import { useProjectsControllerFindOne } from "../../generated/serverComponents";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorView/ErrorView";
import {
  ProjectDetailResponse,
  ResponseResponse,
} from "../../generated/serverSchemas";
import { useParams } from "react-router-dom";

import Chart from "chart.js/auto";

import "./Project.scss";
import BarChart, { BarChartProps } from "../../components/BarChart/BarChart";

function Project() {
  const params = useParams<{ id: string }>();
  const projectRequest = useProjectsControllerFindOne(
    {
      pathParams: {
        id: params.id as string,
      },
    },
    { enabled: !!params.id }
  );

  const getCount = (
    responses: ResponseResponse[],
    firstAnswerId: string,
    secondAnswerId: string
  ): number => {
    const response = responses.find(
      (response) =>
        (response.firstAnswerId === firstAnswerId &&
          response.secondAnswerId === secondAnswerId) ||
        (response.firstAnswerId === secondAnswerId &&
          response.secondAnswerId === firstAnswerId)
    );
    return response?.count || 0;
  };

  const getChartData = (project: ProjectDetailResponse): BarChartProps => {
    return {
      xLabels: project.questions[0].answers.map(
        (firstAnswer) => firstAnswer.title
      ),
      yLabels: project.questions[1].answers.map(
        (secondAnswer) => secondAnswer.title
      ),
      data: project.questions[0].answers.map((firstAnswer) => {
        return project.questions[1].answers.map((secondAnswer) => {
          return getCount(project.responses, firstAnswer.id, secondAnswer.id);
        });
      }),
    };
  };

  const renderProject = (project: ProjectDetailResponse) => {
    return (
      <>
        <h1>{project.title}</h1>
        <div className="c-columns">
          <h2>{project.questions[0].title}</h2>
          <h2>{project.questions[1].title}</h2>
        </div>
        <BarChart {...getChartData(project)} />
      </>
    );
  };

  if (projectRequest.isLoading) {
    return <Spinner />;
  }
  if (projectRequest.error || !projectRequest.data) {
    return <ErrorPage></ErrorPage>;
  }

  return renderProject(projectRequest.data);
}

export default Project;
