import React from "react";

export default class Maintainagentcreate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            agentForm: {
                agentMode: { value: 2, dirtyState: false },
                gateway: { value: '', dirtyState: false },
                businessId: { value: 0, dirtyState: false },
                businessName: { value: '', dirtyState: false },
                requestor: { value: '', dirtyState: false },
                requestedDate: { value: '', dirtyState: false },
                customerEmail: { value: '', dirtyState: false },
                bucAnd: { value: '', dirtyState: false },
                vpc: { value: '', dirtyState: false },
                debugMode: { value: true, dirtyState: false },
                subscriptionId: { value: '', dirtyState: false },
                ecVersion: { value: '', dirtyState: false }
            },
            errorsAgentForm: {},
            agentFormIsValid: false,
            serverForm: {
                mode: 'SERVER',
                agentId: { value: '', dirtyState: false, type: 'password' },
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false, type: 'password' },
                duration: { value: '', dirtyState: false },
                OAuth2:{ value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                zone: { value: '', dirtyState: false },
                serviceUrl: { value: '', dirtyState: false },
                remoteHost: { value: '', dirtyState: false },
                remotePort: { value: '', dirtyState: false },
                proxy: { value: '', dirtyState: false },
                noproxy: { value: '', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [], dirtyState: false },
                hca: { value: '', dirtyState: false },
                os: { value: '', dirtyState: false },
            },
            errorsServerForm: {},
            serverFormIsValid: false,
            clientForm: {
                mode: 'CLIENT',
                agentId: { value: '', dirtyState: false, type: 'password' },
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false, type: 'password' },
                duration: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                localPort: { value: '', dirtyState: false },
                targetId: { value: '', dirtyState: false, type: 'password' },
                proxy: { value: '', dirtyState: false },
                noproxy: { value: '', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [], dirtyState: false },
                hca: { value: '', dirtyState: false },
                os: { value: '', dirtyState: false },
            },
            errorsClientForm: {},
            clientFormIsValid: false,
            xclientForm: {
                mode: 'X:CLIENT',
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                remoteHost: { value: '', dirtyState: false },
            },
            errorsXClientForm: {},
            xclientFormIsValid: false,

            xserverForm: {
                mode: 'X:CLIENT',
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                remoteHost: { value: '', dirtyState: false },
            },
            errorsXServerForm: {},
            xserverFormIsValid: false,
            subscriptions:[],
            // API will provide this agentModeButtons
            agentModeButtons: [
                { text: 'SERVER', value: 2 },
                { text: 'CLIENT', value: 3 },
                { text: 'X:SERVER', value: 4 },
                { text: 'X:CLIENT', value: 5 },
            ],
            /* istanbul ignore next */
            // API will provide this gateways
            gateways: [
              {name:"gateway-03123012" , id:101},
              {name:"gateway-31034216" , id:102},
              {name:"gateway-03130357" , id:103}],
            // API will provide this businesses
            businesses: [
                { name: 'Aviation', id: '1' },
                { name: 'Power', id: '2' },
                { name: 'Capital', id: '3' },
                { name: 'External', id: '4' },
            ],
            // API will provide this ecVersions
            ecVersions: [],
            groups: [],
            // API will provide this ecSubVersions
            ecSubVersions: [
                { name: 'v1.hokkaido.212 stable', id: '1', ecVersionId: '1' },
                { name: 'v1beta.fukuoka.1724', id: '2', ecVersionId: '2' }
            ],
            // API will provide this osTypes
            osTypes: [
                { name: 'Linux', id: '1' },
                { name: 'Windows', id: '2' },
                { name: 'Solaris', id: '3' },
                { name: 'MAC', id: '4' }
            ],
            // API will provide this plugIns
            plugIns: [
                { name: 'VLN', id: 'vln' },
                { name: 'TLS', id: 'tls' }
            ],
            // API will provide this environments
            environments: [
                { name: 'CF', id: 'cf' },
                { name: 'AWS', id: 'aws' }
            ],
            operatingSystems: [
                { name: 'Linux', id: 'linux' },
                { name: 'Windows', id: 'windows' },
                { name: 'Darwin', id: 'darwin' }
            ],
            isTesting: false,
	    keyName:""
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        window.enableToolTip();
        let businesses = [...this.state.businesses];
        let agentForm = Object.assign({}, this.state.agentForm);
        if(businesses.length > 0){
            agentForm.businessId.value = businesses[0].id;
            this.setState({
                agentForm: agentForm
            });
        }

        if(this.state.operatingSystems.length > 0){
            let selectedOs = this.state.operatingSystems[0].id;
            let serverForm = Object.assign({}, this.state.serverForm);
            let clientForm = Object.assign({}, this.state.clientForm);
            serverForm.os.value = selectedOs;
            clientForm.os.value = selectedOs;
            this.setState({
                serverForm: serverForm,
                clientForm: clientForm
            });
        }



        // Subscription list start

        this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        if (sessionStorage.getItem("snapshotData") !== null) {
          let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
          let allData =[]
          let subscriptionData=[]
          let groupData =[]
            Object.keys(respData).forEach((key)=> {
                allData.push(respData[key])
            });
            for(let individualData of allData){
                if(individualData.parent){
                    if(individualData.parent ==="ab2a2691-a563-486c-9883-5111ff36ba9b"){
                      subscriptionData.push(individualData);
                    }
	        if(individualData.parent ==="f894e5a8-0f9b-46ca-8b74-57e94610d731"){
                      groupData.push(individualData);
                    }
                }
            }
            this.setState({keyName: "[" + groupData.length + "]"})
            if(subscriptionData.length < 0){
              subscriptionData = [];
             }
             this.setState({
              subscriptions: subscriptionData,
	            groups:groupData     
          });
          this.props.hideGlobalMessage();
          }
          else {
              this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
              setTimeout(()=> {
                  this.props.hideGlobalMessage();
              }, 2000);
          }

        // Subscription list end
    
        // get EC Version list start
