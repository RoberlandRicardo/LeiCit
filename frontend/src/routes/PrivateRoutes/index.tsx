
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartSection from '../../pages/StartSection';
import RegisterLeilao from '../../pages/RegisterLeilao';
import SearchLeilao from '../../pages/SearchLeilao';
import DetailsLeilao from '../../pages/DetailsLeilao';

function PrivateRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartSection />} />
                <Route path="/register" element={<RegisterLeilao />} />
                <Route path="/search" element={<SearchLeilao />} />
                <Route path="/leilao/:address" element={<DetailsLeilao />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes;