import React, { Component } from "react";
import { API, Storage, Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";
import LocationPicker from "react-location-picker";

const defaultPosition = {
  lat: 40.7484,
  lng: -73.9857
};

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.file = null;

    this.state = {
      isPageLoading: true,
      isLoading: null,
      isDeleting: null,
      note: null,
      content: "",
      currentUserId: null,
      attachmentURL: null,
      location: {
        address: "350 5th Ave, New York, NY 10118",
        position: {
          lat: 0,
          lng: 0
        }
      }
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(result) {
    console.log(result);
    console.log(result.position);
    console.log(result.address);

    // Set new location
    const location = {
      position: result.position,
      address: result.address
    };
    console.log(location);
    this.setState({ location });
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const userCreds = await Auth.currentUserCredentials();
      const currentUserId = userCreds.data.IdentityId;

      const { content, attachment } = note;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        note,
        content,
        attachmentURL,
        currentUserId
      });

      this.setState({
        isPageLoading: false
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return API.get("notes", `/notes/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      if (this.state.note.attachment) {
        await this.deleteAttachment(this.state.note.attachment);
      }

      await this.deleteNote();
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isDeleting: false });
    }
  };

  saveNote(note) {
    return API.put("notes", `/notes/${this.props.match.params.id}`, {
      body: note
    });
  }

  deleteAttachment(attachment) {
    return Storage.vault.remove(attachment);
  }

  deleteNote() {
    return API.del("notes", `/notes/${this.props.match.params.id}`);
  }

  handleSubmit = async event => {
    let attachment;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
        alert(this.state.note.attachment);

        if (this.state.note.attachment) {
          await this.deleteAttachment(this.state.note.attachment);
        }
      }

      await this.saveNote({
        content: this.state.content,
        attachment: attachment || this.state.note.attachment
      });

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="Notes">
        {this.state.note && (
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            {this.state.note.attachment && (
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            )}
            <FormGroup controlId="file">
              {!this.state.note.attachment && (
                <ControlLabel>Attachment</ControlLabel>
              )}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>

            {this.state.isPageLoading ? null : (
              <LocationPicker
                containerElement={
                  <div style={{ height: "100%", marginBottom: "20px" }} />
                }
                zoom={17}
                mapElement={<div style={{ height: "400px" }} />}
                defaultPosition={defaultPosition}
                onChange={this.handleLocationChange}
              />
            )}

            {this.state.currentUserId === this.state.note.userId ? null : (
              <Button block bsStyle="primary" bsSize="large">
                Check
              </Button>
            )}
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>
        )}
      </div>
    );
  }
}
