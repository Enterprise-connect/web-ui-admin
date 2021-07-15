import React from "react";

export default class RequestCreate extends React.Component {
  
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      FormData: {
        noOfGateway: { value: "", dirtyState: false },
      },
      errorsForm: {},
      formIsValid: false,
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    window.enableToolTip();
    // this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
  }

  /* istanbul ignore next */
  handleFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentForm = Object.assign({}, this.state.FormData);

    if (fieldName === "noOfGateway") {
      currentForm.noOfGateway.value = updatedValue;
      currentForm.noOfGateway.dirtyState = true;
    }

    this.setState({
      FormData: currentForm,
    });
    this.handleFormValidation();
  }

  /* istanbul ignore next */
  handleFormValidation() {
    let currentFormData = this.state.FormData;
    let noOfGatewayValue = currentFormData.noOfGateway.value;
    let noOfGatewayDirtyState = currentFormData.noOfGateway.dirtyState;
    let formIsValid = true;
    let errors = {};

    if (noOfGatewayValue === "") {
      if (noOfGatewayDirtyState)
        errors.noOfGateway = "Please select Number of Gateway";
      formIsValid = false;
    }

    this.setState({
      formIsValid: formIsValid,
      errorsForm: errors,
    });
  }

  /* istanbul ignore next */
  createRequest() {
    // this.props.showGlobalMessage(false, true, 'Record saving initiated. Please check after some time.', 'custom-success');
    let currentForm = Object.assign({}, this.state.groupForm);
    let prepareData = {};
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="row Requestcreate">
        <div className="col-md-12 mt-2">
          <div className="centered-div">
            <div className="centered-div-header">
              <div className="row Requestcreate-header">
                <div className="col-md-12">
                  <h6 id="Requestcreate-title">
                    Create Request <small> Creating parameters.</small>
                  </h6>
                </div>
              </div>
              <hr></hr>
              <div className="changeable-form group-form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      No. of Gateway
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="noOfGateway"
                        value={this.state.FormData.noOfGateway.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsForm["noOfGateway"]}
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-3 mt-3 text-center">
                    <button
                      id="create-group-btn"
                      disabled={!this.state.formIsValid}
                      onClick={this.createRequest.bind(this)}
                      className="btn btn-sm customize-view-btn"
                    >
                      Create Request
                    </button>
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
