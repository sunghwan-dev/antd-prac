'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Tag, Typography, Card, Spin } from 'antd';
import { CustomerData } from '@/lib/mockGenerator';
import { AG_GRID_LOCALE_KO } from '@/lib/agGridLocale';

// Register AG-Grid Modules (v31+ 방식)
ModuleRegistry.registerModules([AllCommunityModule]);

const { Title } = Typography;

// Custom Cell Renderers
const StatusBadge = (params: any) => {
  const status = params.value;
  let color = 'blue';
  if (status === 'Active') color = 'green';
  if (status === 'Inactive') color = 'orange';
  if (status === 'Banned') color = 'red';
  return <Tag color={color}>{status}</Tag>;
};

const RoleBadge = (params: any) => {
  const role = params.value;
  let color = 'default';
  if (role === 'VIP') color = 'gold';
  if (role === 'Admin') color = 'purple';
  return <Tag color={color}>{role}</Tag>;
};

export default function CustomerPage() {
  const [rowData, setRowData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        setRowData(data);
        setLoading(false);
      });
  }, []);

  const columnDefs = useMemo(() => [
    { field: 'name', headerName: '이름', sortable: true, filter: true, pinned: 'left', width: 120 },
    { field: 'email', headerName: '이메일', sortable: true, filter: true, width: 220 },
    { 
      field: 'status', 
      headerName: '상태', 
      cellRenderer: StatusBadge,
      filter: true,
      width: 120 
    },
    { 
      field: 'role', 
      headerName: '권한', 
      cellRenderer: RoleBadge,
      filter: true,
      width: 120 
    },
    { 
      field: 'ltv', 
      headerName: 'LTV (누적가치)', 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      valueFormatter: (params: any) => params.value.toLocaleString() + '원',
      width: 150
    },
    { 
      field: 'joinedAt', 
      headerName: '가입일', 
      sortable: true, 
      filter: 'agDateColumnFilter',
      valueFormatter: (params: any) => new Date(params.value).toLocaleDateString(),
      width: 150
    },
    { field: 'lastIp', headerName: '최근 접속 IP', width: 150 },
    { field: 'device', headerName: '디바이스', width: 120, filter: true },
  ], []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" description="고객 데이터를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Title level={3} style={{ marginBottom: 24 }}>고객 데이터 관리</Title>
      
      <Card styles={{ body: { padding: 0 } }} style={{ flex: 1 }}>
        <div className="ag-theme-alpine" style={{ height: '650px', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs as any}
            pagination={true}
            paginationPageSize={20}
            animateRows={true}
            localeText={AG_GRID_LOCALE_KO}
            defaultColDef={{
              resizable: true,
            }}
          />
        </div>
      </Card>
      
      <div style={{ marginTop: 16, color: '#8c8c8c' }}>
        * 전체 {rowData.length}명의 고객 데이터가 조회되었습니다. (Faker.js 기반 목업 데이터)
      </div>
    </div>
  );
}
