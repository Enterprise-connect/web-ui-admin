import React from "react";

export default class Groupupgrade extends React.Component { 
    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            selectedSubscriptionId: '',
            showTableInit: false,
            subscriptions: []
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
       
        let technicalTableData = [];
        if (sessionStorage.getItem("snapshotData") !== null) {
                let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
                let allData =[]
                  Object.keys(respData).forEach((key)=> {
                      allData.push(respData[key])
                  });
                  for(let individualData of allData){
                      if(individualData.parent){
                          if(individualData.parent ==="f894e5a8-0f9b-46ca-8b74-57e94610d731"){
                            technicalTableData.push(individualData);
                          }
                      }
                  }
                this.generateTableStructure(technicalTableData);
                this.setState({
                    tableData: technicalTableData
                });

                if(technicalTableData.length ===0){
                    this.props.showGlobalMessage(true, true, 'There is no Data', 'custom-danger');
                    setTimeout(()=> {
                        this.props.hideGlobalMessage();
                    }, 2000);
                }
           
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
    generateTableStructure(tableData){
     
        let newTableData = [];
        for(let dataObj of tableData){
            let newDataObj = {};
            newDataObj.groupId = dataObj.groupId;
            newDataObj.key = dataObj.key;
            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            showTableInit: true
        });

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 100);
    }

    /* istanbul ignore next */
    getDataOnChange(e){
        let selectedSubscriptionId = e.target.value;
        window.destroyDataTable('groupupgradeTable');
        this.setState({
            selectedSubscriptionId: selectedSubscriptionId,
            showTableInit: false
        });

        if(selectedSubscriptionId == ''){
            this.setState({
                tableData: []
            });
            this.generateTableStructure([]);
        }
        else{
         // fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
         fetch('https://reqres.in/api/users/2' ,{
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
                        let data = respData.data;
                        respData={
                            "errorStatus": {
                                  "status": "ok"
                                 }
                                };

                        if(respData.errorStatus.status == 'ok'){
                            // check selectedSubscriptionId in createGroup localStorage and append it to data here
                            let newlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups")) || [];
                            let findIndex = newlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === selectedSubscriptionId);
                            if(findIndex != -1){
                                let allNewlyCreatedGroupsData = [...newlyCreatedGroupsofSubscriptions[findIndex].createdData];
                                if(allNewlyCreatedGroupsData.length > 0){
                                    for(let dataToAppendAsPending of allNewlyCreatedGroupsData){
                                        let pendingData = {
                                            groupId: dataToAppendAsPending.groupId,
                                            ids: {
                                                aid: dataToAppendAsPending.aid,
                                                tid: dataToAppendAsPending.tid
                                            }
                                        };
                                        data.push(pendingData);
                                    }
                                }
                            }
                            this.setState({
                                tableData: data
                            });
                            this.generateTableStructure(data);
                        }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        }
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
    filterByValue(myArray, string){
        let retArr = [];
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].groupId.toLowerCase().includes(string.toLowerCase())) {
                retArr.push(myArray[i]);
            }
        }
        return retArr;
    }

    /* istanbul ignore next */
    filterData(e){
        window.destroyDataTable('groupupgradeTable');
        let searchStr = e.target.value.trim();
        let wholeDataUnstructured = [...this.state.tableData];
        let wholeData = [];
        for(let dataObj of wholeDataUnstructured){
            let newDataObj = {};
            newDataObj.groupId = dataObj.groupId;
            newDataObj.aid = dataObj.ids.aid;
            newDataObj.tid = dataObj.ids.tid;

            wholeData.push(newDataObj);
        }
        let filteredData = [];
        if(searchStr != ''){
            filteredData = this.filterByValue(wholeData, searchStr);
        }
        else{
            filteredData = wholeData;
        }

        this.setState({
            newTableData: filteredData
        });

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 0);
    }

    /* istanbul ignore next */
    deleteData(tbodyVal, rowIndex) {
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            let groupId = tbodyVal.groupId;
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch( this.props.baseUrl + tbodyVal.key ,{   //this.props.baseUrl + '/deleteGroup?groupID='+groupId+'&subscriptionID='+this.state.selectedSubscriptionId , {
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
                            this.props.showGlobalMessage(false, true, 'Record deleted successfuly', 'custom-success');
                            window.removeDataTableRow('groupupgradeTable', rowIndex);
                            let that = this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
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
            <div className="row Groupupgrade">
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
                        <div id="groupupgradeTableDiv">
                            { this.state.showTableInit ?
                                this.state.newTableData.length > 0 ?
                                <table id="groupupgradeTable" className="table">
                                    <thead>
                                        <tr>
                                            <th>Group ID</th>
                                            { 
                                                this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                                    <th>Action</th>
                                                    :
                                                    null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                            return(
                                                <tr key={'groupupgradeTableTbodyTr_'+tbodyIndex} id={'groupupgradeTableTbodyTr_'+tbodyIndex}>
                                                    
                                                    <td>{ tbodyVal.groupId }</td>
                                                    {
                                                        this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                                            <td>
                                                                <span className="action-img">
                                                                    {
                                                                    tbodyVal.aid != 'Pending' && tbodyVal.tid != 'Pending' ? 
                                                                        <img alt="delete-icon" onClick={this.deleteData.bind(this, tbodyVal, tbodyIndex)} title="Delete" src="assets/static/images/icondelete_tablemaintainmonitor.svg" />
                                                                        :null
                                                                    }
                                                                </span>
                                                            </td>
                                                            :
                                                            null
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table> :
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <div className="alert alert-success" role="alert">
                                            No record found!
                                        </div>
                                    </div>
                                </div>
                                :
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
