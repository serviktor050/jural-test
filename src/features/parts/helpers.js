export const getPriceAndStock = (item) => {
    const warehouses = Array.isArray(item.warehouses) ? item.warehouses : [];
    const inStock = warehouses.filter((w) => Number(w.stock) > 0);

    const price = inStock.length
        ? Math.min(...inStock.map((w) => Number(w.price) || 0))
        : Number(item.price) || 0;

    const stock =
        typeof item.count === 'number'
            ? item.count
            : warehouses.reduce((sum, w) => sum + (Number(w.stock) || 0), 0);

    return { price, stock, warehouses };
};

export const formatPrice = (value) =>
    new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 2,
    }).format(Number(value) || 0);