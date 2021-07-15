import React from "react";

export default class Header extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
    }

    /* istanbul ignore next */ 
    logout(e){
        let cnf = confirm('Are you sure you want to logout?');
        if(cnf){
            localStorage.clear();
            let logOut = window.location.origin+window.location.pathname.replace('/ops','')+'/logout';
            console.log(logOut);
            window.location.href = logOut;
        }
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <header className={ this.props.user !== "OpsAdmin" ? "admin-header" : "user-header" }>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-lg-6 ge-logo">
                            <img src="assets/static/images/GE_logo.svg" />
                            <img src="assets/static/images/ec-icon.png" width="150" height="70" />
                        </div>
                             <div className="col-lg-6 header-profile">
              {/*    <span>
                                <span className="name"> Hello {this.props.profileData.name.split(" ")[1]}!</span>
                            </span>
                            <span>
                                <img src="assets/static/images/user_icon.svg" height="30" />
                            </span>
                            <span className="vl"></span>
                            <span>
                                <img src="assets/static/images/notifications_icon.svg" />
                            </span>
                            <span>
                                <img src="assets/static/images/logout_icon.svg" alt="logout" title="Logout" className="cursor-pointer" onClick={(event)=>{this.logout(event)}} />
                            </span> */}
                          <div className="row">
                            <div className="col-sm-8">&nbsp;</div>
                            <div className="col-sm-4">
                              <div className="dropdown">
                                <div
                                  className=" dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Welcome {this.props.profileData.name.split(" ")[1]}!
                                  &nbsp;
                                  <span>
                                    <img
                                      src="assets/static/images/user_icon.svg"
                                      height="30"
                                    />
                                  </span>
                                </div>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                        <a className="dropdown-item cursor-pointer">
                                    {this.props.isFullScreenModal ? null : (
                                      <span onClick={this.props.fullScreenModal.bind(this)}>
                                        FullScreen
                                      </span>
                                    )}
                                  </a>
                                  <a className="dropdown-item cursor-pointer">
                                    {this.props.isFullScreenModal ? (
                                      <span onClick={this.props.medModal.bind(this)}>
                                        Minimize
                                      </span>
                                    ) : (
                                      <span onClick={this.props.maxMinModal.bind(this)}>
                                        Minimize
                                      </span>
                                    )}
                                  </a>
                                  <a
                                    className="dropdown-item cursor-pointer"
                                    onClick={() => {
                                      this.props.handleUser(this.props.user);
                                    }}
                                  >
                                    Switch to {this.props.user}
                                  </a>
                                    <a
                                    className="dropdown-item cursor-pointer"
                                    onClick={() => {
                                      this.props.clickEve("UserProfile");
                                    }}
                                   >
                               My Profile
                                  </a>
                                  <a
                                    className="dropdown-item cursor-pointer"
                                    onClick={(event) => {
                                      this.logout(event);
                                    }}
                                  >
                                    Logout
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </header>
        )
        /* jshint ignore:end */
    }
}
