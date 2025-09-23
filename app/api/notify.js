import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

let subscriptions = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const payload = JSON.stringify({
      title: 'New Update!',
      body: 'Check out the latest features.',
    });

    await Promise.all(
      subscriptions.map(sub =>
        webpush.sendNotification(sub, payload).catch(err => {
          console.error('Push error:', err);
        })
      )
    );

    return res.status(200).json({ message: 'Notifications sent' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
