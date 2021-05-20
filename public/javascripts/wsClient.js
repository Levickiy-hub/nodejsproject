//function startWS() {
//    let webSocket = new WebSocket('ws://localhost:5000/')
//    function sendWSMessage(content) {
//        webSocket.send(JSON.stringify({
//            content: content
//        }));
//    }

//    webSocket.onopen = e => {
//        webSocket.onmessage = function (e) {
//            console.log('wsClient');
//            { html: "<script type='text/javascript'>alert('" + content + " ')</script>" };
//        }
//    };
//}