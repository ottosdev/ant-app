import { useState } from "react";
import { Button, Form, Input, Layout, Spin, message } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { LoginSchema } from "../utils/validations/login.validation";
import { loginHandler } from "../utils/formik/login.submit";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [responseMessage, setResponseMessage] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      loginHandler(values, setLoading, responseMessage, navigate);
    },
  })

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form style={{ width: "300px" }} onFinish={formik.handleSubmit}>
        <Form.Item
          name="email"
          help={formik.touched.email && formik.errors.email}
          validateStatus={formik.touched.email && formik.errors.email ? 'error' : 'success'}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="E-mail"
            {...formik.getFieldProps('email')}
          />
        </Form.Item>

        <Form.Item
          name="senha"
          help={formik.touched.password && formik.errors.password}
          validateStatus={formik.touched.password && formik.errors.password ? 'error' : 'success'}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
            {...formik.getFieldProps('password')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin indicator={antIcon} /> : "Entrar"}{" "}
            {/* 3. Mostrar ícone de carregamento */}
          </Button>
        </Form.Item>
        {setResponseMessage}
      </Form>
    </Layout>
  );
};

export default LoginPage;
