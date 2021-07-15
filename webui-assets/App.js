import React from "react";
import ReactDOM from "react-dom";

import Dashboard from './Dashboard/Dashboard.js';
import View from './View/View.js';
import Maintain from './Maintain/Maintain.js';
import Subscriptioncreate from './Maintain/Subscriptioncreate.js';
import Subscriptionupgrade from './Maintain/Subscriptionupgrade.js';
import Groupcreate from './Maintain/Groupcreate.js';
import Groupupgrade from './Maintain/Groupupgrade.js';
import GroupView from './Maintain/GroupView.js';
import Maintainagentcreate from './Maintain/Maintainagentcreate.js';
/* istanbul ignore next */
import Maintainagentupgrade from './Maintain/Maintainagentupgrade.js';
import Maintainagentview from './Maintain/Maintainagentview.js';
import RequestCreate from './Maintain/RequestCreate.js';
import RequestUpgrade from './Maintain/RequestUpgrade.js';
import RequestView from './Maintain/RequestView.js';
import Subscriptionview from './Maintain/Subscriptionview.js'; 
/* istanbul ignore next */
import Monitor from './Monitor/Monitor.js';
import Notification from './Monitor/Notification.js';
import Alert from './Monitor/Alert.js';
import Healthstatus from './Monitor/Healthstatus.js';

import Report from './Report/Report.js';
import UserManagement from './Settings/UserManagement.js';
import UserProfile from "./Settings/UserProfile.js";
import WebHooks from "./Settings/WebHooks.js";
import Navbar from './Navbar/Navbar.js';
import Header from './Header/Header.js';
import Support from './Support/Support.js';
import Cookienotification from './Cookienotification/Cookienotification.js';
import FloaterHelp from "./FloaterHelp/FloaterHelp.js";
import Footer from "./Footer/Footer.js";

