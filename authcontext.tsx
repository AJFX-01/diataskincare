const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

export default function Navbar() {
  const { user } = useAuth();
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4 style={{ marginTop: '1rem' }}>{user?.displayName}</h4>
        <b>(ADMIN)</b>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              View Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={activeLink}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/deleted-users" className={activeLink}>
              Deleted Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}