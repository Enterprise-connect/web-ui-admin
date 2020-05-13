import React from "react";
import ReactDOM from "react-dom";

import Dashboard from './Dashboard/Dashboard.js';
import View from './View/View.js';
import Maintain from './Maintain/Maintain.js';
import Subscriptioncreate from './Maintain/Subscriptioncreate.js';
import Subscriptionupgrade from './Maintain/Subscriptionupgrade.js';
import Groupcreate from './Maintain/Groupcreate.js';
import Groupupgrade from './Maintain/Groupupgrade.js';
import Maintainagentcreate from './Maintain/Maintainagentcreate.js';
/* istanbul ignore next */
import Maintainagentupgrade from './Maintain/Maintainagentupgrade.js';
import Maintainagentview from './Maintain/Maintainagentview.js';
import Maintainwatchercreate from './Maintain/Maintainwatchercreate.js';
import Maintainwatcherupgrade from './Maintain/Maintainwatcherupgrade.js';
import Maintainwatcherview from './Maintain/Maintainwatcherview.js';
/* istanbul ignore next */
import Monitor from './Monitor/Monitor.js';
import Notification from './Monitor/Notification.js';
import Alert from './Monitor/Alert.js';
import Healthstatus from './Monitor/Healthstatus.js';
import Report from './Report/Report.js';
import Usermanagement from './Settings/Usermanagement.js';
import Navbar from './Navbar/Navbar.js';
import Header from './Header/Header.js';
import Support from './Support/Support.js';
import Cookienotification from './Cookienotification/Cookienotification.js';

import * as helpTextFile from './static/helpText/helpText.js';
const HELPTEXT = helpTextFile.default;

var API_URL = '/v1.1beta/ec';

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
      apiEndPoints: {
        baseUrl : API_URL,
      },
      isFullScreenModal: false,
      notificationModal:{
        headerText:'',
        bodyText:'',
        buttons:[],

      }
    
    };
  }

  /* istanbul ignore next */
  componentDidMount(){
    this.fullScreenModal();
    let authToken = this.getToken('ec-config');
    this.setState({
      authToken: authToken
    });

    // Get logged user's userId start
    fetch(this.state.apiEndPoints.baseUrl + '/getDevId', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authToken
      }
    })
    .then((response) => {
        if (response.status === 200) {
          response.json().then((respData) => {
            if (respData.errorStatus.status === 'ok') {
              let userId = respData.data.user_id;
              let profileName = respData.data.name;
              let profileEmailId = respData.data.email;
              this.setState({
                profileData: {
                  email: profileEmailId,
                  name: profileName
                },
                userId: userId,
                currentView: 'Dashboard'
              });
            }
            else{
              this.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
              setTimeout(function () {
                location.reload(true);
              }, 2000);
            }
          });
        }
        else {
          this.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
          setTimeout(function () {
            location.reload(true);
          }, 2000);
        }
    });
    // Get logged user's userId end

    setTimeout(()=>{
      this.updateEcConfigCookie();
    },300000); // 5 mins
  }

  /* istanbul ignore next */
  updateEcConfigCookie(){
    this.timer = setInterval(()=> this.getAuthTokenFromBackend(), 300000); // 5 mins
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  /* istanbul ignore next */
  getAuthTokenFromBackend(){ 
    fetch(this.state.apiEndPoints.baseUrl + '/refershToken' , {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.state.authToken
      }
    })
    .then((response) => {
        if (response.status === 200) {
          response.json().then((respData) => {
            if (respData.errorStatus.status === 'ok') {
              let newToken = respData.data;
              this.setState({
                authToken: newToken
              });
              let cookieToUpdate = 'ec-config';
              document.cookie = cookieToUpdate+"="+newToken;
            }
          });
        }
    });
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
  servedView() {
    const currentView = this.state.currentView;
    switch(currentView) {
      case 'Dashboard':
        return <Dashboard />; // jshint ignore:line
      case 'View':
        return <View baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintain':
        return <Maintain />; // jshint ignore:line
      case 'Subscriptioncreate':
        return <Subscriptioncreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Subscriptionupgrade':
        return <Subscriptionupgrade helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Groupcreate':
        return <Groupcreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Groupupgrade':
        return <Groupupgrade helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentcreate':
        return <Maintainagentcreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} showModal={this.showModal.bind(this)}/>; // jshint ignore:line
      case 'Maintainagentupgrade':
        return <Maintainagentupgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentview':
        return <Maintainagentview baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatchercreate':
        return <Maintainwatchercreate baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatcherupgrade':
        return <Maintainwatcherupgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatcherview':
        return <Maintainwatcherview />; // jshint ignore:line
      case 'Monitor':
        return <Monitor />; // jshint ignore:line
      case 'Notification':
        return <Notification userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Alert':
        return <Alert userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Healthstatus':
        return <Healthstatus userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Report':
        return <Report />; // jshint ignore:line
      case 'Usermanagement':
        return <Usermanagement />; // jshint ignore:line
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

  copyAndcloseModal(){
    window.copyText(this.state.notificationModal.bodyText);
    window.hideNotificationModal();
  }

  copyToClipboard(){
    window.copyText(this.state.notificationModal.bodyText);
    this.showGlobalMessage(false, true, 'Statement copied', 'custom-success');
    setTimeout(() => {
      this.hideGlobalMessage();
    }, 2000);
  }

  actionPerform(action){ // ye if else ko switch kar dena
    switch(action) {
      case 'copyAndcloseModal':
        this.copyAndcloseModal(this);
      case 'copyToClipboard':
        this.copyToClipboard();
    }
  }
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
                    <Header profileData={this.state.profileData} maxMinModal={this.maxMinModal.bind(this)} fullScreenModal={this.fullScreenModal.bind(this)} isFullScreenModal={this.state.isFullScreenModal} medModal={this.medModal.bind(this, this.state.currentView)}></Header>
                    <Navbar currentView={this.state.currentView} clickEve={this.changeView.bind(this)}></Navbar>
                    <div className="col-md-12 dynamic-container">
                      { this.servedView() }
                    </div>
                    <Cookienotification />
                    
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
                      <div className="modal-dialog modal-sm">
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
                                    key={"Button"+buttonIndex} 
                                    type="button"
                                    id={"Button"+buttonIndex}
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
