import React from 'react';
import { compose } from 'ramda';
import { Grid, Row, Col } from 'react-flexgrid';
import authInterface from './../../modules/auth/interface';
import { userFragment } from './../../modules/user';
import UserForm from './../../components/UserForm';

const SignUp = ({ auth: { actions: { signUpRequest } } }) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <UserForm submitLabel="Sign Up" onSubmit={signUpRequest} />
        </Col>
      </Row>
    </Grid>
  );
};

export default compose(
  authInterface,
  userFragment
)(SignUp);
