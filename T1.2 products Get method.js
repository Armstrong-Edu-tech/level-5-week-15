// pages/api/products.js
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 }
];

export default function handler(req, res) {
    if(req.method==='POST'){
        const {name,price}=req.body;

        if(!name|| !price){
            return res.status(400).json({message:
                "Missing required field"})
        }

        const newProduct={id:products.length+1,
            name,price
        }
        products.push(newProduct)
        res.status(201).json(newProduct);
    }else if(req.method === 'GET'){
        const { id } = req.query;

         if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message:
         'Invalid or missing id' });
    }
    const product = products.find(p => p.id === Number(id));

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
    }else{
        res.status(405).json({ message: 
            'Method not allowed' });
    }
}
