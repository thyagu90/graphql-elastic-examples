var esclient = require('./elastic');

/*
//check the cluster health status
client.cluster.health({}, function (err, resp, status) {
    console.log("-- Client Health --", resp);
});
*/

esclient.esclient.count({index: 'demo_user',type: 'demo_user'},function(err,resp,status) {  
    console.log("demo_user",resp);
  });
/*
  esclient.esclient.indices.delete({ index: 'demo_user' }, function (err, resp, status) {
    if (err) {
        console.log(err);
    } else {
        console.log(status)
        console.log("delete", resp);
    }
});
*/