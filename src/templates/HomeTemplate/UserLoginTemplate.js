import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Button, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
  let { Component, ...restRoute } = props;
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
  }, []);

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider
              width={width / 2}
              style={{
                height: height,
                backgroundImage: `url(https://picsum.photos/${Math.round(
                  width / 2
                )}/${height})`,
                backgroundSize: '100%',
              }}
            ></Sider>
            <Content>
              <Component {...propsRoute} />
            </Content>
          </Layout>
        );
      }}
    />
  );
};
