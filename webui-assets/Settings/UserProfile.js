import React from "react";

export default class UserProfile extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      basicProfile: {
        firstName: { change: false, value: "" },
        lastName: { change: false, value: "" },
        geId: { change: false, value: "" },
        mobile: { change: false, value: "" },
        city: { change: false, value: "" },
        country: { change: false, value: "" },
      },
      validBasicProfile: true,
      copyBasicProfile: {
        firstName: "",
        lastName: "",
        geId: "",
        mobile: "",
        city: "",
        country: "",
      },
      notifications: {
        notifications_email: false,
        notifications_text: false,
        notifications_phone: false,
        messages_email: false,
        messages_text: false,
      },
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    $(function () {
      $(".field-wrapper .field-placeholder").on("click", function () {
        $(this).closest(".field-wrapper").find("input").focus();
        var value = $(this).closest(".field-wrapper").find("input").val();
        if (value) {
          $(this).closest(".field-wrapper").addClass("hasValue");
        } else {
          $(this).closest(".field-wrapper").removeClass("hasValue");
        }
      });
      $(".field-wrapper input").on("keyup", function () {
        var value = $.trim($(this).val());
        if (value) {
          $(this).closest(".field-wrapper").addClass("hasValue");
        } else {
          $(this).closest(".field-wrapper").removeClass("hasValue");
        }
      });
    });

    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      // Get gateways
      method: "GET",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((profile) => {
          profile = {
            firstName: "Bryan",
            lastName: "Shaw",
            geId: "bryan.shaw@ge.com",
            mobile: "+113120312",
            city: "Nevada",
            country: "US",
          };
          let currentbasicProfile = Object.assign({}, this.state.basicProfile);
          let currentCopyBasicProfile = Object.assign(
            {},
            this.state.copyBasicProfile
          );
          currentCopyBasicProfile.firstName = profile.firstName;
          currentbasicProfile.firstName.value = profile.firstName;
          currentbasicProfile.firstName.change = false;
          currentCopyBasicProfile.lastName = profile.lastName;
          currentbasicProfile.lastName.value = profile.lastName;
          currentbasicProfile.lastName.change = false;
          currentCopyBasicProfile.geId = profile.geId;
          currentbasicProfile.geId.value = profile.geId;
          currentbasicProfile.geId.change = false;
          currentCopyBasicProfile.mobile = profile.mobile;
          currentbasicProfile.mobile.value = profile.mobile;
          currentbasicProfile.mobile.change = false;
          currentCopyBasicProfile.city = profile.city;
          currentbasicProfile.city.value = profile.city;
          currentbasicProfile.city.change = false;
          currentCopyBasicProfile.country = profile.country;
          currentbasicProfile.country.value = profile.country;
          currentbasicProfile.country.change = false;
          this.setState({
            basicProfile: currentbasicProfile,
            copyBasicProfile: currentCopyBasicProfile,
          });

          fetch("https://jsonplaceholder.typicode.com/todos/1", {
            // Get gateways
            method: "GET",
          }).then((response) => {
            if (response.status === 200) {
              response.json().then((notifications) => {
                notifications = {
                  notifications_email: false,
                  notifications_text: true,
                  notifications_phone: true,
                  messages_email: false,
                  messages_text: false,
                };

                let currentNotifications = Object.assign(
                  {},
                  this.state.notifications
                );
                currentNotifications.notifications_email =
                  notifications.notifications_email;
                currentNotifications.notifications_text =
                  notifications.notifications_text;
                currentNotifications.notifications_phone =
                  notifications.notifications_phone;
                currentNotifications.messages_email =
                  notifications.messages_email;
                currentNotifications.messages_text =
                  notifications.messages_text;
                this.setState({
                  notifications: currentNotifications,
                });
              });
            }
          });
        });
      }
    });
  }

  /* istanbul ignore next */
  handlePlaceholder(e) {
    let id = e.target.id;
    let currentbasicProfile = Object.assign({}, this.state.basicProfile);
    let copyProfile = this.state.basicProfile;
    let value = e.target.value;
    if (id === "firstName") {
      currentbasicProfile.firstName.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.firstName.value = e.target.value;
      } else {
        currentbasicProfile.firstName.value = copyProfile.firstName.value;
      }
    } else {
      currentbasicProfile.firstName.value = copyProfile.firstName.value;
      //currentbasicProfile.firstName.change = false;
    }
    if (id === "lastName") {
      currentbasicProfile.lastName.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.lastName.value = e.target.value;
      } else {
        currentbasicProfile.lastName.value = copyProfile.lastName.value;
      }
    } else {
      currentbasicProfile.lastName.value = copyProfile.lastName.value;
      //currentbasicProfile.lastName.change = false;
    }
    if (id === "geId") {
      currentbasicProfile.geId.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.geId.value = e.target.value;
      } else {
        currentbasicProfile.geId.value = copyProfile.geId.value;
      }
    } else {
      currentbasicProfile.geId.value = copyProfile.geId.value;
      //currentbasicProfile.geId.change = false;
    }
    if (id === "mobile") {
      currentbasicProfile.mobile.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.mobile.value = e.target.value;
      } else {
        currentbasicProfile.mobile.value = copyProfile.mobile.value;
      }
    } else {
      currentbasicProfile.mobile.value = copyProfile.mobile.value;
      //currentbasicProfile.mobile.change = false;
    }
    if (id === "city") {
      currentbasicProfile.city.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.city.value = e.target.value;
      } else {
        currentbasicProfile.city.value = copyProfile.city.value;
      }
    } else {
      currentbasicProfile.city.value = copyProfile.city.value;
      //currentbasicProfile.city.change = false;
    }
    if (id === "country") {
      currentbasicProfile.country.change = true;
      if (typeof value !== "undefined") {
        currentbasicProfile.country.value = e.target.value;
      } else {
        currentbasicProfile.country.value = copyProfile.country.value;
      }
    } else {
      currentbasicProfile.country.value = copyProfile.country.value;
      //currentbasicProfile.country.change = false;
    }
    this.setState({
      basicProfile: currentbasicProfile,
    });
    this.validationBasicProfile();
  }

  /* istanbul ignore next */
  validationBasicProfile() {
    let valid = true;
    let basicProfile = this.state.basicProfile;
    if (
      basicProfile.firstName.value === "" ||
      basicProfile.lastName.value === "" ||
      basicProfile.mobile.value === "" ||
      basicProfile.geId.value === "" ||
      basicProfile.city.value === "" ||
      basicProfile.country.value === ""
    ) {
      valid = false;
    }
    this.setState({
      validBasicProfile: valid,
    });
  }

  /* istanbul ignore next */
  SaveSetting(e) {
    console.log(this.state.basicProfile);
    console.log(e.target);
  }

  /* istanbul ignore next */
  handleNotification(e) {
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let fieldName = e.target.name;
    let currentNotifications = Object.assign({}, this.state.notifications);
    if (fieldName === "notifications_email") {
      currentNotifications.notifications_email = updatedValue;
    }
    if (fieldName === "notifications_text") {
      currentNotifications.notifications_text = updatedValue;
    }
    if (fieldName === "notifications_phone") {
      currentNotifications.notifications_phone = updatedValue;
    }
    if (fieldName === "messages_email") {
      currentNotifications.messages_email = updatedValue;
    }
    if (fieldName === "messages_text") {
      currentNotifications.messages_text = updatedValue;
    }
    this.setState({
      notifications: currentNotifications,
    });
    console.log(this.state.notifications);
  }
  /* istanbul ignore next */
  saveNotifications(e) {
    console.log(this.state.notifications);
  }

  /* istanbul ignore next */
  render() {
    /* jshint ignore:start */
    return (
      <div className="UserManagement">
        <div className="row mt-1">
          <div className="col-sm-4">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row executeModal">
                    <div className="col-sm-6">
                      <h5>
                        {this.state.copyBasicProfile.firstName +
                          " " +
                          this.state.copyBasicProfile.lastName}
                      </h5>
                      <label className="control-label ml-2">
                        {this.state.copyBasicProfile.city +
                          "," +
                          this.state.copyBasicProfile.country}
                      </label>
                      <label className="control-label ml-2">
                        4:32PM (GMT-4)
                      </label>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src={"https://avatars.dicebear.com/v2/identicon/" +this.state.copyBasicProfile.firstName +".svg"}
                        className="rounded-circle"
                        alt="Profile Picture"
                        width="130"
                        height="130"
                      />
                    </div>
                  </div>
                </li>
             {/*   <li className="list-group-item">
                  <div className="row">
                    <div className="col-sm-6">
                      <a href="#" className="custom-user-link">
                        <small>UPLOAD PICTURE</small>
                      </a>
                    </div>
                    <div className="col-sm-6">
                      <a href="#" className="stretched-link">
                        <small>REMOVE PICTURE</small>
                      </a>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="card">
                <form>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row ">
                        <div className="col-sm-12">
                          <h6 className="font-weight-bold mt-1 text-left">
                            Basic Profile
                            <small>
                              &nbsp;&nbsp;&nbsp;&nbsp;The information can be
                              edited from your profile page.
                            </small>
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row ">
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={this.state.basicProfile.firstName.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="firstName"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="firstName"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.firstName.change ==
                                true
                                  ? "First Name"
                                  : this.state.basicProfile.firstName.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.firstName.value == "" ? (
                            <small className="text-default">
                              Please specify the first name
                            </small>
                          ) : null}
                        </div>
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={this.state.basicProfile.lastName.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="lastName"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="lastName"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.lastName.change == true
                                  ? "Last Name"
                                  : this.state.basicProfile.lastName.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.lastName.value === "" ? (
                            <small className="text-default">
                              Please specify the last name
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="geId"
                              id="geId"
                              value={this.state.basicProfile.geId.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="geId"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="geId"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.geId.change == true
                                  ? "GE Id"
                                  : this.state.basicProfile.geId.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.geId.value === "" ? (
                            <small>Please specify the GE Id</small>
                          ) : null}
                        </div>
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="mobile"
                              id="mobile"
                              value={this.state.basicProfile.mobile.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="mobile"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="mobile"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.mobile.change == true
                                  ? " Mobile No."
                                  : this.state.basicProfile.mobile.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.mobile.value === "" ? (
                            <small>Please specify the Mobile No.</small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              value={this.state.basicProfile.city.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="city"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="city"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.city.change == true
                                  ? "City"
                                  : this.state.basicProfile.city.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.city.value === "" ? (
                            <small>Please specify the City</small>
                          ) : null}
                        </div>
                        <div className="col-sm-4">
                          <div className="field-wrapper">
                            <input
                              type="text"
                              name="country"
                              id="country"
                              value={this.state.basicProfile.country.value}
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            />
                            <div
                              className="field-placeholder"
                              id="country"
                              onClick={(event) => {
                                this.handlePlaceholder(event);
                              }}
                            >
                              <span
                                id="country"
                                onClick={(event) => {
                                  this.handlePlaceholder(event);
                                }}
                              >
                                {this.state.basicProfile.country.change === true
                                  ? "Country"
                                  : this.state.basicProfile.country.value}
                              </span>
                            </div>
                          </div>
                          {this.state.basicProfile.country.value === "" ? (
                            <small>Please specify the Contry</small>
                          ) : null}
                        </div>
                        <div className="col-sm-4">
                          <button
                            type="button"
                            className="btn customize-user-btn btn-sm"
                            disabled={!this.state.validBasicProfile}
                            onClick={(event) => {
                              this.SaveSetting(event);
                            }}
                          >
                            Save Setting
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </form>
              </div>
            </div>

            {/*           <div className="row my-2">
              <div className="card">
                <form>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-12">
                          <h6 className="font-weight-bold ml-2 text-left">
                            Notification
                            <small>
                              &nbsp;&nbsp;&nbsp;&nbsp;Manage the notifications
                              e-mailing
                            </small>
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="font-weight-bold ml-2 float-left">
                            Notification
                          </h6>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input custom-control-checkbox"
                                  id="notifications_email"
                                  name="notifications_email"
                                  checked={
                                    this.state.notifications.notifications_email
                                  }
                                  onChange={(event) => {
                                    this.handleNotification(event);
                                  }}
                                />
                                <label
                                  className="custom-control-label custom-user-label float-left"
                                  htmlFor="notifications_email"
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input custom-control-checkbox"
                                  id="notifications_text"
                                  name="notifications_text"
                                  checked={
                                    this.state.notifications.notifications_text
                                  }
                                  onChange={(event) => {
                                    this.handleNotification(event);
                                  }}
                                />
                                <label
                                  className="custom-control-label custom-user-label float-left"
                                  htmlFor="notifications_text"
                                >
                                  Text messages
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input custom-control-checkbox"
                                  id="notifications_phone"
                                  name="notifications_phone"
                                  checked={
                                    this.state.notifications.notifications_phone
                                  }
                                  onChange={(event) => {
                                    this.handleNotification(event);
                                  }}
                                />
                                <label
                                  className="custom-control-label custom-user-label float-left"
                                  htmlFor="notifications_phone"
                                >
                                  Phone calls
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4 checkbox">
                          <h6 className="font-weight-bold ml-2 float-left ">
                            Messages
                          </h6>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input custom-control-checkbox"
                                  id="messages_email"
                                  name="messages_email"
                                  checked={
                                    this.state.notifications.messages_email
                                  }
                                  onChange={(event) => {
                                    this.handleNotification(event);
                                  }}
                                />
                                <label
                                  className="custom-control-label custom-user-label float-left"
                                  htmlFor="messages_email"
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input custom-control-checkbox"
                                  id="messages_text"
                                  name="messages_text"
                                  checked={
                                    this.state.notifications.messages_text
                                  }
                                  onChange={(event) => {
                                    this.handleNotification(event);
                                  }}
                                />
                                <label
                                  className="custom-control-label custom-user-label float-left"
                                  htmlFor="messages_text"
                                >
                                  Text messages
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <button
                            type="button"
                            className="btn customize-user-btn btn-sm"
                            onClick={(event) => {
                              this.saveNotifications(event);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                                      
                                </li>
                  </ul>
                </form>
              </div>
            </div> */}

            <div className="row my-2">
              <div className="card">
                <form>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-12">
                          <h6 className="font-weight-bold ml-2 text-left">
                            Licensing
                            <small>
                              &nbsp;&nbsp;&nbsp;&nbsp;Manage the Licenses and
                              subscriptions
                            </small>
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="font-weight-bold ml-2 float-left">
                            Licenses
                          </h6>
                        </div>
                        <div className="col-sm-4 checkbox text-left">
                          You have 3 Licenses
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="font-weight-bold ml-2 float-left">
                            Subsciptions
                          </h6>
                        </div>
                        <div className="col-sm-4 checkbox text-left">
                          You have 5 Subsciptions
                        </div>
                      </div>
                    </li>
                    {/*  <li className="list-group-item">
                    
                    </li> */}
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
