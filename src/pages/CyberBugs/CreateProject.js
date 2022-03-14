import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../redux/constants/CyberbugsConst';

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useSelector();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    console.log('Content was updated:', editor);
  };
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <div className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            initialValue=""
            apiKey="2cplxrmvda78p6gumwqpc7zifboqtlq38oywmwfwlbj188ts"
            init={{
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
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select className="form-control" name="categoryId">
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary">Create Project</button>
      </div>
    </div>
  );
}

const createProjectForm = withFormik({
  mapPropsToValues: () => ({}),
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {},
})(CreateProject);

export default connect()(createProjectForm);
