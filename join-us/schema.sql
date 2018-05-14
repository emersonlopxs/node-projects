CREATE TABLE users(
  email VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email) VALUES('goodcat@gmail.com'), ('badcat@outlook.com');
