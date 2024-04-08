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

    // create courses
    const courses = []
    for (let i = 0; i < 100; i++) {
      courses.push ({
        title: `Course ${ i + 1 }`,
        description: `This is course ${ i + 1 }`,
        price: Math.floor (Math.random () * 100),
        categoryId: Math.floor (Math.random () * categories.length) + 1
      })
    }

    await database.course.createMany ({data: courses})

  } catch (error) {
    console.error (error)
  } finally {
    database.$disconnect ()
  }
}

main ()
