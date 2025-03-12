import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger icon
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/state/navbarSlice"; // Utilisation du chemin relatif

const NavbarToggler = () => {
  const dispatch = useDispatch();

  const setToggleMenu = () => {
    dispatch(toggleMenu()); // Déclenche l'action Redux pour basculer l'état du menu
  };

  return (
    <button
      className="lg:hidden text-2xl p-3 border rounded-full"
      onClick={setToggleMenu}
    >
      <GiHamburgerMenu />
    </button>
  );
};

export default NavbarToggler;

