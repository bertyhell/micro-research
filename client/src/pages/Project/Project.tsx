import React from "react";
import {
  useProjectsControllerFindOne,
  useProjectsControllerIncrementTagCount,
  useTagsControllerFindAll,
} from "../../generated/serverComponents";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorView/ErrorView";
import {
  ProjectDetailResponse,
  ResponseResponse,
} from "../../generated/serverSchemas";
import { useParams } from "react-router-dom";
import BarChart, { BarChartProps } from "../../components/BarChart/BarChart";

import "./Project.scss";

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
  const tagsRequest = useTagsControllerFindAll({});
  const { mutateAsync: incrementTagCounter } =
    useProjectsControllerIncrementTagCount({});

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
    // return {
    //   xLabels: [
    //     "Less then once a week",
    //     "Once a week",
    //     "Twice a week",
    //     "Three times a week",
    //     "Four times a week",
    //     "Five times a week",
    //     "Six times a week",
    //     "Everyday",
    //     "More than once a day",
    //   ],
    //   yLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    //   data: [
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //     [9000, 800, 700, 600, 500, 400, 300, 200, 100],
    //   ],
    // };
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

  const incrementTag = async (tagId: string) => {
    if (!projectRequest.data?.id) {
      console.error("project id could not be found", projectRequest);
      return;
    }
    await incrementTagCounter({
      pathParams: {
        projectId: projectRequest.data?.id,
        tagId,
      },
    });
    await projectRequest.refetch();
  };

  const renderTags = () => {
    if (
      !tagsRequest.isLoading &&
      !tagsRequest.error &&
      tagsRequest.data?.length
    ) {
      const tagsWithCounts = tagsRequest.data
        .map((tag) => {
          const tagLink = projectRequest.data?.tagLinks.find(
            (link) => link.tag.id === tag.id
          );
          return { title: tag.title, id: tag.id, count: tagLink?.count || 0 };
        })
        .sort((a, b) => (a.count > b.count ? -1 : a.count === b.count ? 0 : 1));
      return tagsWithCounts.map((tagInfo) => {
        return (
          <span
            className={"c-tag" + (tagInfo.count ? " c-tag--active" : "")}
            key={tagInfo.id}
            onClick={() => incrementTag(tagInfo.id)}
          >
            <span>{tagInfo.title}</span>
            <span>{tagInfo.count}</span>
          </span>
        );
      });
    }
  };

  const renderProject = (project: ProjectDetailResponse) => {
    return (
      <div className="c-project-page">
        <h1>{project.title}</h1>
        <div className="c-tags">{renderTags()}</div>
        <div className="c-columns">
          <h2>{project.questions[0].title}</h2>
          <h2>{project.questions[1].title}</h2>
        </div>
        <BarChart {...getChartData(project)} />
      </div>
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
