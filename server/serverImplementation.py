import sys
import grpc
import time
sys.path.insert(0, "../server/gen-py")
import test_pb2
import test_pb2_grpc
import random
from concurrent import futures

ONE_DAY_IN_SECONDS = 60 * 60 * 24


class TEST(test_pb2_grpc.TestServicer):
    def TestSimpleSimple(self, request, context):
        respuesta = test_pb2.TestResponse()
        respuesta.id = random.randint(0, 100)
        return respuesta


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    test_pb2_grpc.add_TestServicer_to_server(TEST(), server)
    server.add_insecure_port('localhost:65432')
    server.start()
    try:
        while True:
            time.sleep(ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt as e:
        server.stop(0)


serve()
