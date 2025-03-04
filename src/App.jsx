import { useState } from 'react'
import { Layout, Typography, ConfigProvider, theme } from 'antd'
import './App.css'
import HomePage from './components/HomePage'
import BirthInfoForm from './components/BirthInfoForm'
import FortuneResult from './components/FortuneResult'

const { Header, Content, Footer } = Layout
const { Title } = Typography

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userInfo, setUserInfo] = useState(null)
  const [fortuneResult, setFortuneResult] = useState(null)

  // 处理页面导航
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // 处理用户信息提交
  const handleUserInfoSubmit = (info) => {
    setUserInfo(info)
    // 生成算命结果
    generateFortuneResult(info)
    // 导航到结果页面
    navigateTo('result')
  }

  // 生成算命结果
  const generateFortuneResult = (info) => {
    // 这里可以根据用户信息生成个性化的算命结果
    // 在实际应用中，这可能涉及到复杂的算法或API调用
    const results = {
      overall: Math.floor(Math.random() * 100),
      love: Math.floor(Math.random() * 100),
      career: Math.floor(Math.random() * 100),
      health: Math.floor(Math.random() * 100),
      fortune: getRandomFortune(),
      luckyNumbers: generateLuckyNumbers(),
      luckyColors: getRandomLuckyColors(),
    }
    setFortuneResult(results)
  }

  // 生成随机幸运数字
  const generateLuckyNumbers = () => {
    const numbers = []
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 99) + 1)
    }
    return numbers
  }

  // 获取随机幸运颜色
  const getRandomLuckyColors = () => {
    const colors = ['红色', '蓝色', '绿色', '黄色', '紫色', '橙色', '粉色', '金色']
    const result = []
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length)
      result.push(colors[randomIndex])
      colors.splice(randomIndex, 1) // 避免重复
    }
    return result
  }

  // 获取随机运势描述
  const getRandomFortune = () => {
    const fortunes = [
      '近期运势大吉大利，事业有贵人相助，财运亨通。',
      '桃花运旺盛，可能会遇到心仪的对象，单身人士应多参加社交活动。',
      '工作中需谨慎行事，避免冲动决策，稳中求进是关键。',
      '健康状况需要关注，注意作息规律，适当运动可改善体质。',
      '财运起伏不定，投资需谨慎，避免大额支出和冲动消费。',
      '人际关系和谐，是建立重要人脉的好时机，多与贵人交流。',
      '学习能力提升，是深造和考证的有利时期，知识将带来好运。',
      '家庭关系融洽，是解决过往矛盾的好时机，家人间多沟通。'
    ]
    return fortunes[Math.floor(Math.random() * fortunes.length)]
  }

  // 返回首页
  const handleReturnHome = () => {
    setUserInfo(null)
    setFortuneResult(null)
    navigateTo('home')
  }

  // 渲染当前页面内容
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStart={() => navigateTo('birthInfo')} />
      case 'birthInfo':
        return <BirthInfoForm onSubmit={handleUserInfoSubmit} onBack={handleReturnHome} />
      case 'result':
        return <FortuneResult result={fortuneResult} userInfo={userInfo} onRetry={() => navigateTo('birthInfo')} onHome={handleReturnHome} />
      default:
        return <HomePage onStart={() => navigateTo('birthInfo')} />
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#722ed1',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="app-layout">
        <Header className="app-header">
          <Title level={3} className="app-title" onClick={handleReturnHome}>
            玄机算命馆
          </Title>
        </Header>
        <Content className="app-content">
          {renderContent()}
        </Content>
        <Footer className="app-footer">
          玄机算命馆 ©{new Date().getFullYear()} - 探索命运的奥秘
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
