import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBrands } from '../features/parts/partSlice.js';

function SearchForm() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.parts.loading);
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const number = value.trim();
        if (!number) return;
        dispatch(searchBrands(number));
    };

    return (
        <form className="row g-2 mb-4" onSubmit={handleSubmit}>
            <div className="col">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Артикул детали, например 0189"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="col-auto">
                <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={loading || !value.trim()}
                >
                    Найти
                </button>
            </div>
        </form>
    );
}

export default SearchForm