---
layout: docs
title: "Spring Boot + Kafka + Zookeeper"
description: ""
group: on-demand-test-environment
sub_group: examples-compositions
# hack/workaround for sub elements, because parent has permalink
permalink: /docs/on-demand-test-environment/examples-compositions/spring-boot-kafka-zookeeper/ 
redirect_from:
  - /docs/spring-boot-kafka-zookeeper
  - /docs/spring-boot-kafka-zookeeper
toc: true
---
This project uses `Java, Spring Boot, Kafka, Zookeeper` to show you how to integrate these services in the composition.

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-springboot-kafka){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

## Zookeeper Docker image

Kafka uses ZooKeeper so you need to first start a ZooKeeper server if you don't already have one

  `docker-compose.yml`
{% highlight yaml %}
{% raw %}
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
{% endraw %}
{% endhighlight %}

## Kafka Docker image
Now start the Kafka server. In the `docker-compose.yml` it can be something like this

  `docker-compose.yml`
{% highlight yaml %}
{% raw %}
  kafka:
    build:
      context: kafka
      dockerfile: Dockerfile
    links:
      - zookeeper:zk
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: $CF_HOST_IP
      KAFKA_ZOOKEEPER_CONNECT: zk:2181
      KAFKA_MESSAGE_MAX_BYTES: 2000000
      KAFKA_CREATE_TOPICS: "Topic1:1:1"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    depends_on:
      - zookeeper
{% endraw %}
{% endhighlight %}

To start the Kafka server with the certain per-configuration, you need to use Environment variables. Below, you can see which Environment variables are available for this service.

__Broker IDs__

You can configure the broker id in different ways

1. explicitly, using ```KAFKA_BROKER_ID```
2. via a command, using ```BROKER_ID_COMMAND```, e.g. ```BROKER_ID_COMMAND: "hostname | awk -F'-' '{print $2}'"```

If you don't specify a broker id in your docker-compose file, it will automatically be generated (see [https://issues.apache.org/jira/browse/KAFKA-1070](https://issues.apache.org/jira/browse/KAFKA-1070){:target="_blank"}. This allows scaling up and down. In this case it is recommended to use the ```--no-recreate``` option of docker-compose to ensure that containers are not re-created and thus keep their names and ids.


__Automatically create topics__

If you want to have kafka-docker automatically create topics in Kafka during
creation, a ```KAFKA_CREATE_TOPICS``` environment variable can be
added in ```docker-compose.yml```.

Here is an example snippet from ```docker-compose.yml```:

        environment:
          KAFKA_CREATE_TOPICS: "Topic1:1:3,Topic2:1:1:compact"

```Topic 1``` will have 1 partition and 3 replicas, ```Topic 2``` will have 1 partition, 1 replica and a `cleanup.policy` set to `compact`.

__Advertised hostname__

You can configure the advertised hostname in different ways

1. explicitly, using ```KAFKA_ADVERTISED_HOST_NAME```
2. via a command, using ```HOSTNAME_COMMAND```, e.g. ```HOSTNAME_COMMAND: "route -n | awk '/UG[ \t]/{print $$2}'"```

When using commands, make sure you review the "Variable Substitution" section in [https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/){:target="_blank"}

If ```KAFKA_ADVERTISED_HOST_NAME``` is specified, it takes precedence over ```HOSTNAME_COMMAND```

For AWS deployment, you can use the Metadata service to get the container host's IP:
```
HOSTNAME_COMMAND=wget -t3 -T2 -qO-  http://169.254.169.254/latest/meta-data/local-ipv4
```
Reference: [http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html){:target="_blank"}

__JMX__

For monitoring purposes you may wish to configure JMX. Additional to the standard JMX parameters, problems could arise from the underlying RMI protocol used to connect

* java.rmi.server.hostname - interface to bind listening port
* com.sun.management.jmxremote.rmi.port - The port to service RMI requests

For example, to connect to a kafka running locally (assumes exposing port 1099)

      KAFKA_JMX_OPTS: "-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=127.0.0.1 -Dcom.sun.management.jmxremote.rmi.port=1099"
      JMX_PORT: 1099

## Spring Boot + Kafka
Then grab the spring-kafka JAR and all of its dependencies - the easiest way to do that is to declare a dependency in your build tool, e.g. for Maven:

  `Text`
{% highlight xml %}
{% raw %}
    <dependency>
      <groupId>org.springframework.kafka</groupId>
      <artifactId>spring-kafka</artifactId>
      <version>${spring-kafka.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.kafka</groupId>
      <artifactId>spring-kafka-test</artifactId>
      <version>${spring-kafka.version}</version>
      <scope>test</scope>
    </dependency>
{% endraw %}
{% endhighlight %}

Using plain Java to send and receive a message:

  `Java`
{% highlight java %}
{% raw %}
private static String BOOT_TOPIC = "boot.t";

@Autowired
private Sender sender;

@Autowired
private Receiver receiver;

@ClassRule
public static KafkaEmbedded embeddedKafka = new KafkaEmbedded(1, true, BOOT_TOPIC);

@BeforeClass
public static void setUpBeforeClass() throws Exception {
  System.setProperty("spring.kafka.bootstrap-servers", embeddedKafka.getBrokersAsString());
}

@Test
public void testReceive() throws Exception {
  sender.send(BOOT_TOPIC, "Hello Boot!");

  receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);
  assertThat(receiver.getLatch().getCount()).isEqualTo(0);
}
{% endraw %}
{% endhighlight %}

Maven will download the needed dependencies, compile the code and run the unit test case. The result should be a successful build during which following logs are generated:

  `Java`
{% highlight java %}
{% raw %}
.   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v1.5.2.RELEASE)

08:36:56.175 [main] INFO  c.c.kafka.SpringKafkaApplicationTest - Starting SpringKafkaApplicationTest on cnf-pc with PID 700 (started by CodeNotFound in c:\code\st\spring-kafka\spring-kafka-avro)
08:36:56.175 [main] INFO  c.c.kafka.SpringKafkaApplicationTest - No active profile set, falling back to default profiles: default
08:36:56.889 [main] INFO  c.c.kafka.SpringKafkaApplicationTest - Started SpringKafkaApplicationTest in 1.068 seconds (JVM running for 5.293)
08:36:58.223 [main] INFO  c.codenotfound.kafka.producer.Sender - sending user='{"name": "John Doe", "favorite_number": null, "favorite_color": "green"}'
08:36:58.271 [org.springframework.kafka.KafkaListenerEndpointContainer#0-0-L-1] INFO  c.c.kafka.consumer.Receiver - received user='{"name": "John Doe", "favorite_number": null, "favorite_color": "green"}'
08:37:00.240 [main] ERROR o.a.zookeeper.server.ZooKeeperServer - ZKShutdownHandler is not registered, so ZooKeeper server won't take any action on ERROR or SHUTDOWN server state changes
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 8.871 sec - in com.codenotfound.kafka.SpringKafkaApplicationTest

Results :

Tests run: 3, Failures: 0, Errors: 0, Skipped: 0

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 41.632 s
[INFO] Finished at: 2017-04-17T08:37:31+02:00
[INFO] Final Memory: 18M/212M
[INFO] ------------------------------------------------------------------------
{% endraw %}
{% endhighlight %}

