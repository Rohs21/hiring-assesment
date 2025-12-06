import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

async function main() {
	try {
		const inputPath = path.join(process.cwd(), 'employees.json');
		console.log(`Reading employees from ${inputPath}...`);

		if (!fs.existsSync(inputPath)) {
			console.error('employees.json file not found!');
			process.exit(1);
		}

		const data = fs.readFileSync(inputPath, 'utf-8');
		const employees = JSON.parse(data);

		console.log(`Found ${employees.length} employees to seed.`);

		const formattedEmployees = employees.map((emp: any) => ({
			...emp,
			createdAt: emp.createdAt ? new Date(emp.createdAt) : undefined,
		}));

		console.log('Seeding database...');

		const result = await prisma.employee.createMany({
			data: formattedEmployees,
		});

		console.log(`Successfully seeded ${result.count} employees.`);
	} catch (error) {
		console.error('Error seeding employees:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