/*         fetch(this.props.baseUrl+'/ecVersions', { // this.props.baseUrl+'ecVersions'
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
                    if(respData.errorStatus.status == 'ok'){
                        let ecVersions = respData.data;
                        let agentForm = this.state.agentForm;

                        if(ecVersions === null){
                            ecVersions = [];
                        }
                        else{
                            agentForm.ecVersion.value = ecVersions[0];
                        }

                        this.setState({
                            ecVersions: ecVersions,
                            agentForm: agentForm
                        });
                    }
                });
            }
        }); */
    }

    /* istanbul ignore next */
    handleChangeAgentMode(newAgentMode){
        let currentAgentForm =  Object.assign({}, this.state.agentForm);
        currentAgentForm.agentMode.value = newAgentMode;

        this.setState({
            agentForm: currentAgentForm
        });
        window.enableToolTip();
    }

    /* istanbul ignore next */
    changeFormAutofill(selectedSubscriptionId){
        let subscriptions = this.state.subscriptions;
        let serverForm = this.state.serverForm;
        let clientForm = this.state.clientForm;
        if(selectedSubscriptionId != ''){
            let selectedSubscription  = subscriptions.filter(function(o){return o.subscriptionId == selectedSubscriptionId;} );
            
            serverForm.zone.value = selectedSubscriptionId;
            serverForm.serviceUrl.value = selectedSubscription[0].serviceUri;
            serverForm.clientId.value = selectedSubscription[0].clientId;
            serverForm.clientSecret.value = selectedSubscription[0].clientSc;
            serverForm.OAuth2.value = selectedSubscription[0].uaaUrl + '/oauth/token';

            clientForm.clientId.value = selectedSubscription[0].clientId;
            clientForm.clientSecret.value = selectedSubscription[0].clientSc;
            clientForm.OAuth2.value = selectedSubscription[0].uaaUrl + '/oauth/token';

            fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
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
                            let groups = respData.data;
                            if(groups.length > 0){
                                let selectedGroup = groups[0];
                                let selectedGroupId = selectedGroup.groupId;
                                serverForm.group.value = selectedGroupId;
                                clientForm.group.value = selectedGroupId;
                                this.setState({
                                    groups: groups,
                                    serverForm: serverForm,
                                    clientForm: clientForm
                                });
                                this.changeAidForServer(selectedGroupId);
                                this.changeAidTidForClient(selectedGroupId);
                            }
                        }
                    });
                }
            });
        }

        fetch(this.props.baseUrl + '/gatewayList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
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
                        let gateways = respData.data.glist;
                        let modifiedGateways = [];
                        let gatewayKey = 0;
                        let selectedGateway = '';
                        for(let indexGateway in gateways){
                            let cfURL = gateways[indexGateway].cfURL;
                            if(cfURL != ''){
                                let modifiedCfUrlObj = {};
                                let cfURLSplit = cfURL.split("://");
                                if(cfURLSplit[0].search('https') != -1){
                                    cfURLSplit[0] = 'wss';
                                }
                                else{
                                    cfURLSplit[0] = 'ws';
                                }
                                let newCfURL = cfURLSplit.join('://');
                                newCfURL += '/agent';
                                modifiedCfUrlObj.id = newCfURL;
                                modifiedCfUrlObj.name = newCfURL;
                                modifiedGateways.push(modifiedCfUrlObj);
                                if(gatewayKey == 0){
                                    selectedGateway = newCfURL;
                                }
                                gatewayKey++;
                            }
                        }

                        clientForm.host.value = selectedGateway;
                        serverForm.host.value = selectedGateway;
                        this.setState({
                            gateways: modifiedGateways,
                            clientForm: clientForm,
                            serverForm: serverForm
                        });
                    }
                });
            }
        });
    }

    /* istanbul ignore next */
    changeAidForServer(selectedGroupId){
        if(selectedGroupId != ''){
            let groups = this.state.groups;
            let serverForm = this.state.serverForm;
            let selectedGroup  = groups.filter(function(o){return o.groupId == selectedGroupId;});
            serverForm.agentId.value = selectedGroup[0].ids.tid;
            this.setState({
                serverForm: serverForm
            });
        }
    }

    /* istanbul ignore next */
    changeAidTidForClient(selectedGroupId){
        if(selectedGroupId != ''){
            let groups = this.state.groups;
            let clientForm = this.state.clientForm;
            let selectedGroup  = groups.filter(function(o){return o.groupId == selectedGroupId;});
            clientForm.agentId.value = selectedGroup[0].ids.aid;
            clientForm.targetId.value = selectedGroup[0].ids.tid;
            this.setState({
                clientForm: clientForm
            });
        }
    }

    /* istanbul ignore next */
    handleAgentFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentAgentForm =  Object.assign({}, this.state.agentForm);

        if(fieldName === 'subscriptionId'){
            currentAgentForm.subscriptionId.value = updatedValue;
            currentAgentForm.subscriptionId.dirtyState = true;
          //  this.changeFormAutofill(updatedValue);
        }
        else if(fieldName === 'ecVersion'){
            currentAgentForm.ecVersion.value = updatedValue;
            currentAgentForm.ecVersion.dirtyState = true;
        }
        else if(fieldName === 'debugMode'){
            currentAgentForm.debugMode.value = updatedValue;
            currentAgentForm.debugMode.dirtyState = true;
        }

        this.setState({
            agentForm: currentAgentForm
        });
        this.handleAgentFormValidation();
    }

    /* istanbul ignore next */
    handleAgentFormValidation(){
        let currentFormData = this.state.agentForm;
        let businessIdValue = currentFormData.businessId.value;
        let businessNameValue = currentFormData.businessName.value;
        let businessNameDirtyState = currentFormData.businessName.dirtyState;
        let requestorValue = currentFormData.requestor.value;
        let requestorDirtyState = currentFormData.requestor.dirtyState;
        let requestedDateValue = currentFormData.requestedDate.value;
        let requestedDateDirtyState = currentFormData.requestedDate.dirtyState;
        let customerEmailValue = currentFormData.customerEmail.value;
        let customerEmailDirtyState = currentFormData.customerEmail.dirtyState;
        let bucAndValue = currentFormData.bucAnd.value;
        let bucAndDirtyState = currentFormData.bucAnd.dirtyState;
        let formIsValid = true;
		let errors = {};

        if(businessIdValue === ''){
            errors.businessId = 'Please select Business';
            formIsValid = false;
        }

        if(businessIdValue == 0){
            if(businessNameValue.trim() === ''){
                if(businessNameDirtyState){
                    errors.businessName = 'Please enter Business Name';
                }
                formIsValid = false;
            }
        }

        if(requestorValue.trim() === ''){
            if(requestorDirtyState){
                errors.requestor = 'Please enter Requestor';
            }
            formIsValid = false;
        }

        if(requestedDateValue.trim() === ''){
            if(requestedDateDirtyState){
                errors.requestedDate = 'Please enter Requested Date';
            }
            formIsValid = false;
        }

        if(customerEmailValue.trim() === ''){
            if(customerEmailDirtyState){
                errors.customerEmail = 'Please enter Customer Email';
            }
            formIsValid = false;
        }

        if(bucAndValue.trim() === ''){
            if(bucAndDirtyState){
                errors.bucAnd = 'Please enter BUC/AND';
            }
            formIsValid = false;
        }

        this.setState({
			agentFormIsValid: formIsValid,
			errorsAgentForm: errors
		});
    }

    

    /* istanbul ignore next */
    handleServerFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentServerForm =  Object.assign({}, this.state.serverForm);

        if(fieldName === 'agentId'){
            if(updatedValue.length > 6){
                updatedValue = currentServerForm.agentId.value;
            }
            currentServerForm.agentId.value = updatedValue;
            currentServerForm.agentId.dirtyState = true;
        }
        else if(fieldName === 'group'){
            currentServerForm.group.value = updatedValue;
            currentServerForm.group.dirtyState = true;
          //  this.changeAidForServer(updatedValue);
        }
        else if(fieldName === 'clientId'){
            currentServerForm.clientId.value = updatedValue;
            currentServerForm.clientId.dirtyState = true;
        }
        else if(fieldName === 'clientSecret'){
            currentServerForm.clientSecret.value = updatedValue;
            currentServerForm.clientSecret.dirtyState = true;
        }
        else if(fieldName === 'duration'){
            let durationAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentServerForm.duration.value;
            if(durationAfterValidityCheck.length > 4){
                durationAfterValidityCheck = currentServerForm.duration.value;
            }
            currentServerForm.duration.value = durationAfterValidityCheck;
            currentServerForm.duration.dirtyState = true;
        }
        else if(fieldName === 'OAuth2'){
            currentServerForm.OAuth2.value = updatedValue;
            currentServerForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentServerForm.host.value = updatedValue;
            currentServerForm.host.dirtyState = true;
        }
        else if(fieldName === 'zone'){
            if(updatedValue.length > 36){
                updatedValue = currentServerForm.zone.value;
            }
            currentServerForm.zone.value = updatedValue;
            currentServerForm.zone.dirtyState = true;
        }
        else if(fieldName === 'serviceUrl'){
            currentServerForm.serviceUrl.value = updatedValue;
            currentServerForm.serviceUrl.dirtyState = true;
        }
        else if(fieldName === 'remoteHost'){
            currentServerForm.remoteHost.value = updatedValue;
            currentServerForm.remoteHost.dirtyState = true;
        }
        else if(fieldName === 'remotePort'){
            let remotePortAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentServerForm.remotePort.value;
            if(remotePortAfterValidityCheck.length > 4){
                remotePortAfterValidityCheck = currentServerForm.remotePort.value;
            }
            currentServerForm.remotePort.value = remotePortAfterValidityCheck;
            currentServerForm.remotePort.dirtyState = true;
        }
        else if(fieldName === 'proxy'){
            currentServerForm.proxy.value = updatedValue;
            currentServerForm.proxy.dirtyState = true;
        }
        else if(fieldName === 'noproxy'){
            currentServerForm.noproxy.value = updatedValue;
            currentServerForm.noproxy.dirtyState = true;
        } 
        else if(fieldName === 'allowPlugIn'){
            currentServerForm.allowPlugIn.value = updatedValue;
            currentServerForm.allowPlugIn.dirtyState = true;
        }
        else if(fieldName === 'plugIn'){
            let options = e.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            currentServerForm.plugIn.value = value;
            currentServerForm.plugIn.dirtyState = true;
        }
        else if(fieldName === 'hca'){
            let hcaAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentServerForm.hca.value;
            if(hcaAfterValidityCheck.length > 4){
                hcaAfterValidityCheck = currentServerForm.hca.value;
            }
            currentServerForm.hca.value = hcaAfterValidityCheck;
            currentServerForm.hca.dirtyState = true;
        }
        else if(fieldName === 'os'){
            currentServerForm.os.value = updatedValue;
            currentServerForm.os.dirtyState = true;
        }
	   
        this.setState({
            serverForm: currentServerForm
        });

        this.handleServerFormValidation();
    }

       /* istanbul ignore next */
       handleXServerFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentServerForm =  Object.assign({}, this.state.xserverForm);

         if(fieldName === 'group'){
            currentServerForm.group.value = updatedValue;
            currentServerForm.group.dirtyState = true;
          //  this.changeAidForServer(updatedValue);
        }
        else if(fieldName === 'clientId'){
            currentServerForm.clientId.value = updatedValue;
            currentServerForm.clientId.dirtyState = true;
        }
       
        else if(fieldName === 'OAuth2'){
            currentServerForm.OAuth2.value = updatedValue;
            currentServerForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentServerForm.host.value = updatedValue;
            currentServerForm.host.dirtyState = true;
        }
       
        else if(fieldName === 'remoteHost'){
            currentServerForm.remoteHost.value = updatedValue;
            currentServerForm.remoteHost.dirtyState = true;
        }
	   
        this.setState({
            xserverForm: currentServerForm
        });

        this.handleXServerFormValidation();
    }


    /* istanbul ignore next */
    handleXServerFormValidation(){ 
        let currentFormData = this.state.xserverForm;
     
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let remoteHostValue = currentFormData.remoteHost.value;
        let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors.group = 'Please enter Group';
            }
            formIsValid = false;
        }

        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors.clientId = 'Please enter Client Id';
            }
            formIsValid = false;
        }

        
        if(remoteHostValue.trim() === ''){
            if(remoteHostDirtyState){
                errors.remoteHost = 'Please enter Remote Host';
            }
            formIsValid = false;
        }
        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        else if(!urlRegExp.test(OAuth2Value)){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter valid URL';
            }
            formIsValid = false;
        }

        this.setState({
            xserverFormIsValid: formIsValid,
            errorsXServerForm: errors
        });
    }

       /* istanbul ignore next */
       handleXClientFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentServerForm =  Object.assign({}, this.state.xclientForm);

         if(fieldName === 'group'){
            currentServerForm.group.value = updatedValue;
            currentServerForm.group.dirtyState = true;
          //  this.changeAidForServer(updatedValue);
        }
        else if(fieldName === 'clientId'){
            currentServerForm.clientId.value = updatedValue;
            currentServerForm.clientId.dirtyState = true;
        }
       
        else if(fieldName === 'OAuth2'){
            currentServerForm.OAuth2.value = updatedValue;
            currentServerForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentServerForm.host.value = updatedValue;
            currentServerForm.host.dirtyState = true;
        }
       
        else if(fieldName === 'remoteHost'){
            currentServerForm.remoteHost.value = updatedValue;
            currentServerForm.remoteHost.dirtyState = true;
        }
	   
        this.setState({
            xclientForm: currentServerForm
        });

        this.handleXClientFormValidation();
    }


    /* istanbul ignore next */
    handleXClientFormValidation(){ 
        let currentFormData = this.state.xclientForm;
     
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let remoteHostValue = currentFormData.remoteHost.value;
        let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors.group = 'Please enter Group';
            }
            formIsValid = false;
        }

        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors.clientId = 'Please enter Client Id';
            }
            formIsValid = false;
        }

        
        if(remoteHostValue.trim() === ''){
            if(remoteHostDirtyState){
                errors.remoteHost = 'Please enter Remote Host';
            }
            formIsValid = false;
        }
        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        else if(!urlRegExp.test(OAuth2Value)){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter valid URL';
            }
            formIsValid = false;
        }

        this.setState({
            xclientFormIsValid: formIsValid,
            errorsXClientForm: errors
        });
    }



    /* istanbul ignore next */
    handleServerFormValidation(){
        let currentFormData = this.state.serverForm;
        let agentIdValue = currentFormData.agentId.value;
        let agentIdDirtyState = currentFormData.agentId.dirtyState;
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let clientSecretValue = currentFormData.clientSecret.value;
        let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
        let durationValue = currentFormData.duration.value;
        let durationDirtyState = currentFormData.duration.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let zoneValue = currentFormData.zone.value;
        let zoneDirtyState = currentFormData.zone.dirtyState;
        let serviceUrlValue = currentFormData.serviceUrl.value;
        let serviceUrlDirtyState = currentFormData.serviceUrl.dirtyState;
        let remoteHostValue = currentFormData.remoteHost.value;
        let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
        let remotePortValue = currentFormData.remotePort.value;
        let remotePortDirtyState = currentFormData.remotePort.dirtyState;
        let allowPlugInValue = currentFormData.allowPlugIn.value;
        let allowPlugInDirtyState = currentFormData.allowPlugIn.dirtyState;
        let plugInValue = currentFormData.plugIn.value;
        let plugInDirtyState = currentFormData.plugIn.dirtyState;
        let hcaValue = currentFormData.hca.value;
        let hcaDirtyState = currentFormData.hca.dirtyState;
        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        
        if(agentIdValue.trim() === ''){
            if(agentIdDirtyState){
                errors.agentId = 'Please enter Agent Id';
            }
            formIsValid = false;
        }
        else if(agentIdValue.length < 6){
            if(agentIdDirtyState){
                errors.agentId = 'Agent Id must have 6 character';
            }
            formIsValid = false;
        }

        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors.group = 'Please enter Group';
            }
            formIsValid = false;
        }

        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors.clientId = 'Please enter Client Id';
            }
            formIsValid = false;
        }

        if(clientSecretValue.trim() === ''){
            if(clientSecretDirtyState){
                errors.clientSecret = 'Please enter Client Secret';
            }
            formIsValid = false;
        }

        if(durationValue === ''){
            if(durationDirtyState){
                errors.duration = 'Please enter Duration in digit';
            }
            formIsValid = false;
        }
        else if(durationValue < 1200){
            if(durationDirtyState){
                errors.duration = 'Duration at least 1200';
            }
            formIsValid = false;
        }

        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        else if(!urlRegExp.test(OAuth2Value)){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter valid URL';
            }
            formIsValid = false;
        }

    /*    if(hostValue.trim() === ''){
            if(hostDirtyState){
                errors.host = 'Please enter Host';
            }
            formIsValid = false;
        }
        else if(hostValue.substr(0, 6) != 'wss://' && hostValue.substr(0, 5) != 'ws://'){
            if(hostDirtyState){
                errors.host = 'Host starts with wss:// or ws://';
            }
            formIsValid = false;
        }
        else if(hostValue.substr(hostValue.length - 6, 6) != '/agent'){
            if(hostDirtyState){
                errors.host = 'Host ends with /agent';
            }
            formIsValid = false;
        }*/

        if(zoneValue.trim() === ''){
            if(zoneDirtyState){
                errors.zone = 'Please enter Zone';
            }
            formIsValid = false;
        }
        else if(zoneValue.length < 36){
            if(zoneDirtyState){
                errors.zone = 'Zone must have 36 character';
            }
            formIsValid = false;
        }

        if(serviceUrlValue.trim() === ''){
            if(serviceUrlDirtyState){
                errors.serviceUrl = 'Please enter Service Url';
            }
            formIsValid = false;
        }
        else if(!urlRegExp.test(serviceUrlValue)){
            if(serviceUrlDirtyState){
                errors.serviceUrl = 'Please enter valid URL';
            }
            formIsValid = false;
        }

        if(remoteHostValue.trim() === ''){
            if(remoteHostDirtyState){
                errors.remoteHost = 'Please enter Remote Host';
            }
            formIsValid = false;
        }

        if(remotePortValue.trim() === ''){
            if(remotePortDirtyState){
                errors.remotePort = 'Please enter Remote Port in digit';
            }
            formIsValid = false;
        }
        else if(remotePortValue.length != 4){
            if(remotePortDirtyState){
                errors.remotePort = 'Remote Port must have 4 digit';
            }
            formIsValid = false;
        }

        if(allowPlugInValue){
            if(plugInValue.length === 0){
                if(plugInDirtyState){
                    errors.plugIn = 'Please select Plug-In';
                }
                formIsValid = false;
            }
        }

        if(hcaValue.trim() === ''){
            if(hcaDirtyState){
                errors.hca = 'Please enter Health Port in digit';
            }
            formIsValid = false;
        }
        else if(hcaValue.length != 4){
            if(hcaDirtyState){
                errors.hca = 'Health Port must have 4 digit';
            }
            formIsValid = false;
        }
        
        this.setState({
            serverFormIsValid: formIsValid,
            errorsServerForm: errors
        });
    }

    /* istanbul ignore next */
    handleClientFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentClientForm =  Object.assign({}, this.state.clientForm);

        if(fieldName === 'agentId'){
            if(updatedValue.length > 6){
                updatedValue = currentClientForm.agentId.value;
            }
            currentClientForm.agentId.value = updatedValue;
            currentClientForm.agentId.dirtyState = true;
        }
        else if(fieldName === 'group'){
            currentClientForm.group.value = updatedValue;
            currentClientForm.group.dirtyState = true;
          //  this.changeAidTidForClient(updatedValue);
        }
        else if(fieldName === 'clientId'){
            currentClientForm.clientId.value = updatedValue;
            currentClientForm.clientId.dirtyState = true;
        }
        else if(fieldName === 'clientSecret'){
            currentClientForm.clientSecret.value = updatedValue;
            currentClientForm.clientSecret.dirtyState = true;
        }
        else if(fieldName === 'duration'){
            let durationAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentClientForm.duration.value;
            if(durationAfterValidityCheck.length > 4){
                durationAfterValidityCheck = currentClientForm.duration.value;
            }
            currentClientForm.duration.value = durationAfterValidityCheck;
            currentClientForm.duration.dirtyState = true;
        }
        else if(fieldName === 'OAuth2'){
            currentClientForm.OAuth2.value = updatedValue;
            currentClientForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentClientForm.host.value = updatedValue;
            currentClientForm.host.dirtyState = true;
        }
        else if(fieldName === 'localPort'){
            let localPortAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentClientForm.localPort.value;
            if(localPortAfterValidityCheck.length > 4){
                localPortAfterValidityCheck = currentClientForm.localPort.value;
            }
            currentClientForm.localPort.value = localPortAfterValidityCheck;
            currentClientForm.localPort.dirtyState = true;
        }
        else if(fieldName === 'targetId'){
            if(updatedValue.length > 6){
                updatedValue = currentClientForm.targetId.value;
            }
            currentClientForm.targetId.value = updatedValue;
            currentClientForm.targetId.dirtyState = true;
        }
        else if(fieldName === 'proxy'){
            currentClientForm.proxy.value = updatedValue;
            currentClientForm.proxy.dirtyState = true;
        }
        else if(fieldName === 'noproxy'){
            currentClientForm.noproxy.value = updatedValue;
            currentClientForm.noproxy.dirtyState = true;
        }
        else if(fieldName === 'allowPlugIn'){
            currentClientForm.allowPlugIn.value = updatedValue;
            currentClientForm.allowPlugIn.dirtyState = true;
        }
        else if(fieldName === 'plugIn'){
            let options = e.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            currentClientForm.plugIn.value = value;
            currentClientForm.plugIn.dirtyState = true;
        }
        else if(fieldName === 'hca'){
            let hcaAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentClientForm.hca.value;
            if(hcaAfterValidityCheck.length > 4){
                hcaAfterValidityCheck = currentClientForm.hca.value;
            }
            currentClientForm.hca.value = hcaAfterValidityCheck;
            currentClientForm.hca.dirtyState = true;
        }
        else if(fieldName === 'os'){
            currentClientForm.os.value = updatedValue;
            currentClientForm.os.dirtyState = true;
        }

        this.setState({
            clientForm: currentClientForm
        });

        this.handleClientFormValidation();
    }

    /* istanbul ignore next */
    handleClientFormValidation(){
        let currentFormData = this.state.clientForm;
        let agentIdValue = currentFormData.agentId.value;
        let agentIdDirtyState = currentFormData.agentId.dirtyState;
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let clientSecretValue = currentFormData.clientSecret.value;
        let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
        let durationValue = currentFormData.duration.value;
        let durationDirtyState = currentFormData.duration.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let localPortValue = currentFormData.localPort.value;
        let localPortDirtyState = currentFormData.localPort.dirtyState;
        let targetIdValue = currentFormData.targetId.value;
        let targetIdDirtyState = currentFormData.targetId.dirtyState;
        let allowPlugInValue = currentFormData.allowPlugIn.value;
        let plugInValue = currentFormData.plugIn.value;
        let plugInDirtyState = currentFormData.plugIn.dirtyState;
        let hcaValue = currentFormData.hca.value;
        let hcaDirtyState = currentFormData.hca.dirtyState;
        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if(agentIdValue.trim() === ''){
            if(agentIdDirtyState){
                errors.agentId = 'Please enter Agent Id';
            }
            formIsValid = false;
        }
        else if(agentIdValue.length < 6){
            if(agentIdDirtyState){
                errors.agentId = 'Agent Id must have 6 character';
            }
            formIsValid = false;
        }

        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors.group = 'Please enter Group';
            }
            formIsValid = false;
        }

        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors.clientId = 'Please enter Client Id';
            }
            formIsValid = false;
        }

        if(clientSecretValue.trim() === ''){
            if(clientSecretDirtyState){
                errors.clientSecret = 'Please enter Client Secret';
            }
            formIsValid = false;
        }

        if(durationValue === ''){
            if(durationDirtyState){
                errors.duration = 'Please enter Duration in digit';
            }
            formIsValid = false;
        }
        else if(durationValue < 1200){
            if(durationDirtyState){
                errors.duration = 'Duration at least 1200';
            }
            formIsValid = false;
        }

        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        else if(!urlRegExp.test(OAuth2Value)){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter valid URL';
            }
            formIsValid = false;
        }

      /*  if(hostValue.trim() === ''){
            if(hostDirtyState){
                errors.host = 'Please enter Host';
            }
            formIsValid = false;
        }
        else if(hostValue.substr(0, 6) != 'wss://' && hostValue.substr(0, 5) != 'ws://'){
            if(hostDirtyState){
                errors.host = 'Host starts with wss:// or ws://';
            }
            formIsValid = false;
        }
        else if(hostValue.substr(hostValue.length - 6, 6) != '/agent'){
            if(hostDirtyState){
                errors.host = 'Host ends with /agent';
            }
            formIsValid = false;
        }*/

        if(localPortValue.trim() === ''){
            if(localPortDirtyState){
                errors.localPort = 'Please enter Local Port in digit';
            }
            formIsValid = false;
        }
        else if(localPortValue.length != 4){
            if(localPortDirtyState){
                errors.localPort = 'Local Port must have 4 digit';
            }
            formIsValid = false;
        }

        if(targetIdValue.trim() === ''){
            if(targetIdDirtyState){
                errors.targetId = 'Please enter Target Id';
            }
            formIsValid = false;
        }
        else if(targetIdValue.length < 6){
            if(targetIdDirtyState){
                errors.targetId = 'Target Id must have 6 character';
            }
            formIsValid = false;
        }
        
        if(allowPlugInValue){
            if(plugInValue.length === 0){
                if(plugInDirtyState){
                    errors.plugIn = 'Please select Plug-In';
                }
                formIsValid = false;
            }
        }

        if(hcaValue.trim() === ''){
            if(hcaDirtyState){
                errors.hca = 'Please enter Health Port in digit';
            }
            formIsValid = false;
        }
        else if(hcaValue.length != 4){
            if(hcaDirtyState){
                errors.hca = 'Health Port must have 4 digit';
            }
            formIsValid = false;
        }
        
        this.setState({
            clientFormIsValid: formIsValid,
            errorsClientForm: errors
        });
    }

     /* istanbul ignore next */
    copyFromClientToServer(){
        let currentClientForm =  Object.assign({}, this.state.clientForm);
        let currentServerForm =  Object.assign({}, this.state.serverForm);

        currentServerForm.agentId.value = currentClientForm.agentId.value;
        currentServerForm.group.value = currentClientForm.group.value;
        currentServerForm.clientId.value = currentClientForm.clientId.value;
        currentServerForm.clientSecret.value = currentClientForm.clientSecret.value;
        currentServerForm.duration.value = currentClientForm.duration.value;
        currentServerForm.OAuth2.value = currentClientForm.OAuth2.value;
        currentServerForm.host.value = currentClientForm.host.value;
        currentServerForm.proxy.value = currentClientForm.proxy.value;
        currentServerForm.noproxy.value = currentClientForm.noproxy.value; 
        currentServerForm.allowPlugIn.value = currentClientForm.allowPlugIn.value;
        currentServerForm.plugIn.value = currentClientForm.plugIn.value;

        this.setState({
            serverForm: currentServerForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from client', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleServerFormValidation();
    }

    /* istanbul ignore next */
    copyFromServerToClient(){
        let currentServerForm =  Object.assign({}, this.state.serverForm);
        let currentClientForm =  Object.assign({}, this.state.clientForm);

        currentClientForm.agentId.value = currentServerForm.agentId.value;
        currentClientForm.group.value = currentServerForm.group.value;
        currentClientForm.clientId.value = currentServerForm.clientId.value;
        currentClientForm.clientSecret.value = currentServerForm.clientSecret.value;
        currentClientForm.duration.value = currentServerForm.duration.value;
        currentClientForm.OAuth2.value = currentServerForm.OAuth2.value;
        currentClientForm.host.value = currentServerForm.host.value;
        currentClientForm.proxy.value = currentServerForm.proxy.value;
        currentClientForm.noproxy.value = currentServerForm.noproxy.value; 
        currentClientForm.allowPlugIn.value = currentServerForm.allowPlugIn.value;
        currentClientForm.plugIn.value = currentServerForm.plugIn.value;

        this.setState({
            clientForm: currentClientForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from server', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleClientFormValidation();
    }

      /* istanbul ignore next */
      copyFromXServerToXClient(){
        let currentServerForm =  Object.assign({}, this.state.xserverForm);
        let currentClientForm =  Object.assign({}, this.state.xclientForm);

        currentClientForm.group.value = currentServerForm.group.value;
        currentClientForm.clientId.value = currentServerForm.clientId.value;
        currentClientForm.OAuth2.value = currentServerForm.OAuth2.value;
        currentClientForm.host.value = currentServerForm.host.value;

        this.setState({
            xclientForm: currentClientForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from x:server', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleXClientFormValidation();
    }

       /* istanbul ignore next */
       copyFromXClientToXServer(){
        let currentClientForm =  Object.assign({}, this.state.xclientForm);
        let currentServerForm =  Object.assign({}, this.state.xserverForm);

        currentServerForm.group.value = currentClientForm.group.value;
        currentServerForm.clientId.value = currentClientForm.clientId.value;
        currentServerForm.OAuth2.value = currentClientForm.OAuth2.value;
        currentServerForm.host.value = currentClientForm.host.value;

        this.setState({
            xserverForm: currentServerForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from x:client', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleXServerFormValidation();
    }

     /* istanbul ignore next */
    downloadFile(type){
        this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        let prepareData = {};
        let agentFormData = this.state.agentForm;
        let modalHeading = 'Copy and run below command';
        let buttons =[
            {
                className:'btn btn-danger customize-btn',
                action:'copyAndcloseModal',
                text:'Copy & Close'
            },
            {
                className:'btn btn-default customize-view-btn',
                action:'copyToClipboard',
                text:'Copy'
            },
        ];
         if(type === 'server'){
            let serverFormData = Object.assign({}, this.state.serverForm);
            prepareData.mod = serverFormData.mode.toLowerCase();
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.ecVersion = agentFormData.ecVersion.value;
            prepareData.aid = serverFormData.agentId.value;
            prepareData.grp = serverFormData.group.value;
            prepareData.cid = serverFormData.clientId.value;
            prepareData.csc = serverFormData.clientSecret.value;
            prepareData.dur = parseInt(serverFormData.duration.value);
            prepareData.oa2 = serverFormData.OAuth2.value;
            prepareData.hst = serverFormData.host.value;
            prepareData.zon = serverFormData.zone.value;
            prepareData.cps = 0;
            prepareData.sst = serverFormData.serviceUrl.value;
            prepareData.rht = serverFormData.remoteHost.value;
            prepareData.rpt = serverFormData.remotePort.value;
            prepareData.pxy = serverFormData.proxy.value;
            prepareData.nopxy = serverFormData.noproxy.value;
            prepareData.plg = serverFormData.allowPlugIn.value;
            prepareData.hca = serverFormData.hca.value;
            prepareData.os = serverFormData.os.value;
            prepareData.parent = '65c77c4f-fdf4-4c6d-a703-48b12cc21b2d';
            prepareData.name = 'server'
            for(let statePlugIn of this.state.plugIns){
                if(serverFormData.plugIn.value.indexOf(statePlugIn.id) !== -1){
                    prepareData[statePlugIn.id] = true;
                }
                else{
                    prepareData[statePlugIn.id] = false;
                }
            }
            
            fetch(this.props.baseUrl + 'generateServerScript', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.authToken
                },
                body: JSON.stringify(prepareData)
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                        /* if(respData.errorStatus.status == 'ok'){ */
                          sessionStorage.setItem("ServerData",JSON.stringify(prepareData))
                            this.props.hideGlobalMessage();
                            this.props.showModal(modalHeading, respData.data, buttons);
                            setTimeout(()=> {
                                let selectedOs = '';
                                let selectedHost = '';
                                if(this.state.operatingSystems.length > 0){
                                    selectedOs = this.state.operatingSystems[0].id;
                                }
                                if(this.state.gateways.length > 0){
                                    selectedHost = this.state.gateways[0].id;
                                }
                                let serverForm = {
                                    mode: 'SERVER',
                                    agentId: { value: serverFormData.agentId.value, dirtyState: false, type: serverFormData.agentId.type },
                                    group: { value: serverFormData.group.value, dirtyState: false },
                                    clientId: { value: serverFormData.clientId.value, dirtyState: false },
                                    clientSecret: { value: serverFormData.clientSecret.value, dirtyState: false, type: serverFormData.clientSecret.type },
                                    duration: { value: '', dirtyState: false },
                                    OAuth2:{ value: serverFormData.OAuth2.value, dirtyState: false },
                                    host: { value: selectedHost, dirtyState: false },
                                    zone: { value: serverFormData.zone.value, dirtyState: false },
                                    serviceUrl: { value: serverFormData.serviceUrl.value, dirtyState: false },
                                    remoteHost: { value: '', dirtyState: false },
                                    remotePort: { value: '', dirtyState: false },
                                    proxy: { value: '', dirtyState: false },
                                    noproxy: { value: '', dirtyState: false }, 
                                    allowPlugIn: { value: false, dirtyState: false },
                                    plugIn: { value: [], dirtyState: false },
                                    hca: { value: '', dirtyState: false },
                                    os: { value: selectedOs, dirtyState: false },
                                };
                                
                                let filename = "server.yml";
                                let data='';
                                if(agentFormData.ecVersion.value == 'v1.hokkaido.212'){
                                    data = "ec-config:\n  conf:\n    mod: "+serverFormData.mode.toLowerCase()+ "\n    zon: "+ serverFormData.zone.value +"\n    grp: "+ serverFormData.group.value +"\n    sst: "+ serverFormData.serviceUrl.value.split(".io")[0]+".io" +"\n    hst: "+ serverFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+ serverFormData.clientId.value+"\n    csc: "+ serverFormData.clientSecret.value+"\n    oa2: "+ serverFormData.OAuth2.value+"\n    dur: "+ serverFormData.duration.value+"\n    aid: "+ serverFormData.agentId.value+"\n    rpt: "+'"'+ serverFormData.remotePort.value+'"'+"\n    rht: "+ serverFormData.remoteHost.value+"\n    hca: "+'"'+  prepareData.hca +'"';
                                    if(serverFormData.proxy.value.trim() !== ''){
                                        data = data + "\n    pxy: "+ serverFormData.proxy.value;
                                    }
                                }
                                else{
                                    data = "ec-config:\n  conf:\n    mod: "+serverFormData.mode.toLowerCase()+ "\n    zon: "+ serverFormData.zone.value +"\n    grp: "+ serverFormData.group.value +"\n    sst: "+ serverFormData.serviceUrl.value +"\n    hst: "+ serverFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+ serverFormData.clientId.value+"\n    csc: "+ serverFormData.clientSecret.value+"\n    oa2: "+ serverFormData.OAuth2.value+"\n    dur: "+ serverFormData.duration.value+"\n    aid: "+ serverFormData.agentId.value+"\n    rpt: "+'":'+ serverFormData.remotePort.value+'"'+"\n    rht: "+ serverFormData.remoteHost.value+"\n    hca: "+'":'+  prepareData.hca +'"';
                                }

                                if(serverFormData.allowPlugIn.value){
                                    data = data + "\n    plg: "+ serverFormData.allowPlugIn.value+"\n    vln: "+ prepareData.vln+"\n    tls: "+  prepareData.tls ;
                                }

                                let blob = new Blob([data], { type: 'text/yml' });
                                if (window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveBlob(blob, filename);
                                }
                                else {
                                    let elem = window.document.createElement('a');
                                    elem.href = window.URL.createObjectURL(blob);
                                    elem.download = filename;
                                    document.body.appendChild(elem);
                                    elem.click();
                                    document.body.removeChild(elem);
                                }

                                this.setState({
                                    serverForm: serverForm,
                                    serverFormIsValid: false
                                });
                            }, 2000);
                       /*  }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        } */
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
       else if(type === 'x:server'){
            let serverFormData = Object.assign({}, this.state.xserverForm);
            prepareData.mod = serverFormData.mode.toLowerCase();
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.ecVersion = agentFormData.ecVersion.value;
            prepareData.grp = serverFormData.group.value;
            prepareData.cid = serverFormData.clientId.value;
            prepareData.oa2 = serverFormData.OAuth2.value;
            prepareData.hst = serverFormData.host.value;
            prepareData.cps = 0;
            prepareData.rht = serverFormData.remoteHost.value;
            prepareData.parent = '65c77c4f-fdf4-4c6d-a703-48b12cc21b2d';
            prepareData.name = 'server'
        
            fetch(this.props.baseUrl + 'generateServerScript', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.authToken
                },
                body: JSON.stringify(prepareData)
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                        /* if(respData.errorStatus.status == 'ok'){ */
                          sessionStorage.setItem("ServerData",JSON.stringify(prepareData))
                            this.props.hideGlobalMessage();
                            this.props.showModal(modalHeading, respData.data, buttons);
                            setTimeout(()=> {
                             
                                if(this.state.gateways.length > 0){
                                    selectedHost = this.state.gateways[0].id;
                                }
                                let serverForm = {
                                    mode: 'X:SERVER',
                                    group: { value: serverFormData.group.value, dirtyState: false },
                                    clientId: { value: serverFormData.clientId.value, dirtyState: false },
                                    OAuth2:{ value: serverFormData.OAuth2.value, dirtyState: false },
                                    host: { value: selectedHost, dirtyState: false },
                                    remoteHost: { value: '', dirtyState: false },
                                };
                                
                                let filename = "x:server.yml";
                                let data='';
                                if(agentFormData.ecVersion.value == 'v1.hokkaido.212'){
                                    data = "ec-config:\n  conf:\n    mod: "+serverFormData.mode.toLowerCase()+ "\n    grp: "+ serverFormData.group.value +"\n  hst: "+ serverFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+ serverFormData.clientId.value+"\n   oa2: "+ serverFormData.OAuth2.value+"\n   rht: "+ serverFormData.remoteHost.value + '"' 
                                }
                                else{
                                    data = "ec-config:\n  conf:\n    mod: "+serverFormData.mode.toLowerCase()+ "\n    grp: "+ serverFormData.group.value +"\n    hst: "+ serverFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+ serverFormData.clientId.value+"\n    oa2: "+ serverFormData.OAuth2.value+"\n  rht: "+ serverFormData.remoteHost.value +'"';
                                }

        

                                let blob = new Blob([data], { type: 'text/yml' });
                                if (window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveBlob(blob, filename);
                                }
                                else {
                                    let elem = window.document.createElement('a');
                                    elem.href = window.URL.createObjectURL(blob);
                                    elem.download = filename;
                                    document.body.appendChild(elem);
                                    elem.click();
                                    document.body.removeChild(elem);
                                }

                                this.setState({
                                    xserverForm: serverForm,
                                    xserverFormIsValid: false
                                });
                            }, 2000);
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

        else if(type === 'x:client'){
            let xClientFormData = Object.assign({}, this.state.xclientForm);
            prepareData.mod = xClientFormData.mode.toLowerCase();
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.ecVersion = agentFormData.ecVersion.value;
            prepareData.grp = xClientFormData.group.value;
            prepareData.cid = xClientFormData.clientId.value;
            prepareData.oa2 = xClientFormData.OAuth2.value;
            prepareData.hst = xClientFormData.host.value;
            prepareData.cps = 0;
            prepareData.rht = xClientFormData.remoteHost.value;
            prepareData.parent = '65c77c4f-fdf4-4c6d-a703-48b12cc21b2d';
            prepareData.name = 'server'
        
            fetch(this.props.baseUrl + 'generateServerScript', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.authToken
                },
                body: JSON.stringify(prepareData)
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                        /* if(respData.errorStatus.status == 'ok'){ */
                          sessionStorage.setItem("ServerData",JSON.stringify(prepareData))
                            this.props.hideGlobalMessage();
                            this.props.showModal(modalHeading, respData.data, buttons);
                            setTimeout(()=> {
                             
                                if(this.state.gateways.length > 0){
                                    selectedHost = this.state.gateways[0].id;
                                }
                                let XClientForm = {
                                    mode: 'X:CLIENT',
                                    group: { value: xClientFormData.group.value, dirtyState: false },
                                    clientId: { value: xClientFormData.clientId.value, dirtyState: false },
                                    OAuth2:{ value: xClientFormData.OAuth2.value, dirtyState: false },
                                    host: { value: selectedHost, dirtyState: false },
                                    remoteHost: { value: '', dirtyState: false },
                                };
                                
                                let filename = "x:client.yml";
                                let data='';
                                if(agentFormData.ecVersion.value == 'v1.hokkaido.212'){
                                    data = "ec-config:\n  conf:\n    mod: "+xClientFormData.mode.toLowerCase()+ "\n    grp: "+xClientFormData.group.value +"\n  hst: "+xClientFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+xClientFormData.clientId.value+"\n   oa2: "+xClientFormData.OAuth2.value+"\n   rht: "+xClientFormData.remoteHost.value + '"' 
                                }
                                else{
                                    data = "ec-config:\n  conf:\n    mod: "+xClientFormData.mode.toLowerCase()+ "\n    grp: "+xClientFormData.group.value +"\n    hst: "+xClientFormData.host.value +"\n    dbg: "+ agentFormData.debugMode.value+"\n    cid: "+xClientFormData.clientId.value+"\n    oa2: "+xClientFormData.OAuth2.value+"\n  rht: "+xClientFormData.remoteHost.value +'"';
                                }

        

                                let blob = new Blob([data], { type: 'text/yml' });
                                if (window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveBlob(blob, filename);
                                }
                                else {
                                    let elem = window.document.createElement('a');
                                    elem.href = window.URL.createObjectURL(blob);
                                    elem.download = filename;
                                    document.body.appendChild(elem);
                                    elem.click();
                                    document.body.removeChild(elem);
                                }

                                this.setState({
                                    xClientFormData: XClientForm,
                                    xclientFormIsValid: false
                                });
                            }, 2000);
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

        else if(type === 'client'){
            let clientFormData = this.state.clientForm;
            prepareData.mod = clientFormData.mode.toLowerCase();
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.ecVersion = agentFormData.ecVersion.value;
            prepareData.aid = clientFormData.agentId.value;
            prepareData.grp = clientFormData.group.value;
            prepareData.cps = 0;
            prepareData.cid = clientFormData.clientId.value;
            prepareData.csc = clientFormData.clientSecret.value;
            prepareData.dur = parseInt(clientFormData.duration.value);
            prepareData.oa2 = clientFormData.OAuth2.value;
            prepareData.hst = clientFormData.host.value;
            prepareData.lpt = clientFormData.localPort.value;
            prepareData.tid = clientFormData.targetId.value;
            prepareData.pxy = clientFormData.proxy.value;
            prepareData.nopxy = clientFormData.noproxy.value;
            prepareData.plg = clientFormData.allowPlugIn.value;
            prepareData.hca = clientFormData.hca.value;
            prepareData.os = clientFormData.os.value;
            prepareData.parent = '65c77c4f-fdf4-4c6d-a703-48b12cc21b2d';
            prepareData.name = 'client'
            for(let statePlugIn of this.state.plugIns){
                if(clientFormData.plugIn.value.indexOf(statePlugIn.id) !== -1){
                    prepareData[statePlugIn.id] = true;
                }
                else{
                    prepareData[statePlugIn.id] = false;
                }
            }

            fetch(this.props.baseUrl + 'generateClientScript', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.authToken
                },
                body: JSON.stringify(prepareData)
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                       /*  if(respData.errorStatus.status == 'ok'){ */
                            this.props.hideGlobalMessage();
                            sessionStorage.setItem("ClientData",JSON.stringify(prepareData))
                            this.props.showModal(modalHeading, respData.data, buttons);
                            setTimeout(()=> {
                                let selectedOs = '';
                                let selectedHost = '';
                                if(this.state.operatingSystems.length > 0){
                                    selectedOs = this.state.operatingSystems[0].id;
                                }
                                if(this.state.gateways.length > 0){
                                    selectedHost = this.state.gateways[0].id;
                                }
                                let clientForm = {
                                    mode: 'CLIENT',
                                    agentId: { value: clientFormData.agentId.value, dirtyState: false, type: clientFormData.agentId.type },
                                    group: { value: clientFormData.group.value, dirtyState: false },
                                    clientId: { value: clientFormData.agentId.value, dirtyState: false },
                                    clientSecret: { value: clientFormData.clientSecret.value, dirtyState: false, type: clientFormData.clientSecret.type },
                                    duration: { value: '', dirtyState: false },
                                    OAuth2: { value: clientFormData.OAuth2.value, dirtyState: false },
                                    host: { value: selectedHost, dirtyState: false },
                                    localPort: { value: '', dirtyState: false },
                                    targetId: { value: clientFormData.targetId.value, dirtyState: false, type: clientFormData.targetId.type },
                                    proxy: { value: '', dirtyState: false },
                                    noproxy: { value: '', dirtyState: false },
                                    allowPlugIn: { value: false, dirtyState: false },
                                    plugIn: { value: [], dirtyState: false },
                                    hca: { value: '', dirtyState: false },
                                    os: { value: selectedOs, dirtyState: false },
                                };

                                let filename = "client.yml";
                                let data='';
                                if(agentFormData.ecVersion.value == 'v1.hokkaido.212'){
                                    data = "ec-config:\n  conf:\n    mod: "+clientFormData.mode.toLowerCase()+ "\n    aid: "+ clientFormData.agentId.value +"\n    tid: "+ clientFormData.targetId.value +"\n    hst: "+ clientFormData.host.value +"\n    cid: "+ clientFormData.clientId.value+"\n    csc: "+ clientFormData.clientSecret.value+ "\n    oa2: "+ clientFormData.OAuth2.value+"\n    dur: "+ clientFormData.duration.value+"\n    dbg: "+ agentFormData.debugMode.value+"\n    grp: "+ clientFormData.group.value+"\n    lpt: "+'"'+ clientFormData.localPort.value + '"' +"\n    hca: "+'"'+ prepareData.hca +'"';
                                    if(clientFormData.proxy.value.trim() !== ''){
                                        data = data +"\n    pxy: "+ clientFormData.proxy.value;
                                    }
                                }
                                else{
                                    data = "ec-config:\n  conf:\n    mod: "+clientFormData.mode.toLowerCase()+ "\n    aid: "+ clientFormData.agentId.value +"\n    tid: "+ clientFormData.targetId.value +"\n    hst: "+ clientFormData.host.value +"\n    cid: "+ clientFormData.clientId.value+"\n    csc: "+ clientFormData.clientSecret.value+ "\n    oa2: "+ clientFormData.OAuth2.value+"\n    dur: "+ clientFormData.duration.value+"\n    dbg: "+ agentFormData.debugMode.value+"\n    grp: "+ clientFormData.group.value+"\n    lpt: "+'":'+ clientFormData.localPort.value + '"' +"\n    hca: "+'":'+ prepareData.hca +'"';
                                }

                                if(clientFormData.allowPlugIn.value){
                                    data = data +"\n    plg: "+ clientFormData.allowPlugIn.value+"\n    vln: "+ prepareData.vln+"\n    tls: "+  prepareData.tls;
                                }

                                let blob = new Blob([data], { type: 'text/yml' });
                                if (window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveBlob(blob, filename);
                                }
                                else {
                                    let elem = window.document.createElement('a');
                                    elem.href = window.URL.createObjectURL(blob);
                                    elem.download = filename;
                                    document.body.appendChild(elem);
                                    elem.click();
                                    document.body.removeChild(elem);
                                }

                                this.setState({
                                    clientForm: clientForm,
                                    clientFormIsValid: false
                                });
                            }, 2000);
                      /*   }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        } */
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
    }

    /* istanbul ignore next */
    showHideField(e, formName, fieldName){
        let currentForm = {};
         if(formName == 'serverForm'){
            currentForm = Object.assign({}, this.state.serverForm);
        }
        else if(formName == 'clientForm'){
            currentForm = Object.assign({}, this.state.clientForm);
        }

        if(currentForm[fieldName].type == 'password'){
            currentForm[fieldName].type = 'text'; 
        }
        else{
            currentForm[fieldName].type = 'password';
        }

      if(formName == 'serverForm'){
            this.setState({
                serverForm: currentForm
            });
        }
        else if(formName == 'clientForm'){
            this.setState({
                clientForm: currentForm
            });
        }
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Maintainagentcreate">
                <div className="col-md-12 mt-2">
                    <div className="row">
                        <div className="text-left">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Maintain</li>
                                <li className="breadcrumb-item active">Create Agent</li>
                            </ul>  
                        </div>
                    </div>
                    <div className="centered-div">
                        <div className="centered-div-header">
                            <div className="row maintainagentcreate-header">
                                <div className="col-md-12">
                                    <h6 id="maintainagentcreate-title">Create Agent <small>Creating parameters.</small></h6>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row form-body">
                                <div className="col-sm-4">
                                    <h6>Agent Mode</h6>
                                        <div className="col-sm-12 mb-2">
                                            {this.state.agentModeButtons.map((agentModeButton, buttonIndex) => {
                                                return(
                                                    <button
                                                        key={"agentModeButton"+buttonIndex} 
                                                        type="button"
                                                        id={"agentModeButton"+buttonIndex}
                                                        name="agentMode" 
                                                        className={agentModeButton.value == this.state.agentForm.agentMode.value ? "btn btn-sm mr-2 btn-selected" : "btn btn-sm mr-2 btn-deselected"}
                                                        onClick={this.handleChangeAgentMode.bind(this, agentModeButton.value)} >{agentModeButton.text}</button>
                                                )
                                            })}
                                        </div>
                                </div>
                                <div className="col-sm-2">
                                    <h6>&nbsp;</h6>
                                    <div className="custom-control custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            className="custom-control-input custom-control-checkbox" 
                                            id="debugMode" 
                                            name="debugMode" 
                                            checked={this.state.agentForm.debugMode.value}
                                            onChange={(event)=>{this.handleAgentFormData(event)}} />
                                        <label className="custom-control-label" htmlFor="debugMode"><small className="theme-color"><strong>DEBUG MODE ENABLED</strong></small></label>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <h6 className="ml-0">Subscription</h6>
                                    <select className="form-control form-control-sm" name="subscriptionId" value={this.state.agentForm.subscriptionId.value} onChange={(event)=>{this.handleAgentFormData(event)}}>
                                        {this.state.subscriptions.map((subscription, subscriptionIndex) => {
                                            return(
                                                <option
                                                    key={"subscriptionOption"+subscriptionIndex}
                                                    value={ subscription.licenseId }>{ subscription.licenseId }</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <h6 className="ml-0">EC Version</h6>
                                    <select className="form-control form-control-sm" name="ecVersion" value={this.state.agentForm.ecVersion.value} onChange={(event)=>{this.handleAgentFormData(event)}}>
                                        {this.state.ecVersions.map((ecVersion, ecVersionIndex) => {
                                            return(
                                                <option
                                                    key={"ecVersionOption"+ecVersionIndex}
                                                    value={ ecVersion }>{ ecVersion }</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <hr></hr>
                            {this.state.agentForm.agentMode.value == 2 ?
                                <div className="changeable-form server-form">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Mode <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.serverForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Group <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="group" value={this.state.serverForm.group.value} onChange={(event)=>{this.handleServerFormData(event)}}>
                                                    {this.state.groups.map((group, groupIndex) => {
                                                        return(
                                                            <option
                                                                key={"groupOption"+groupIndex}
                                                                value={ group.groupId }>{ group.groupId }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsServerForm['group']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Agent ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.serverForm.agentId.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'serverForm', 'agentId')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'serverForm', 'agentId')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type={ this.state.serverForm.agentId.type }
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="agentId"
                                                    value={this.state.serverForm.agentId.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['agentId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Client ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientId"
                                                    value={this.state.serverForm.clientId.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['clientId']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Client Secret <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.serverForm.clientSecret.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'serverForm', 'clientSecret')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'serverForm', 'clientSecret')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type={ this.state.serverForm.clientSecret.type }
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientSecret"
                                                    value={this.state.serverForm.clientSecret.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['clientSecret']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Duration <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    pattern="^[1-9][0-9]*"
                                                    className="form-control form-control-sm"
                                                    name="duration"
                                                    value={this.state.serverForm.duration.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['duration']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="OAuth2"
                                                    value={this.state.serverForm.OAuth2.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['OAuth2']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="host" value={this.state.serverForm.host.value} onChange={(event)=>{this.handleServerFormData(event)}}>
                                                    {this.state.gateways.map((gateway, gatewayIndex) => {
                                                        return(
                                                            <option
                                                                key={"gatewayOption"+gatewayIndex}
                                                                value={ gateway.id }>{ gateway.name }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsServerForm['host']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Zone <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="zone"
                                                    value={this.state.serverForm.zone.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['zone']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Service URL <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="serviceUrl"
                                                    value={this.state.serverForm.serviceUrl.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['serviceUrl']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Remote Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remoteHost"
                                                    value={this.state.serverForm.remoteHost.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['remoteHost']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                            Remote Port <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    pattern="^[1-9][0-9]*"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remotePort"
                                                    value={this.state.serverForm.remotePort.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['remotePort']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Health Port <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    pattern="^[1-9][0-9]*"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="hca"
                                                    value={this.state.serverForm.hca.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['hca'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Operating System  <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="os" value={this.state.serverForm.os.value} onChange={(event)=>{this.handleServerFormData(event)}}>
                                                    {this.state.operatingSystems.map((os, osIndex) => {
                                                        return(
                                                            <option
                                                                key={"osOption"+osIndex}
                                                                value={ os.id }>{ os.name }</option>)
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Proxy
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="proxy"
                                                    value={this.state.serverForm.proxy.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                No Proxy
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="noproxy"
                                                    value={this.state.serverForm.noproxy.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Allow Plug-in <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input custom-control-checkbox" 
                                                        id="allowPlugIn" 
                                                        name="allowPlugIn" 
                                                        checked={this.state.serverForm.allowPlugIn.value}
                                                        onChange={(event)=>{this.handleServerFormData(event)}} />
                                                    <label className="custom-control-label" htmlFor="allowPlugIn"></label>
                                                </div>
                                            </div>
                                        </div>
                                            {
                                            this.state.serverForm.allowPlugIn.value ? 
                                            <div className="col-sm-3">
                                                <div className="col-sm-12 label">
                                                Plug-in <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <select multiple className="form-control form-control-sm" style={{height:'45px'}} name="plugIn" value={this.state.serverForm.plugIn.value} onChange={(event)=>{this.handleServerFormData(event)}}>
                                                        {
                                                        this.state.plugIns.map((plugIn, plugInIndex) => {
                                                            return(
                                                                <option
                                                                    key={"plugInOption"+plugInIndex}
                                                                    value={ plugIn.id }>{ plugIn.name }</option>)
                                                        })}
                                                    </select>
                                                    <small className="text-danger">{ this.state.errorsServerForm['plugIn']}</small>
                                                </div>
                                            </div>
                                            
                                            : null
                                        }
                                    </div>
                                    
                                    <div className="col-sm-12 mb-2"><hr></hr></div>

                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromClientToServer.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from client</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button 
                                                id="create-server-btn"
                                                disabled={!this.state.serverFormIsValid}
                                                onClick={this.downloadFile.bind(this, 'server')} 
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                            {/*<button type="button" data-toggle="modal" data-target="#executeModal" className="btn btn-sm customize-view-btn ml-2">EXECUTE SCRIPT</button>*/}
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {this.state.agentForm.agentMode.value == 3 ?
                                <div className="changeable-form client-form">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Mode <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.clientForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Group <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="group" value={this.state.clientForm.group.value} onChange={(event)=>{this.handleClientFormData(event)}}>
                                                    {this.state.groups.map((group, groupIndex) => {
                                                        return(
                                                            <option
                                                                key={"groupOption"+groupIndex}
                                                                value={ group.groupId }>{ group.groupId }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsClientForm['group']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Agent ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.clientForm.agentId.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'agentId')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'agentId')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type={ this.state.clientForm.agentId.type }
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="agentId"
                                                    value={this.state.clientForm.agentId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['agentId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Client ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientId"
                                                    value={this.state.clientForm.clientId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['clientId']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                            Client Secret <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.clientForm.clientSecret.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'clientSecret')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'clientSecret')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type={ this.state.clientForm.clientSecret.type }
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientSecret"
                                                    value={this.state.clientForm.clientSecret.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['clientSecret']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Duration <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    pattern="^[1-9][0-9]*"
                                                    className="form-control form-control-sm"
                                                    name="duration"
                                                    value={this.state.clientForm.duration.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['duration']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="OAuth2"
                                                    value={this.state.clientForm.OAuth2.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['OAuth2']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="host" value={this.state.clientForm.host.value} onChange={(event)=>{this.handleClientFormData(event)}}>
                                                    {this.state.gateways.map((gateway, gatewayIndex) => {
                                                        return(
                                                            <option
                                                                key={"gatewayOption"+gatewayIndex}
                                                                value={ gateway.id }>{ gateway.name }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsClientForm['host']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Local Port <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    pattern="^[1-9][0-9]*"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="localPort"
                                                    value={this.state.clientForm.localPort.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['localPort']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Target ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.clientForm.targetId.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'targetId')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'clientForm', 'targetId')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type={ this.state.clientForm.targetId.type }
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="targetId"
                                                    value={this.state.clientForm.targetId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['targetId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                            Proxy
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="proxy"
                                                    value={this.state.clientForm.proxy.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                No Proxy
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="noproxy"
                                                    value={this.state.clientForm.noproxy.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Health Port <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    pattern="^[1-9][0-9]*"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="hca"
                                                    value={this.state.clientForm.hca.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['hca'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                Operating System <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="os" value={this.state.clientForm.os.value} onChange={(event)=>{this.handleClientFormData(event)}}>
                                                    {this.state.operatingSystems.map((os, osIndex) => {
                                                        return(
                                                            <option
                                                                key={"osOption"+osIndex}
                                                                value={ os.id }>{ os.name }</option>)
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                    Allow Plug-in <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <div className="custom-control custom-checkbox">
                                                        <input 
                                                            type="checkbox" 
                                                            className="custom-control-input custom-control-checkbox" 
                                                            id="allowPlugIn" 
                                                            name="allowPlugIn" 
                                                            checked={this.state.clientForm.allowPlugIn.value}
                                                            onChange={(event)=>{this.handleClientFormData(event)}} />
                                                        <label className="custom-control-label" htmlFor="allowPlugIn"></label>
                                                    </div>
                                                </div>
                                        </div>
                                        {
                                            this.state.clientForm.allowPlugIn.value ? 
                                            <div className="col-sm-3">
                                                <div className="col-sm-12 label">
                                                Plug-in <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <select multiple className="form-control form-control-sm" style={{height:'45px'}} name="plugIn" value={this.state.clientForm.plugIn.value} onChange={(event)=>{this.handleClientFormData(event)}}>
                                                        {
                                                        this.state.plugIns.map((plugIn, plugInIndex) => {
                                                            return(
                                                                <option
                                                                    key={"plugInOption"+plugInIndex}
                                                                    value={ plugIn.id }>{ plugIn.name }</option>)
                                                        })}
                                                    </select>
                                                    <small className="text-danger">{ this.state.errorsClientForm['plugIn']}</small>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div> 

                                    <div className="col-sm-12 mb-2"><hr></hr></div>
                                    
                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromServerToClient.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from server</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button
                                                id="create-client-btn"
                                                disabled = {!this.state.clientFormIsValid} 
                                                onClick={this.downloadFile.bind(this, 'client')} 
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                        {this.state.agentForm.agentMode.value == 4 ?
                                <div className="changeable-form x-server-form">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Mode <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.xserverForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Group <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="group" value={this.state.xserverForm.group.value} onChange={(event)=>{this.handleXServerFormData(event)}}>
                                                    {this.state.groups.map((group, groupIndex) => {
                                                        return(
                                                            <option
                                                                key={"groupOption"+groupIndex}
                                                                value={ group.groupId }>{ group.groupId }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsXServerForm['group']}</small>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Client ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientId"
                                                    value={this.state.xserverForm.clientId.value}
                                                    onChange={(event)=>{this.handleXServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsXServerForm['clientId']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="OAuth2"
                                                    value={this.state.xserverForm.OAuth2.value}
                                                    onChange={(event)=>{this.handleXServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsXServerForm['OAuth2']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <select className="form-control form-control-sm" name="host" value={this.state.xserverForm.host.value} onChange={(event)=>{this.handleXServerFormData(event)}}>
                                                    {this.state.gateways.map((gateway, gatewayIndex) => {
                                                        return(
                                                            <option
                                                                key={"gatewayOption"+gatewayIndex}
                                                                value={ gateway.id }>{ gateway.name }</option>)
                                                    })}
                                                </select>
                                                <small className="text-danger">{ this.state.errorsXServerForm['host']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Remote Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remoteHost"
                                                    value={this.state.xserverForm.remoteHost.value}
                                                    onChange={(event)=>{this.handleXServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsXServerForm['remoteHost']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="col-sm-12 mb-2"><hr></hr></div>
                                    
                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromXClientToXServer.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from x:client</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button
                                                id="create-client-btn"
                                                disabled = {!this.state.xserverFormIsValid} 
                                                onClick={this.downloadFile.bind(this, 'x:server')} 
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {this.state.agentForm.agentMode.value == 5 ?
                                <div className="changeable-form x-client-form">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="col-sm-12 label required">
                                            Mode <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="mode"
                                                disabled={true}
                                                defaultValue={this.state.xclientForm.mode} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-sm-12 label required">
                                            Group <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select className="form-control form-control-sm" name="group" value={this.state.xclientForm.group.value} onChange={(event)=>{this.handleXClientFormData(event)}}>
                                                {this.state.groups.map((group, groupIndex) => {
                                                    return(
                                                        <option
                                                            key={"groupOption"+groupIndex}
                                                            value={ group.groupId }>{ group.groupId }</option>)
                                                })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsXClientForm['group']}</small>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-4">
                                        <div className="col-sm-12 label required">
                                            Client ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="clientId"
                                                value={this.state.xclientForm.clientId.value}
                                                onChange={(event)=>{this.handleXClientFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsXClientForm['clientId']}</small>
                                        </div>
                                    </div>
                                </div> 

                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="col-sm-12 label required">
                                            OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="OAuth2"
                                                value={this.state.xclientForm.OAuth2.value}
                                                onChange={(event)=>{this.handleXClientFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsXClientForm['OAuth2']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-sm-12 label required">
                                            Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select className="form-control form-control-sm" name="host" value={this.state.xclientForm.host.value} onChange={(event)=>{this.handleXClientFormData(event)}}>
                                                {this.state.gateways.map((gateway, gatewayIndex) => {
                                                    return(
                                                        <option
                                                            key={"gatewayOption"+gatewayIndex}
                                                            value={ gateway.id }>{ gateway.name }</option>)
                                                })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsXClientForm['host']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                Remote Host <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remoteHost"
                                                    value={this.state.xclientForm.remoteHost.value}
                                                    onChange={(event)=>{this.handleXClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsXClientForm['remoteHost']}</small>
                                            </div>
                                        </div>
                                </div> 

                                <div className="col-sm-12 mb-2"><hr></hr></div>
                                
                                <div className="row">
                                    <div className="col-sm-5 mb-2">
                                        <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                        <a onClick={this.copyFromXServerToXClient.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from x:server</small></a>
                                    </div>
                                    <div className="col-sm-7 mb-2">
                                        <button
                                            id="create-client-btn"
                                            disabled = {!this.state.xclientFormIsValid} 
                                            onClick={this.downloadFile.bind(this, 'x:client')} 
                                            className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                    </div>
                                </div>
                            </div>
                                : null
                            }


                        </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