import * as helpTextFile from './static/helpText/helpText.js';
const HELPTEXT = helpTextFile.default;
const API_URL = '/v1.2beta/ops/api/';
const USER_API = 'https://ec-oauth-sso.run.aws-usw02-dev.ice.predix.io/'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: '',
      /* istanbul ignore next */
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: '',
        classname: ''
      },
      maximizeModal: true,
      userId: '',
      authToken: '',
      profileData: {
        email: '',
        name: ''
      },
      permissions: {},
      apiEndPoints: {
        baseUrl : API_URL,
      },
      isFullScreenModal: false,
      notificationModal:{
        headerText:'',
        bodyText:'',
        buttons:[]
      },
      user: "OpsAdmin",
    };
  }

  /* istanbul ignore next */
  componentDidMount(){
    this.fullScreenModal();
    let authToken = this.getToken('ec-config');
    this.setState({
      authToken: authToken
    });

	    this.showGlobalMessage(
      true,
      true,
      "Please wait...",
      "custom-success"
    );
	  
	fetch(USER_API + 'introspect', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':"Bearer " + authToken
        }
      }).then((response)=>{
        if (response.status === 200) {
            response.json().then((respData) => { console.log( 'tokendata '+ respData )}) }
      }) 

    let permission = {
      "roleId": 1,
      "roleName": "Admin",
      "accesses": {
        "dashboard": {
          "haveAccess": true
        },
        "view": {
          "haveAccess": true
        },
        "maintain": {
            "haveAccess": true,
            "subMenus":{
                "subscriptions": {
                    "create": true,
                    "view": true,
                    "edit": true,
                    "delete": true
                },
                "groups": {
                    "create": true,
                    "view": true,
                    "edit": true,
                    "delete": true
                },
                "agents": {
                    "create": true,
                    "view": true,
                    "edit": true,
                    "delete": true
                },
                "watchers": {
                    "create": true,
                    "view": true,
                    "edit": true,
                    "delete": true
                }
            }
        },
        "monitor": {
          "haveAccess": true,
          "subMenus":{
            "notifications": {
                "view": true,
                "edit": true,
                "delete": true
            },
            "alerts": {
                "view": true,
                "edit": true,
                "delete": true
            },
            "healthStatus": {
                "view": true,
                "edit": true,
                "delete": true,
                "isUser": true,
                }
              }
            },
            "reports": {
              "haveAccess": true
            },
            "settings": {
              "haveAccess": true
            },
            "support": {
              "haveAccess": true
            },
          }
        };

    // Get logged user's userId start
    let snapshotData =  sessionStorage.getItem("snapshotData")
    if (snapshotData !== null){
      let jsonData = JSON.parse(snapshotData)
      let data = jsonData["ab2a2691-a563-486c-9883-5111ff36ba9b"]
      console.log('optimized Data')
      this.hideGlobalMessage();
       let userId = data.user_id;
       let profileName = data.username;
       let profileEmailId = data.email;
       let permissions = permission; 
       this.setState({
         profileData: {
           email: profileEmailId,
           name: profileName
         },
         userId: userId,
         permissions: permissions,
         currentView: 'Dashboard'
       });
    }

    else{
   let apiEndPoint= this.state.apiEndPoints.baseUrl + 'snapshot'    //"https://reqres.in/api/users/2"  //baseUrl -this.state.apiEndPoints.baseUrl + '/snapshot'
    fetch(apiEndPoint, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':"Bearer " + authToken
      }
    })
    .then((response) => {
        if (response.status === 200) {
          response.json().then((respData) => {
            let data = respData["ab2a2691-a563-486c-9883-5111ff36ba9b"]
	          sessionStorage.setItem("snapshotData", JSON.stringify(respData))
           
 	      this.hideGlobalMessage();
              let userId = data.user_id;
              let profileName = data.username;
              let profileEmailId = data.email;
              let permissions = permission; 
              this.setState({
                profileData: {
                  email: profileEmailId,
                  name: profileName
                },
                userId: userId,
                permissions: permissions,
                currentView: 'Dashboard'
              });
          });
        }
        else {
          this.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
          setTimeout(function () {
            location.reload(true);
          }, 2000);
        }
    });}
    // Get logged user's userId end
  }

  /* istanbul ignore next */
  getToken(name){
    var cookieName = name+"=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
        }
    }
  }
	
 /* istanbul ignore next */
