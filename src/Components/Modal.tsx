// MyModal.tsx
import React from "react";
import { Modal, Form, Input } from "antd";
import instance from "../service/api";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { ValidationQuestionSchama } from "../utils/validations/create-question.validation";

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
  refreshQuestionsTable: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  visible,
  onClose,
  refreshQuestionsTable,
}) => {
  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema: ValidationQuestionSchama,
    onSubmit: async (values) => {
      console.log(values)
      await instance
        .post("/questions", values)
        .then(() => {
          onClose();
          form.resetFields();
          formik.resetForm();
          refreshQuestionsTable();
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 500) {
            console.log(err.response.statusText);
          }
        });
    },
  })


  return (
    <Modal
      open={visible}  // <- Use 'visible' instead of 'open'
      title="Título do Modal"
      okText="Enviar"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields();
        formik.resetForm();
        onClose();
      }}
      onOk={() => formik.handleSubmit()}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="title"
          label="Titulo"
          help={formik.touched.title && formik.errors.title}
          validateStatus={formik.touched.title && formik.errors.title ? 'error' : 'success'}
        >
          <Input
            placeholder="Insira o título aqui"
            type='text'
            {...formik.getFieldProps('title')}
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="Conteúdo"
          help={formik.touched.content && formik.errors.content}
          validateStatus={formik.touched.content && formik.errors.content ? 'error' : 'success'}
        >
          <Input.TextArea
            placeholder="Insira o conteúdo aqui"
            {...formik.getFieldProps('content')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
