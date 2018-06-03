CREATE TABLE users(
  full_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT 123,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL PRIMARY KEY,
  img VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email) VALUES('goodcat@gmail.com'), ('badcat@outlook.com');

-- creates random users with faker
let data = [];
for (let i = 0; i < 10; i++) {
  data.push([
    faker.name.findName(),
    '123',
    faker.internet.email(),
    faker.internet.userName(),
    faker.image.avatar(),
    faker.date.past()
  ]);
}

const sql = 'INSERT INTO users (full_name, password, email, username, img, created_at) VALUES ?';

connection.query(sql, [data], (error, result) => {
  console.log(error);
  console.log(result);
});

// connection.connect();
// connection.end();
