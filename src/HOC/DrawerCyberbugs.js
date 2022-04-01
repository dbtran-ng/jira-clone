import React, { useState } from 'react';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../redux/constants/CyberbugsConst';

export default function DrawerCyberBugs(props) {
  const { visible, componentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerReducer);

  const dispatch = useDispatch();

  // console.log('visible', visible);

  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };

  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* Nội dung thay đổi của drawer */}
        {componentContentDrawer}
      </Drawer>
    </>
  );
}
