import { Link } from "react-router-dom";

interface Props {
    username: string;
}

const Navbar: React.FC<Props> = ({ username }: Props) => {
    return (
        <nav className="navbar">
            <Link to="/">
                <h1 className="navbar-title">Forum</h1>
            </Link>
            <Link to="/createpost">
                <h1 className="navbar-link">Create Post</h1>
            </Link>
            {username === "" ? (
                <Link to="/signup">
                    <h1 className="navbar-link">Sign Up</h1>
                </Link>
            ) : (
                <h1>Logged in as: {username}</h1>
            )}
            {username === "" ? (
                <Link to="/signin">
                    <h1 className="navbar-link">Sign In</h1>
                </Link>
            ) : null}
            <Link to="/about">
                <h1 className="navbar-link">About</h1>
            </Link>
            <Link to="/contact">
                <h1 className="navbar-link">Contact</h1>
            </Link>
        </nav>
    );
};

export default Navbar;
