'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import ko_KR from 'antd/locale/ko_KR';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 시 로컬 스토리지 또는 시스템 테마 확인
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('theme', nextMode ? 'dark' : 'light');
  };

  // SSR Hydration mismatch 방지
  // 클라이언트 사이드에서 마운트가 완료되기 전에는 기본/지정값 구조를 유지
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        locale={ko_KR}
        theme={{
          algorithm: mounted && isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            // 커스텀 공통 토큰 설정이 필요한 경우 여기에 추가
            colorPrimary: '#1677ff',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
