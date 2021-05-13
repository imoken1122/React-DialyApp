import { withCookies } from 'react-cookie';

const LoggedOut = props =>
  props.cookies.get('dialy-token') ? null : props.children;

export default withCookies(LoggedOut);