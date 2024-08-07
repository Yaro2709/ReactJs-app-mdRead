import React, { useState, useEffect } from 'react';
import { Outlet, Link, useRoutes, useLocation } from 'react-router-dom';
import MarkDown from 'markdown-to-jsx'
import './styles/main_styles.css';

function App() {

    const md_home = <Home file_name={'home.md'} />;
    const md_users = <Home file_name={'users.md'} />;
    const md_widgets = <Home file_name={'widgets.md'} />;

    const routes = [
        {
            path: '/',
            element: <Layout />,
            children: [
                // The index route defines what should be displayed
                // on the default route i.e. '/'
                { index: true, element: <Landing /> },
                { path: '/home', element: md_home },
                { path: '/users', element: md_users },
                { path: '/widgets', element: md_widgets },
            ],
        },
    ];

    // The useRoutes() hook allows you to define your routes as JavaScript objects
    // instead of <Routes> and <Route> elements. This is really just a style
    // preference for those who prefer to not use JSX for their routes config.
    return useRoutes(routes);
}

const Layout = () => (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Landing</Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/widgets">Widgets</Link>
                </li>
            </ul>
        </nav>

        <hr />

        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
    </div>
);

const Landing = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <h2>Landing</h2>
            <p>Route: {pathname}</p>
        </div>
    );
};

const Home = ({file_name}) => {
    const { pathname } = useLocation();

    //const file_name = 'react_pinterest_clone.md';
    const [post, setPost] = useState('');

    useEffect(() => {
        import(`./markdown/${file_name}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res));
            })
            .catch(err => console.log(err));
    });

    return (
        <div>
            <MarkDown>
                {post}
            </MarkDown>
            <p>Route: {pathname}</p>
        </div>
    );
};

export default App;
