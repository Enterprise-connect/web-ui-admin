import React from "react";

export default class Navbar extends React.Component {

    /* istanbul ignore next */
    constructor(props) {
        super(props);
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand pb-2" href="#">&nbsp;</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav lower-navbar">
                        { this.props.permissions.accesses && this.props.permissions.accesses.dashboard.haveAccess ?
                            <li className={this.props.currentView === 'Dashboard' ? 'nav-item active' : 'nav-item'}>
                                <a id="nav-dashboard" className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Dashboard')}>
                                    <img src={'assets/static/images/dashboard_icon.svg'} alt="nav-dashboard" />
                                    Dashboard <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            :
                            null
                        }
                        { this.props.permissions.accesses && this.props.permissions.accesses.maintain.haveAccess ?
                            <li id="nav-maintain" className={this.props.currentView === 'Maintain' || this.props.currentView === 'Maintainagentcreate'  || this.props.currentView === 'Maintainagentupgrade' || 
                            this.props.currentView === 'Maintainagentview' || this.props.currentView === 'Requestcreate'  || this.props.currentView === 'RequestUpgrade' || this.props.currentView === 'RequestView' 
                            || this.props.currentView === 'Subscriptioncreate'  || this.props.currentView === 'Subscriptionview' || this.props.currentView === 'Subscriptionupgrade' || this.props.currentView === 'Groupcreate'
                             || this.props.currentView === 'Groupupgrade' || this.props.currentView === 'GroupView'
                            ? "nav-item dropdown active" : "nav-item dropdown"}>
                                <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                    <img src={'assets/static/images/maintain_icon.svg'} alt="nav-maintain" />
                                     Maintain 
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                { this.props.permissions.accesses.maintain.subMenus.subscriptions.view || this.props.permissions.accesses.maintain.subMenus.subscriptions.create || this.props.permissions.accesses.maintain.subMenus.subscriptions.edit || this.props.permissions.accesses.maintain.subMenus.subscriptions.delete ?
                                    <li className="dropdown-submenu">
                                        <a id="nav-subscription" className="dropdown-item" href="#">
                                            License
                                        </a>
                                        <ul className="dropdown-menu">
                                            { this.props.permissions.accesses.maintain.subMenus.subscriptions.create ?
                                                <li>
                                                    <a id="nav-subscription-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Subscriptioncreate')} href="#">Create</a>
                                                </li>
                                                :
                                                null
                                            }
                                            { this.props.permissions.accesses.maintain.subMenus.subscriptions.edit || this.props.permissions.accesses.maintain.subMenus.subscriptions.delete ?
                                                <li>
                                                    <a id="nav-subscription-update-disable" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Subscriptionupgrade')} href="#">Update/Delete</a>
                                                </li>
                                                :
                                                null
                                            }
                                            { this.props.permissions.accesses.maintain.subMenus.subscriptions.view ?
                                                <li>
                                                    <a id="nav-subscription-view-disable" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Subscriptionview')} href="#">View</a>
                                                </li> 
                                                :
                                                null
                                            }
                                        </ul>
                                    </li>
                                    :
                                    null
                                }

                                { this.props.permissions.accesses.maintain.subMenus.groups.view || this.props.permissions.accesses.maintain.subMenus.groups.create || this.props.permissions.accesses.maintain.subMenus.groups.edit || this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                    <li className="dropdown-submenu">
                                        <a id="nav-group" className="dropdown-item" href="#">
                                            Groups
                                        </a>
                                        <ul className="dropdown-menu">
                                            { this.props.permissions.accesses.maintain.subMenus.groups.create ?
                                                <li>
                                                    <a id="nav-group-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Groupcreate')} href="#">Create</a>
                                                </li>
                                                :
                                                null
                                            }
                                            { this.props.permissions.accesses.maintain.subMenus.groups.edit || this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                                <li>
                                                    <a id="nav-group-view-delete" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Groupupgrade')} href="#">Update/Delete</a>
                                                </li>
                                                :
                                                null
                                            }
                                            { this.props.permissions.accesses.maintain.subMenus.groups.view ?
                                                <li>
                                                    <a id="nav-group-view-delete" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'GroupView')} href="#">View</a>
                                                </li>
                                                :
                                                null
                                            }
                                        </ul>
                                    </li>
                                    :
                                    null
                                }

