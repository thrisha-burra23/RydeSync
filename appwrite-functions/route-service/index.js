export default async ({ req, res }) => {
  // 1. Read raw body (Appwrite sends it as string)
  const rawBody = req.body;

  // 2. Parse JSON string → JS object
  const body = JSON.parse(rawBody);

  // 3. Echo it back
  return res.json({
    message: "Input received",
    body
  });
};