// pages/api/products.js
let products = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;

    // Validation: check if fields exist
    if (!name || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);

    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
