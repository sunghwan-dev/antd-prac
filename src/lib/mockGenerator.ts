import { fakerKO as faker } from '@faker-js/faker';

export interface SalesData {
  month: string;
  sales: number;
  visitors: number;
  conversions: number;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: 'Active' | 'Inactive' | 'Banned';
  ltv: number;
  lastIp: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  role: 'User' | 'VIP' | 'Admin';
}

export const generateSalesData = (): SalesData[] => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  return months.map(month => ({
    month,
    sales: faker.number.int({ min: 5000000, max: 20000000 }),
    visitors: faker.number.int({ min: 1000, max: 5000 }),
    conversions: faker.number.int({ min: 50, max: 300 }),
  }));
};

export const generateCustomerData = (count = 100): CustomerData[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    joinedAt: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Banned']),
    ltv: faker.number.int({ min: 10000, max: 2000000 }),
    lastIp: faker.internet.ip(),
    device: faker.helpers.arrayElement(['Desktop', 'Mobile', 'Tablet']),
    role: faker.helpers.arrayElement(['User', 'VIP', 'Admin']),
  }));
};
