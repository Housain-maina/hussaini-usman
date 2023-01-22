export default async function handler(req, res) {
  // check for the POST request
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ error: "Invalid HTTP method. Only POST requests are allowed." });
  }

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const body = req.body;
    if (!body) {
      res.status(400).send("Bad request (no body)");
      return;
    }

    // get the slug to revalidate from body
    const path = body.path;
    if (path) {
      await res.revalidate(path);
      return res.json({ revalidated: true });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
