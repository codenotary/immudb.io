# JVCN
> Global, de-centralized signing of code and other digital assets.

This [package](https://github.com/vchain-us/jvcn) provides JVM bindings for the [Code Notary](https://www.codenotary.io)
platform. 

It's designed as a lightweight Java library with a minimum dependency set that
can be dropped into any JVM software project.

## License
This software is released under [GPL3](https://www.gnu.org/licenses/gpl-3.0.en.html).

## Usage
Add the following dependency to pom.xml:
```xml
<dependency>
    <groupId>us.vchain</groupId>
    <artifactId>jvcn</artifactId>
    <version>0.0.1</version>
</dependency>
```

You can tie in basic file verification like this:
````java
public class Main {
    public static void main(String... args) {
        final JVCN jvcn = new JVCN.Builder().build();
        Optional<Asset> asset = jvcn.verify(new File("SomeFile.txt"));
        System.out.println("Asset: " + asset);
    }
}
````

## Requirements
The library requires a Java 8 JVM.
