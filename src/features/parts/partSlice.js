import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGoods } from './api';

export const searchBrands = createAsyncThunk(
    'parts/searchBrands',
    async (number, { rejectWithValue }) => {
        try {
            const goods = await fetchGoods({ number });
            const brands = [...new Set(goods.map((g) => g.brand).filter(Boolean))];
            return { number, brands };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchAnalogues = createAsyncThunk(
    'parts/searchAnalogues',
    async ({ number, brand }, { rejectWithValue }) => {
        try {
            const goods = await fetchGoods({
                number,
                brand,
                analogues: 'on',
                info: 'on',
            });

            const positions = [];
            const seen = new Set();
            const pushUnique = (item) => {
                const id = item.goodsID || `${item.brand}|${item.number}`;
                if (seen.has(id)) return;
                seen.add(id);
                positions.push(item);
            };

            goods.forEach((item) => {
                pushUnique(item);
                (item.analogues || []).forEach(pushUnique);
            });

            return { brand, positions };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    number: '',
    brand: '',
    brands: [],
    positions: [],
    step: 'search',
    loading: false,
    error: null,
};

const partsSlice = createSlice({
    name: 'parts',
    initialState,
    reducers: {
        backToBrands(state) {
            state.step = 'brands';
            state.brand = '';
            state.positions = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBrands.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.number = action.meta.arg;
                state.brand = '';
                state.brands = [];
                state.positions = [];
                state.step = 'search';
            })
            .addCase(searchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.number = action.payload.number;
                state.brands = action.payload.brands;
                state.step = 'brands';
            })
            .addCase(searchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Не удалось выполнить поиск';
            })

            .addCase(searchAnalogues.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.brand = action.meta.arg.brand;
                state.positions = [];
            })
            .addCase(searchAnalogues.fulfilled, (state, action) => {
                state.loading = false;
                state.positions = action.payload.positions;
                state.step = 'results';
            })
            .addCase(searchAnalogues.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Не удалось получить аналоги';
            });
    },
});

export const { backToBrands } = partsSlice.actions;
export default partsSlice.reducer;