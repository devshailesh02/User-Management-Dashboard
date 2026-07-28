import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const GuestMenu = ({ closeMenu }) => {
  return (
    <>
      <Link
        to="/company/login"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaSignInAlt />
        Login
      </Link>

      <Link
        to="/company/register"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaUserPlus />
        Register Company
      </Link>
    </>
  );
};

export default GuestMenu;
