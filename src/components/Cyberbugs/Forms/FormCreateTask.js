import { Editor } from '@tinymce/tinymce-react';
import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  GET_ALL_PROJECTS_SAGA,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID_SAGA,
  SET_SUBMIT_CREATE_TASK,
  GET_USER_BY_PROJECT_ID,
} from '../../../redux/constants/CyberbugsConst';
import { GET_ALL_TASK_TYPES_SAGA } from '../../../redux/constants/TaskTypeConst';
import { GET_ALL_PRIORITIES_SAGA } from '../../../redux/constants/PriorityConst';
import { CREATE_TASK_SAGA } from '../../../redux/constants/TaskConst';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConst';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function FormCreateTask(props) {
  // khai báo biến
  //Do kết nối với withformik => component có các props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;

  const { arrProject } = useSelector((state) => state.ProjectReducer);
  const { arrTaskTypes } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriorities } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserLoginReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);

  const userOption = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  const dispatch = useDispatch();
  const [size, setSize] = React.useState('default');
  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  // hook
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECTS_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPES_SAGA });
    dispatch({ type: GET_ALL_PRIORITIES_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
    dispatch({
      type: GET_USER_API,
      keyword: '',
    });
  }, []);
  const children = [];
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            //dispatch giá trị làm thay đổi arrUser
            let { value } = e.target;
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
            //Cập nhật giá trị cho project Id
            setFieldValue('projectId', e.target.value);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriorities.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select
              className="form-control"
              name="typeId"
              onChange={handleChange}
            >
              {arrTaskTypes.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              options={userOption}
              placeholder="Please select"
              defaultValue={[]}
              optionFilterProp="label"
              onSearch={() => {
                dispatch({
                  type: GET_USER_BY_PROJECT_ID,
                  keyword: '',
                });
              }}
              onSelect={(value) => {
                console.log(value);
              }}
              onChange={(inputs) => {
                setFieldValue('listUserAsign', inputs);
              }}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
            <div className="row mt-3">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  type="number"
                  min="0"
                  name="originalEstimate"
                  defaultValue="0"
                  className="form-control"
                  height="30"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time tracking</p>

            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6">
                <p>Time spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue('timeTrackingSpent', e.target.value);
                  }}
                />
              </div>

              <div className="col-6">
                <p>Time remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });

                    setFieldValue('timeTrackingSpent', e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          init={{
            selector: 'textarea#myTextArea',
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={(content, editor) => {
            setFieldValue('description', content);
          }}
        />
      </div>
    </form>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, arrTaskTypes, arrPriorities, arrStatus } = props;

    return {
      taskName: '',
      description: '',
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskTypes[0]?.id,
      priorityId: arrPriorities[0]?.priorityId,
      listUserAsign: [],
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: CREATE_TASK_SAGA,
      taskObject: values,
    };
    props.dispatch(action);
  },
  displayName: 'CreateProjectForm',
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectReducer.arrProject,
    arrTaskTypes: state.TaskTypeReducer.arrTaskTypes,
    arrPriorities: state.PriorityReducer.arrPriorities,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(createProjectForm);
