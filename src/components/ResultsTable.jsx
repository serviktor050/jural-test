import { useDispatch } from 'react-redux';
import { backToBrands } from '../features/parts/partSlice.js';
import { formatPrice, getPriceAndStock } from '../features/parts/helpers';

function ResultsTable({ positions, number, brand }) {
    const dispatch = useDispatch();

    if (!positions.length) {
        return (
            <div className="alert alert-warning">
                По запросу «{number} / {brand}» аналоги не найдены.{' '}
                <button
                    type="button"
                    className="btn btn-sm btn-link p-0 align-baseline"
                    onClick={() => dispatch(backToBrands())}
                >
                    Выбрать другого производителя
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <h2 className="h6 mb-0">
                    Артикул <strong>{number}</strong> · производитель <strong>{brand}</strong> ·
                    найдено позиций: {positions.length}
                </h2>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => dispatch(backToBrands())}
                >
                    ← Другой производитель
                </button>
            </div>

            <div className="table-responsive shadow-sm">
                <table className="table table-sm table-hover align-middle bg-white mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>Производитель</th>
                        <th>Наименование</th>
                        <th>Артикул</th>
                        <th className="text-end">Цена</th>
                        <th className="text-end">Остаток</th>
                        <th>Склады</th>
                    </tr>
                    </thead>
                    <tbody>
                    {positions.map((item, index) => {
                        const { price, stock, warehouses } = getPriceAndStock(item);
                        return (
                            <tr
                                key={item.goodsID || index}
                                className={stock === 0 ? 'text-muted' : ''}
                            >
                                <td className="fw-semibold">{item.brand}</td>
                                <td>
                                    {item.name}
                                    {item.notRefund && (
                                        <span className="badge bg-warning text-dark ms-2">
                        невозвратная
                      </span>
                                    )}
                                </td>
                                <td className="text-nowrap">{item.number}</td>
                                <td className="text-end text-nowrap">
                                    {price ? formatPrice(price) : '—'}
                                </td>
                                <td className="text-end text-nowrap">{stock} шт.</td>
                                <td>
                                    {warehouses.length ? (
                                        <ul className="list-unstyled mb-0 small">
                                            {warehouses.map((w) => (
                                                <li key={w.id || w.code}>
                            <span className="badge bg-light text-dark border me-1">
                              {w.code || String(w.id).slice(0, 8)}
                            </span>
                                                    {w.stock} шт. × {formatPrice(w.price)}
                                                    {w.own && (
                                                        <span className="text-success ms-1">(наш склад)</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ResultsTable