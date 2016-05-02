import Relay from 'react-relay';

export default class LoginUserMutation extends Relay.Mutation {
    static fragments = {
      user: () => Relay.QL`
        fragment on User {
          email,
          password
        }
      `,
  };

  getMutation() {
    return Relay.QL`mutation { loginUser }`;
  }

  getVariables() {
    return this.props.doc;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginUserPayload {
        user {
          id,
          email,
          token,
        },
      }
    `;
  }

}
