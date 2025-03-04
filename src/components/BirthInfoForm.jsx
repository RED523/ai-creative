import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Radio, Card, Space, Typography, Select } from 'antd';
import { motion } from 'framer-motion';
import { ArrowLeftOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const BirthInfoForm = ({ onSubmit, onBack }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = (values) => {
    setLoading(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      setLoading(false);
      onSubmit(values);
    }, 1500);
  };

  // 生成小时选项
  const hourOptions = [];
  for (let i = 0; i < 24; i++) {
    hourOptions.push(
      <Option key={i} value={i}>
        {i < 10 ? `0${i}` : i}时
      </Option>
    );
  }

  // 生成分钟选项
  const minuteOptions = [];
  for (let i = 0; i < 60; i += 5) {
    minuteOptions.push(
      <Option key={i} value={i}>
        {i < 10 ? `0${i}` : i}分
      </Option>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="fortune-card">
        <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={onBack}
              style={{ marginRight: 16 }}
            />
            <Title level={3} style={{ margin: 0 }}>
              填写您的生辰信息
            </Title>
          </div>
          
          <Paragraph>
            请填写真实的生辰八字信息，以获得更准确的命运解析
          </Paragraph>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              gender: '男',
              birthHour: 12,
              birthMinute: 0
            }}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入您的姓名" />
            </Form.Item>
            
            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择您的性别' }]}
            >
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="birthDate"
              label="出生日期"
              rules={[{ required: true, message: '请选择您的出生日期' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                placeholder="选择出生日期"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            
            <Form.Item label="出生时辰">
              <Space>
                <Form.Item
                  name="birthHour"
                  noStyle
                  rules={[{ required: true, message: '请选择出生时' }]}
                >
                  <Select style={{ width: 100 }} placeholder="时">
                    {hourOptions}
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="birthMinute"
                  noStyle
                  rules={[{ required: true, message: '请选择出生分' }]}
                >
                  <Select style={{ width: 100 }} placeholder="分">
                    {minuteOptions}
                  </Select>
                </Form.Item>
              </Space>
            </Form.Item>
            
            <Form.Item
              name="birthPlace"
              label="出生地点"
              rules={[{ required: true, message: '请输入您的出生地点' }]}
            >
              <Input prefix={<CalendarOutlined />} placeholder="例如：北京市朝阳区" />
            </Form.Item>
            
            <Form.Item>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="mystic-button"
                  style={{ width: '100%' }}
                >
                  开始解析命运
                </Button>
              </motion.div>
            </Form.Item>
          </Form>
          
          <Paragraph style={{ fontSize: 12, opacity: 0.6, textAlign: 'center' }}>
            您的信息仅用于算命分析，我们不会泄露您的个人隐私
          </Paragraph>
        </Space>
      </Card>
    </motion.div>
  );
};

export default BirthInfoForm;