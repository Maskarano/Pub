
import React, { useState } from 'react';
import type { MenuItem } from '../../../types';
import { MOCK_MENU_ITEMS } from '../../../constants';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { generateDescription } from '../../../services/geminiService';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const openModal = (item: MenuItem | null = null) => {
    setEditingItem(item ? { ...item } : { id: '', name: '', description: '', price: 0, category: '', imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300` });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (editingItem.id) {
      // Edit existing
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? editingItem : item));
    } else {
      // Add new
      setMenuItems([...menuItems, { ...editingItem, id: `item-${Date.now()}` }]);
    }
    closeModal();
  };
  
  const handleDelete = (id: string) => {
      setMenuItems(menuItems.filter(item => item.id !== id));
  }

  const handleGenerateDesc = async () => {
    if (!editingItem || !editingItem.name || !editingItem.category) {
        alert("Please enter item name and category first.");
        return;
    }
    setIsGenerating(true);
    const desc = await generateDescription(editingItem.name, editingItem.category);
    if (editingItem) {
        setEditingItem({...editingItem, description: desc});
    }
    setIsGenerating(false);
  }

  return (
    <DashboardLayout title="Menu Management">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openModal()}>Add New Item</Button>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {menuItems.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400 max-w-xs truncate">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-400 font-semibold">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button onClick={() => openModal(item)} variant="ghost" size="sm">Edit</Button>
                  <Button onClick={() => handleDelete(item.id)} variant="danger" size="sm" className="ml-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem.id ? 'Edit Menu Item' : 'Add Menu Item'}>
          <div className="space-y-4">
            <Input label="Name" value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} />
            <Input label="Category" value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} />
            <Input label="Price" type="number" value={editingItem.price} onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })} />
            <Input label="Image URL" value={editingItem.imageUrl} onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })} />
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                    value={editingItem.description}
                    onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
                <Button variant="secondary" size="sm" className="mt-2" onClick={handleGenerateDesc} isLoading={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
                </Button>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default MenuManagement;
