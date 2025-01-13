export default function handler(req, res) {
  res.status(200).json({
    name: "denev",
    age: "38",
    isValid: true,
  });
}
