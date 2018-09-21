import React, { Component } from "react";
import gql from "graphql-tag";
import { TextField, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

// const client = new ApolloClient({
//   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
// });

// client
//   .query({
//     query: gql`
//       {
//         users {
//           id
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

//The mutation that Apollo will send on form submit
const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      user {
        id
      }
    }
  }
`;

//This component is rendered inside a modal on landing page
class NewUser extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    id: ""
  };

  //This method keeps the state up to date with the input fields
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  //
  render() {
    const { username, password, email } = this.state;

    return (
      <div>
        {/*The mutation component wraps the form and consumes its input fields to fill in the mutation it will send.*/}
        <Mutation
          mutation={CREATE_USER}
          onCompleted={data => this._confirm(data)}
        >
          {(createUser, { loading, error, data }) => (
            <div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  createUser({
                    variables: {
                      username: username,
                      password: password,
                      email: email
                    }
                  });
                  this.setState({
                    name: "",
                    email: "",
                    password: ""
                  });
                }}
              >
                <TextField
                  id="field-username"
                  label="User Name"
                  name="username"
                  className={"modal_field"}
                  value={username}
                  onChange={this.handleChange("username")}
                  margin="normal"
                />
                <TextField
                  id="field-password"
                  label="Password"
                  name="password"
                  className={"modal_field"}
                  value={password}
                  onChange={this.handleChange("password")}
                  margin="normal"
                  type="password"
                />
                <TextField
                  id="field-email"
                  label="Email"
                  name="email"
                  className={"modal_field"}
                  value={email}
                  onChange={this.handleChange("email")}
                  margin="normal"
                />
                <Button type="submit">Create User</Button>
              </form>
              {loading && <p>Saving new user...</p>}
              {(data || error) && <p>Nooooooooo or yes.</p>}
            </div>
          )}
        </Mutation>
      </div>
    );
  }

  //parentInfoMethod is passed down from the landing page component to allow this component to send a user id up to its state
  //
  _confirm = async data => {
    this.props.parentInfoMethod(data.createUser.user.id);
    this.props.modalDone();
  };
}

export default NewUser;