handleUser(user) {
    let newpermission = { ...this.state.permissions };
    if (user === "OpsAdmin") {
      newpermission.accesses.maintain.subMenus.subscriptions.create = false;
      newpermission.accesses.maintain.subMenus.subscriptions.edit = false;
      newpermission.accesses.maintain.subMenus.subscriptions.delete = false;

      newpermission.accesses.maintain.subMenus.groups.create = false;
      newpermission.accesses.maintain.subMenus.groups.edit = false;
      newpermission.accesses.maintain.subMenus.groups.delete = false;

      newpermission.accesses.maintain.subMenus.agents.create = false;
      newpermission.accesses.maintain.subMenus.agents.edit = false;
      newpermission.accesses.maintain.subMenus.agents.delete = false;
      newpermission.accesses.monitor.subMenus.healthStatus.isUser = false;
      newpermission.accesses.settings.haveAccess = false;
      this.setState({
        permissions: newpermission,
        user: "User",
      });
    }
    if (user === "User") {
      newpermission.accesses.maintain.subMenus.subscriptions.create = true;
      newpermission.accesses.maintain.subMenus.subscriptions.edit = true;
      newpermission.accesses.maintain.subMenus.subscriptions.delete = true;
      newpermission.accesses.maintain.subMenus.groups.create = true;
      newpermission.accesses.maintain.subMenus.groups.edit = true;
      newpermission.accesses.maintain.subMenus.groups.delete = true;
      newpermission.accesses.maintain.subMenus.agents.create = true;
      newpermission.accesses.maintain.subMenus.agents.edit = true;
      newpermission.accesses.maintain.subMenus.agents.delete = true;
      newpermission.accesses.monitor.subMenus.healthStatus.isUser = true;
      newpermission.accesses.settings.haveAccess = true;

      this.setState({
        permissions: newpermission,
        user: "OpsAdmin",
      });
    }
  }

  /* istanbul ignore next */
  servedView() {
    const currentView = this.state.currentView;
    switch(currentView) {
      case 'Dashboard':
        return <Dashboard />; // jshint ignore:line
      case 'View':
        return <View baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} permissions={this.state.permissions} />; // jshint ignore:line
      case 'Maintain':
        return <Maintain />; // jshint ignore:line
      case 'Subscriptioncreate':
        return <Subscriptioncreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Subscriptionupgrade':
        return <Subscriptionupgrade helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} permissions={this.state.permissions} />; // jshint ignore:line
      case 'Subscriptionview':
        return <Subscriptionview helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Groupcreate':
        return <Groupcreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Groupupgrade':
        return <Groupupgrade helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} permissions={this.state.permissions} />; // jshint ignore:line
      case 'GroupView':
        return <GroupView helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} permissions={this.state.permissions} />; // jshint ignore:line
      case 'Maintainagentcreate':
        return <Maintainagentcreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} showModal={this.showModal.bind(this)}/>; // jshint ignore:line
      case 'Maintainagentupgrade':
        return <Maintainagentupgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentview':
        return <Maintainagentview baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Requestcreate':
        return <RequestCreate baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'RequestUpgrade':
        return <RequestUpgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} permissions={this.state.permissions}  />; // jshint ignore:line
      case 'RequestView':
        return <RequestView baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Monitor':
        return <Monitor />; // jshint ignore:line
      case 'Notification':
        return <Notification userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Alert':
        return <Alert userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Healthstatus':
        return <Healthstatus userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Report':
        return  <Report />; // jshint ignore:line
      case 'Usermanagement':
        return <UserManagement baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken}  userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)}  />; // jshint ignore:line
      case "UserProfile":
        return <UserProfile baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken}  userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)}  />; // jshint ignore:line
      case 'WebHooks':
        return  <WebHooks baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken}  userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} /> // jshint ignore:line
      case 'Support':
        return <Support />; // jshint ignore:line
      default:
        return null;
    }
  }

  /* istanbul ignore next */
  changeView(changeViewTo){
    this.setState({
      currentView: changeViewTo
    });
  }

  /* istanbul ignore next */
  showGlobalMessage(showLoader, showText, text, classname){
		this.setState({
			ajaxBusy:{
				flag: true,
        showLoader: showLoader,
        showText: showText,
        text: text,
        classname: classname
			}
    });
  }
  
  /* istanbul ignore next */
  hideGlobalMessage(){
    this.setState({
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: '',
        classname: ''
      }
    });
  }
  
  /* istanbul ignore next */
  maxMinModal(){
    this.setState({
      maximizeModal: !this.state.maximizeModal
    });
  }

  /* istanbul ignore next */
  fullScreenModal(){
    window.extraLargeModal(this.state.currentView);
    this.setState({
      isFullScreenModal: true
    });
  }

  /* istanbul ignore next */
  medModal(currentView){
    window.medModal(currentView);
    this.setState({
      isFullScreenModal: false
    });

    if(document.getElementsByClassName('table').length > 0){
      this.changeView('');
      setTimeout(()=>{
        this.changeView(currentView);
      },200);
    }
  }

  /* istanbul ignore next */
  forceLogout(){
    window.IdleTimeout();
  }

  /* istanbul ignore next */
  continueSession(){
    window.hideLogoutWarningModal();
    window.ResetTimeOutTimer();
  }

  /* istanbul ignore next */
  copyAndcloseModal(){
    window.copyText(this.state.notificationModal.bodyText);
    window.hideNotificationModal();
  }

  /* istanbul ignore next */
  copyToClipboard(){
    window.copyText(this.state.notificationModal.bodyText);
    this.showGlobalMessage(false, true, 'Statement copied', 'custom-success');
    setTimeout(() => {
      this.hideGlobalMessage();
    }, 2000);
  }

  /* istanbul ignore next */
  actionPerform(action){
    switch(action) {
      case 'copyAndcloseModal':
        this.copyAndcloseModal(this);
        break;
      case 'copyToClipboard':
        this.copyToClipboard();
        break;
    }
  }

  /* istanbul ignore next */
  showModal(headerText,bodyText,buttons){
    this.setState({
      notificationModal:{
        headerText :headerText,
        bodyText:bodyText,
        buttons:buttons
      }
    });
    window.showNotificationModal();
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="App container">
        {
          this.state.maximizeModal ?
            <div className="modal" tabIndex="-1" role="dialog" id="dive_panel">
              <div id="mediumModal" className="modal-dialog modal-xl" role="document">
                <div id="mediumModalContent" className="modal-content">
                  {this.state.ajaxBusy.flag ?
                    <div className={"alert-notification alert "+ this.state.ajaxBusy.classname}>
                      <button type="button" className="close" aria-label="Close" onClick={this.hideGlobalMessage.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                      {this.state.ajaxBusy.showLoader ?
                        <div className="ajaxBusy"></div>
                        : null
                      }
                      {this.state.ajaxBusy.showText ?
                        <p>{this.state.ajaxBusy.text}</p>
                        : null
                      }
                    </div>
                    : null
                  }
                
                  <div className="modal-body">
                    <Header
			profileData={this.state.profileData}
			maxMinModal={this.maxMinModal.bind(this)}
			fullScreenModal={this.fullScreenModal.bind(this)}
			isFullScreenModal={this.state.isFullScreenModal}
			medModal={this.medModal.bind(this, this.state.currentView)}
			handleUser={this.handleUser.bind(this)}
                        user={this.state.user}
			clickEve={this.changeView.bind(this)}
		></Header>
                    <Navbar currentView={this.state.currentView} clickEve={this.changeView.bind(this)} permissions={this.state.permissions}></Navbar>
                    <div className="col-md-12 dynamic-container">
                      { this.servedView() }
                    </div>
                    <Cookienotification />
		                <FloaterHelp/>
                    <Footer/>
                    <div className="modal fade logoutWarningModal" id="logoutWarningModal" role="dialog" data-backdrop="static" data-keyboard="false">
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content rounded-0">
                        <div className="modal-header rounded-0">
                          <h6 className="modal-title">Auto logout for inactivity</h6>
                        </div>
                          <div className="modal-body">
                            <p>Your session will end in a minute. Do you want to continue your session?</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.forceLogout.bind(this)}>No</button>
                            <button type="button" className="btn btn-default customize-view-btn" onClick={this.continueSession.bind(this)}>Yes</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade notificationModal" id="notificationModal" role="dialog" data-backdrop="static" data-keyboard="false">
                      <div className="modal-dialog modal-md">
                        <div className="modal-content rounded-0">
                          <div className="modal-header rounded-0">
                            <h6 className="modal-title text-middle">{this.state.notificationModal.headerText}</h6>
                          </div>
                          <div className="modal-body">
                            <p> {this.state.notificationModal.bodyText} </p>
                          </div>
                          <div className="modal-footer">
                            {this.state.notificationModal.buttons.map((button, buttonIndex) => {
                              return(
                                <button
                                    key={"notificationButton"+buttonIndex} 
                                    type="button"
                                    id={"notificationButton"+buttonIndex}
                                    name="button" 
                                    className={button.className}
                                    onClick={this.actionPerform.bind(this,button.action)} >{button.text}</button>
                                      )
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div className="modal minimized-modal">
              <div className="modal-dialog minimized-modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-10">
                        <img src="assets/static/images/GE_logo.svg" />
                        <img src="assets/static/images/ec-icon.png" width="100" height="60" />
                      </div>
                      <div className="col-sm-2 maximize-image-div">
                        <img onClick={this.maxMinModal.bind(this)} alt="maximize-window" src="assets/static/images/maximize.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    );
    /* jshint ignore:end */
  }
}
