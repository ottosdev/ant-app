// Dashboard.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { Layout, Menu } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import instance from "../service/api";
import MyModal from "../Components/Modal";
import { QuestionProp } from "../interface/QuestionProp";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [responseMessage, setResponseMessage] = message.useMessage();

  const [data, setData] = useState<QuestionProp[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await instance.get("/questions");
      const newData = response.data.questions.map((item: QuestionProp) => ({
        ...item,
        key: item.id || item.slug,
      }));
      setData(newData);
    } catch (error) {
      responseMessage.open({
        type: "error",
        content: "Contact the support",
        duration: 3,

      });
    }
  }, [setData, responseMessage]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Conteúdo",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Opções",
      key: "options",
      render: (text: string, record: QuestionProp) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            onClick={() => {
              console.log("Você clicou na ação de remover:", record.id);
            }}
          >
            Ação
          </Button>
          <Button
            onClick={() => {
              console.log("Você clicou na ação de editar:", record.id);
            }}
          >
            Ação
          </Button>
        </div>

      ),
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              Dashboard
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 16,
                }}
              >
                <Button type="primary" onClick={showModal}>
                  Cadastrar Questao
                </Button>
                <MyModal
                  visible={isModalVisible}
                  onClose={handleModalClose}
                  refreshQuestionsTable={fetchQuestions}
                />
              </div>
              <Table
                dataSource={data}
                columns={columns}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Seu Footer Aqui</Footer>
        </Layout>
      </Layout>
      {setResponseMessage}
    </>
  );
};

export default Dashboard;
