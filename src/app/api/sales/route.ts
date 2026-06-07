import { NextResponse } from 'next/server';
import { generateSalesData } from '@/lib/mockGenerator';

export async function GET() {
  const data = generateSalesData();
  return NextResponse.json(data);
}
