import Search from "../components/Search";
import "../scss/home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="logo-wrapper">
        <span id="watch">WATCH</span>
        <span id="sphere">sphere</span>
      </div>
      <Search />
    </div>
  );
};

export default Home;
