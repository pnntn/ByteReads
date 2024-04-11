package com.generation.origanboh_spring.dao;

import java.util.Map;

public interface Database {
    int eseguiDML(String query, String... params);

    Map<Integer, Map<String, String>> eseguiDQL(String query, String... params);
}