import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import config from "../config";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class Groups extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      group: null,
      meetingLocation: "",
      meetingDate: "",
      meetingTime: "",
      meetingTimeMoment: null,
      attendanceLimit: 1,
      meetingNotes: "",
      participantIds: [],
      groupAndOwnerMatch: false
    };
  }

  async componentWillMount() {
    try {
      const userCreds = await Auth.currentUserCredentials();
      const currentUserId = userCreds.data.IdentityId;

      const group = await this.getGroup();
      if (group.userId == currentUserId) {
        this.setState({
          groupAndOwnerMatch: true
        });
        // alert("owners match");
      } else {
        // alert("owners don't match");
      }

      const {
        meetingLocation,
        meetingDate,
        meetingTime,
        meetingTimeMoment,
        attendanceLimit,
        meetingNotes,
        participantIds
      } = group;

      this.setState({
        group,
        meetingLocation,
        meetingDate,
        meetingTime,
        meetingTimeMoment,
        attendanceLimit,
        meetingNotes,
        participantIds: participantIds ? participantIds : []
      });
    } catch (e) {
      alert(e);
    }
  }

  // should be accessible only if user is owner
  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });
  };

  getGroup() {
    return API.get("groups", `/groups/${this.props.match.params.id}`);
  }

  render() {
    // return ;
    return (
      <div className="Groups">
        {this.state.groupAndOwnerMatch
          ? this.renderOwnerMatch()
          : this.renderOwnerDontMatch()}
      </div>
    );
  }

  renderOwnerMatch() {
    return <h1>working on it</h1>;
  }

  renderOwnerDontMatch() {
    return (
      <div className="lander">
        <h3>
          This ClassGroup will be activated when enough people sign up for this
          group
        </h3>
        <h6>
          {this.state.participantIds.length} / {this.state.attendanceLimit} have
          signed up so far
        </h6>
      </div>
    );
  }
}
