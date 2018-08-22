import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      groups: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const groups = await this.groups();
      this.setState({ groups });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  groups() {
    return API.get("groups", "/groups");
  }

  renderGroupsList(groups) {
    return [{}].concat(groups).map(
      (group, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={group.groupId}
            href={`/groups/${group.groupId}`}
            onClick={this.handleGroupClick}
            header={
              group.meetingNotes
                ? group.meetingNotes.trim().split("\n")[0]
                : "Information Not Available"
            }
          >
            {"Created: " + new Date(group.createdAt).toLocaleString()}
            {"Updated at: " + new Date(group.updatedAt).toLocaleString()}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/groups/new"
            onClick={this.handleGroupClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new group
            </h4>
          </ListGroupItem>
        )
    );
  }

  handleGroupClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  };

  renderLander() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>ClassGroup</h1>
          <p>
            <strong>Sign up</strong> for a study group
          </p>
          <p>
            <strong>Meet</strong> new students
          </p>
          <p>
            <strong>Ace</strong> your exam
          </p>
        </div>
      </div>
    );
  }

  renderGroups() {
    return (
      <div className="groups">
        <PageHeader>Your Groups</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderGroupsList(this.state.groups)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderGroups() : this.renderLander()}
      </div>
    );
  }
}
