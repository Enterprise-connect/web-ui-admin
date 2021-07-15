import React from "react";

import Treelist from '../Treelist/Treelist.js';
import Topologygraph from '../Topologygraph/Topologygraph.js';
import Viewtable from '../Viewtable/Viewtable.js';
import Customsearch from './Customsearch.js';

export default class Technicalview extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            treeValue: [],
            graph: {
                nodes: [],
                edges: []
            },
            loadTreeJs: false,
            centerNodeColor: '#77b300',
            nodeShapes: [
                'ellipse',
                'circle',
                'box',
            ],
            apiLoadPercentage: 0,
            mockTableData: [],
            table:{
                thead: [],
                tbody: []
            },
            allFields: [],
            isSearchView: false
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        
        //for now once api ready change it again 
           let treeValue = [
      {
        id: 1,
        value: "group-101",
        x: 200,
        y: 100,
        children: [
          {
            id: 2,
            value: "License-104",
            children: [
              {
                id: 3,
                value: "wabtec-gecars-ta",
                children: [
                  {
                    id: 4,
                    value: "0idLmsMk8e",
                  },
                  {
                    id: 5,
                    value: "0idLmsMk8o",
                  },
                  {
                    id: 6,
                    value: "0idLmsMk8r",
                  },
                ],
              },
            ],
          },
          {
            id: 7,
            value: "License-101",
            children: [
              {
                id: 8,
                value: "wabtec-gecars-qa",
                children: [
                  {
                    id: 9,
                    value: "0idLmsMk8e",
                  },
                  {
                    id: 10,
                    value: "0idLmsMk8o",
                  },
                  {
                    id: 11,
                    value: "0idLmsMk8r",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 12,
        value: "group-102",
        x: 200,
        y: 100,
        children: [
          {
            id: 13,
            value: "License-102",
            children: [
              {
                id: 14,
                value: "wabtec-gecars-ta",
                children: [
                  {
                    id: 15,
                    value: "0idLmsMk8e",
                  },
                  {
                    id: 17,
                    value: "0idLmsMk8o",
                  },
                  {
                    id: 16,
                    value: "0idLmsMk8r",
                  },
                ],
              },
            ],
          },
          {
            id: 1,
            value: "License-103",
            children: [
              {
                id: 2,
                value: "wabtec-gecars-qa",
                children: [
                  {
                    id: 3,
                    value: "0idLmsMk8e",
                  },
                  {
                    id: 4,
                    value: "0idLmsMk8o",
                  },
                  {
                    id: 5,
                    value: "0idLmsMk8r",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    sessionStorage.setItem("graphData", JSON.stringify(treeValue));

        if (localStorage.getItem("treeValue") === null || localStorage.getItem("technicalTableData") === null){
            let technicalTableData = [];
            let progressPercent = 0;

            fetch(this.props.baseUrl + '/snapshot', {
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
                        respData={
                            "errorStatus": {
                                  "status": "ok"
                                 },
                                 "data": [
                                            {
                                                
                                                "listdata":[
                                                    {
                                                        "groupName":"wabtec-gecars-qa",
                                                        "items":[
                                                            {
                                                                "groupId": "wabtec-gecars-qa",
                                                                "sessionId": "0idLmsMk8e"
                                                            },
                                                            {
                                                                "groupId": "wabtec-gecars-qa",
                                                                "sessionId": "0idLmsMk8t"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                "groupName":"wabtec-gecars-ba",
                                                        "items":[
                                                            {
                                                                "groupId": "wabtec-gecars-ba",
                                                                "sessionId": "0idLmsMk8e"
                                                            },
                                                              {
                                                                "groupId": "wabtec-gecars-ba",
                                                                "sessionId": "0idLmsMk8f"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }]
                                            
                                        
                                };
                         if(respData.errorStatus.status == 'ok'){ 
                            let subscriptions = respData.data;
                            if(subscriptions !== null){
                                treeValue[0].value = treeValue[0].value + ' (' + subscriptions.length +')';
                                if(subscriptions.length == 0){
                                    subscriptions = [];
                                }

                                let numOfSubscriptions = subscriptions.length;
                                let totalNumOfAjax = subscriptions.length;
                                let totalNumOfAjaxProcessed = 0;
                                if(numOfSubscriptions === 0){
                                    let that = this;
                                    setTimeout(function(){
                                        that.setState({
                                            loadTreeJs: true
                                        });
                                        console.log('subscriptions');
                                    }, 1000);
                                }

                                progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                this.setState({
                                    apiLoadPercentage: progressPercent
                                });

                                let newId = treeValue[0].id;
                                for(let indexSubscriptions in subscriptions){
                                    let subscriptionId = subscriptions[indexSubscriptions].listdata[indexSubscriptions].items[indexSubscriptions].groupId;
                                    let subscriptionName = subscriptions[indexSubscriptions].listdata[indexSubscriptions].items[indexSubscriptions].groupId;
                                  // let subscriptionId = indexSubscriptions.subscriptionId;
                                  // let subscriptionName = indexSubscriptions.subscriptionName;
                                    newId++;
                                    let newSubscriptionsObj = {};
                                    newSubscriptionsObj.id = newId;
                                    newSubscriptionsObj.title = subscriptionName;
                                    let valueToshow = subscriptionName;
                                    if(subscriptionName.length > 20){
                                        let first3Char = subscriptionName.substr(0, 5);
                                        let last3Char = subscriptionName.substr(subscriptionName.length - 5, 5);
                                        valueToshow = first3Char+'...'+last3Char;
                                    }
                                    newSubscriptionsObj.value = valueToshow;
                                    newSubscriptionsObj.nodeType = 'subscription';
                                    
                                    if(indexSubscriptions == 0){
                                        treeValue[0].children = [newSubscriptionsObj];
                                    }
                                    else{
                                        treeValue[0].children.push(newSubscriptionsObj);
                                    }

                                    if(subscriptionId != ''){
                                       // fetch(this.props.baseUrl + '/gatewayList?subscriptionID='+subscriptionId, { // Get gateways '/gatewayList?subscriptionID='+subscriptionId
                                       fetch('https://reqres.in/api/users/2' ,{
                                            method: 'GET',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer '+this.props.authToken
                                            }
                                        })
                                        .then((response) => { // jshint ignore:line
                                            if (response.status === 200) {
                                                totalNumOfAjaxProcessed++;
                                                progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                                this.setState({
                                                    apiLoadPercentage: progressPercent
                                                });
                                                response.json().then((respData) => {
                                                    respData={
                                                        "errorStatus": {
                                                              "status": "ok"
                                                             },
                                                             "data":{
                                                             "glist":
                                                                 [   {"suidbscriptionId": 2323,
                                                                 "subscrititleptionName": "abc",
                                                                 "cfURL":"https://reqres.in/api/users/2",
                                                                 "children":""
                                                                },
                                                                {"id": 6754,
                                                                "title": "uytut",
                                                                "cfURL":"https://reqres.in/api/users/2",
                                                                "children":""
                                                               }],
                                                               
                                                            }
                                              }
                                                    if(respData.errorStatus.status == 'ok'){
                                                        let gateways = respData.data.glist;
                                                        let gatewaysCount = Object.keys(gateways).length;
                                                        totalNumOfAjax = totalNumOfAjax + gatewaysCount;
                                                        progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                                        this.setState({
                                                            apiLoadPercentage: progressPercent
                                                        });
                                                        treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (' + gatewaysCount +')';
                                                        for(let indexGateway in gateways){
                                                            newId++;
                                                            let newGatewayObj = {};
                                                            newGatewayObj.id = newId;
                                                            newGatewayObj.title = gateways[indexGateway].cfURL;
                                                            let cfUrl = gateways[indexGateway].cfURL;
                                                            let startPos = cfUrl.indexOf('://') + 3;
                                                            let endPos = cfUrl.indexOf('.');
                                                            let valueToshow = cfUrl.slice(startPos, endPos);
                                                            let gatewayShortCurl = valueToshow;
                                                            if(valueToshow > 30){
                                                                let first7Char = valueToshow.substr(0, 10);
                                                                let last7Char = valueToshow.substr(valueToshow.length - 10, 10);
                                                                valueToshow = first7Char+'...'+last7Char;
                                                            }
                                                            newGatewayObj.value = valueToshow;
                                                            newGatewayObj.nodeType = 'gateway';
                    
                                                            if(indexGateway.split(":")[1] == 0){
                                                                treeValue[0].children[indexSubscriptions].children = [newGatewayObj];
                                                            }
                                                            else{
                                                                //treeValue[0].children[indexSubscriptions].push(newGatewayObj);
                                                            }

                                                           // fetch(this.props.baseUrl + '/getGatewayHealth?gatewayURL='+gateways[indexGateway].cfURL, {
                                                                fetch('https://reqres.in/api/users/2' ,{
                                                                method: 'GET',
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Content-Type': 'application/json',
                                                                    'Authorization': 'Bearer '+this.props.authToken
                                                                }
                                                            })
                                                            .then((response) => { // jshint ignore:line
                                                                if (response.status === 200) {
                                                                    response.json().then((respData) => {
                                                                        respData={
                                                                            "errorStatus": {
                                                                                  "status": "ok"
                                                                                 },
                                                                                 "data":{
                                                                                    SuperConns:{
                                                                                        serverId:23
                                                                                       },
                                                                                   "ClientPool" :[{bindId:3432}],
                                                                                   "Sessions":[{clientConfig:{
                                                                                       "groupId":53435
                                                                                   }
                                                                                   }]
                                                                                  
                                                                                 }
                                                                                }
                                                                        totalNumOfAjaxProcessed++;
                                                                        progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                                                        this.setState({
                                                                            apiLoadPercentage: progressPercent
                                                                        });
                                                                        if(respData.errorStatus.status == 'ok'){
                                                                            let clientPools = respData.data.ClientPool;
                                                                            let preparedClientPools = [];
                                                                            let clientPoolCounts = {};
                                                                            let superConns = respData.data.SuperConns;
                                                                            let preparedSuperConns = [];
                                                                            let superConnCounts = {};
                                                                            let sessions = respData.data.Sessions;
                                                                            let secondarySessions = [];
                                                                            let preparedSessions = [];
                                                                            let sessionCounts = {};
                                                                            //console.log(subscriptionName);
                                                                            //console.log(subscriptions[indexSubscriptions].subscriptionName);
                                                                            for(let sessionIndex in sessions){
                                                                                let prepareSessionData = {};
                                                                                prepareSessionData.sessionId = sessionIndex;
                                                                                prepareSessionData.groupId = sessions[sessionIndex].clientConfig.groupId;
                                                                                secondarySessions.push(prepareSessionData);
                                                                            }
                                                                            
                                                                            if(clientPools.length > 0){
                                                                                clientPools.forEach(function(element) {
                                                                                    clientPoolCounts[element.bindId] = (clientPoolCounts[element.bindId] || 0) + 1;
                                                                                });
                                                                                preparedClientPools = this.removeDuplicates(clientPools, 'bindId');
                                                                            }

                                                                            if(preparedClientPools.length > 0){
                                                                                newId++;
                                                                              //  treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [{id: newId, value: 'Client Pools ('+ clientPools.length + ')', title: 'Client Pools', nodeType: 'clientpooltitle'}];
                                                                                for(let indexClientPool in preparedClientPools){
                                                                                    newId++;
                                                                                    let newClientPoolObj = {};
                                                                                    newClientPoolObj.id = newId;
                                                                                 
                                                                                 const preparedClientPools=[{
                                                                                        clientConfig :{
                                                                                            "groupId":2424,
                                                                                            "id":121  
                                                                                        }
                                                                                    }];
                                                                                    

                                                                                  
                                                                                    newClientPoolObj.title = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                                    let valueToshow = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                                    
                                                                                    newClientPoolObj.value = valueToshow;
                                                                                    newClientPoolObj.nodeType = 'clientpool';

                                                                                    if(indexClientPool == 0){
                                                                                      //  treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newClientPoolObj];
                                                                                    }
                                                                                    else{
                                                                                       // treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newClientPoolObj);
                                                                                    }

                                                                                    let preparePoolDataForTable = {};
                                                                                    preparePoolDataForTable.subscription_name = subscriptionName;
                                                                                    preparePoolDataForTable.gateway = gatewayShortCurl;
                                                                                    preparePoolDataForTable.group_id = preparedClientPools[indexClientPool].clientConfig.groupId;
                                                                                    preparePoolDataForTable.count = clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id];
                                                                                    preparePoolDataForTable.type = 'clientpool';
                                                                                    technicalTableData.push(preparePoolDataForTable);
                                                                                }
                                                                            }

                                                                            if(superConns.length > 0){
                                                                                superConns.forEach(function(element) {
                                                                                    superConnCounts[element.serverId] = (superConnCounts[element.serverId] || 0) + 1;
                                                                                });
                                                                                preparedSuperConns = this.removeDuplicates(superConns, 'serverId');
                                                                            }
                                                                            if(preparedSuperConns.length > 0){
                                                                                newId++;
                                                                                
                                                                                if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                        {
                                                                                            id: newId, 
                                                                                            value: 'Super Connections (' + superConns.length + ')', 
                                                                                            title: 'Super Connections',
                                                                                            nodeType: 'superconnectiontitle'
                                                                                        }
                                                                                    ];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Super Connections (' + superConns.length + ')', title: 'Super Connections', nodeType: 'superconnectiontitle'});
                                                                                }
                                                                                
                                                                                for(let indexSuperConn in preparedSuperConns){
                                                                                    newId++;
                                                                                    let newSuperConnObj = {};
                                                                                    newSuperConnObj.id = newId;
                                                                                    newSuperConnObj.title = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                                                                                    let valueToshow = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                        
                                                                                    newSuperConnObj.value = valueToshow;
                                                                                    newSuperConnObj.nodeType = 'superconnection';
                        
                                                                                    if(indexSuperConn == 0){
                                                                                        if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children = [newSuperConnObj];
                                                                                        }
                                                                                        else{
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newSuperConnObj];
                                                                                        }
                                                                                        
                                                                                    }
                                                                                    else{
                                                                                        if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children.push(newSuperConnObj);
                                                                                        }
                                                                                        else{
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newSuperConnObj);
                                                                                        }
                                                                                    }

                                                                                    let prepareSupperConDataForTable = {};
                                                                                    prepareSupperConDataForTable.subscription_name = subscriptionName;
                                                                                    prepareSupperConDataForTable.gateway = gatewayShortCurl;
                                                                                    prepareSupperConDataForTable.group_id = preparedSuperConns[indexSuperConn].bindId.groupId;
                                                                                    prepareSupperConDataForTable.count =  superConnCounts[preparedSuperConns[indexSuperConn].bindId.id];
                                                                                    prepareSupperConDataForTable.type = 'superconnection';
                                                                                    technicalTableData.push(prepareSupperConDataForTable);
                                                                                }

                                                                                if(secondarySessions.length > 0){
                                                                                    secondarySessions.forEach(function(element) {
                                                                                        sessionCounts[element.groupId] = (sessionCounts[element.groupId] || 0) + 1;
                                                                                    });
                                                                                    preparedSessions = this.removeDuplicates(secondarySessions, 'groupId');
                                                                                }

                                                                                if(preparedSessions.length > 0){
                                                                                    newId++;
                                                                                    
                                                                                    if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                            {
                                                                                                id: newId, 
                                                                                                value: 'Sessions (' + secondarySessions.length + ')', 
                                                                                                title: 'Sessions',
                                                                                                nodeType: 'sessiontitle'
                                                                                            }
                                                                                        ];
                                                                                    }
                                                                                    else{
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Sessions (' + secondarySessions.length + ')', title: 'Sessions', nodeType: 'sessiontitle'});
                                                                                    }
                                                                                    let sessionIndexToPushChildren = treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.length - 1;
                                                                                    for(let indexSession in preparedSessions){
                                                                                        newId++;
                                                                                        let newSessionObj = {};
                                                                                        newSessionObj.id = newId;
                                                                                        newSessionObj.title = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                                                                                        let valueToshow = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                            
                                                                                        newSessionObj.value = valueToshow;
                                                                                        newSessionObj.nodeType = 'session';
                            
                                                                                        if(indexSession == 0){
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children = [newSessionObj];
                                                                                        }
                                                                                        else{
                                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children.push(newSessionObj);
                                                                                        }

                                                                                        let prepareSessionDataForTable = {};
                                                                                        prepareSessionDataForTable.subscription_name = subscriptionName;
                                                                                        prepareSessionDataForTable.gateway = gatewayShortCurl;
                                                                                        prepareSessionDataForTable.group_id = preparedSessions[indexSession].groupId;
                                                                                        prepareSessionDataForTable.count = sessionCounts[preparedSessions[indexSession].groupId];
                                                                                        prepareSessionDataForTable.type = 'session';
                                                                                        technicalTableData.push(prepareSessionDataForTable);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                                            this.generateTableStructure(technicalTableData);
                                                                            localStorage.setItem("technicalTableData", JSON.stringify(technicalTableData));
                                                                            localStorage.setItem("treeValue", JSON.stringify(treeValue));
                                                                            let that = this;
                                                                            setTimeout(function(){
                                                                                that.setState({
                                                                                    mockTableData: technicalTableData,
                                                                                    loadTreeJs: true
                                                                                });
                                                                            }, 2000);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                    else{
                                                        treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (0)';
                                                    }

                                                    if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                        let that = this;
                                                        setTimeout(function(){
                                                            that.setState({
                                                                loadTreeJs: true
                                                            });
                                                            console.log('gateways');
                                                        }, 2000);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        totalNumOfAjaxProcessed++;
                                        progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                        this.setState({
                                            apiLoadPercentage: progressPercent
                                        });
                                    }
                                
                                }

                                let nodes = [];
                                let edges = [];
                                if(treeValue.length > 0){
                                    let shapeArray = this.state.nodeShapes;
                                    let treeObj = treeValue[0];
                                    let parentNodeId = treeObj.id;
                                    let parentNodeLabel = treeObj.value;
                                    let parentNodeTitle = treeObj.value;
                                    let parentNode = { 
                                        id: parentNodeId, 
                                        label: parentNodeLabel, 
                                        title: parentNodeTitle, 
                                        color: this.state.centerNodeColor,
                                        shape: 'ellipse'
                                    };
                                    nodes.push(parentNode);
                                    if(treeObj.children){
                                        for(let childNode of treeObj.children){
                                            let childNodeId = childNode.id;
                                            let childNodeLabel = childNode.value;
                                            let childNodeTitle = childNode.title;
                                            let shape = 'box';
                                            if(childNode.nodeType == 'subscription'){
                                                shape = 'circle';
                                            }
                                            else if(childNode.nodeType == 'superconnectiontitle' || childNode.nodeType == 'clientpooltitle' || childNode.nodeType == 'sessiontitle'){
                                                shape = 'circle';
                                            }
                                            else if(childNode.nodeType == 'clientpool'){
                                                shape = 'ellipse';
                                            }
                                            let childNodeShape = shape;
                                            let preparedChildNode = { 
                                                id: childNodeId, 
                                                label: childNodeLabel, 
                                                title: childNodeTitle,
                                                shape: childNodeShape
                                            };
                                            nodes.push(preparedChildNode);

                                            let prepareEdges = { from: 1, to: childNodeId };
                                            edges.push(prepareEdges);
                                        }
                                    }
                                }

                                this.setState({
                                    treeValue: treeValue,
                                    graph: {
                                        nodes: nodes,
                                        edges: edges
                                    },
                                });
                            }
                            else{
                                let thead = [
                                    {fieldId: "subscription_name", fieldName: "Subscription Name"},
                                    {fieldId: "gateway", fieldName: "Gateway"},
                                    {fieldId: "group_id", fieldName: "Group Id"},
                                    {fieldId: "count", fieldName: "Count"},
                                    {fieldId: "type", fieldName: "Type"}
                                ];
                                this.setState({
                                    table:{
                                        thead: thead,
                                        tbody: []
                                    },
                                    allFields: []
                                });
                                setTimeout(()=>{
                                    this.setState({
                                        treeValue: [],
                                        graph: {
                                            nodes: [],
                                            edges: []
                                        },
                                        apiLoadPercentage: 100,
                                        loadTreeJs: true
                                    });
                                },2000);
                                this.timer = setInterval(()=> this.getItems(), 30000);
                            }
                        } 
                    });
                }
            });
        }
        else{
            this.displayDataFromLocalStorage();
            this.timer = setInterval(()=> this.getItems(), 30000);
        }
    }

    /* istanbul ignore next */
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    /* istanbul ignore next */
    displayDataFromLocalStorage(){
        let nodes = [];
        let edges = [];
        let treeValue = JSON.parse(sessionStorage.getItem("graphData"));
        let technicalTableData = JSON.parse(localStorage.getItem("technicalTableData"));
        this.setState({
            mockTableData: technicalTableData
        });
        this.generateTableStructure(technicalTableData);
        if(treeValue.length > 0){
            let shapeArray = this.state.nodeShapes;
            let treeObj = treeValue[0];
            let parentNodeId = treeObj.id;
            let parentNodeLabel = treeObj.value;
            let parentNodeTitle = treeObj.value;
            let parentNode = { 
                id: parentNodeId, 
                label: parentNodeLabel, 
                title: parentNodeTitle, 
                color: this.state.centerNodeColor,
                shape: 'ellipse'
            };
            nodes.push(parentNode);
            if(treeObj.children){
                for(let childNode of treeObj.children){
                    let childNodeId = childNode.id;
                    let childNodeLabel = childNode.value;
                    let childNodeTitle = childNode.title;
                    let shape = 'box';
                    if(childNode.nodeType == 'subscription'){
                        shape = 'circle';
                    }
                    else if(childNode.nodeType == 'superconnectiontitle' || childNode.nodeType == 'clientpooltitle' || childNode.nodeType == 'sessiontitle'){
                        shape = 'circle';
                    }
                    else if(childNode.nodeType == 'clientpool'){
                        shape = 'ellipse';
                    }
                    let childNodeShape = shape;
                    let preparedChildNode = { 
                        id: childNodeId, 
                        label: childNodeLabel, 
                        title: childNodeTitle,
                        shape: childNodeShape
                    };
                    nodes.push(preparedChildNode);

                    let prepareEdges = { from: 1, to: childNodeId };
                    edges.push(prepareEdges);
                }
            }
        }

        this.setState({
            treeValue: treeValue,
            graph: {
                nodes: nodes,
                edges: edges
            },
            apiLoadPercentage: 99
        });

        setTimeout( ()=>{
            this.setState({
                apiLoadPercentage: 100,
                loadTreeJs: true
            });
            console.log('from LS');
        },1000);
    }

    /* istanbul ignore next */
    getItems(){
        let technicalTableData = [];
        let treeValue = [{
            id: 1,
            value: 'EC',
            title: 'EC',
            nodeType: 'root'
        }];

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
                        if(subscriptions !== null){
                            treeValue[0].value = treeValue[0].value + ' (' + subscriptions.length +')';
                            if(subscriptions.length == 0){
                                subscriptions = [];
                            }

                            let numOfSubscriptions = subscriptions.length;
                            let totalNumOfAjax = subscriptions.length;
                            let totalNumOfAjaxProcessed = 0;
                            if(numOfSubscriptions === 0){
                                localStorage.setItem("technicalTableData", JSON.stringify(technicalTableData));
                                localStorage.setItem("treeValue", JSON.stringify(treeValue));
                                this.setState({
                                    mockTableData: technicalTableData
                                });
                            }

                            let newId = treeValue[0].id;
                            for(let indexSubscriptions in subscriptions){
                                let subscriptionId = subscriptions[indexSubscriptions].subscriptionId.trim();
                                let subscriptionName = subscriptions[indexSubscriptions].subscriptionName.trim();
                                newId++;
                                let newSubscriptionsObj = {};
                                newSubscriptionsObj.id = newId;
                                newSubscriptionsObj.title = subscriptionName;
                                let valueToshow = subscriptionName;
                                if(subscriptionName.length > 20){
                                    let first3Char = subscriptionName.substr(0, 5);
                                    let last3Char = subscriptionName.substr(subscriptionName.length - 5, 5);
                                    valueToshow = first3Char+'...'+last3Char;
                                }
                                newSubscriptionsObj.value = valueToshow;
                                newSubscriptionsObj.nodeType = 'subscription';
                                
                                if(indexSubscriptions == 0){
                                    treeValue[0].children = [newSubscriptionsObj];
                                }
                                else{
                                    treeValue[0].children.push(newSubscriptionsObj);
                                }

                                if(subscriptionId != ''){
                                    fetch(this.props.baseUrl + '/gatewayList?subscriptionID='+subscriptionId, { // Get gateways '/gatewayList?subscriptionID='+subscriptionId
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer '+this.props.authToken
                                        }
                                    })
                                    .then((response) => { // jshint ignore:line
                                        if (response.status === 200) {
                                            totalNumOfAjaxProcessed++;
                                            response.json().then((respData) => {
                                                if(respData.errorStatus.status == 'ok'){
                                                    let gateways = respData.data.glist;
                                                    let gatewaysCount = Object.keys(gateways).length;
                                                    totalNumOfAjax = totalNumOfAjax + gatewaysCount;
                                                    treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (' + gatewaysCount +')';
                                                    for(let indexGateway in gateways){
                                                        newId++;
                                                        let newGatewayObj = {};
                                                        newGatewayObj.id = newId;
                                                        newGatewayObj.title = gateways[indexGateway].cfURL;
                                                        let cfUrl = gateways[indexGateway].cfURL;
                                                        let startPos = cfUrl.indexOf('://') + 3;
                                                        let endPos = cfUrl.indexOf('.');
                                                        let valueToshow = cfUrl.slice(startPos, endPos);
                                                        let gatewayShortCurl = valueToshow;
                                                        if(valueToshow > 30){
                                                            let first7Char = valueToshow.substr(0, 10);
                                                            let last7Char = valueToshow.substr(valueToshow.length - 10, 10);
                                                            valueToshow = first7Char+'...'+last7Char;
                                                        }
                                                        newGatewayObj.value = valueToshow;
                                                        newGatewayObj.nodeType = 'gateway';
                
                                                        if(indexGateway.split(":")[1] == 0){
                                                            treeValue[0].children[indexSubscriptions].children = [newGatewayObj];
                                                        }
                                                        else{
                                                            treeValue[0].children[indexSubscriptions].children.push(newGatewayObj);
                                                        }

                                                        fetch(this.props.baseUrl + '/getGatewayHealth?gatewayURL='+gateways[indexGateway].cfURL, {
                                                            method: 'GET',
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'Authorization': 'Bearer '+this.props.authToken
                                                            }
                                                        })
                                                        .then((response) => { // jshint ignore:line
                                                            if (response.status === 200) {
                                                                response.json().then((respData) => {
                                                                    totalNumOfAjaxProcessed++;
                                                                    if(respData.errorStatus.status == 'ok'){
                                                                        let clientPools = respData.data.ClientPool;
                                                                        let preparedClientPools = [];
                                                                        let clientPoolCounts = {};
                                                                        let superConns = respData.data.SuperConns;
                                                                        let preparedSuperConns = [];
                                                                        let superConnCounts = {};
                                                                        let sessions = respData.data.Sessions;
                                                                        let secondarySessions = [];
                                                                        let preparedSessions = [];
                                                                        let sessionCounts = {};

                                                                        for(let sessionIndex in sessions){
                                                                            let prepareSessionData = {};
                                                                            prepareSessionData.sessionId = sessionIndex;
                                                                            prepareSessionData.groupId = sessions[sessionIndex].clientConfig.groupId;
                                                                            secondarySessions.push(prepareSessionData);
                                                                        }
                                                                        
                                                                        if(clientPools.length > 0){
                                                                            clientPools.forEach(function(element) {
                                                                                clientPoolCounts[element.bindId] = (clientPoolCounts[element.bindId] || 0) + 1;
                                                                            });
                                                                            preparedClientPools = this.removeDuplicates(clientPools, 'bindId');
                                                                        }

                                                                        if(preparedClientPools.length > 0){
                                                                            newId++;
                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [{id: newId, value: 'Client Pools ('+ clientPools.length + ')', title: 'Client Pools', nodeType: 'clientpooltitle'}];
                                                                            for(let indexClientPool in preparedClientPools){
                                                                                newId++;
                                                                                let newClientPoolObj = {};
                                                                                newClientPoolObj.id = newId;
                                                                                newClientPoolObj.title = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                                let valueToshow = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                                
                                                                                newClientPoolObj.value = valueToshow;
                                                                                newClientPoolObj.nodeType = 'clientpool';

                                                                                if(indexClientPool == 0){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newClientPoolObj];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newClientPoolObj);
                                                                                }

                                                                                let preparePoolDataForTable = {};
                                                                                preparePoolDataForTable.subscription_name = subscriptionName;
                                                                                preparePoolDataForTable.gateway = gatewayShortCurl;
                                                                                preparePoolDataForTable.group_id = preparedClientPools[indexClientPool].clientConfig.groupId;
                                                                                preparePoolDataForTable.count = clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id];
                                                                                preparePoolDataForTable.type = 'clientpool';
                                                                                technicalTableData.push(preparePoolDataForTable);
                                                                            }
                                                                        }

                                                                        if(superConns.length > 0){
                                                                            superConns.forEach(function(element) {
                                                                                superConnCounts[element.serverId] = (superConnCounts[element.serverId] || 0) + 1;
                                                                            });
                                                                            preparedSuperConns = this.removeDuplicates(superConns, 'serverId');
                                                                        }
                                                                        if(preparedSuperConns.length > 0){
                                                                            newId++;
                                                                            
                                                                            if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                    {
                                                                                        id: newId, 
                                                                                        value: 'Super Connections (' + superConns.length + ')', 
                                                                                        title: 'Super Connections',
                                                                                        nodeType: 'superconnectiontitle'
                                                                                    }
                                                                                ];
                                                                            }
                                                                            else{
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Super Connections (' + superConns.length + ')', title: 'Super Connections', nodeType: 'superconnectiontitle'});
                                                                            }
                                                                            
                                                                            for(let indexSuperConn in preparedSuperConns){
                                                                                newId++;
                                                                                let newSuperConnObj = {};
                                                                                newSuperConnObj.id = newId;
                                                                                newSuperConnObj.title = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                                                                                let valueToshow = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                    
                                                                                newSuperConnObj.value = valueToshow;
                                                                                newSuperConnObj.nodeType = 'superconnection';
                    
                                                                                if(indexSuperConn == 0){
                                                                                    if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children = [newSuperConnObj];
                                                                                    }
                                                                                    else{
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newSuperConnObj];
                                                                                    }
                                                                                    
                                                                                }
                                                                                else{
                                                                                    if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children.push(newSuperConnObj);
                                                                                    }
                                                                                    else{
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newSuperConnObj);
                                                                                    }
                                                                                }

                                                                                let prepareSupperConDataForTable = {};
                                                                                prepareSupperConDataForTable.subscription_name = subscriptionName;
                                                                                prepareSupperConDataForTable.gateway = gatewayShortCurl;
                                                                                prepareSupperConDataForTable.group_id = preparedSuperConns[indexSuperConn].bindId.groupId;
                                                                                prepareSupperConDataForTable.count =  superConnCounts[preparedSuperConns[indexSuperConn].bindId.id];
                                                                                prepareSupperConDataForTable.type = 'superconnection';
                                                                                technicalTableData.push(prepareSupperConDataForTable);
                                                                            }

                                                                            if(secondarySessions.length > 0){
                                                                                secondarySessions.forEach(function(element) {
                                                                                    sessionCounts[element.groupId] = (sessionCounts[element.groupId] || 0) + 1;
                                                                                });
                                                                                preparedSessions = this.removeDuplicates(secondarySessions, 'groupId');
                                                                            }

                                                                            if(preparedSessions.length > 0){
                                                                                newId++;
                                                                                
                                                                                if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                        {
                                                                                            id: newId, 
                                                                                            value: 'Sessions (' + secondarySessions.length + ')', 
                                                                                            title: 'Sessions',
                                                                                            nodeType: 'sessiontitle'
                                                                                        }
                                                                                    ];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Sessions (' + secondarySessions.length + ')', title: 'Sessions', nodeType: 'sessiontitle'});
                                                                                }
                                                                                let sessionIndexToPushChildren = treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.length - 1;
                                                                                for(let indexSession in preparedSessions){
                                                                                    newId++;
                                                                                    let newSessionObj = {};
                                                                                    newSessionObj.id = newId;
                                                                                    newSessionObj.title = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                                                                                    let valueToshow = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                        
                                                                                    newSessionObj.value = valueToshow;
                                                                                    newSessionObj.nodeType = 'session';
                        
                                                                                    if(indexSession == 0){
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children = [newSessionObj];
                                                                                    }
                                                                                    else{
                                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children.push(newSessionObj);
                                                                                    }

                                                                                    let prepareSessionDataForTable = {};
                                                                                    prepareSessionDataForTable.subscription_name = subscriptionName;
                                                                                    prepareSessionDataForTable.gateway = gatewayShortCurl;
                                                                                    prepareSessionDataForTable.group_id = preparedSessions[indexSession].groupId;
                                                                                    prepareSessionDataForTable.count = sessionCounts[preparedSessions[indexSession].groupId];
                                                                                    prepareSessionDataForTable.type = 'session';
                                                                                    technicalTableData.push(prepareSessionDataForTable);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                                        localStorage.setItem("technicalTableData", JSON.stringify(technicalTableData));
                                                                        localStorage.setItem("treeValue", JSON.stringify(treeValue));
                                                                        this.setState({
                                                                            mockTableData: technicalTableData
                                                                        });
                                                                        console.log('Long Poll data GL');
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                                else{
                                                    treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (0)';
                                                }

                                                if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                    localStorage.setItem("technicalTableData", JSON.stringify(technicalTableData));
                                                    localStorage.setItem("treeValue", JSON.stringify(treeValue));
                                                    this.setState({
                                                        mockTableData: technicalTableData
                                                    });
                                                    console.log('Long Poll data GL NF');
                                                }
                                            });
                                        }
                                    });
                                }
                                else{
                                    totalNumOfAjaxProcessed++;
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    /* istanbul ignore next */
    generateTableStructure(technicalTableData){
        let thead = [];
        let allFields = [];
        let tbody = [];
        const clientConfig = [{
            gatewayId:'0idLmsMk8e',
            RefID:'101186260',
            IP:'10.72.11.10:63218',
            sessionId:'0idLmsMk8e',
            groupId:'wabtec-gecars-qa',
            bindid:'XvmV6ynici',
            targetId:'Q7rfHI',
            timeCreated:'2021-02-10T12:11:07.223278039Z',
            serviceUrl:
          "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io"
          },{
            gatewayId:'1idLmsBc9x',
            RefID:'132186260',
            IP:'10.72.11.10:63317',
            sessionId:'1idLmsBc9x',
            groupId:'wabtec-gecars-ta',
            bindid:'ZcdV6snbci',
            targetId:'Q7rfHI',
            timeCreated:'2021-02-10T12:11:07.223278039Z',
            serviceUrl:
          "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io" 
          }];
        let mockTableData = clientConfig;
        sessionStorage.setItem("gatewayDetails", JSON.stringify(clientConfig));
        
        if(mockTableData.length > 0){
            let allDataKeys = Object.keys(mockTableData[0]);
            for(let dataKey of allDataKeys){
                let theadOject = {};
                theadOject.fieldId = dataKey;
                theadOject.fieldName = this.toTableHeaderCase(dataKey);
                thead.push(theadOject);
                allFields.push(theadOject);
            }

            for(let allData of mockTableData){
                let tbodyObj = {};
                let objKey = 0;
                for(let dataKey of allDataKeys){
                    let singleObj = {};
                    if(allData[dataKey].length > 10){
                        singleObj.value = allData[dataKey].substr(0, 10);
                        singleObj.hiddenValue = allData[dataKey];
                        singleObj.hiddenState = true;
                    }
                    else{
                        singleObj.value = allData[dataKey];
                    }
                    tbodyObj[objKey] = singleObj;
                    objKey++;
                }
                tbody.push(tbodyObj);
            }
        }

        this.setState({
            table:{
                thead: thead,
                tbody: tbody
            },
            allFields: allFields
        });
    }

    /* istanbul ignore next */
    toTableHeaderCase(str){
        return str.split('_').map(function(word, index){
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    /* istanbul ignore next */
    showHideTableTdData(objectIndex, itemIndex){
        let currentTbody = this.state.table.tbody;
        let copiedObjectToChange = Object.assign({}, currentTbody[objectIndex][itemIndex]);
        let tempValue = copiedObjectToChange.value;
        copiedObjectToChange.value = copiedObjectToChange.hiddenValue;
        copiedObjectToChange.hiddenValue = tempValue;
        copiedObjectToChange.hiddenState = !copiedObjectToChange.hiddenState;
        currentTbody[objectIndex][itemIndex] = copiedObjectToChange;
        this.setState({
            table:{
                thead: this.state.table.thead,
                tbody: currentTbody
            }
        });
    }

    /* istanbul ignore next */
    changeToSearchView(){
        this.setState({
            isSearchView: true
        });
    }

    /* istanbul ignore next */
    changeTopologyView(items){
        let shapeArray = this.state.nodeShapes;
        let nodes = [];
        let edges = [];
        let treeObj = Object.assign({}, items);
        let parentNodeId = treeObj.id;
        let parentNodeLabel = treeObj.value;
        let parentNodeTitle = treeObj.title;
        let parentNode = {};
        parentNode.id = parentNodeId;
        parentNode.label = parentNodeLabel;
        parentNode.title = parentNodeTitle;
        parentNode.color = this.state.centerNodeColor;
        parentNode.shape = 'ellipse';
        parentNode.color = this.state.centerNodeColor;
        nodes.push(parentNode);
        if(treeObj.children){
            let childern = [ ...treeObj.children];
            for(let childNode of childern){
                let copiedChildNode = Object.assign({}, childNode);
                let childNodeId = copiedChildNode.id;
                let childNodeLabel = copiedChildNode.value;
                let childNodeTitle = copiedChildNode.title;
                let childNodeType = copiedChildNode.nodeType;
                let preparedChildNode = {};
                preparedChildNode.id = childNodeId;
                preparedChildNode.label = childNodeLabel;
                preparedChildNode.title = childNodeTitle;
                let shape = 'box';
                let color = '#80b8d2fa';
                if(childNodeType == 'subscription'){
                    shape = 'circle';
                    color = '#08cc9efa';
                }
                else if(childNodeType == 'superconnectiontitle' || childNodeType == 'clientpooltitle' || childNodeType == 'sessiontitle'){
                    shape = 'circle';
                    color = '#08cc9efa';
                }
                else if(childNodeType == 'clientpool'){
                    shape = 'ellipse';
                    color = '#e84a4a';
                }
                else if(childNodeType == 'session'){
                    shape = 'box';
                    color = '#ffc107';
                }
                preparedChildNode.shape = shape;
                preparedChildNode.color = color;
                nodes.push(preparedChildNode);

                let prepareEdges = {};
                prepareEdges.from = parentNodeId;
                prepareEdges.to = childNodeId;
                edges.push(prepareEdges);
            }
        }

        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            }
        });
    }

    /* istanbul ignore next */
    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    /* istanbul ignore next */
    refreshData(e){
        window.destroyDataTable('viewTable');
        this.setState({
            loadTreeJs: false,
            apiLoadPercentage: 70
        });
        if (localStorage.getItem("treeValue") !== null && localStorage.getItem("technicalTableData") !== null){        
            this.displayDataFromLocalStorage();
        }
        else{
            let thead = [
                {fieldId: "subscription_name", fieldName: "Subscription Name"},
                {fieldId: "gateway", fieldName: "Gateway"},
                {fieldId: "group_id", fieldName: "Group Id"},
                {fieldId: "count", fieldName: "Count"},
                {fieldId: "type", fieldName: "Type"}
            ];
            this.setState({
                table:{
                    thead: thead,
                    tbody: []
                },
                allFields: []
            });
            setTimeout(()=>{
                this.setState({
                    treeValue: [],
                    graph: {
                        nodes: [],
                        edges: []
                    },
                    apiLoadPercentage: 100,
                    loadTreeJs: true
                });
            },2000);
        }
    }

    /* istanbul ignore next */
    createView(selectedFields, filterFields){
        // search functionality here
        let mockTableData = [...this.state.mockTableData];
        console.log(mockTableData);
        let filteredData = mockTableData;
        let uniqueFilteredData = [];
        let andFilters = [];
        let orFilters = [];
        for(let filterField of filterFields){
            if(filterField.whereCondition == 'AND' && filterField.whereValue !== ''){
                andFilters.push(filterField);
            }
            else if(filterField.whereCondition == 'OR' && filterField.whereValue !== ''){
                orFilters.push(filterField);
            }
        }

        if(andFilters.length > 0){
            for(let andFilter of andFilters){
                if(andFilter.whereOperator == '='){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] == andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '>'){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] > andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '<'){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] < andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '!='){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] != andFilter.whereValue;
                    });
                }
            }
        }
        
        if(orFilters.length > 0){
            let orResults = [];
            for(let orFilter of orFilters){
                let orFilteredDatas = [];
                let wholeData = [...this.state.mockTableData];
                if(orFilter.whereOperator == '='){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] == orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '>'){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] > orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '<'){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] < orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '!='){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] != orFilter.whereValue;
                    });
                }

                if(orFilteredDatas.length > 0){
                    for(let orFilteredData of orFilteredDatas){
                        orResults.push(orFilteredData);
                    }
                }
            }

            if(orResults.length > 0){
                for(let orResult of orResults){
                    filteredData.push(orResult);
                }
            }
        }

        if(orFilters.length > 0){
            let seen = Object.create(null);
            let uniqueFilteredData = filteredData.filter(o => {
                var key = ['subscription_name', 'group_id', 'gateway'].map(k => o[k]).join('|');
                if (!seen[key]) {
                    seen[key] = true;
                    return true;
                }
            });
        }
        else{
            uniqueFilteredData = filteredData;
        }

        let selectedDataKeys = [];
        let tbody = [];
        for(let selDatakey of selectedFields){
            selectedDataKeys.push(selDatakey.fieldId);
        }
        for(let allData of filteredData){
            let tbodyObj = {};
            let objKey = 0;
            for(let dataKey of selectedDataKeys){
                let singleObj = {};
                if(allData[dataKey].length > 10){
                    singleObj.value = allData[dataKey].substr(0, 10);
                    singleObj.hiddenValue = allData[dataKey];
                    singleObj.hiddenState = true;
                }
                else{
                    singleObj.value = allData[dataKey];
                }
                tbodyObj[objKey] = singleObj;
                objKey++;
            }
            tbody.push(tbodyObj);
        }

        this.setState({
            table:{
                thead: selectedFields,
                tbody: tbody
            },
            isSearchView: false
        });
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div>
            { !this.state.isSearchView ?
                <div className="Technicalview">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Table</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Treelist and Topology</a>
                        </li>
                        <li title="Refresh" className="nav-item cursor-pointer" onClick={(event)=>{this.refreshData(event)}}>
                            <a className="nav-link disabled" href="#">
                                <img className="" src="assets/static/images/refresh.svg" alt="refresh" height="15px" />
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            {
                                this.state.loadTreeJs ?
                                    this.state.table.tbody.length > 0 ?
                                        <div className="row view-table">
                                            <div className="col-md-12" id="viewTableDiv">
                                                <button onClick={this.changeToSearchView.bind(this)} className="btn btn-sm float-right btn-link">Advanced search</button>
                                                <Viewtable 
                                                tableData={this.state.table} 
                                                showHideTableTdData={this.showHideTableTdData.bind(this)}
                                                userId={this.props.userId}
                                                showGlobalMessage={this.props.showGlobalMessage.bind(this)}
                                                hideGlobalMessage={this.props.hideGlobalMessage.bind(this)}
                                                permissions={this.props.permissions}
                                                > 
                                                </Viewtable>
                                            </div>
                                        </div>:
                                        <div className="row mt-2">
                                            <div className="col-md-12">
                                                <div className="alert alert-success" role="alert">
                                                    No record found!
                                                </div>
                                            </div>
                                        </div>
                                :
                                <div className="row">
                                    <div className="col-md-12 mt-5">
                                        <p>Please wait...</p>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.apiLoadPercentage+ '%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            {
                            this.state.loadTreeJs ?
                                this.state.graph.nodes.length > 0 && this.state.treeValue.length > 0 ?
                                    <div className="row">
                                        <div className="col-md-4 treeview-div">
                                            <Treelist treeValue={this.state.treeValue} changeTopology={this.changeTopologyView.bind(this)}></Treelist>
                                        </div>
                                        <div className="col-md-8 treeview-div">
                                            <Topologygraph nodeData={this.state.graph}></Topologygraph>
                                        </div>
                                    </div> :
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <div className="alert alert-success" role="alert">
                                                No record found!
                                            </div>
                                        </div>
                                    </div>
                                : 
                                <div className="row">
                                    <div className="col-md-12 mt-5">
                                        <p>Please wait...</p>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.apiLoadPercentage+ '%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>  :
                <Customsearch 
                    showGlobalMessage={this.props.showGlobalMessage.bind(this)}
                    hideGlobalMessage={this.props.hideGlobalMessage.bind(this)}
                    allFields={this.state.allFields} 
                    selectedFields={this.state.table.thead}
                    createView={this.createView.bind(this)}></Customsearch>
                }
            </div>
        )
        /* jshint ignore:end */
    }}
