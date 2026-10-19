import { useSelector } from 'react-redux';
import SearchForm from './components/SearchForm';
import BrandList from './components/BrandList';
import ResultsTable from './components/ResultsTable';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';

function App() {
    const { step, loading, error, brands, positions, number, brand } = useSelector(
        (state) => state.parts
    );

    return (
        <div className="container py-4" style={{ maxWidth: 1100 }}>
            <h1 className="h4 mb-1">Подбор автозапчастей</h1>
            <p className="text-muted small mb-4">
                Введите артикул → выберите производителя → получите аналоги и предложения
            </p>

            <SearchForm />
            <ErrorMsg message={error} />
            {loading && <Loader />}

            {!loading && step === 'brands' && brands.length > 0 && (
                <BrandList brands={brands} number={number} />
            )}

            {!loading && step === 'brands' && brands.length === 0 && !error && (
                <div className="alert alert-secondary">
                    По артикулу «{number}» ничего не найдено.
                </div>
            )}

            {!loading && step === 'results' && (
                <ResultsTable positions={positions} number={number} brand={brand} />
            )}
        </div>
    );
}

export default App