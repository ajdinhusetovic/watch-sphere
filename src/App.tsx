import "./scss/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Details from "./pages/Details";
import MovieSources from "./pages/MovieSources";

function App() {
  const client = new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     refetchOnWindowFocus: false,
    //   },
    // },
  });
  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:movieId" element={<Details />} />
            <Route path="/sources/:movieId" element={<MovieSources />} />
          </Routes>
        </Router>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
