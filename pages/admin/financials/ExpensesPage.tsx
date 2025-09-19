import React, { useState } from 'react';
import { Expense } from '../../../types/financial';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { PlusIcon, EditIcon, TrashIcon } from '../../../components/icons';

const initialExpenses: Expense[] = [
    { _id: 'e1', category: 'Software', description: 'Adobe Creative Cloud Subscription', amount: 59.99, date: '2023-10-05' },
    { _id: 'e2', category: 'Marketing', description: 'Social Media Ad Campaign', amount: 250, date: '2023-10-10' },
    { _id: 'e3', category: 'Contractors', description: 'Freelance Animator', amount: 1200, date: '2023-10-20' },
];

const ExpensesPage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

    return (
        <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Manage Expenses</h2>
                <button className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Add New Expense
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {expenses.map((expense) => (
                            <tr key={expense._id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(expense.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{expense.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{expense.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatCurrency(expense.amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-400 hover:text-indigo-300 mr-4"><EditIcon /></button>
                                    <button className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpensesPage;
