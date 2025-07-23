
import React, { useState, useMemo } from 'react';
import type { User } from '../../../types';
import { Role } from '../../../types';
import { MOCK_USERS } from '../../../constants';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SystemManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const staffUsers = useMemo(() => users.filter(u => u.role !== Role.CUSTOMER), [users]);

  const openModal = (user: User | null = null) => {
    setEditingUser(user ? { ...user } : { id: '', username: '', name: '', role: Role.CASHIER });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    if (!editingUser) return;

    if (editingUser.id) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    } else {
      setUsers([...users, { ...editingUser, id: `user-${Date.now()}` }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <DashboardLayout title="System User Management">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openModal()}>Add New User</Button>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {staffUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === Role.SUPER_ADMIN ? 'bg-red-200 text-red-800' : user.role === Role.ADMIN ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>{user.role}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button onClick={() => openModal(user)} variant="ghost" size="sm">Edit</Button>
                  <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm" className="ml-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser.id ? 'Edit User' : 'Add New User'}>
          <div className="space-y-4">
            <Input label="Full Name" value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} />
            <Input label="Username" value={editingUser.username} onChange={e => setEditingUser({ ...editingUser, username: e.target.value })} />
            <Select label="Role" value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value as Role })}>
                <option value={Role.CASHIER}>Cashier</option>
                <option value={Role.ADMIN}>Admin</option>
                <option value={Role.SUPER_ADMIN}>Super Admin</option>
            </Select>
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

export default SystemManagement;
