import Person from '../src/models/Person.js';


(async ()=>{

    try {
        let people = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                birth_date: new Date('1990-01-01'),
                active: true
            },
            {
                name: 'Alice Smith',
                email: 'alice@example.com',
                birth_date: new Date('1992-05-15'),
                active: true
            },
            {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                birth_date: new Date('1985-10-22'),
                active: false
            },
            {
                name: 'Charlie Brown',
                email: 'charlie@example.com',
                birth_date: new Date('1993-11-03'),
                active: true
            },
            {
                name: 'David Lee',
                email: 'david@example.com',
                birth_date: new Date('1988-07-30'),
                active: true
            },
            {
                name: 'Emma Wilson',
                email: 'emma@example.com',
                birth_date: new Date('1991-09-11'),
                active: false
            },
            {
                name: 'Frank Harris',
                email: 'frank@example.com',
                birth_date: new Date('1980-02-27'),
                active: true
            },
            {
                name: 'Grace Martin',
                email: 'grace@example.com',
                birth_date: new Date('1995-04-12'),
                active: true
            },
            {
                name: 'Hannah Clark',
                email: 'hannah@example.com',
                birth_date: new Date('1994-08-19'),
                active: false
            },
            {
                name: 'Isaac Lewis',
                email: 'isaac@example.com',
                birth_date: new Date('1992-12-25'),
                active: true
            },
            {
                name: 'Jack Turner',
                email: 'jack@example.com',
                birth_date: new Date('1990-03-14'),
                active: true
            },
            {
                name: 'Kelly Adams',
                email: 'kelly@example.com',
                birth_date: new Date('1987-06-09'),
                active: false
            },
            {
                name: 'Liam Young',
                email: 'liam@example.com',
                birth_date: new Date('1996-01-18'),
                active: true
            },
            {
                name: 'Mia Walker',
                email: 'mia@example.com',
                birth_date: new Date('1998-10-01'),
                active: true
            },
            {
                name: 'Noah King',
                email: 'noah@example.com',
                birth_date: new Date('1997-02-14'),
                active: true
            },
            {
                name: 'Olivia Scott',
                email: 'olivia@example.com',
                birth_date: new Date('1999-07-23'),
                active: true
            }
        ];

        await Person.createMany({data:people});

        console.log("Successfully seed to database");
    } catch(e) {
        console.error(e);
    }
})()


