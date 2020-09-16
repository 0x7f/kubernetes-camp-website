#include "pistache/endpoint.h"
#include "pistache/router.h"

using namespace Pistache;

static void onHelloRequest(const Rest::Request&, Http::ResponseWriter response) {
    response.send(Pistache::Http::Code::Ok, "Hello World\n");
}

int main() {
    Pistache::Address addr(Pistache::Ipv4::any(), Pistache::Port(8080));
    auto opts = Pistache::Http::Endpoint::options().threads(1);

    Rest::Router router;
    Rest::Routes::Get(router, "/hello", Rest::Routes::bind(&onHelloRequest));

    Http::Endpoint server(addr);
    server.init(opts);
    server.setHandler(router.handler());
    server.serve();
}
