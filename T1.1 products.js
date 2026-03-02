let products = [
 { id: 1, name: 'Laptop' },
 { id: 2, name: 'Phone' }
]

export default function handler(req, res) {
 if (req.method === 'GET') {
   // Read all products
   res.status(200).json(products)

 } else if (req.method === 'POST') {
   // Create new product
   const newProduct = {
     id: products.length + 1,
     name: req.body.name
   }

   products.push(newProduct)
   res.status(201).json(newProduct)

 } else if (req.method === 'PUT') {
   // Update product
   const { id, name } = req.body
   const product = products.find(p => p.id === id)

   if (!product) {
     return res.status(404).json({ message: 'Product not found' })
   }

   product.name = name
   res.status(200).json(product)

 } else if (req.method === 'DELETE') {
   // Delete product
   const { id } = req.body
   products = products.filter(p => p.id !== id)

   res.status(200).json({ message: 'Product deleted' })

 } else {
   res.status(405).json({ message: 'Method not allowed' })
 }
}
