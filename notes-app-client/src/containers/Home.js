import React, { Component } from "react";
import "./Home.css";
import { API, Auth } from "aws-amplify";
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab,
  ButtonToolbar
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.notes();
      const userCreds = await Auth.currentUserCredentials();
      const currentUserId = userCreds.data.IdentityId;
      this.setState({ notes, currentUserId });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get("notes", "/notes");
  }

  renderNotesList(notes) {
    return [{}]
      .concat(notes)
      .map(
        (note, i) =>
          i !== 0 ? (
            <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.handleNoteClick}
              header={note.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          ) : (
            <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.handleNoteClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          )
      )
      .filter((note, i) => i != 0);
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  };

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-success btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-info btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroupItem
          key="new"
          href="/notes/new"
          onClick={this.handleNoteClick}
          style={{ marginBottom: "20px" }}
        >
          <h4>
            <b>{"\uFF0B"}</b> Create a new note
          </h4>
        </ListGroupItem>
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="All Notes">
            <ListGroup style={{ marginTop: "20px" }}>
              {!this.state.isLoading && this.renderNotesList(this.state.notes)}
            </ListGroup>
          </Tab>
          <Tab eventKey={2} title="Your Notes">
            <ListGroup style={{ marginTop: "20px" }}>
              {!this.state.isLoading && this.renderNotesList(this.state.notes)}
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
