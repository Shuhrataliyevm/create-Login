import { useEffect, useState } from 'react';
import ProfileApi from '../../utils/ProfileApi';
import { AxiosError } from 'axios';
import "../../ui/products.scss"
interface Debtor {
    id?: number;
    created_at?: string;
    updated_at?: string;
    full_name: string;
    address: string;
    description: string;
    store: string;
    phone_number?: string;
    images: string[];
    amount?: number;
    starred?: boolean;
}

const Products = () => {
    const [debtors, setDebtors] = useState<Debtor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDebtors = async () => {
            try {
                const response = await ProfileApi.getDebtors();
                console.log('API Response:', response);

                let debtorsData: Debtor[] = [];
                
                if (Array.isArray(response)) {
                    debtorsData = response.map(item => ({
                        id: item.id,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        full_name: item.full_name || '',
                        address: item.address || '',
                        description: item.description || '',
                        store: item.store || '',
                        phone_number: item.phone_number || '',
                        images: Array.isArray(item.images) ? item.images : [],
                        amount: item.amount || 0,
                        starred: item.starred || false
                    }));
                }

                console.log('Processed debtors:', debtorsData);
                setDebtors(debtorsData);
                setError(null);
            } catch (err) {
                const error = err as AxiosError;
                if (error.response?.status === 401) {
                    setError('Avtorizatsiya zarur. Iltimos, tizimga kiring.');
                } else {
                    setError(`Ma'lumotlarni yuklashda xatolik: ${error.message}`);
                }
                console.error('Xatolik:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDebtors();
    }, []);

    const toggleStar = (index: number) => {
        const newDebtors = [...debtors];
        newDebtors[index] = {
            ...newDebtors[index],
            starred: !newDebtors[index].starred
        };
        setDebtors(newDebtors);
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('uz-UZ').format(Math.abs(amount));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Yuklanmoqda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl p-4 border rounded-lg shadow-md">
                    {error}
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Tizimga kirish
                    </button>
                </div>
            </div>
        );
    }

    return (

<div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <input
                id='input-search'
                    type="text"
                    placeholder="Mijozlarni qidirish..."
                    className="px-4 py-2 border rounded-lg w-full max-w-md"
                />
            </div>
            
            <div className="space-y-3">
                {debtors.map((debtor, index) => (
                    <div
                        key={debtor.id || index}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div id='product-card' className="flex justify-between items-start">
                            <div id='product-card-info'>
                                <h2 className="text-lg font-medium mb-1">{debtor.full_name || 'Nomsiz'}</h2>
                                <p className="text-gray-600 text-sm">{debtor.phone_number}</p>
                            </div>
                            <button
                                onClick={() => toggleStar(index)}
                                className="p-1"
                            >
                                {debtor.starred ? (
                                    <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <div className="mt-3">
                            <p id='product-card-amounts'  className="text-sm">Jami nasiya:</p>
                            <p id='product-card-amount' className={`text-lg font-medium ${debtor.amount && debtor.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {debtor.amount ? `${debtor.amount < 0 ? '-' : ''}${formatAmount(debtor.amount)} so'm` : '0 so\'m'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-600 transition-colors"
            >
                + Yaratish
            </button>
        </div>
    );
};

export default Products;