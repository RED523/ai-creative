import React from 'react';
import { Typography, Button, Space, Card } from 'antd';
import { motion } from 'framer-motion';
import { StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HomePage = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="fortune-card">
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <motion.div
            className="floating"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StarOutlined style={{ fontSize: 64, color: '#722ed1' }} />
          </motion.div>
          
          <Title level={1} style={{ marginBottom: 0 }}>
            玄机算命馆
          </Title>
          
          <Title level={4} style={{ fontWeight: 'normal', marginTop: 0 }}>
            探索命运的奥秘，揭示生命的玄机
          </Title>
          
          <Paragraph style={{ fontSize: 16 }}>
            基于古老东方智慧与现代算法，为您提供个性化的命运解析。
            通过分析您的生辰八字，我们能揭示您的运势、事业、财富与姻缘。
          </Paragraph>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="primary" 
              size="large"
              className="mystic-button"
              onClick={onStart}
              style={{ width: 200 }}
            >
              开始测算
            </Button>
          </motion.div>
          
          <Paragraph style={{ fontSize: 12, opacity: 0.6 }}>
            注：本应用仅供娱乐，请理性看待测算结果
          </Paragraph>
        </Space>
      </Card>
    </motion.div>
  );
};

export default HomePage;