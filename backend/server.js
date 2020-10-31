import app from "./app";
const PORT = 5000;
process.env.NODE_ENV = "production";
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
