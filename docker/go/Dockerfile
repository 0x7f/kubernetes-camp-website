FROM golang:alpine AS build
WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN go build api.go

FROM alpine
WORKDIR /app
COPY --from=build /build/api .
CMD ["/app/api"]
