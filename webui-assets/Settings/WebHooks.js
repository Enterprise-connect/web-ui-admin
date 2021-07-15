import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class WebHooks extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: { value: "", dirtyState: false },
        eventType: { value: "", dirtyState: false },
        endpoint: { value: "", dirtyState: false },
        secret: { value: "", dirtyState: false, type: "password" },
      },
      errorsForm: {},
      formIsValid: false,
      showForm: false,
      WebHookList:[{
        name: '',
        eventType: '',
        endpoint: '',
    }]
    };
  }

/* istanbul ignore next */
  componentDidMount(){
    window.initTable('webhookTable', true);
    this.fetchData();
  }

  /* istanbul ignore next */
  fetchData(){
    let webhooks = [];
    if (sessionStorage.getItem("snapshotData") !== null) {
            let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
            let allData =[]
              Object.keys(respData).forEach((key)=> {
                  allData.push(respData[key])
              });
              for(let individualData of allData){
                  if(individualData.parent){
                      if(individualData.parent ==="5e69f043-966d-438f-9421-83fb18272a7d"){
                        webhooks.push(individualData);
                      }
                  }
              }
            this.setState({
                WebHookList: webhooks
            });
       
    }
    else {
        this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
        this.setState({
            WebHookList: [{
                name: '',
                eventType: '',
                endpoint: '',
            }]
        });
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
    }

  }

  /* istanbul ignore next */
  handleFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentForm = Object.assign({}, this.state.formData);

    if (fieldName === "eventType") {
      currentForm.eventType.value = updatedValue;
      currentForm.eventType.dirtyState = true;
    } else if (fieldName === "endpoint") {
      currentForm.endpoint.value = updatedValue;
      currentForm.endpoint.dirtyState = true;
    } else if (fieldName === "name") {
      currentForm.name.value = updatedValue;
      currentForm.name.dirtyState = true;
    } else if (fieldName === "secret") {
      currentForm.secret.value = updatedValue;
      currentForm.secret.dirtyState = true;
    }

    this.setState({
      formData: currentForm,
    });
    this.handleFormValidation();
  }

  /* istanbul ignore next */
  handleFormValidation() {
    let currentFormData = this.state.formData;
    let nameValue = currentFormData.name.value;
    let nameDirtyState = currentFormData.name.dirtyState;
    let endpointValue = currentFormData.endpoint.value;
    let endpointDirtyState = currentFormData.endpoint.dirtyState;
    let eventTypeValue = currentFormData.eventType.value;
    let eventTypeDirtyState = currentFormData.eventType.dirtyState;
    let secretValue = currentFormData.secret.value;
    let secretDirtyState = currentFormData.secret.dirtyState;
    let formIsValid = true;
    let errors = {};

    if (nameValue.trim() === "") {
      if (nameDirtyState) errors.name = "Please enter Name";
      formIsValid = false;
    }

    if (endpointValue.trim() === "") {
      if (endpointDirtyState) errors.endpoint = "Please enter Api Endpoint";
      formIsValid = false;
    }

    if (eventTypeValue.trim() === "") {
      if (eventTypeDirtyState) errors.eventType = "Please enter Event Type";
      formIsValid = false;
    }

    if (secretValue.trim() === "") {
      if (secretDirtyState) errors.secret = "Please enter Secret";
      formIsValid = false;
    }

    this.setState({
      formIsValid: formIsValid,
      errorsForm: errors,
    });
  }
  
  /* istanbul ignore next */