                                { this.props.permissions.accesses.maintain.subMenus.agents.create ?
                                    <li className="dropdown-submenu">
                                        <a id="nav-agent" className="dropdown-item" href="#">
                                            Launch Scripts
                                        </a>
                                        <ul className="dropdown-menu">
                                            { this.props.permissions.accesses.maintain.subMenus.agents.create ?
                                                <li>
                                                    <a id="nav-agent-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentcreate')} href="#">Create</a>
                                                </li>
                                                :
                                                null
                                            }
                                            <li>
                                                <a id="nav-agent-update-disable" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentupgrade')} href="#">Update/Delete</a>
                                            </li>
                                            <li>
                                                <a id="nav-agent-view" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentview')} href="#">View</a>
                                            </li> 
                                        </ul>
                                    </li>
                                    :
                                    null
                                }

                                { this.props.permissions.accesses.maintain.subMenus.watchers.view || this.props.permissions.accesses.maintain.subMenus.watchers.create || this.props.permissions.accesses.maintain.subMenus.watchers.edit || this.props.permissions.accesses.maintain.subMenus.watchers.delete ?
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item" href="#">
                                            Requests
                                        </a>
                                        <ul className="dropdown-menu">
                                            { 
                                                this.props.permissions.accesses.maintain.subMenus.watchers.create ?
                                                    <li>
                                                        <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Requestcreate')} href="#">Create</a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            { 
                                                this.props.permissions.accesses.maintain.subMenus.watchers.edit || this.props.permissions.accesses.maintain.subMenus.watchers.delete ?
                                                    <li>
                                                        <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'RequestUpgrade')} href="#">Update/Disable</a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            {
                                                this.props.permissions.accesses.maintain.subMenus.watchers.view ?
                                                    <li>
                                                        <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'RequestView')} href="#">View</a>
                                                    </li>
                                                    :
                                                    null
                                            }
                                        </ul>
                                    </li>
                                    :
                                    null
                                } 
                                </ul>
                            </li>
                            :
                            null
                        }

                        { this.props.permissions.accesses && this.props.permissions.accesses.monitor.haveAccess ?
                        <li id="nav-monitor" className={this.props.currentView === 'Notification' || this.props.currentView === 'Alert' || this.props.currentView === 'View' ? 'nav-item dropdown active' : 'nav-item dropdown'}>
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                <img src={'assets/static/images/monitor_icon.svg'} alt="nav-monitor" />
                                Monitor
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                                { this.props.permissions.accesses.monitor.subMenus.notifications.view ?
                                    <li>
                                        <a id="nav-notification" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Notification')} href="#">
                                            Events
                                        </a>
                                    </li>
                                    :
                                    null
                                }
                                {/* {this.props.permissions.accesses.monitor.subMenus.alerts.view ?
                                    <li>
                                        <a id="nav-alert" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Alert')} href="#">
                                            Alerts
                                        </a>
                                    </li>
                                    :
                                    null} */
                                }
                                { this.props.permissions.accesses.monitor.subMenus.healthStatus.view ?
                                    <li>
                                        <a id="nav-healthStatus" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'View')} href="#">
                                            Health Operations
                                        </a>
                                    </li>
                                    :
                                    null
                                }
                            </ul>
                        </li>
                        :
                        null
                        }
                        { this.props.permissions.accesses && this.props.permissions.accesses.reports.haveAccess ?
                        <li className={this.props.currentView === 'Report' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Report')}>
                                <img src={'assets/static/images/report_icon.svg'} alt="nav-report" />
                                Report
                            </a>
                        </li>
                        :
                        null
                        }
                        { this.props.permissions.accesses && this.props.permissions.accesses.settings.haveAccess ?
                        <li className={this.props.currentView === 'Usermanagement' || this.props.currentView === 'WebHooks' || this.props.currentView === 'UserProfile'  ? 'nav-item dropdown active' : 'nav-item dropdown'}>
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                <img src={'assets/static/images/settings_icon.svg'} alt="nav-settings" />
                                Settings
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                                <li>
                                    <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'WebHooks')} href="#">
                                       Webhooks
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" onClick={this.props.clickEve.bind(this, "UserProfile")} href="#"  >
                                      User Profile
                                    </a>
                                </li>
                            </ul>
                        </li>
                        :
                        null
                        }
                        { this.props.permissions.accesses && this.props.permissions.accesses.support.haveAccess ?
                        <li className={this.props.currentView === 'Support' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Support')}>
                                <img src={'assets/static/images/support_icon.svg'} alt="nav-support" />
                                Support
                            </a>
                        </li>
                        :
                        null
                        }
                    </ul>
                </div>
            </nav>
        )
        /* jshint ignore:end */
    }
}
