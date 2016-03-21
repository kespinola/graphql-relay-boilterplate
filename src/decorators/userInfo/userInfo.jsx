import React from 'react';


export default Component => {
  class UserInfoComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return UserInfoComponent;
};
