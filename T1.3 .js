let products = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      const product = products.find(p => p.id === Number(id));
      if (!product) return res.status(404).json({ message: 'Product not found' });

      return res.status(200).json(product);
    }

    return res.status(200).json(products);

  } else if (req.method === 'POST') {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Missing required fields: name and price' });
    }

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);

    return res.status(201).json(newProduct);

  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
