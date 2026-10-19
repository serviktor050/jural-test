export const API_KEY =
    import.meta.env.VITE_API_KEY || '00000000-0000-0000-0000-0000000000001';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const buildUrl = (params) => {
    const query = new URLSearchParams({ key: API_KEY, ...params });
    return `${API_BASE}?${query.toString()}`;
};

export async function fetchGoods(params) {
    let response;
    try {
        response = await fetch(buildUrl(params));
    } catch (e) {
        throw new Error('Ошибка при соединении.');
    }

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }

    let data;
    try {
        data = await response.json();
    } catch (e) {
        throw new Error('Некорректный ответ');
    }

    if (data && data.error) {
        throw new Error(data.error);
    }

    const goods = Array.isArray(data && data.goods) ? data.goods : [];

    // Пустая строка, если позиция не найдена
    return goods.filter((g) => g && (g.number || g.brand));
}