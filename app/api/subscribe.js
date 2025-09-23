import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

let subscriptions = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const subscription = req.body;
    subscriptions.push(subscription);
    return res.status(201).json({ message: 'Subscribed successfully' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
