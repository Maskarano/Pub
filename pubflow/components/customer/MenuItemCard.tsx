
import React from 'react';
import type { MenuItem } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem } = useCart();

  return (
    <Card className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{item.name}</h3>
        <p className="text-gray-400 mt-1 flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-amber-400">${item.price.toFixed(2)}</p>
          <Button onClick={() => addItem(item)} size="sm">Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
