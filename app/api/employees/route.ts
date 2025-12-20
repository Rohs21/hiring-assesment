import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const department = searchParams.get('department') || 'all';
		const search = searchParams.get('search') || '';

		const skip = (page - 1) * limit;

		const employees = await prisma.employee.findMany({
			skip,
			take: limit,
			where: {
				department: department !== 'all' ? department : undefined,
				OR: search
						? [
							{
								name: {
								contains: search,
								mode: "insensitive",
								},
							},
							{
								email: {
								contains: search,
								mode: "insensitive",
								},
							},
							]
						: undefined,
			},
			
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json({
			data: employees,
			page,
			limit,
		});
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
