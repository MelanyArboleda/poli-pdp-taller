import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
          <nav class="navbar navbar-expand-lg navbar navbar-dark bg-menuCartas">
            <a class="navbar-brand" href="#">Deck Of Cards</a>
            
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                <NavLink exact to="/" activeClassName="cursor-pointer">
                        <label className="font-bar">Inicio</label>
                 </NavLink>
                </li>
                <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li class="nav-item a">
                <NavLink exact to="/about" activeClassName="cursor-pointer a">
                        <label className="font-bar">Acerca de</label>
                 </NavLink>
                </li>
                <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li class="nav-item">
                <NavLink exact to="/play" activeClassName="cursor-pointer ">
                      <label className="font-bar">Jugar</label>
                </NavLink>
                </li>      
              </ul>
            </div>
          </nav>
  );
};

export default Navbar;
