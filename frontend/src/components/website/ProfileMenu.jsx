import GuestMenu from "./GuestMenu";
import CompanyAdminMenu from "./CompanyAdminMenu";
import SuperAdminMenu from "./SuperAdminMenu";

const ProfileMenu = ({ profile, isAuthenticated, closeMenu, onLogout }) => {
  if (!isAuthenticated) {
    return <GuestMenu closeMenu={closeMenu} />;
  }

  if (profile?.role === "superadmin") {
    return (
      <SuperAdminMenu
        profile={profile}
        closeMenu={closeMenu}
        onLogout={onLogout}
      />
    );
  }

  return (
    <CompanyAdminMenu
      profile={profile}
      closeMenu={closeMenu}
      onLogout={onLogout}
    />
  );
};

export default ProfileMenu;
