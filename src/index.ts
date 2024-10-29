import app from "./app";
const PORT = process.env.PORT || 3366;

// Server start
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
