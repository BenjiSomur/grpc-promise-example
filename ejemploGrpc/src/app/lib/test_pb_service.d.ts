// package: test
// file: test.proto

import * as test_pb from "./test_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TestTestStreamSimple = {
  readonly methodName: string;
  readonly service: typeof Test;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof test_pb.TestRequest;
  readonly responseType: typeof test_pb.TestResponse;
};

type TestTestSimpleStream = {
  readonly methodName: string;
  readonly service: typeof Test;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof test_pb.TestRequest;
  readonly responseType: typeof test_pb.TestResponse;
};

type TestTestSimpleSimple = {
  readonly methodName: string;
  readonly service: typeof Test;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof test_pb.TestRequest;
  readonly responseType: typeof test_pb.TestResponse;
};

type TestTestStreamStream = {
  readonly methodName: string;
  readonly service: typeof Test;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof test_pb.TestRequest;
  readonly responseType: typeof test_pb.TestResponse;
};

export class Test {
  static readonly serviceName: string;
  static readonly TestStreamSimple: TestTestStreamSimple;
  static readonly TestSimpleStream: TestTestSimpleStream;
  static readonly TestSimpleSimple: TestTestSimpleSimple;
  static readonly TestStreamStream: TestTestStreamStream;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TestClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  testStreamSimple(metadata?: grpc.Metadata): RequestStream<test_pb.TestRequest>;
  testSimpleStream(requestMessage: test_pb.TestRequest, metadata?: grpc.Metadata): ResponseStream<test_pb.TestResponse>;
  testSimpleSimple(
    requestMessage: test_pb.TestRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: test_pb.TestResponse|null) => void
  ): UnaryResponse;
  testSimpleSimple(
    requestMessage: test_pb.TestRequest,
    callback: (error: ServiceError|null, responseMessage: test_pb.TestResponse|null) => void
  ): UnaryResponse;
  testStreamStream(metadata?: grpc.Metadata): BidirectionalStream<test_pb.TestRequest, test_pb.TestResponse>;
}

