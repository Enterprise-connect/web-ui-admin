import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class Subscriptioncreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExisting: false,
      subscriptionForm: {
        licenseId: { value: "", dirtyState: false },
        emailAddress: { value: "", dirtyState: false },
        sso: { value: "", dirtyState: false },
        desc: { value: "", dirtyState: false },
        username: { value: "", dirtyState: false },
        date: { value: "", dirtyState: false }
      },
      errorsSubscriptionForm: {},
      subscriptionFormIsValid: false,
      confidentialities: [
        { name: "True", id: "true" },
        { name: "False", id: "false" },
      ],
      environments: [
        { name: "PREPROD", id: "PREPROD" },
        { name: "PROD", id: "PROD" },
      ],
      optInoptOuts: [
        { name: "True", id: "true" },
        { name: "False", id: "false" },
      ],
      preserves: [
        { name: "True", id: "true" },
        { name: "False", id: "false" },
      ],
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
   	window.enableToolTip(); 
  }
	
  /* istanbul ignore next */
  handleFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentForm = Object.assign({}, this.state.subscriptionForm);
	 
     if (fieldName === "emailAddress") {
      currentForm.emailAddress.value = updatedValue;
      currentForm.emailAddress.dirtyState = true;
    } else if (fieldName === "sso") {
      currentForm.sso.value = updatedValue;
      currentForm.sso.dirtyState = true;
    } else if (fieldName === "date") {
      currentForm.date.value = updatedValue;
      currentForm.date.dirtyState = true;
    }else if (fieldName === "desc") {
      currentForm.desc.value = updatedValue;
      currentForm.desc.dirtyState = true;
    } else if (fieldName === "username") {
      currentForm.username.value = updatedValue;
      currentForm.username.dirtyState = true;
    }

    this.setState({
      subscriptionForm: currentForm,
    });
    this.handleFormValidation();
  }

  /* istanbul ignore next */
  handleFormValidation() {
    let currentFormData = this.state.subscriptionForm;   

    let licenseId = currentFormData.licenseId.value;
    let licenseIdDirtyState = currentFormData.licenseId.dirtyState;
    let emailAddress = currentFormData.emailAddress.value;
    let emailAddressDirtyState = currentFormData.emailAddress.dirtyState;
    let expdate = currentFormData.date.value;
    let expdateDirtyState = currentFormData.date.dirtyState;
    let username = currentFormData.username.value;
    let usernameDirtyState = currentFormData.username.dirtyState;
    let formIsValid = true;
    let errors = {};

    if (username.trim() === "") {
      if (usernameDirtyState) {
        errors.username = "Please enter Username";
      }
      formIsValid = false;
    }
	  
	  
    if (emailAddress.trim() === "") {
      if (emailAddressDirtyState) {
        errors.emailAddress = "Please enter Email Address";
      }
      formIsValid = false;
    }

    if (expdate.trim() === "") {
      if (expdateDirtyState) {
        errors.date = "Please enter Expiry";
      }
      formIsValid = false;
    }

    this.setState({
      subscriptionFormIsValid: formIsValid,
      errorsSubscriptionForm: errors,
    });
  }

  /* istanbul ignore next */
  createSubscription() {
    this.props.showGlobalMessage(
      true,
      true,
      "Please wait...",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.subscriptionForm);
    let prepareData = {};
    let myuuid = uuidv4();
   
    prepareData.licenseId = myuuid;
    prepareData.emailAddress = currentForm.emailAddress.value;
    prepareData.date = currentForm.date.value;
    prepareData.sso = currentForm.sso.value;
    prepareData.desc = currentForm.desc.value;
    prepareData.username = currentForm.username.value;
    prepareData.parent = "ab2a2691-a563-486c-9883-5111ff36ba9b"
    prepareData.name = "License"

    // fetch(this.props.baseUrl + '/createSubscription', {
    fetch(this.props.baseUrl + myuuid, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authToken,
      },
      body: JSON.stringify(prepareData),
    })
      .then((response) => {
        localStorage.setItem("prepareData", JSON.stringify(prepareData));

        if (response.status === 200) {
          this.snapshotUpdate();
          response.json().then((respData) => {
            respData = {
              errorStatus: {
                status: "ok",
              },
            };
            if (respData.errorStatus.status == "ok") {
              this.props.showGlobalMessage(
                false,
                true,
                "Record saved successfully",
                "custom-success"
              );
              setTimeout(() => {
                this.props.hideGlobalMessage();
                let subscriptionForm = {
                  licenseId: { value: "", dirtyState: false },
                  emailAddress: { value: "", dirtyState: false },
                  sso: { value: "", dirtyState: false },
                  desc: { value: "", dirtyState: false },
                  username: { value: "", dirtyState: false },
                  date:{ value: "", dirtyState: false }
                };
                this.setState({
                  subscriptionForm: subscriptionForm,
                  subscriptionFormIsValid: false,
                  isExisting: false,
                });
              }, 2000);
            } else {
              this.props.showGlobalMessage(
                true,
                true,
                respData.errorStatus.statusMsg,
                "custom-danger"
              );
              setTimeout(() => {
                this.props.hideGlobalMessage();
              }, 2000);
            }
          });
        } else {
          this.props.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
          setTimeout(() => {
            this.props.hideGlobalMessage();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.showGlobalMessage(
          true,
          true,
          "Please try after sometime",
          "custom-danger"
        );
        setTimeout(() => {
          this.props.hideGlobalMessage();
        }, 2000);
      });
  }
	
    /* istanbul ignore next */ 
    snapshotUpdate(){
        fetch(this.props.baseUrl + "snapshot", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.props.authToken,
            }
          })
        .then((response) => {
            if (response.status === 200) {
              response.json().then((respData) => {
                sessionStorage.setItem("snapshotData", JSON.stringify(respData))
        })
        }})
    }			
  /* istanbul ignore next */
  handleCreateMode(e) {
    let value = e.target.checked;
    this.setState({ isExisting: value });
    setTimeout(() => {
      this.handleFormValidation();
    }, 100);
  }
  /* istanbul ignore next */
  showHideField(e, formName, fieldName) {
    let currentForm = Object.assign({}, this.state.subscriptionForm);

    if (currentForm[fieldName].type == "password") {
      currentForm[fieldName].type = "text";
    } else {
      currentForm[fieldName].type = "password";
    }

    this.setState({
      subscriptionForm: currentForm,
    });
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="row Subscriptioncreate">
        <div className="col-md-12 mt-2">
          <div className="centered-div">
            <div className="centered-div-header">
              <div className="row maintainagentcreate-header">
                <div className="col-md-12">
                  <h6 id="maintainsubscriptioncreate-title">
                    Create License <small>Creating parameters.</small>
                  </h6>
                </div>
              </div>
              <hr></hr>

              <div className="changeable-form subscription-form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      License ID
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.subscriptionName}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="licenseId"
			readOnly={true}
                        value={this.state.subscriptionForm.licenseId.value}
                      /*  onChange={(event) => {
                          this.handleFormData(event);
                        }}*/
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["licenseId"]}
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      Expiry Date/Time
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.expdate}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="YYYY/DD/MM"
                        className="form-control form-control-sm"
                        name="date"
                        value={this.state.subscriptionForm.date.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["date"]}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      Email Address
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.subscriptionName}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="emailAddress"
                        value={this.state.subscriptionForm.emailAddress.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["emailAddress"]}
                      </small>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="col-sm-12 label">
                      SSO
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.subscriptionName}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="sso"
                        value={this.state.subscriptionForm.sso.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["sso"]}
                      </small>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                     User Fullname
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.username}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="username"
                        value={this.state.subscriptionForm.username.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["username"]}
                      </small>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="col-sm-12 label">
                      Description
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          data-content={this.props.helpText.desc}
                        />
                      </span>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="textArea"
                        className="form-control form-control-sm"
                        name="desc"
                        value={this.state.subscriptionForm.desc.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["desc"]}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 mb-2 text-center">
                        <button 
                             id="create-subscription-btn"
                             disabled={!this.state.subscriptionFormIsValid}
                             onClick={this.createSubscription.bind(this)} 
                             className="btn btn-sm customize-view-btn">CREATE LICENSE</button>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
