// package: test
// file: test.proto

var test_pb = require("./test_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Test = (function () {
  function Test() {}
  Test.serviceName = "test.Test";
  return Test;
}());

Test.TestStreamSimple = {
  methodName: "TestStreamSimple",
  service: Test,
  requestStream: true,
  responseStream: false,
  requestType: test_pb.TestRequest,
  responseType: test_pb.TestResponse
};

Test.TestSimpleStream = {
  methodName: "TestSimpleStream",
  service: Test,
  requestStream: false,
  responseStream: true,
  requestType: test_pb.TestRequest,
  responseType: test_pb.TestResponse
};

Test.TestSimpleSimple = {
  methodName: "TestSimpleSimple",
  service: Test,
  requestStream: false,
  responseStream: false,
  requestType: test_pb.TestRequest,
  responseType: test_pb.TestResponse
};

Test.TestStreamStream = {
  methodName: "TestStreamStream",
  service: Test,
  requestStream: true,
  responseStream: true,
  requestType: test_pb.TestRequest,
  responseType: test_pb.TestResponse
};

exports.Test = Test;

function TestClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TestClient.prototype.testStreamSimple = function testStreamSimple(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(Test.TestStreamSimple, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

TestClient.prototype.testSimpleStream = function testSimpleStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Test.TestSimpleStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

TestClient.prototype.testSimpleSimple = function testSimpleSimple(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Test.TestSimpleSimple, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TestClient.prototype.testStreamStream = function testStreamStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Test.TestStreamStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.TestClient = TestClient;

