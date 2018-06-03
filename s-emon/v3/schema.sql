CREATE TABLE users(
  username VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
  password VARCHAR(255) NOT NULL DEFAULT 123,
  created_at TIMESTAMP DEFAULT NOW()
);



INSERT INTO users (email) VALUES('goodcat@gmail.com'), ('badcat@outlook.com');

-- creates random users with faker

const sql = 'INSERT INTO users (full_name, password, email, username, img, created_at) VALUES ?';

connection.query(sql, [data], (error, result) => {
  console.log(error);
  console.log(result);
});

// connection.connect();
// connection.end();
