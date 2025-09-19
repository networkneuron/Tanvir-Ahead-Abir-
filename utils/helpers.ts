export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const generateInvoiceId = (): string => {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const getStatusColor = (status: 'Paid' | 'Unpaid' | 'Pending') => {
  switch (status) {
    case 'Paid':
      return 'bg-green-500 text-green-900';
    case 'Unpaid':
      return 'bg-red-500 text-red-900';
    case 'Pending':
      return 'bg-yellow-500 text-yellow-900';
    default:
      return 'bg-gray-500 text-gray-900';
  }
};
