import React, { Component } from "react";
import { withRouter } from "react-router";
import PartForm from "./partform.js";
import { DETAILED_PART_BY_ID } from "../../queries";
import { Query } from "react-apollo";
import { Typography } from "@material-ui/core";

//This component will render on the /parts/:id/edit route when the user is logged in
//It is a child of the home component.
//It will present the user with form fields to edit an existing part.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r29EA
class EditPart extends Component {
  render() {
    return (
      <Query
        // retrieves part details via query
        query={DETAILED_PART_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <div>
              <PartForm mode="edit" part={data.part} refetch={refetch} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EditPart);
