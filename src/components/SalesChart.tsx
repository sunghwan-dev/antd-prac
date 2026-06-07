'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { SalesData } from '@/lib/mockGenerator';

interface Props {
  data: SalesData[];
}

const SalesChart: React.FC<Props> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false, title: '데이터 보기', lang: ['데이터 보기', '닫기', '새로고침'] },
        magicType: { show: true, type: ['line', 'bar'], title: { line: '꺾은선', bar: '막대' } },
        restore: { show: true, title: '새로고침' },
        saveAsImage: { show: true, title: '이미지로 저장' },
      },
    },
    legend: {
      data: ['매출액', '방문자수', '전환수'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map(d => d.month),
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '매출액',
        axisLabel: {
          formatter: (value: number) => (value / 10000).toLocaleString() + '만',
        },
      },
      {
        type: 'value',
        name: '방문/전환',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '매출액',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: number) => value.toLocaleString() + ' 원',
        },
        data: data.map(d => d.sales),
        itemStyle: { color: '#1890ff' }
      },
      {
        name: '방문자수',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value: number) => value.toLocaleString() + ' 명',
        },
        data: data.map(d => d.visitors),
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '전환수',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value: number) => value.toLocaleString() + ' 건',
        },
        data: data.map(d => d.conversions),
        itemStyle: { color: '#faad14' }
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
};

export default SalesChart;
