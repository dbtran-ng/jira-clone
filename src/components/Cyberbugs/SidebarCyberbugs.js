import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../redux/constants/CyberbugsConst';
import FormCreateTask from './Forms/FormCreateTask';
const { Header, Sider, Content } = Layout;
export default function SidebarCyberbugs() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: '100%' }}
      >
        <div className="text-right pr-2" onClick={toggle}>
          <BarsOutlined
            style={{ cursor: 'pointer', color: '#fff', fontSize: 25 }}
          />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                title: 'Create Task',
                componentContentDrawer: <FormCreateTask />,
              });
            }}
            key="1"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
          >
            <span className="mb-2">Create Task</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
