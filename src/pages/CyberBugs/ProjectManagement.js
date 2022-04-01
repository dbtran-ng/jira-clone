import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
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
import {
  FormOutlined,
  DeleteOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_PROJECT_SAGA,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT_SAGA,
  GET_USER_API,
  ADD_USER_PROJECT_SAGA,
  REMOVE_USER_PROJECT_SAGA,
} from './../../redux/constants/CyberbugsConst';
import FormEditProject from '../../components/Cyberbugs/Forms/FormEditProject';

export default function ProjectManagement(props) {
  // lay data tu reducer ve components
  const projectList = useSelector((state) => state.ProjectReducer.projectList);
  const { userSearch } = useSelector((state) => state.UserLoginReducer);
  const [value, setValue] = useState('');
  const searchRef = useRef(null);
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetails/${record.id}`}>{text}</NavLink>;
      },
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
              return (
                <Popover
                  placement="top"
                  title={'Members'}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: '15px' }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_SAGA,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                  >
                                    <CloseSquareOutlined />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
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
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);

                      dispatch({
                        type: ADD_USER_PROJECT_SAGA,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_API,
                          keyword: value,
                        });
                      }, 300);
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
                  title: 'Edit Project',
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
