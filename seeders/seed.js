const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
const User = require('../models/user');
const Book = require('../models/book');

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

const dropCollectionIfExists = async (collectionName) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const exists = collections.some((col) => col.name === collectionName);
  if (exists) {
    await mongoose.connection.db.dropCollection(collectionName);
    console.log(`Dropped collection: ${collectionName}`);
  } else {
    console.log(`Collection not found (skip drop): ${collectionName}`);
  }
};

const seed = async () => {
  try {
    await connectDB();

    
    await User.deleteMany({});
    await Book.deleteMany({});


    
    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(await user.save());
    }

    
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 30 }).getFullYear(),
        user: randomUser._id,
      });
      await book.save();
    }

    console.log('✅ Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
