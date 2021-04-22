import React from "react";

export default class Groupcreate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            groupForm:{
                subscriptionId: { value: '', dirtyState: false },
                groupId: { value: '', dirtyState: false },
            },
            errorsGroupForm: {},
            groupFormIsValid: false,
            subscriptions: []
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
          window.enableToolTip();
        this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        if (sessionStorage.getItem("snapshotData") !== null) {
          let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
          let allData =[]
          let subscriptionData=[]
            Object.keys(respData).forEach((key)=> {
                allData.push(respData[key])
            });
            for(let individualData of allData){
                if(individualData.parent){
                    if(individualData.parent ==="ab2a2691-a563-486c-9883-5111ff36ba9b"){
                      subscriptionData.push(individualData);
                    }
                }
            }
            if(subscriptionData.length > 0){
              let selectedSubscriptionId = subscriptionData[0].licenseId;
              let formObj = Object.assign({}, this.state.groupForm);
              formObj.subscriptionId.value = selectedSubscriptionId;
              this.setState({
                  subscriptions: subscriptionData,
                  groupForm: formObj
              });
		console.log(subscriptionData)    
          }
          this.props.hideGlobalMessage();
          localStorage.setItem("subscriptions", JSON.stringify(subscriptionData));
      }
      else {
          this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
          setTimeout(()=> {
              this.props.hideGlobalMessage();
          }, 2000);
      }
    }

    /* istanbul ignore next */
    componentWillUnmount() {
        clearInterval(this.timerForSubscriptionList);
        this.timerForSubscriptionList = null;
    }

    /* istanbul ignore next */
    getSubscriptionList(){
        fetch(this.props.baseUrl + '/listSubscriptions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.props.authToken
            }
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    if(respData.errorStatus.status == 'ok'){
                        let subscriptions = respData.data;
                        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
                    }
                    else{
                        console.log('Subscription list backgroung api error');
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('Subscription list backgroung api error');
        });
    }

    /* istanbul ignore next */
    handleFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentForm =  Object.assign({}, this.state.groupForm);

        if(fieldName === 'subscriptionId'){
            currentForm.subscriptionId.value = updatedValue;
            currentForm.subscriptionId.dirtyState = true;
        }
        else if(fieldName === 'groupId'){
            currentForm.groupId.value = updatedValue;
            currentForm.groupId.dirtyState = true;
        }

        this.setState({
            groupForm: currentForm
        });
        this.handleFormValidation();
    }

    /* istanbul ignore next */
    handleFormValidation(){
        let currentFormData = this.state.groupForm;
        let subscriptionIdValue = currentFormData.subscriptionId.value;
        let subscriptionIdDirtyState = currentFormData.subscriptionId.dirtyState;
        let groupIdValue = currentFormData.groupId.value;
        let groupIdDirtyState = currentFormData.groupId.dirtyState;
        let formIsValid = true;
        let errors = {};

        if(subscriptionIdValue.trim() === ''){
            if(subscriptionIdDirtyState)
                errors.subscriptionId = 'Please select Subscription ID';
            formIsValid = false;
        }

        if(groupIdValue.trim() === ''){
            if(groupIdDirtyState)
                errors.groupId = 'Please enter Group ID';
            formIsValid = false;
        }

        this.setState({
			groupFormIsValid: formIsValid,
			errorsGroupForm: errors
		});
    }

    /* istanbul ignore next */
    createGroup(){
        this.props.showGlobalMessage(false, true, 'Record saving initiated. Please check after some time.', 'custom-success');
        let currentForm =  Object.assign({}, this.state.groupForm);
        let prepareData = {};
        prepareData.subscriptionId = currentForm.subscriptionId.value;
        prepareData.groupId = currentForm.groupId.value;
        let newlyCreatedGroups = [];
        let createdGroupDataObj = {
            groupId: prepareData.groupId,
            aid: 'Pending',
            tid: 'Pending'
        };
        if (localStorage.getItem("newlyCreatedGroups") === null){
            // newlyCreatedGroups not found
            let newlyCreatedGroupObj = {};
            newlyCreatedGroupObj = {
                subscriptionId: prepareData.subscriptionId,
                createdData: [createdGroupDataObj]
            };
            newlyCreatedGroups.push(newlyCreatedGroupObj);
            localStorage.setItem("newlyCreatedGroups", JSON.stringify(newlyCreatedGroups));
        }
        else{
            // newlyCreatedGroups found
            let oldNewlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups"));
            let findIndex = oldNewlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === prepareData.subscriptionId);
            if(findIndex == -1){
                // subscription not found in array
                let newlyCreatedGroupObj = {};
                newlyCreatedGroupObj = {
                    subscriptionId: prepareData.subscriptionId,
                    createdData: [createdGroupDataObj]
                };
                oldNewlyCreatedGroupsofSubscriptions.push(newlyCreatedGroupObj);
                localStorage.setItem("newlyCreatedGroups", JSON.stringify(oldNewlyCreatedGroupsofSubscriptions));
            }
            else{
                // subscription found in array
                oldNewlyCreatedGroupsofSubscriptions[findIndex].createdData.push(createdGroupDataObj);
                localStorage.setItem("newlyCreatedGroups", JSON.stringify(oldNewlyCreatedGroupsofSubscriptions));
            }
        }

        console.log(JSON.parse(localStorage.getItem("newlyCreatedGroups")));
        setTimeout(()=> {
            this.props.hideGlobalMessage();
            let groupForm = {
                subscriptionId: { value: prepareData.subscriptionId, dirtyState: false },
                groupId: { value: '', dirtyState: false }
            };

            this.setState({
                groupForm: groupForm,
                groupFormIsValid: false
            });
        }, 2000);

        
        fetch(this.props.baseUrl + '/createGroup', { //this.props.baseUrl + '/createGroup'
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.props.authToken
            },
            body: JSON.stringify(prepareData)
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    if(respData.errorStatus.status == 'ok'){
                        // Both actions are same for ok and fail
                    }
                    else{
                        this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                        setTimeout(()=> {
                            this.props.hideGlobalMessage();
                        }, 2000);
                    }
                    let oldNewlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups"));
                    let findIndex = oldNewlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === prepareData.subscriptionId);
                    let allNewlyCreatedGroupsData = [...oldNewlyCreatedGroupsofSubscriptions[findIndex].createdData];
                    let findGroupIndex = allNewlyCreatedGroupsData.findIndex(x => x.groupId === prepareData.groupId);
                    allNewlyCreatedGroupsData.splice(findGroupIndex, 1);
                    oldNewlyCreatedGroupsofSubscriptions[findIndex].createdData = allNewlyCreatedGroupsData;
                    localStorage.setItem("newlyCreatedGroups", JSON.stringify(oldNewlyCreatedGroupsofSubscriptions));

                });
            }
            else{
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
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

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Groupcreate">
                <div className="col-md-12 mt-2">
                    <div className="centered-div">
                        <div className="centered-div-header">
                            <div className="row maintainagentcreate-header">
                                <div className="col-md-12">
                                    <h6 id="maintaingroupcreate-title">Create Group <small>Creating parameters.</small></h6>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="changeable-form group-form">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-12 label required">
                                            SUBSCRIPTION <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select 
                                                className="form-control form-control-sm" 
                                                name="subscriptionId" 
                                                value={this.state.groupForm.subscriptionId.value}
                                                onChange={(event)=>{this.handleFormData(event)}}>
                                                    {
                                                    this.state.subscriptions.map((subscription, subscriptionIndex) => {
                                                        return(
                                                            <option
                                                                key={"subscriptionOption"+subscriptionIndex}
                                                                value={ subscription.licenseId }>{ subscription.licenseId }</option>)
                                                    })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsGroupForm['subscriptionId']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-12 label required">
                                            GROUP ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="groupId"
                                                value={this.state.groupForm.groupId.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsGroupForm['groupId']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-2 text-center">
                                        <button 
                                            id="create-group-btn"
                                            disabled={!this.state.groupFormIsValid}
                                            onClick={this.createGroup.bind(this)} 
                                            className="btn btn-sm customize-view-btn">CREATE GROUP</button>
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
