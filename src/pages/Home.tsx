import Logo from "../components/Logo";
import Search from "../components/Search";
import "../scss/home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Logo />
      <Search />
    </div>
  );
};

export default Home;
