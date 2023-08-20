import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { pathInfo, routeInfo } from "./routeInfo";

const { Header, Content, Sider } = Layout;
const items1 = ["login", "signup"].map((key) => ({
  key,
  label: `${key}`,
}));
let breadTitle = ["Home", "main"];

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {

//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

// path = board/all-board
const getItem = () => {
  return pathInfo.map((data, index) => {
    const thisMenuKeys = Object.keys(data);
    const Menu = data[thisMenuKeys[0]];
    return {
      key: thisMenuKeys[0],
      // icon: React.createElement(icon),
      label: thisMenuKeys[0],
      children: Menu.map((subMenu, index) => {
        return {
          key: subMenu,
          label: subMenu,
        };
      }),
    };
  });
};
const HeaderS = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("123", location);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[""]}
          items={items1}
          onClick={(a) => {
            breadTitle = a.keyPath.reverse();
            const path = "/" + breadTitle.join("/");
            console.log("aazz", path);
            console.log("qweqwe", breadTitle);
            navigate(path); // 경로 변경
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={getItem()}
            onClick={(a) => {
              breadTitle = a.keyPath.reverse();
              const path = "/" + breadTitle.join("/");
              console.log("aazz", path);
              console.log("qweqwe", breadTitle);
              navigate(path); // 경로 변경
            }}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: breadTitle[0] }, { title: breadTitle[1] }]}
          />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "white",
            }}
          >
            {routeInfo(location.pathname)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default HeaderS;
