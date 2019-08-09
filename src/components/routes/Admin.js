import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Button,
  Container
} from "@material-ui/core";

import { defaultFilterMethod, generateReleaseText } from "../../util";
import Loader from "../misc/Loader";
import createApi from "../../services/MovieMediumApi";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,

      title: "",
      summary: "",
      trailer: "",
      rtLink: "",
      rtScore: -1,
      releaseDate: moment.utc().startOf("day"),
      isClosed: 0,

      add_title: "",
      add_summary: "",
      add_trailer: "",
      add_rtLink: "",
      add_poster: "",
      add_releaseDate: moment.utc().startOf("day"),

      isEdit: false,
      beingEdited: {},

      messageToAll: "",

      // feedback
      responseText: "",
      responding: {}
    };
  }

  componentDidMount() {
    this.props.getAllFeedback();
    this.props.getMovies();
  }

  prepEdit(movie) {
    this.setState({
      title: movie.title,
      summary: movie.summary,
      trailer: movie.trailer,
      rtLink: movie.rtLink,
      rtScore: movie.rtScore,
      releaseDate: moment(movie.releaseDate * 1000).utc(),
      isClosed: "isClosed" in movie ? movie.isClosed : 0,
      isEdit: true
    });
  }

  add() {
    this.props.addMovie({
      title: this.state.add_title,
      summary: this.state.add_summary,
      trailer: this.state.add_trailer,
      rtLink: this.state.add_rtLink,
      poster: this.state.add_poster,
      releaseDate: this.state.add_releaseDate.unix(),
      isClosed: 0,
      rtScore: -1,
      votes: null
    });
  }

  edit(movie) {
    this.props.editMovie(movie._id, {
      title: this.state.title,
      title_lower: this.state.title.toLowerCase(),
      summary: this.state.summary,
      trailer: this.state.trailer,
      rtLink: this.state.rtLink,
      releaseDate: this.state.releaseDate.unix(),
      isClosed: this.state.isClosed,
      rtScore: Number(this.state.rtScore)
    });
  }

  sendMessageToAll() {
    if (window.confirm("Confirm")) {
      this.props.messageAll(this.state.messageToAll);
    }
  }

  sendWarning(movie) {
    const api = createApi();
    api.sendMovieWarning(movie._id);
  }

  render() {
    const { tab } = this.state;

    if (!this.props.user) {
      return <Loader />;
    }
    if (!this.props.user.isAdmin) {
      return <Redirect to={"/"} />;
    }

    const renderEnv = () => {
      if (
        process.env.REACT_APP_API_URL ===
        "https://predict-movies-prod.herokuapp.com"
      ) {
        return <h1 style={{ color: "#EE5F5B" }}>Production</h1>;
      } else {
        const isStaging =
          process.env.REACT_APP_API_URL ===
          "https://predict-movies-staging.herokuapp.com";
        return (
          <Typography variant="h4">
            {isStaging ? "Staging" : "Development"}
          </Typography>
        );
      }
    };

    const renderInput = (key, disabled) => {
      return (
        <div style={{ width: "100%" }}>
          <TextField
            style={{ width: 300 }}
            id="standard-name"
            label={key}
            value={this.state[key]}
            onChange={e => this.setState({ [key]: e.target.value })}
            margin="normal"
          />
        </div>
      );
    };

    const renderAddForm = () => {
      return (
        <div style={{ width: "100%", padding: 20, maxWidth: 500 }}>
          {renderInput("add_title")}
          <div style={{ width: "100%" }}>
            <TextField
              style={{ width: "100%" }}
              label="add_summary"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ add_summary: e.target.value })}
              value={this.state.add_summary}
            />
          </div>
          {renderInput("add_trailer")}
          {renderInput("add_rtLink")}
          {renderInput("add_poster")}
          <div style={{ width: "100%", marginBottom: 20 }}>
            <span>Release Date (UTC)</span>
            <DateTime
              value={this.state.add_releaseDate}
              onChange={e => this.setState({ add_releaseDate: e })}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            disabled={
              !this.state.add_title ||
              !this.state.add_rtLink ||
              !this.state.add_trailer
            }
            onClick={() => this.add()}
          >
            Add movie
          </Button>
        </div>
      );
    };

    const renderForm = (isEdit = true, movie) => {
      return (
        <div style={{ width: "100%", padding: 20, maxWidth: 500 }}>
          {renderInput("title")}
          <div style={{ width: "100%" }}>
            <TextField
              style={{ width: "100%" }}
              label="Summary"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ summary: e.target.value })}
              value={this.state.summary}
            />
          </div>
          {renderInput("trailer")}
          {renderInput("rtLink")}
          {renderInput("rtScore", !this.state.isClosed)}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom>
              Is Closed?
            </Typography>
            <Checkbox
              checked={this.state.isClosed !== 0}
              onChange={e => {
                this.setState({ isClosed: e.target.checked ? 1 : 0 });
              }}
            >
              isClosed
            </Checkbox>
          </div>
          <div style={{ width: "100%", marginBottom: 20 }}>
            <span>Release Date (UTC)</span>
            <DateTime
              value={this.state.releaseDate}
              onChange={e => this.setState({ releaseDate: e })}
            />
          </div>

          <Button
            variant="contained"
            color="default"
            onClick={() => this.edit(movie)}
          >
            Edit movie
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 20 }}
            onClick={() => this.delete(movie)}
          >
            Delete movie
          </Button>
        </div>
      );
    };

    const renderMovieTable = () => {
      const columns = [
        {
          Header: "Status",
          id: "status",
          accessor: row => row,
          width: 90,
          Cell: row => {
            const movie = row.value;
            if (!movie.isClosed) {
              return (
                <div style={{ color: "#5EE137", fontWeight: "bold" }}>
                  Upcoming
                </div>
              );
            } else if (movie.isClosed && movie.rtScore < 0) {
              return (
                <div style={{ color: "#E8F132", fontWeight: "bold" }}>
                  Purgatory
                </div>
              );
            } else if (movie.rtScore > -1) {
              return (
                <div style={{ color: "#EE5F5B", fontWeight: "bold" }}>Past</div>
              );
            } else {
              return (
                <div style={{ color: "#EE5F5B", fontWeight: "bold" }}>
                  Error
                </div>
              );
            }
          },
          filterMethod: (filter, row) => {
            const movie = row._original;
            let text = "";
            if (!movie.isClosed) {
              text = "Upcoming";
            } else if (movie.isClosed && movie.rtScore < 0) {
              text = "Purgatory";
            } else if (movie.rtScore > -1) {
              text = "Past";
            } else {
              text = "Error";
            }

            return movie !== undefined
              ? text.toLowerCase().includes(filter.value.toLowerCase())
              : false;
          }
        },
        {
          Header: "Score",
          accessor: "rtScore",
          width: 50,
          style: { textAlign: "center", fontWeight: "bold" },
          Cell: row => (row.value < 0 ? "" : row.value)
        },
        {
          Header: "Title",
          accessor: "title",
          width: 200,
          Cell: row => {
            return (
              <a href={row.original.rtLink} target={"_blank"}>
                {row.value}
              </a>
            );
          }
        },
        {
          Header: "Season",
          accessor: "season",
          width: 50,
          style: { textAlign: "center" },
          Cell: row => row.value || null
        },
        {
          Header: "Countdown",
          id: "countdown",
          accessor: row => row,
          width: 100,
          Cell: row => {
            if (
              row.value &&
              !row.value.isClosed &&
              this.props.moviePredictionCutoffDate
            ) {
              return generateReleaseText(
                row.value.releaseDate,
                this.props.moviePredictionCutoffDate
              );
            } else {
              return "";
            }
          }
        },
        {
          Header: "Release",
          accessor: "releaseDate",
          width: 120,
          Cell: row => {
            return moment(row.value * 1000)
              .utc()
              .format("MM/DD/YYYY");
          }
        },
        {
          Header: "Created",
          accessor: "created_at",
          width: 120,
          Cell: row => {
            return moment(row.value)
              .utc()
              .format("MM/DD/YYYY");
          }
        },
        {
          Header: "Edit",
          accessor: "edit",
          width: 60,
          Cell: props => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (this.state.beingEdited[props.viewIndex]) {
                      this.setState({ beingEdited: {}, isEdit: false });
                    } else {
                      this.setState({
                        beingEdited: { [props.viewIndex]: true }
                      });
                      this.prepEdit(props.original);
                    }
                  }}
                >
                  Edit
                </a>
              </div>
            );
          }
        },
        {
          Header: "Warning",
          accessor: "warning",
          width: 100,
          Cell: props => {
            if (props.original.isClosed) return null;
            return (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => this.sendWarning(props.original)}
              >
                Send Warning
              </a>
            );
          }
        }
      ];

      return (
        <ReactTable
          style={{ width: "100%" }}
          data={this.props.movies}
          columns={columns}
          defaultPageSize={100}
          filterable
          defaultFilterMethod={defaultFilterMethod}
          expanded={this.state.beingEdited}
          className="-highlight"
          SubComponent={row => {
            return renderForm(true, row.original);
          }}
        />
      );
    };

    const renderFeedback = () => {
      const renderRespondToFeedbackForm = feedback => {
        return (
          <div
            style={{
              width: "100%",
              padding: 20
            }}
          >
            <div style={{ width: "100%", padding: "10px 0px" }}>
              <TextField
                style={{ width: "100%" }}
                label="Summary"
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                onChange={e => this.setState({ responseText: e.target.value })}
                value={this.state.responseText}
              />
            </div>
            <Button
              variant="contained"
              color="default"
              disabled={this.state.responseText.length < 2}
              onClick={() =>
                this.props.respondToFeedback(
                  feedback._id,
                  this.state.responseText
                )
              }
            >
              Send
            </Button>
          </div>
        );
      };

      const columns = [
        {
          Header: "Message",
          id: "message",
          style: { fontSize: 10, display: "flex", alignItems: "center" },
          accessor: "message",
          width: 300
        },
        {
          Header: "Created",
          id: "timestamp",
          width: 140,
          style: { fontSize: 10, display: "flex", alignItems: "center" },
          accessor: row => row.payload.created_at,
          Cell: row => moment.unix(row.value).format("MM/DD/YYYY, h:mm: a Z")
        },
        {
          Header: "Response",
          accessor: "respond",
          width: 300,
          Cell: row => {
            if (row.original.response) {
              return (
                <span style={{ fontSize: 10 }}>{row.original.response}</span>
              );
            } else {
              return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      if (this.state.responding[row.viewIndex]) {
                        this.setState({ responding: {} });
                      } else {
                        this.setState({
                          responding: { [row.viewIndex]: true }
                        });
                      }
                    }}
                  >
                    Respond
                  </Button>
                </div>
              );
            }
          }
        },
        {
          Header: "Go to Chat",
          accessor: "chatLink",
          id: "chatLink",
          filterable: false,
          sortable: false,
          width: 100,
          Cell: row => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="default"
                  href={`https://app.groupme.com/chats/${
                    row.original.payload.group_id
                  }`}
                  target={"_blank"}
                >
                  Go to chat
                </Button>
              </div>
            );
          }
        }
      ];

      return (
        <ReactTable
          style={{ width: "100%" }}
          data={this.props.feedback}
          columns={columns}
          defaultPageSize={100}
          filterable
          expanded={this.state.responding}
          defaultFilterMethod={defaultFilterMethod}
          className="-highlight"
          SubComponent={row => {
            return renderRespondToFeedbackForm(row.original);
          }}
          getTrProps={(thing, row) => {
            if (!row) return {};
            return {
              style: {
                backgroundColor: row.original.response
                  ? null
                  : "rgba(94, 225, 55, 0.1)"
              }
            };
          }}
        />
      );
    };

    const renderMessageAll = () => {
      return (
        <div style={{ width: "100%" }}>
          <TextField
            style={{ width: "100%" }}
            label="Message"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            onChange={e => this.setState({ messageToAll: e.target.value })}
            value={this.state.messageToAll}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.messageToAll}
            onClick={() => this.sendMessageToAll()}
          >
            Send Message
          </Button>
        </div>
      );
    };

    const renderLogs = () => {
      const columns = [
        {
          Header: "Timestamp",
          id: "timestamp",
          accessor: row =>
            moment(row.timestamp, "MM/DD/YYYY, H:mm:ss Z").unix(),
          width: 160,
          Cell: row => row.original.timestamp.split("+")[0]
        },
        {
          Header: "Level",
          id: "level",
          accessor: "level",
          width: 50
        },
        {
          Header: "Message",
          id: "message",
          accessor: "message"
        }
      ];

      return (
        <ReactTable
          style={{ width: "100%" }}
          data={this.props.otherLogs}
          columns={columns}
          defaultPageSize={100}
          filterable
          defaultFilterMethod={defaultFilterMethod}
          className="-highlight"
        />
      );
    };

    const renderHttpLogs = () => {
      const columns = [
        {
          Header: "Timestamp",
          id: "timestamp",
          accessor: row =>
            moment(row.timestamp, "MM/DD/YYYY, H:mm:ss Z").unix(),
          width: 160,
          Cell: row => row.original.timestamp.split("+")[0]
        },
        {
          Header: "Status",
          id: "status",
          accessor: "status",
          width: 50
        },
        {
          Header: "Method",
          id: "method",
          accessor: "method",
          width: 60
        },
        {
          Header: "URL",
          id: "url",
          accessor: "url",
          width: 300
        },
        {
          Header: "Response",
          id: "responseTime",
          accessor: row => Math.ceil(Number(row.responseTime)),
          width: 100,
          Cell: row => `${row.value.toFixed(0)} ms`
        },
        {
          Header: "Content",
          id: "contentLength",
          accessor: row => Math.ceil(Number(row.contentLength * 0.001)),
          width: 100,
          Cell: row => `${row.value.toFixed(0)} kb`
        }
      ];

      return (
        <ReactTable
          style={{ width: "100%" }}
          data={this.props.httpLogs}
          columns={columns}
          defaultPageSize={100}
          filterable
          defaultFilterMethod={defaultFilterMethod}
          className="-highlight"
        />
      );
    };

    const renderStats = () => {
      return (
        <div>
          <h4>Users: {this.props.stats.users}</h4>
          <h4>Groups: {this.props.stats.groups}</h4>
        </div>
      );
    };

    const renderCurrentContent = () => {
      let content = null;
      switch (tab) {
        case 0:
          content = renderFeedback();
          break;
        case 1:
          content = renderMovieTable();
          break;
        case 2:
          content = renderAddForm();
          break;
        case 3:
          content = renderMessageAll();
          break;
        case 4:
          content = renderLogs();
          break;
        case 5:
          content = renderHttpLogs();
          break;
        case 6:
          content = renderStats();
          break;
        default:
          return null;
      }

      return <TabContainer>{content}</TabContainer>;
    };

    return (
      <Container maxWidth={"xl"} style={{ paddingTop: "20px" }}>
        {renderEnv()}
        <div style={{ padding: 5 }}>
          <Typography variant={"body2"} style={{ marginBottom: 5 }}>
            <strong>Current Time </strong>
            {moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z")}
          </Typography>
          <Typography variant={"body2"}>
            <strong>Server Time </strong>
            {moment.utc().format("dddd, MMMM Do YYYY, h:mm:ss a Z")}
          </Typography>
        </div>
        <AppBar position="static">
          <Tabs
            variant="scrollable"
            scrollButtons="on"
            value={tab}
            onChange={(e, newTab) => {
              if (newTab > 3 && !this.props.otherLogs.length) {
                this.props.getLogs();
              }
              this.setState({ tab: newTab });
            }}
          >
            <Tab label="Feedback" />
            <Tab label="Movies" />
            <Tab label="Add Movie" />
            <Tab label="Message All" />
            <Tab label="Logs" />
            <Tab label="HTTP Logs" />
            <Tab label="Stats" />
          </Tabs>
        </AppBar>

        {renderCurrentContent()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { feedback, otherLogs, httpLogs } = state.admin;
  return {
    user: state.user.user,
    styles: state.styles,
    feedback,
    otherLogs,
    httpLogs,
    movies: state.movies.movies,
    moviePredictionCutoffDate: state.movies.moviePredictionCutoffDate,
    stats: state.admin.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllFeedback: () => dispatch(Actions.admin.getAllFeedback.request()),
    getMovies: () => dispatch(Actions.movies.getMovies.request()),
    addMovie: movie => dispatch(Actions.movies.addMovie.request(movie)),
    editMovie: (movieId, updatedData) =>
      dispatch(Actions.movies.editMovie.request(movieId, updatedData)),
    respondToFeedback: (feedbackId, message) =>
      dispatch(Actions.admin.respondToFeedback.request(feedbackId, message)),
    messageAll: message => dispatch(Actions.admin.messageAll.request(message)),
    getLogs: () => dispatch(Actions.admin.getLogs.request())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

function TabContainer(props) {
  return (
    <Typography
      component="div"
      style={{ padding: 8 * 3, backgroundColor: "#fefefe" }}
    >
      {props.children}
    </Typography>
  );
}
