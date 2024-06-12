import { BatchValidatorContext } from '@/components/BatchValidate/batchContext';
import { Form, Input, InputNumber } from 'antd';
import { useContext } from 'react';

const MyForm = () => {
  const [form] = Form.useForm();
  const context = useContext(BatchValidatorContext);
  const validator = async (rule: any, value: any) => {
    const r: any = await context?.add(value);
    if (r.message !== '') {
      throw new Error(r.message);
    }
  };
  return (
    <Form form={form} layout="horizontal" labelCol={{ span: 4 }}>
      <Form.Item
        name="user_name"
        label="用户名"
        rules={[
          {
            validator,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="user_age"
        label="年龄"
        rules={[
          {
            validator,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
};

export default MyForm;
