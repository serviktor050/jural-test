import { useDispatch } from 'react-redux';
import { searchAnalogues } from '../features/parts/partSlice.js';

function BrandList({ brands, number }) {
    const dispatch = useDispatch();

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white">
                Артикул <strong>{number}</strong> — выберите производителя ({brands.length})
            </div>
            <div className="list-group list-group-flush">
                {brands.map((brand) => (
                    <button
                        key={brand}
                        type="button"
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        onClick={() => dispatch(searchAnalogues({ number, brand }))}
                    >
                        <span className="fw-semibold">{brand}</span>
                        <span className="badge bg-primary rounded-pill">Показать аналоги →</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BrandList