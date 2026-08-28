import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

interface OrderItem {
  menuItemId: number;
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Classic Burger', category: 'Main', price: 5.99, available: true },
  { id: 2, name: 'Veggie Wrap', category: 'Main', price: 4.99, available: true },
  { id: 3, name: 'Iced Coffee', category: 'Drinks', price: 2.50, available: true },
  { id: 4, name: 'Fruit Bowl', category: 'Snacks', price: 3.00, available: false }
];

const orders: any[] = [];

// API Endpoints
app.get('/api/menu', (req: Request, res: Response) => {
  res.json(menuItems);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { items, customerName }: { items: OrderItem[]; customerName: string } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  const newOrder = {
    id: `ORD-${Date.now()}`,
    customerName: customerName || 'Guest',
    items,
    status: 'PENDING',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/orders/kitchen', (req: Request, res: Response) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Smart Canteen server running on http://localhost:${PORT}`);
});
