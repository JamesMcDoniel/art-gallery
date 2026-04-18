import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GalleryType from './pages/GalleryType';
import GalleryResults from './pages/GalleryResults';
import Artwork from './pages/Artwork';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route path="gallery">
                        <Route
                            index
                            element={<Gallery />}
                        />
                        <Route
                            path=":type"
                            element={<GalleryType />}
                        />
                        <Route
                            path=":type/:slug"
                            element={<GalleryResults />}
                        />
                        <Route
                            path="all"
                            element={<GalleryResults />}
                        />
                    </Route>

                    <Route
                        path="/artwork/:slug"
                        element={<Artwork />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
