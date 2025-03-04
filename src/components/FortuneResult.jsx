import React from 'react';
import { Typography, Button, Card, Space, Progress, Tag, Divider, List } from 'antd';
import { motion } from 'framer-motion';
import { HeartOutlined, TrophyOutlined, MedicineBoxOutlined, DollarOutlined, NumberOutlined, BgColorsOutlined, HomeOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const FortuneResult = ({ result, userInfo, onRetry, onHome }) => {
  if (!result || !userInfo) {
    return null;
  }

  // 格式化日期
  const formatDate = (date) => {
    if (!date) return '';
    return date.format('YYYY年MM月DD日');
  };

  // 获取运势等级描述
  const getFortuneLevel = (score) => {
    if (score >= 90) return '大吉';
    if (score >= 80) return '吉';
    if (score >= 70) return '小吉';
    if (score >= 60) return '平';
    if (score >= 50) return '小凶';
    return '凶';
  };

  // 获取运势颜色
  const getFortuneColor = (score) => {
    if (score >= 90) return '#52c41a';
    if (score >= 80) return '#73d13d';
    if (score >= 70) return '#bae637';
    if (score >= 60) return '#fadb14';
    if (score >= 50) return '#fa8c16';
    return '#f5222d';
  };

  // 获取运势图标
  const getFortuneIcon = (type) => {
    switch (type) {
      case 'love':
        return <HeartOutlined />;
      case 'career':
        return <TrophyOutlined />;
      case 'health':
        return <MedicineBoxOutlined />;
      default:
        return <DollarOutlined />;
    }
  };

  // 渲染运势进度条
  const renderFortuneProgress = (type, score, title) => {
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Space>
            {getFortuneIcon(type)}
            <Text strong>{title}</Text>
          </Space>
          <Tag color={getFortuneColor(score)}>{getFortuneLevel(score)}</Tag>
        </div>
        <Progress 
          percent={score} 
          showInfo={false} 
          strokeColor={getFortuneColor(score)}
          trailColor="rgba(255,255,255,0.1)"
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="fortune-card">
        <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '450px' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Title level={2} style={{ margin: 0 }}>
                命运解析结果
              </Title>
            </motion.div>
            
            <Paragraph>
              <Text type="secondary">
                {userInfo.name} · {userInfo.gender} · {formatDate(userInfo.birthDate)}
              </Text>
            </Paragraph>
          </div>
          
          <Divider style={{ margin: '8px 0' }} />
          
          <div>
            <Title level={4}>总体运势</Title>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Progress 
                  type="dashboard" 
                  percent={result.overall} 
                  format={(percent) => (
                    <span style={{ color: getFortuneColor(percent) }}>
                      {percent}<br />
                      <Text style={{ fontSize: 14, color: getFortuneColor(percent) }}>
                        {getFortuneLevel(percent)}
                      </Text>
                    </span>
                  )}
                  strokeColor={getFortuneColor(result.overall)}
                  width={160}
                />
              </motion.div>
            </div>
            
            <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
              {result.fortune}
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>详细运势</Title>
            {renderFortuneProgress('love', result.love, '感情运')}
            {renderFortuneProgress('career', result.career, '事业运')}
            {renderFortuneProgress('health', result.health, '健康运')}
          </div>
          
          <Divider style={{ margin: '8px 0' }} />
          
          <div>
            <Title level={4}>幸运信息</Title>
            <Space size="large" style={{ width: '100%', justifyContent: 'space-around' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <NumberOutlined style={{ marginRight: 8 }} />
                  <Text strong>幸运数字</Text>
                </div>
                <div>
                  {result.luckyNumbers.map((num, index) => (
                    <Tag key={index} color="#722ed1" style={{ margin: 4 }}>{num}</Tag>
                  ))}
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <BgColorsOutlined style={{ marginRight: 8 }} />
                  <Text strong>幸运颜色</Text>
                </div>
                <div>
                  {result.luckyColors.map((color, index) => (
                    <Tag key={index} color="#722ed1" style={{ margin: 4 }}>{color}</Tag>
                  ))}
                </div>
              </div>
            </Space>
          </div>
          
          <Divider style={{ margin: '8px 0' }} />
          
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Button icon={<ReloadOutlined />} onClick={onRetry}>
              重新测算
            </Button>
            <Button icon={<HomeOutlined />} onClick={onHome} type="primary">
              返回首页
            </Button>
          </Space>
          
          <Paragraph style={{ fontSize: 12, opacity: 0.6, textAlign: 'center', marginTop: 16 }}>
            注：本应用仅供娱乐，请理性看待测算结果
          </Paragraph>
        </Space>
      </Card>
    </motion.div>
  );
};

export default FortuneResult;