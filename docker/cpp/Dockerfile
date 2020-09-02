FROM ubuntu AS build

RUN apt-get update \
 && apt-get install -y software-properties-common apt-transport-https lsb-release ca-certificates \
 && add-apt-repository ppa:pistache+team/unstable \
 && apt-get update \
 && apt-get install -y build-essential cmake g++ libpistache-dev

WORKDIR /app
COPY . .
WORKDIR /app/build
RUN cmake -DCMAKE_BUILD_TYPE=Release ..
RUN make

FROM alpine
WORKDIR /app
COPY --from=build /app/build/api .
CMD ["/app/api"]