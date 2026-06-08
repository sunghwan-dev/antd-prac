'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, Typography, theme } from 'antd';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import SalesChart from '@/components/SalesChart';
import { SalesData } from '@/lib/mockGenerator';

const { Title } = Typography;

export default function DashboardPage() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = theme.useToken();

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" description="데이터를 불러오는 중..." />
      </div>
    );
  }

  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const totalVisitors = data.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalConversions = data.reduce((acc, curr) => acc + curr.conversions, 0);

  // 다크모드에 맞춰 텍스트 색상 및 보더 색상 조합
  const cardStyle = {
    borderColor: token.colorBorderSecondary,
    background: token.colorBgContainer,
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>비즈니스 현황 요약</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card hoverable style={cardStyle}>
            <Statistic
              title="누적 매출 (연간)"
              value={totalSales}
              precision={0}
              styles={{ content: { color: '#3f8600' } }}
              prefix={<DollarOutlined />}
              suffix="원"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable style={cardStyle}>
            <Statistic
              title="누적 방문자"
              value={totalVisitors}
              precision={0}
              styles={{ content: { color: '#1890ff' } }}
              prefix={<UserOutlined />}
              suffix="명"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable style={cardStyle}>
            <Statistic
              title="누적 전환수"
              value={totalConversions}
              precision={0}
              styles={{ content: { color: '#faad14' } }}
              prefix={<ShoppingCartOutlined />}
              suffix="건"
            />
          </Card>
        </Col>
      </Row>

      <Card title="월별 매출 및 트래픽 분석" style={{ marginTop: 24, borderColor: token.colorBorderSecondary }}>
        <SalesChart data={data} />
      </Card>
    </div>
  );
}
