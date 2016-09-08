package com.vanxd.admin.service.user.impl;

import com.vanxd.admin.service.BaseServiceImpl;
import com.vanxd.admin.service.user.SysPermissionService;
import com.vanxd.data.entity.user.SysPermission;
import com.vanxd.data.mapper.user.SysPermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by wyd on 2016/8/25.
 */
@Service
@Transactional
public class SysPermissionServiceImpl extends BaseServiceImpl<SysPermission, SysPermissionMapper> implements SysPermissionService {
    @Autowired
    private SysPermissionMapper sysPermissionMapper;


    @Override
    public SysPermissionMapper getMapper() {
        return sysPermissionMapper;
    }
}
