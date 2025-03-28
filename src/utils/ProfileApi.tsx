import axios from 'axios';

const BASE_URL = 'https://nasiya.takedaservice.uz/api';

const getToken = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Current token:', token);
    return token;
};

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', {
        url: config.url,
        method: config.method,
        headers: config.headers
    });
    return config;
});

// Добавляем перехватчик для всех ответов
api.interceptors.response.use(
    (response) => {
        console.log('Response data:', response.data);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

interface DebtorData {
    id?: number;
    created_at?: string;
    updated_at?: string;
    full_name: string;
    address: string;
    description: string;
    store: string;
    phone_numbers: string[];
    images: string[];
    amount?: number;
    starred?: boolean;
}

const ProfileApi = {
    getDebtors: async () => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error('Avtorizatsiya zarur');
            }
            
            const response = await api.get('/debtor');
            console.log('Raw API response:', response);
            
            if (!response.data || !response.data.data) {
                throw new Error('Ma\'lumotlar topilmadi');
            }

            const debtors = Array.isArray(response.data.data) ? response.data.data : [];
            return debtors.map((debtor: DebtorData) => ({
                ...debtor,
                amount: -800000, 
                starred: Boolean(debtor.starred),
                phone_numbers: Array.isArray(debtor.phone_numbers) ? debtor.phone_numbers : []
            }));
        } catch (error) {
            console.error('Ma\'lumotlarni olishda xatolik:', error);
            throw error;
        }
    },

    createDebtor: async (debtorData: DebtorData) => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error('Avtorizatsiya zarur');
            }

            const response = await api.post('/debtor', debtorData);
            return response.data;
        } catch (error) {
            console.error('Qarzdor yaratishda xatolik:', error);
            throw error;
        }
    },

    toggleStar: async (debtorId: number) => {
        try {
            const token = getToken();
            if (!token) {
                throw new Error('Avtorizatsiya zarur');
            }

            const response = await api.post(`/debtor/${debtorId}/toggle-star`);
            return response.data;
        } catch (error) {
            console.error('Yulduzchani o\'zgartirishda xatolik:', error);
            throw error;
        }
    }
};

export default ProfileApi;