import React, { useEffect } from 'react';
import ContentMain from './Main/ContentMain';
import HeaderMain from './Main/HeaderMain';
import InfoMain from './Main/InfoMain';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAILS_SAGA } from '../../redux/constants/CyberbugsConst';
export default function IndexCyberbugs(props) {
  const { projectDetails } = useSelector(
    (state) => state.ProjectFunctionReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch({ type: GET_PROJECT_DETAILS_SAGA, projectId: projectId });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetails} />

      <InfoMain projectDetail={projectDetails} />

      <ContentMain projectDetail={projectDetails} />
    </div>
  );
}
