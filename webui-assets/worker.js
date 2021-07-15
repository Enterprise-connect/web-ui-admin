
this.onmessage = function (e) {
   getSnapData(e)
  setInterval(() => {
    getSnapData(e)
  }, 300000);
};

function getSnapData(e){
   fetch(e.data.api, {
      method: "GET",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':"Bearer " + e.data.authToken
       }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          this.postMessage({
            result: JSON.parse(JSON.stringify(respData)),
          });
        });
      }
    });
}



