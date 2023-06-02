import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed-top navbar navbar-expand-lg  bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Shows
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
