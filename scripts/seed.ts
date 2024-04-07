const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'ReactJS' },
        { name: 'NextJS' },
        { name: 'HTML & CSS' },
        { name: 'Nodejs' },
        { name: 'Python' },
        { name: 'Django' },
        { name: 'Java' },
        { name: 'Kotlin' },
        { name: 'Golang' },
        { name: 'Javascript' },
        { name: 'Web development' },
        { name: 'Programming' },
        { name: 'Data Structures & Algorithm' },
        { name: 'MERN Stack' },
        { name: 'Full stack Development' },
      ],
    });

    console.log('Success');
  } catch (error) {
    console.log('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
