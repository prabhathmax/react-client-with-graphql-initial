import * as React from 'react';
import Link from '../../atoms/Link';
import * as s from './Nav.css';

class Nav extends React.Component {
    state = {
        showNavbar: true,
        showOffer: false,
        showEmail: false,
    };
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    toggleNav() {
        if (window.innerWidth <= 780) {
            this.setState({ showNavbar: false });
        }
    }
    handleResize = () => {
        if (window.innerWidth <= 780) {
            this.setState({ showNavbar: false });
        } else {
            this.setState({ showNavbar: true });
        }
    };
    render() {
        const { showNavbar, showOffer, showEmail } = this.state;
        return (
            <div className={s.root}>
                    <div className={s.user}>
                        Welcome <span className={s.userName}>Admin</span>
                        <span className={s.light}> (</span>
                        <span className={s.userRole}>Admin</span>
                        <span className={s.light}>)</span>
                        <span
                            className={s.toggleButton}
                            onClick={() => this.setState({ showNavbar: !showNavbar })}
                        >
              &#926;
            </span>
                    </div>
                {this.state.showNavbar && (
                    <div className={s.links}>
                        {
                            <Link
                                className={s.link}
                                activeClassName={s.linkActive}
                                onClick={() => this.toggleNav()}
                                to="/"
                            >
                                <i className="fas fa-home" />
                                Home
                            </Link>
                        }
                        {
                            <Link
                                className={s.link}
                                activeClassName={s.linkActive}
                                onClick={() => this.toggleNav()}
                                to="/users"
                            >
                                <i className="far fa-users" />
                                Users
                            </Link>
                        }
                        <div className={s.spacer} />
                    </div>
                )}
            </div>
        );
    }
}

export default Nav;
