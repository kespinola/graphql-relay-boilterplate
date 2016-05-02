import Relay from 'react-relay';

export default Component => Relay.createContainer(Component, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        first_name,
        last_name
      }
    `,
  },
});
