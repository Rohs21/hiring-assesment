import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');

		const skip = page * limit;

		const employees = await prisma.employee.findMany({
			skip,
			take: limit,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json({
			data: employees,
			page: 1,
			limit,
		});
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
