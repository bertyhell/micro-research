import React from "react";
import {
  ProjectsControllerGetByTagError,
  ProjectsControllerGetByTagResponse,
  useProjectsControllerGetByTag,
} from "../../generated/serverComponents";
import Spinner from "../../components/Spinner/Spinner";
import { UseQueryResult } from "@tanstack/react-query";

import "./Discover.scss";
import { Link } from "react-router-dom";

function Discover() {
  const interestingProjects = useProjectsControllerGetByTag({
    pathParams: {
      tag: "Interesting",
    },
  });
  const surprisingProjects = useProjectsControllerGetByTag({
    pathParams: {
      tag: "Surprising",
    },
  });
  const obviousProjects = useProjectsControllerGetByTag({
    pathParams: {
      tag: "Obvious",
    },
  });

  const renderProjects = (
    tagTitle: string,
    projects: UseQueryResult<
      ProjectsControllerGetByTagResponse,
      ProjectsControllerGetByTagError
    >
  ) => {
    if (projects.isLoading) {
      return <Spinner size="inline" />;
    }
    if (!projects.data?.length) {
      return (
        <div className="c-muted-text">
          There are no projects with this tag yet.
        </div>
      );
    }
    return projects.data?.map((project) => {
      return (
        <Link
          key={tagTitle + " " + project.id}
          className="c-project-tag"
          to={"/projects/" + project.id}
        >
          <span>{project.count}</span>
          <span>{project.title}</span>
        </Link>
      );
    });
  };

  return (
    <>
      <h1>Discover research projects</h1>
      <h2>Voted &quot;most interesting&quot; projects</h2>
      {renderProjects("interesting", interestingProjects)}
      <h2>Voted &quot;most surprising&quot; projects</h2>
      {renderProjects("surprising", surprisingProjects)}
      <h2>Voted &quot;most obvious&quot; projects</h2>
      {renderProjects("obvious", obviousProjects)}
    </>
  );
}

export default Discover;
