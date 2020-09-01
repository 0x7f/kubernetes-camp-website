FROM maven:3-jdk-8 AS build
WORKDIR /build

#ENV MAVEN_OPTS "-Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn"

COPY pom.xml .
RUN mvn dependency:resolve dependency:resolve-plugins -Dsilent=true

COPY . .
# will disable printing the maven download progress
# make sure the tests were executed already!
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:8-alpine
WORKDIR /app
COPY --from=build /build/target/api.jar .
CMD ["java", "-jar", "/app/api.jar"]