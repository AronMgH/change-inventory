import { PrismaClient }  from '@prisma/client';
import { hash } from 'bcrypt';

const prisma =  new PrismaClient();

async function initUsers(){
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.com'},
        update: {},
        create: {
            id: 200,
            email: 'alice@prisma.com',
            fullname: 'Alice Prisma',
            username: 'Alice',
            password: await hash('alice', 12),
        }
    });

    const aron = await prisma.user.upsert({
        where: { email: 'aron@prisma.com'},
        update: {},
        create: {
            id: 201,
            email: 'aron@prisma.com',
            fullname: 'Alice Prisma',
            username: 'Aron',
            password: await hash('aron',12),
        }
    });
    const selam = await prisma.user.upsert({
        where: { email: 'selam@prisma.com'},
        update: {},
        create: {
            id: 202,
            email: 'selam@prisma.com',
            fullname: 'Alice Prisma',
            username: 'Selam',
            password: await hash('selam', 12),
        }
    });
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.com'},
        update: {},
        create: {
            id: 203,
            email: 'bob@prisma.com',
            fullname: 'Alice Prisma',
            username: 'Bob',
            password: await hash('bob', 12),
        }
    });
}

async function initActivityHistory(){
    for(let i=1; i<=10; i++){
        await prisma.activityHistory.upsert({
            where: { id: i },
            update: {},
            create: {
                id: i,
                activityMessage: `Activity Message ${i}`,
                activityType: 'Logged',
                createdAt: new Date(),
                topLevel: false
            }
        });
    }
}


async function initInventory(){
    for(let i=1; i<=10; i++){
        await prisma.inventory.upsert({
            where: { id: i },
            update: {},
            create: {
                id: i,
                name: `Item ${i}`,
                userId: Math.ceil(200 +i % 2.5) ,
                quantity: 100,
                functionalItems: 80,
                disfunctionalItems: 20,
                picture: null,
                remark: null
            }
        });
    }
}

async function main(){
    await initUsers();
    await initActivityHistory();
    await initInventory();
}

main().then(async () => {
    await prisma.$disconnect();
}).catch( async (e) => {
    await prisma.$disconnect()
    console.log(e);
    process.exit(1);
});
