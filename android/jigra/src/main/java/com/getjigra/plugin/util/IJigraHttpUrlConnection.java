package com.getjigra.plugin.util;

import java.io.IOException;
import java.io.InputStream;

/**
 * This interface was extracted from {@link JigraHttpUrlConnection} to enable mocking that class.
 */
public interface IJigraHttpUrlConnection {
    InputStream getErrorStream();

    String getHeaderField(String name);

    InputStream getInputStream() throws IOException;
}
