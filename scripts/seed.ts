const {PrismaClient} = require('@prisma/client')

const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: 'Computer Science'},
                {name: 'Mathematics'},
                {name: 'Physics'},
                {name: 'Music'},
                {name: 'Art'},
                {name: 'History'},
                {name: 'Engineering'},
            ]
        })
    } catch (error) {
        console.error(error)
    } finally {
        database.$disconnect()
    }
}

main()