import * as React from 'react';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { Link as RRLink } from 'react-router-dom';
import * as s from './Link.css';

class Link extends React.Component {
  static None = '__no_link_to__';

  componentWillUnmount() {
    if (this.cleanup) this.cleanup();
  }

  render() {
    let cn = [s.root];
    const {
      null: isNull,
      unstyled,
      external,
      internal,
      hashLink,
      smooth,
      activeClassName,
      className,
      to,
      primary,
      inexact,
      disabled,
      ...props
    } = this.props;

    if (unstyled) cn.push(s.unstyled);

    if (className) cn.push(...[].concat(this.props.className));

    if (primary) cn.push(s.primary);

    const curr = this.props.pathname.split('/').filter(Boolean);
    if (activeClassName && (this.props.pathname === to || `/${curr[0]}` === to)) {
      cn.push(s.active, activeClassName);
    }

    // Allows specifying a to="/*/*/bar", where when on /a/b/foo, the /a/b
    // will be preserved
    const toInterpolated =
      '/' +
      to
        .split('/')
        .filter(Boolean)
        .map((x, i) => {
          if (x === '*') {
            if (curr[x]) {
              return curr[i];
            } else {
              return null;
            }
          }
          return x;
        })
        .filter(Boolean)
        .join('/');

    props.className = cn.join(' ');

    if (external) {
      // Was an accessibility warnings, but we'll assume that the caller
      // provides href+children
      // eslint-disable-next-line
      return <a href={to} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    if (internal) {
      // Was an accessibility warnings, but we'll assume that the caller
      // provides href+children
      // eslint-disable-next-line
      return <a href={toInterpolated} {...props} />;
    }

    if (hashLink && activeClassName) {
      return (
        <HashLink
          to={toInterpolated}
          {...props}
          activeClassName={[s.active, activeClassName].join(' ')}
        />
      );
    }

    if (isNull) {
      return <span {...props} />;
    }

    if (hashLink) {
      return <HashLink smooth to={toInterpolated} {...props} />;
    }

    {
      const { onClick, ...rest } = props;

      let onClickWrapped = onClick;

      if (disabled) {
        onClickWrapped = (event, ...args) => {
          event.preventDefault();
          if (onClick) {
            return onClick(event, ...args);
          }
        };
      }
      return <RRLink to={toInterpolated} onClick={onClickWrapped} {...rest} />;
    }
  }
}

const mapState = (state) => ({ pathname: state.url.pathname });

export default connect(mapState, {})(Link);
