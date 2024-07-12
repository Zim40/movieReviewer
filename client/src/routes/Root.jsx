import Navbar from '../Components/nav';
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <Navbar />
            <div id="content">
                <nav>
                    <ul>
                        <li>
                            <Link to='/app'>app Link</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
}