/*   createNotification() {
    this.props.showGlobalMessage(
      false,
      true,
      "Record saving initiated. Please check after some time.",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.formData);
    let prepareData = {};
    prepareData.name = currentForm.name.value;
    prepareData.eventType = currentForm.eventType.value;
    prepareData.endpoint = currentForm.endpoint.value;
    console.log(prepareData);
    this.props.hideGlobalMessage();
    this.setState({
      showForm: false,
    });
  } */

  /* istanbul ignore next */
  showHideField(e, fieldName) {
    let currentForm = {};
    currentForm = Object.assign({}, this.state.formData);

    if (currentForm[fieldName].type == "password") {
      currentForm[fieldName].type = "text";
    } else {
      currentForm[fieldName].type = "password";
    }

    this.setState({
      formData: currentForm,
    });
  }

    /* istanbul ignore next */
  createWebHook(){
    this.props.showGlobalMessage(
        true,
        true,
        "Please wait...",
        "custom-success"
      );
      let currentForm = Object.assign({}, this.state.formData);
      let prepareData = {};
      let myuuid = uuidv4();
      prepareData.webhookname = currentForm.name.value;
      prepareData.eventType = currentForm.eventType.value;
      prepareData.endpoint = currentForm.endpoint.value;
      prepareData.secret = btoa(unescape(encodeURIComponent( currentForm.secret.value )));
  
      prepareData.parent = "5e69f043-966d-438f-9421-83fb18272a7d"
      prepareData.name = "webHook"
  
      // fetch(this.props.baseUrl + '/createSubscription', {
      fetch(`${this.props.baseUrl}webhook-${myuuid}` , {
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
                  let formData = {
                    name: { value: "", dirtyState: false },
                    eventType: { value: "", dirtyState: false },
                    endpoint: { value: "", dirtyState: false },
                    secret: { value: "", dirtyState: false, type: "password" },
                  };
                  this.setState({
                    formData: formData,
                    formIsValid: false
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
            sessionStorage.setItem("snapshotData", JSON.stringify(respData));
            this.fetchData();
    })
    }})
    }
    
     /* istanbul ignore next */ 
    deleteWebhook(tbodyVal,rowIndex){
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch(this.props.baseUrl + tbodyVal.key, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.props.authToken
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                     /*    if (respData.errorStatus.status === 'ok') { */
                            this.props.showGlobalMessage(false, true, 'Record deleted successfuly', 'custom-success');
                            window.removeDataTableRow('webhookTable', rowIndex);
                            let that = this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
                           that.snapshotUpdate();
                    
                    });
                }
                else {
                    this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                    let that = this;
                    setTimeout(function () {
                        that.props.hideGlobalMessage();
                    }, 2000);
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
                }, 2000);
            });
        }

    }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="row web-hook">
        {this.state.showForm ? (
            <div className="col-md-12 mt-2">
              <div className="centered-div">
                <div className="centered-div-header">
                  <div className="row WebHooks-header">
                    <div className="col-md-12">
                      <h6 id="WebHooks-title text-blue">
                        Web Hooks /
                        <span className="text-black"> Add webhook</span>
                      </h6>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="changeable-form group-form">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="col-sm-12 label required">
                          NAME
                          <img
                            alt="down-arrow"
                            src="assets/static/images/icon_greensortingdown.svg"
                          />
                        </div>
                        <div className="col-sm-12 mb-2">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="name"
                            value={this.state.formData.name.value}
                            onChange={(event) => {
                              this.handleFormData(event);
                            }}
                          />
                          <small className="text-danger">
                            {this.state.errorsForm["name"]}
                          </small>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="col-sm-12 label required">
                          EVENT TYPE
                          <img
                            alt="down-arrow"
                            src="assets/static/images/icon_greensortingdown.svg"
                          />
                        </div>
                        <div className="col-sm-12 mb-2">
                          <select
                            className="form-control form-control-sm"
                            name="eventType"
                            value={this.state.formData.eventType.value}
                            onChange={(event) => {
                              this.handleFormData(event);
                            }}
                          >
                            <option value="">Choose a event </option>
                            <option value="Client Agent Restart">Client Agent Restart </option>
                            <option value="Server Agent Restart">Server Agent Restart</option>
                            <option value="Gateway Agent Restart">Gateway Agent Restart</option>
                            <option value="Connection Establish">
                               Connection Establish
                            </option>
                          </select>
                          <small className="text-danger">
                            {this.state.errorsForm["eventType"]}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="col-sm-12 label required">
                          SECRET
                          <img
                            alt="down-arrow"
                            src="assets/static/images/icon_greensortingdown.svg"
                          />
                          {this.state.formData.secret.type == "password" ? (
                            <i
                              onClick={(event) => {
                                this.showHideField(event, "secret");
                              }}
                              className="fa fa-eye cursor-pointer"
                              title="Show"
                            ></i>
                          ) : (
                            <i
                              onClick={(event) => {
                                this.showHideField(event, "secret");
                              }}
                              className="fa fa-eye-slash cursor-pointer"
                              title="Hide"
                            ></i>
                          )}
                        </div>
                        <div className="col-sm-12 mb-2">
                          <input
                            type={this.state.formData.secret.type}
                            autoComplete="off"
                            className="form-control form-control-sm"
                            name="secret"
                            value={this.state.formData.secret.value}
                            onChange={(event) => {
                              this.handleFormData(event);
                            }}
                          />
                          <small className="text-danger">
                            {this.state.errorsForm["secret"]}
                          </small>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="col-sm-12 label required">
                          TARGET ENDPOINT
                          <img
                            alt="down-arrow"
                            src="assets/static/images/icon_greensortingdown.svg"
                          />
                        </div>
                        <div className="col-sm-12 mb-2">
                          <input
                            type="text"
                            className={this.state.formData.endpoint.value === "" ? "blur form-control form-control-sm" : "form-control form-control-sm"}
                            name="endpoint"
                            value={this.state.formData.endpoint.value==='' ? 'https://' : this.state.formData.endpoint.value }
                            onChange={(event) => {
                              this.handleFormData(event);
                            }}
                          />
                          <small className="text-danger">
                            {this.state.errorsForm["endpoint"]}
                          </small>
                        </div>
                      </div>
                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-sm-4" ></div>
                        <div  className="col-sm-2 mb-2 text-right">
                        <button
                          id="create-group-btn"
                          disabled={!this.state.formIsValid}
                          onClick={this.createWebHook.bind(this)}
                          className="btn btn-sm customize-view-btn"
                        >
                          CREATE WEBHOOKS
                        </button> </div>
                        <div className="col-sm-2 mb-2 text-left">
                        <button
                          id="create-group-btn"
                          onClick={()=>this.setState({showForm:false})}
                          className="btn btn-sm customize-view-btn"
                        >
                          BACK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 mt-2">
              <div className="centered-div">
                <div className="centered-div-header">
                  <div className="row mt-2 mb-2 WebHooks-header">
                    <div className="col-md-8">
                      <h6 id="WebHooks-title">
                        Web Hooks
                        <small> Creating Parameters.</small>
                      </h6>
                    </div>
                    <div className="col-md-4 text-right">
                      <button
                        onClick={() => this.setState({ showForm: true })}
                        className="btn btn-sm customize-view-btn"
                      >
                        Add Webhooks
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 text-center" id="webhookTableDiv">
                    <table className="table ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Event Type</th>
                            <th>Target Endpoint</th>
                             <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.WebHookList.map((hooks, indx) => {
                            return (
                              <tr key={"user" + indx}>
                                <td>{hooks.webhookname} </td>
                                <td>{hooks.eventType} </td>
                                <td> {hooks.endpoint}</td>
                                <td>
                                  <span className="action-img">
                                    <img
                                      alt="plus-icon"
                                      title=""
                                      src="assets/static/images/plus.svg"
                                    />
                                    <img
                                      alt="edit-icon"
                                      title="Edit"
                                      src="assets/static/images/iconedit_tablemaintainmonitor.svg"
                                    />
                                    <img
                                      alt="-icon"
                                      title=""
                                      src="assets/static/images/icon_tablemaintainmonitor.svg"
                                    />
                                    <img
                                      onClick={()=>this.deleteWebhook(hooks,indx)}
                                      alt="delete-icon"
                                      title="Delete"
                                      src="assets/static/images/icondelete_tablemaintainmonitor.svg"
                                    />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    /* jshint ignore:end */
  }
}
