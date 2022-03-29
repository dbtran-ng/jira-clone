import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Space,
  Button,
  Avatar,
  Popconfirm,
  message,
  Popover,
  AutoComplete,
} from 'antd';
import ReactHtmlParser from 'html-react-parser';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_PROJECT_SAGA,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  DELETE_PROJECT_SAGA,
  GET_USER_API,
} from './../../redux/constants/CyberbugsConst';
import FormEditProject from '../../components/Cyberbugs/Forms/FormEditProject';

export default function ProjectManagement(props) {
  // lay data tu reducer ve components
  const projectList = useSelector((state) => state.ProjectReducer.projectList);
  const { userSearch } = useSelector((state) => state.UserLoginReducer);

  // su dung useDispatch de goi actions
  const dispatch = useDispatch();

  // dung useEffect de render
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_SAGA,
    });
  }, []);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      // sortDirections: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (item2, item1) => {
        if (
          item2.projectName?.trim().toLowerCase() <
          item1.projectName?.trim().toLowerCase()
        ) {
          return -1;
        }
        return 1;
      },
      sortDirections: ['descend'],
    },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (text, record, index) => {
    //     let contentJSX = ReactHtmlParser(text);

    //     return <div>{contentJSX}</div>;
    //   },
    // },
    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        if (
          item2.categoryName?.trim().toLowerCase() <
          item1.categoryName?.trim().toLowerCase()
        ) {
          return -1;
        }
        return 1;
      },
      sortDirections: ['descend'],
    },
    {
      title: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        if (
          item2.creator.name?.trim().toLowerCase() <
          item1.creator.name?.trim().toLowerCase()
        ) {
          return -1;
        }
        return 1;
      },
      sortDirections: ['descend'],
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Avatar key={index} src={member.avatar} />;
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

            <Popover
              placement="rightTop"
              title={'Add user'}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: '100%' }}
                    options={userSearch?.map((user, index) => {
                      return { label: user.name, value: user.userId };
                    })}
                    onSelect={(value, option) => {
                      console.log('userId', value);
                      console.log('option', option);
                    }}
                    onSearch={(value) => {
                      dispatch({
                        type: GET_USER_API,
                        keyword: value,
                      });
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: '50%' }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: OPEN_FORM_EDIT_PROJECT,
                  componentContentDrawer: <FormEditProject />,
                };
                dispatch(action);
                // dispatch data current to reducer
                const actionEditProject = {
                  type: EDIT_PROJECT,
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                const actionDeleteProject = {
                  type: DELETE_PROJECT_SAGA,
                  projectId: record.id,
                };
                dispatch(actionDeleteProject);
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
            ,
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Project management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
