


import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <span className="navbar-brand">ToDo App</span>
        </Link>
        {/* <Link href="/newTodo">
            <span className="create">Create List</span>
        </Link> */}
    </nav>
)

export default Navbar;