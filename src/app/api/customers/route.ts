import { NextResponse } from 'next/server';
import { generateCustomerData } from '@/lib/mockGenerator';

export async function GET() {
  const data = generateCustomerData(200); // 200명 생성
  return NextResponse.json(data);
}
