require(dotenv).config();

const app = required("./app");

const port = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});