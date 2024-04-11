package com.generation.origanboh_spring.services;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.dao.AdminDAO;
import com.generation.origanboh_spring.entities.Admin;

@Service
public class AdminService extends GenericService<Integer, Admin, AdminDAO> {
    
    @Override
    public Admin constructEntity(Map<String, String> params) {
        return getContext().getBean(Admin.class, params);
    }

}
