import React from "react";


export default class Maintainagentview extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            showTableInit: false
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        let technicalTableData = [];
        fetch("https://reqres.in/api/users/2", {  //this.props.baseUrl+'/listGateways?user_id='+this.props.userId, { // Get gateways
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.authToken
            }
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    let gateways = [
                        {
                          "gatewayId": "Gateway-10afc420-d8ad-41ec-8be6-6f723e6fb18a",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        },
                        {
                          "gatewayId": "Gateway-d4b7844c-f9b2-4ab3-bab3-592b8ca1629d",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1d",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        }
                    ];

                   // let gateways = respData.data;
                    if(gateways === null){
                        gateways = [];
                    }

                    if(gateways.length > 0){
                        for(let gateway of gateways){
                            let prepareData = {};
                            prepareData.agent_id = '';
                            prepareData.gateway = gateway.hostUrl;
                            prepareData.group = '';
                            prepareData.oauth_provider = '';
                            prepareData.zone = gateway.zone;
                            prepareData.subscription = gateway.gatewayId;
                            prepareData.remote_port = '';
                            prepareData.remote_host = '';
                            technicalTableData.push(prepareData);
                        }
                    }
                    
                    fetch("https://reqres.in/api/users/2", {  //this.props.baseUrl + '/listServers?user_id='+this.props.userId, { // Get servers
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': this.props.authToken
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((respData) => {
                                let servers = [
                                    {
                                      "serverId": "Server-56ca9bb6-62ee-4a41-88bd-107d20ceed30",
                                      "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                      "userId": "212712078",
                                      "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                                      "serviceUrl": "https://service-url",
                                      "hostUrl": "wss://gateway-url/agent",
                                      "agentId": "xbdhfg",
                                      "groupId": "ec-test",
                                      "uaaUrl": "https://uaa-url",
                                      "uaaClientId": "ec-test",
                                      "uaaClientSecret": "ec-test",
                                      "duration": 3000,
                                      "remoteHost": "localhost",
                                      "remotePort": "5432",
                                      "plugin": null
                                    },
                                    {
                                      "serverId": "Server-849d04cc-2f81-413d-a269-5402960fbd8e",
                                      "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                      "userId": "212712078",
                                      "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                                      "serviceUrl": "https://service-url",
                                      "hostUrl": "wss://gateway-url/agent",
                                      "agentId": "xbdhfg",
                                      "groupId": "ec-test",
                                      "uaaUrl": "https://uaa-url",
                                      "uaaClientId": "ec-test",
                                      "uaaClientSecret": "ec-test",
                                      "duration": 3000,
                                      "remoteHost": "localhost",
                                      "remotePort": "5432",
                                      "plugin": null
                                    }
                                ];
                               // let servers = respData.data;
                                if(servers === null){
                                    servers = [];
                                }

                                if(servers.length > 0){
                                    for(let server of servers){
                                        let prepareData = {};
                                        prepareData.agent_id = server.agentId;
                                        prepareData.gateway = server.hostUrl;
                                        prepareData.group = server.groupId;
                                        prepareData.oauth_provider = server.uaaUrl;
                                        prepareData.zone = server.zone;
                                        prepareData.subscription = server.serverId;
                                        prepareData.remote_port = server.remotePort;
                                        prepareData.remote_host = server.remoteHost;
                                        technicalTableData.push(prepareData);
                                    }
                                }

                                fetch( "https://reqres.in/api/users/2", { //this.props.baseUrl + '/listClients?user_id='+this.props.userId, { // Get clients
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': this.props.authToken
                                    }
                                })
                                .then((response) => {
                                    if (response.status === 200) {
                                        response.json().then((respData) => {
                                            let clients = [
                                                {
                                                  "clientId": "Client-1b95c319-aa6c-44ba-8c2f-2b1764efe697",
                                                  "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                  "userId": "212712078",
                                                  "hostUrl": "wss://gateway-url/agent",
                                                  "agentId": "hdsvhe",
                                                  "targetId": "dhvhye",
                                                  "groupId": "ec-test",
                                                  "uaaUrl": "https://url.predix.io/token",
                                                  "uaaClientId": "ec-test",
                                                  "uaaClientSecret": "ec-test",
                                                  "duration": 3000,
                                                  "localPort": "7999",
                                                  "plugin": null
                                                },
                                                {
                                                  "clientId": "Client-45a222d9-50fa-48c8-a7ec-ec700a1ce44f",
                                                  "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                  "userId": "212712078",
                                                  "hostUrl": "wss://gateway-url/agent",
                                                  "agentId": "hdsvhe",
                                                  "targetId": "dhvhye",
                                                  "groupId": "ec-test",
                                                  "uaaUrl": "https://url.predix.io/token",
                                                  "uaaClientId": "ec-test",
                                                  "uaaClientSecret": "ec-test",
                                                  "duration": 3000,
                                                  "localPort": "7999",
                                                  "plugin": null
                                                }
                                            ];
                                           // let clients = respData.data;
                                            if(clients === null){
                                                clients = [];
                                            }

                                            for(let client of clients){
                                                let prepareData = {};
                                                prepareData.agent_id = client.agentId;
                                                prepareData.gateway = client.hostUrl;
                                                prepareData.group = client.groupId;
                                                prepareData.oauth_provider = client.uaaUrl;
                                                prepareData.zone = '';
                                                prepareData.subscription = client.clientId;
                                                prepareData.remote_port = '';
                                                prepareData.remote_host = '';
                                                technicalTableData.push(prepareData);
                                            }
                                            this.generateTableStructure(technicalTableData);
                                            this.setState({
                                                tableData: technicalTableData
                                            });
                                        });
                                    }
                                    else{
                                        //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                                        //console.log('Looks like there was a problem. Status Code: ' + response.status);
                                        //this.showAjaxBusy(false);
                                    }
                                });
                            });
                        }
                        else{
                            //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                            //console.log('Looks like there was a problem. Status Code: ' + response.status);
                            //this.showAjaxBusy(false);
                        }
                    });
                });
            }
            else{
                //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                //console.log('Looks like there was a problem. Status Code: ' + response.status);
                //this.showAjaxBusy(false);
            }
        });
    }

    /* istanbul ignore next */
    componentDidUpdate(){
        //window.initTable('maintainagentviewTable');
    }

    /* istanbul ignore next */
    generateTableStructure(technicalTableData){
        let tableData = technicalTableData;
        let newTableData = [];
        for(let dataObj of tableData){
            let newDataObj = {};
            newDataObj.agent_id = dataObj.agent_id;
            newDataObj.group = dataObj.group;
            if(dataObj.gateway.length > 10){
                newDataObj.gateway = dataObj.gateway.substr(0, 10);
                newDataObj.gatewayHidden = dataObj.gateway;
                newDataObj.gatewayHiddenFlag = true;
            }
            else{
                newDataObj.gateway = dataObj.gateway;
                newDataObj.gatewayHiddenFlag = false;
            }

            if (dataObj.oauth_provider.length > 10){
                newDataObj.oauth_provider = dataObj.oauth_provider.substr(0, 10);
                newDataObj.oauth_providerHidden = dataObj.oauth_provider;
                newDataObj.oauth_providerHiddenFlag = true;
            }
            else{
                newDataObj.oauth_provider = dataObj.oauth_provider;
                newDataObj.oauth_providerHiddenFlag = false;
            }

            if (dataObj.zone.length > 10){
                newDataObj.zone = dataObj.zone.substr(0, 10);
                newDataObj.zoneHidden = dataObj.zone;
                newDataObj.zoneHiddenFlag = true;
            }
            else{
                newDataObj.zone = dataObj.zone;
                newDataObj.zoneHiddenFlag = false;
            }

            if (dataObj.subscription.length > 10){
                newDataObj.subscription = dataObj.subscription.substr(0, 10);
                newDataObj.subscriptionHidden = dataObj.subscription;
                newDataObj.subscriptionHiddenFlag = true;
            }
            else{
                newDataObj.subscription = dataObj.subscription;
                newDataObj.subscriptionHiddenFlag = false;
            }

            if (dataObj.remote_host.length > 10){
                newDataObj.remote_host = dataObj.remote_host.substr(0, 10);
                newDataObj.remote_hostHidden = dataObj.remote_host;
                newDataObj.remote_hostHiddenFlag = true;
            }
            else{
                newDataObj.remote_host = dataObj.remote_host;
                newDataObj.remote_hostHiddenFlag = false;
            }


            if (dataObj.remote_port.length > 10){
                newDataObj.remote_port = dataObj.remote_port.substr(0, 10);
                newDataObj.remote_portHidden = dataObj.remote_port;
                newDataObj.remote_portHiddenFlag = true;
            }
            else{
                newDataObj.remote_port = dataObj.remote_port;
                newDataObj.remote_portHiddenFlag = false;
            }

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            showTableInit: true
        });

        setTimeout(function(){
            window.initTable('maintainagentviewTable');
        }, 100);
    }

    /* istanbul ignore next */
    showHideTableTdData(objectIndex, fieldName){
        let newTableData = [...this.state.newTableData];
        let copiedObjectToChange = Object.assign({}, newTableData[objectIndex]);
        if(fieldName === 'gateway'){
            let tempValue = copiedObjectToChange.gateway;
            copiedObjectToChange.gateway = copiedObjectToChange.gatewayHidden;
            copiedObjectToChange.gatewayHidden = tempValue;
            copiedObjectToChange.gatewayHiddenFlag = !copiedObjectToChange.gatewayHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }
       else if(fieldName === 'oauth_provider'){
            let tempValue = copiedObjectToChange.oauth_provider;
            copiedObjectToChange.oauth_provider = copiedObjectToChange.oauth_providerHidden;
            copiedObjectToChange.oauth_providerHidden = tempValue;
            copiedObjectToChange.oauth_providerHiddenFlag = !copiedObjectToChange.oauth_providerHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if(fieldName === 'zone'){
            let tempValue = copiedObjectToChange.zone;
            copiedObjectToChange.zone = copiedObjectToChange.zoneHidden;
            copiedObjectToChange.zoneHidden = tempValue;
            copiedObjectToChange.zoneHiddenFlag = !copiedObjectToChange.zoneHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if(fieldName === 'subscription'){
            let tempValue = copiedObjectToChange.subscription;
            copiedObjectToChange.subscription = copiedObjectToChange.subscriptionHidden;
            copiedObjectToChange.subscriptionHidden = tempValue;
            copiedObjectToChange.subscriptionHiddenFlag = !copiedObjectToChange.subscriptionHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if(fieldName === 'remote_host'){
            let tempValue = copiedObjectToChange.remote_host;
            copiedObjectToChange.remote_host = copiedObjectToChange.remote_hostHidden;
            copiedObjectToChange.remote_hostHidden = tempValue;
            copiedObjectToChange.remote_hostHiddenFlag = !copiedObjectToChange.remote_hostHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }
        else if(fieldName === 'remote_port'){
            let tempValue = copiedObjectToChange.remote_port;
            copiedObjectToChange.remote_port = copiedObjectToChange.remote_portHidden;
            copiedObjectToChange.remote_portHidden = tempValue;
            copiedObjectToChange.remote_portHiddenFlag = !copiedObjectToChange.remote_portHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        this.setState({
            newTableData: newTableData
        });
    }

    /* istanbul ignore next */
    filterByValue(array, string) {
        return array.filter(o =>
            Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    }

    /* istanbul ignore next */
    filterData(e){
        window.destroyDataTable('maintainagentviewTable');
        let searchStr = e.target.value.trim();
        let wholeData = [...this.state.tableData];
        let filteredData = [];
        let newTableData = [];
        if(searchStr != ''){
            filteredData = this.filterByValue(wholeData, searchStr);
        }
        else{
            filteredData = wholeData;
        }

        for(let dataObj of filteredData){
            let newDataObj = {};
            newDataObj.agent_id = dataObj.agent_id;
            newDataObj.group = dataObj.group;
            if(dataObj.gateway.length > 10){
                newDataObj.gateway = dataObj.gateway.substr(0, 10);
                newDataObj.gatewayHidden = dataObj.gateway;
                newDataObj.gatewayHiddenFlag = true;
            }
            else{
                newDataObj.gateway = dataObj.gateway;
                newDataObj.gatewayHiddenFlag = false;
            }

            if (dataObj.oauth_provider.length > 10){
                newDataObj.oauth_provider = dataObj.oauth_provider.substr(0, 10);
                newDataObj.oauth_providerHidden = dataObj.oauth_provider;
                newDataObj.oauth_providerHiddenFlag = true;
            }
            else{
                newDataObj.oauth_provider = dataObj.oauth_provider;
                newDataObj.oauth_providerHiddenFlag = false;
            }

            if (dataObj.zone.length > 10){
                newDataObj.zone = dataObj.zone.substr(0, 10);
                newDataObj.zoneHidden = dataObj.zone;
                newDataObj.zoneHiddenFlag = true;
            }
            else{
                newDataObj.zone = dataObj.zone;
                newDataObj.zoneHiddenFlag = false;
            }

            if (dataObj.subscription.length > 10){
                newDataObj.subscription = dataObj.subscription.substr(0, 10);
                newDataObj.subscriptionHidden = dataObj.subscription;
                newDataObj.subscriptionHiddenFlag = true;
            }
            else{
                newDataObj.subscription = dataObj.subscription;
                newDataObj.subscriptionHiddenFlag = false;
            }

            if (dataObj.remote_host.length > 10){
                newDataObj.remote_host = dataObj.remote_host.substr(0, 10);
                newDataObj.remote_hostHidden = dataObj.remote_host;
                newDataObj.remote_hostHiddenFlag = true;
            }
            else{
                newDataObj.remote_host = dataObj.remote_host;
                newDataObj.remote_hostHiddenFlag = false;
            }


            if (dataObj.remote_port.length > 10){
                newDataObj.remote_port = dataObj.remote_port.substr(0, 10);
                newDataObj.remote_portHidden = dataObj.remote_port;
                newDataObj.remote_portHiddenFlag = true;
            }
            else{
                newDataObj.remote_port = dataObj.remote_port;
                newDataObj.remote_portHiddenFlag = false;
            }

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData
        });

        setTimeout(function(){
            window.initTable('maintainagentviewTable');
        }, 0);
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Maintainagentview">
                <div className="col-md-12">
                    <div className="row mt-2">
                        <div className="col-sm-6 text-left">
                            <div className="d-inline">
                                <button type="button" className="btn btn-sm btn-outline-secondary disabled">
                                        <i className="fa fa-filter"></i>
                                        FILTER
                                </button>
                            </div>
                            <div className="d-inline p-2">
                                <input 
                                    type="text" 
                                    className="d-inline form-control form-control-sm search-field"
                                    onChange={(event)=>{this.filterData(event)}} />
                            </div>  
                        </div>
                    </div>
                    <div className="centered-div">
                    <div id="maintainagentviewTableDiv">
                            { this.state.showTableInit ?
                                <table id="maintainagentviewTable" className="table">
                                    <thead>
                                        <tr>
                                            <th>Subscription</th>
                                            <th>Agent ID</th>
                                            <th>Gateway</th>
                                            <th>Group</th>
                                            <th>OAuth Provider</th>
                                            <th>Zone</th>
                                            <th>Remote Host</th>
                                            <th>Remote Port</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                        return(
                                            <tr key={'maintainagentviewTableTbodyTr_'+tbodyIndex}>
                                                <td>
                                                    { tbodyVal.subscription }&nbsp;&nbsp;
                                                    {  tbodyVal.subscriptionHiddenFlag ?
                                                        <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'subscription')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                        null
                                                    }
                                                </td>
                                                <td>{ tbodyVal.agent_id }</td>
                                                <td>
                                                    { tbodyVal.gateway }&nbsp;&nbsp;
                                                    {
                                                        tbodyVal.gatewayHiddenFlag ?
                                                            <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'gateway')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                            null
                                                    }
                                                </td>
                                                <td>{ tbodyVal.group }</td>
                                                <td>
                                                    { tbodyVal.oauth_provider }&nbsp;&nbsp;
                                                    {  tbodyVal.oauth_providerHiddenFlag ?
                                                            <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'oauth_provider')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                            null
                                                        }
                                                </td>
                                                <td>
                                                    { tbodyVal.zone }&nbsp;&nbsp;
                                                    {   tbodyVal.zoneHiddenFlag ?
                                                            <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'zone')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                            null
                                                        }
                                                </td>
                                                <td>
                                                    { tbodyVal.remote_host }&nbsp;&nbsp;
                                                    {  tbodyVal.remote_hostHiddenFlag ?
                                                        <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'remote_host')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                        null
                                                    }
                                                </td>
                                                <td>
                                                    { tbodyVal.remote_port }&nbsp;&nbsp;
                                                    {  tbodyVal.remote_portHiddenFlag ?
                                                        <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'remote_port')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                        null
                                                    }</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>:
                                <p className="text-center loader-icon">
                                    <img alt="loading" src="assets/static/images/rolling.svg" />
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
