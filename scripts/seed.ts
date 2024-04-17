const {PrismaClient} = require ('@prisma/client')

const database = new PrismaClient ()

async function main () {
  try {
    const categories = await database.category.createMany ({
      data: [
        {name: 'Music'},
        {name: 'Photography'},
        {name: 'Fitness'},
        {name: 'Accounting'},
        {name: 'Computer Science'},
        {name: 'Film'},
        {name: 'Engineering'}
      ]
    })
  } catch (error) {
    console.error (error)
  } finally {
    database.$disconnect ()
  }
}

main ()
