const local: App.I18n.Schema = {
  system: {
    title: 'PanisAdmin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    actionSuccess: 'Action Success',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    confirmBatchDelete: 'Are you sure you want to batch delete?',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    save: 'Save',
    saveSuccess: 'Save Success',
    userCenter: 'User Center',
    openUp: 'Open Up',
    putAway: 'Put Away',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    moreOperation: 'More Operation',
    createUser: 'Create User',
    createTime: 'Create Time',
    updateUser: 'Update User',
    updateTime: 'Update Time'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    colourWeakness: 'Colour Weakness',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode',
      reverseHorizontalMix: 'Reverse first level menus and child level menus position'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tab Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    watermark: {
      visible: 'Watermark Full Screen Visible',
      text: 'Watermark Text'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    document: 'Document',
    document_project: 'Project Document',
    'document_project-link': 'Project Document(External Link)',
    document_vue: 'Vue Document',
    document_vite: 'Vite Document',
    document_unocss: 'UnoCSS Document',
    document_naive: 'Naive UI Document',
    document_antd: 'Ant Design Vue Document',
    'user-center': 'User Center',
    about: 'About',
    function: 'System Function',
    function_tab: 'Tab',
    'function_multi-tab': 'Multi Tab',
    'function_hide-child': 'Hide Child',
    'function_hide-child_one': 'Hide Child',
    'function_hide-child_two': 'Two',
    'function_hide-child_three': 'Three',
    function_request: 'Request',
    'function_toggle-auth': 'Toggle Auth',
    'function_super-page': 'Super Admin Visible',
    manage: 'System Manage',
    manage_user: 'User Manage',
    'manage_user-detail': 'User Detail',
    manage_role: 'Role Manage',
    manage_menu: 'Menu Manage',
    manage_dict: 'Dictionary Manage',
    manage_position: 'Position Manage',
    manage_org: 'Organization Manage',
    monitor: 'Monitor Manage',
    monitor_system: 'System Monitor',
    monitor_cache: 'Cache Monitor',
    monitor_logs: 'Logs Monitor',
    monitor_logs_login: 'Login Logs',
    monitor_logs_operation: 'Operation Logs',
    monitor_logs_error: 'Error Logs',
    monitor_logs_scheduler: 'Scheduler Logs',
    monitor_scheduler: 'Scheduler',
    tools: 'Tools Manage',
    'tools_generate-table': 'Generate Table',
    'multi-menu': 'Multi Menu',
    'multi-menu_first': 'Menu One',
    'multi-menu_first_child': 'Menu One Child',
    'multi-menu_second': 'Menu Two',
    'multi-menu_second_child': 'Menu Two Child',
    'multi-menu_second_child_home': 'Menu Two Child Home',
    exception: 'Exception',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    about: {
      title: 'About',
      introduction:
        'PanisAdmin is based on the second modification of SoybeanAdmin.it is an elegant and powerful admin template,Adopt Naive UI component library and the latest front-end technology stack, including Vue3, Vite5, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. PanisAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.',
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'Github Link',
        previewLink: 'Preview Link'
      },
      prdDep: 'Production Dependency',
      devDep: 'Development Dependency'
    },
    home: {
      greeting: 'Good morning, {userName}, today is another day full of vitality!',
      weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
      projectCount: 'Project Count',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    function: {
      tab: {
        tabOperate: {
          title: 'Tab Operation',
          addTab: 'Add Tab',
          addTabDesc: 'To about page',
          closeTab: 'Close Tab',
          closeCurrentTab: 'Close Current Tab',
          closeAboutTab: 'Close "About" Tab',
          addMultiTab: 'Add Multi Tab',
          addMultiTabDesc1: 'To MultiTab page',
          addMultiTabDesc2: 'To MultiTab page(with query params)'
        },
        tabTitle: {
          title: 'Tab Title',
          changeTitle: 'Change Title',
          change: 'Change',
          resetTitle: 'Reset Title',
          reset: 'Reset'
        }
      },
      multiTab: {
        routeParam: 'Route Param',
        backTab: 'Back function_tab'
      },
      toggleAuth: {
        toggleAccount: 'Toggle Account',
        authHook: 'Auth Hook Function `hasAuth`',
        superAdminVisible: 'Super Admin Visible',
        adminVisible: 'Admin Visible',
        adminOrUserVisible: 'Admin and User Visible'
      },
      request: {
        repeatedErrorOccurOnce: 'Repeated Request Error Occurs Once',
        repeatedError: 'Repeated Request Error',
        repeatedErrorMsg1: 'Custom Request Error 1',
        repeatedErrorMsg2: 'Custom Request Error 2'
      }
    },
    tools: {
      common: {
        renderType: {
          input: 'Input',
          select: 'Select',
          radio: 'Radio'
        },
        searchType: {
          equal: 'Equal',
          noEqual: 'No Equal',
          like: 'Like',
          leftLike: 'Left Like',
          rightLike: 'Right Like',
          greaterThan: 'Greater Than',
          greaterThanOrEqual: 'Greater Than or Equal',
          lessThan: 'Less Than',
          lessThanOrEqual: 'Less Than or Equal',
          in: 'In',
          notIn: 'Not In',
          between: 'Between',
          notBetween: 'Not Between'
        }
      },
      generateTable: {
        tableName: 'Table Name',
        tableComment: 'Table Comment',
        tablePrefix: 'Table Prefix',
        parentPackage: 'Parent Package Name',
        moduleName: 'Module Name',
        parentMenuName: 'Parent Menu Name',
        author: 'Author',
        status: 'Status',
        form: {
          tableName: 'Please enter table name',
          tableNameSelect: 'Please select table name',
          tableComment: 'Please enter table comment',
          tablePrefix: 'Please enter table prefix',
          parentPackage: 'Please enter parent package name',
          moduleName: 'Please enter module name',
          parentMenuName: 'Please select parent menu name',
          author: 'Please enter author'
        },
        addGenerate: 'Add Generate',
        editGenerate: 'Edit Generate Table:{tableName}',
        isNotDevEnvTip: 'The current is not a development environment, and data cannot be added'
      },
      generateTableColumn: {
        ordinalPosition: 'Ordinal Position',
        columnName: 'Column Name',
        propertyName: 'Property Name',
        columnComment: 'Column Comment',
        dataType: 'Data Type',
        javaType: 'Java Type',
        typescriptType: 'TypeScript Type',
        list: 'List',
        search: 'Search',
        searchType: 'Search Condition',
        required: 'Required',
        added: 'Added',
        edit: 'Edit',
        renderType: 'Render Type',
        dictCode: 'Data Dictionary',
        status: 'Enable Status',
        cleanColumns: 'Clean Columns',
        cleanColumnsConfirm:
          'Are you sure you want to clean up the generated table fields? It will delete the existing configured fields, and you can synchronize the database fields again.',
        cleanSuccess: 'Clean Success',
        syncColumns: 'Sync Database Columns',
        syncColumnsConfirm: 'Are you sure you want to synchronize the database columns?',
        syncSuccess: 'Sync Success',
        baseInfo: 'Base Info',
        columnInfo: 'Column Info',
        resultInfo: 'Result Info',
        generateSuccess: 'Generate Success',
        downloadZip: 'Download ZIP',
        previous: 'Previous',
        next: 'Next'
      }
    },
    manage: {
      common: {
        status: {
          enable: 'Enable',
          disable: 'Disable'
        }
      },
      role: {
        title: 'Role List',
        roleName: 'Role Name',
        roleCode: 'Role Code',
        status: 'Role Status',
        sort: 'Role sort',
        description: 'Role Description',
        menuAuth: 'Menu Auth',
        buttonAuth: 'Button Auth',
        form: {
          roleName: 'Please enter role name',
          roleCode: 'Please enter role code',
          status: 'Please select role status',
          sort: 'Please enter role sort',
          description: 'Please enter role description'
        },
        addRole: 'Add Role',
        editRole: 'Edit Role'
      },
      user: {
        title: 'User List',
        userName: 'User Name',
        gender: 'Gender',
        nickName: 'Nick Name',
        realName: 'Real Name',
        phone: 'Phone Number',
        email: 'Email',
        status: 'User Status',
        userRole: 'User Role',
        userPosition: 'User Position',
        userOrgUnits: 'User Organization',
        form: {
          userName: 'Please enter user name',
          gender: 'Please select gender',
          nickName: 'Please enter nick name',
          realName: 'Please enter real name',
          phone: 'Please enter phone number',
          email: 'Please enter email',
          status: 'Please select user status',
          userRole: 'Please select user role',
          userPosition: 'Please select user position',
          userOrgUnits: 'Please select user organization'
        },
        addUser: 'Add User',
        editUser: 'Edit User',
        resetPwd: 'Reset Password',
        confirmResetPwd: 'Are you sure you want to reset the password? ',
        responsibilities: 'Responsibilities',
        manageOrganization: 'Manage Organization(Principal)',
        userGender: {
          confidential: 'Confidential',
          male: 'Male',
          female: 'Female'
        }
      },
      menu: {
        home: 'Home',
        title: 'Menu List',
        id: 'ID',
        parentId: 'Parent ID',
        type: 'Menu Type',
        name: 'Menu Name',
        routeName: 'Route Name',
        routePath: 'Route Path',
        pathParam: 'Path Param',
        layout: 'Layout Component',
        page: 'Page Component',
        i18nKey: 'I18n Key',
        icon: 'Icon',
        localIcon: 'Local Icon',
        iconTypeTitle: 'Icon Type',
        sort: 'Sort',
        keepAlive: 'Keep Alive',
        href: 'Href',
        iframeUrl: 'Iframe URL',
        hideInMenu: 'Hide In Menu',
        activeMenu: 'Active Menu',
        multiTab: 'Multi Tab',
        fixedIndexInTab: 'Fixed Index In Tab',
        query: 'Query Params',
        status: 'Menu Status',
        detail: 'Menu Detail',
        form: {
          home: 'Please select home',
          type: 'Please select menu type',
          name: 'Please enter menu name',
          routeName: 'Please enter route name',
          routePath: 'Please enter route path',
          pathParam: 'Please enter path param',
          page: 'Please select page component',
          layout: 'Please select layout component',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter iconify name',
          localIcon: 'Please enter local icon name',
          sort: 'Please enter sort',
          keepAlive: 'Please select whether to cache route',
          href: 'Please enter href',
          iframeUrl: 'Please enter iframe url',
          hideInMenu: 'Please select whether to hide menu',
          activeMenu: 'Please select route name of the highlighted menu',
          multiTab: 'Please select whether to support multiple tabs',
          fixedInTab: 'Please select whether to fix in the tab',
          fixedIndexInTab: 'Please enter the index fixed in the tab',
          query: 'Please enter query params',
          queryKey: 'Please enter route parameter Key',
          queryValue: 'Please enter route parameter Value',
          status: 'Please select menu status'
        },
        addMenu: 'Add Menu',
        editMenu: 'Edit Menu',
        addChildMenu: 'Add Child Menu',
        menuType: {
          directory: 'Directory',
          menu: 'Menu'
        },
        iconType: {
          iconify: 'Iconify Icon',
          local: 'Local Icon'
        },
        selectTreeIsEmptyTip: 'Please select a dictionary to view sub-items',
        menuTypeIsDirectory: 'Directory type does not need to display data'
      },
      permission: {
        title: 'Permission Button List',
        menuName: 'Menu Name',
        name: 'Button Name',
        resource: 'Button Resource',
        status: 'Button Status',
        sort: 'Sort',
        description: 'Button Description',
        addButton: 'Add Button',
        editButton: 'Edit Button',
        form: {
          menuName: 'Please enter menu name',
          name: 'Please enter button name',
          resource: 'Please enter button resource',
          resourceIntroduction:
            'This button can be associated with multiple backend interface permissions. Please enter each permission you require, separating them with a semicolon (;). Ensure that when the user operates the button, the system will verify the permissions of all listed interfaces to achieve fine-grained permission management. Please ensure that the permissions you enter are accurate to avoid affecting the normal use of functions.eg:sys:user:get;sys:user:update',
          status: 'Please select button status',
          sort: 'Please enter sort',
          description: 'Please enter button description'
        }
      },
      position: {
        name: 'Position Name',
        i18nKey: 'I18n Key',
        code: 'Position Code',
        abbr: 'Abbreviation',
        description: 'Position Description',
        sort: 'Sort',
        status: 'Position Status',
        form: {
          name: 'Please enter position name',
          i18nKey: 'Please enter i18n key',
          code: 'Please enter position code',
          abbr: 'Please enter abbreviation',
          description: 'Please enter position description',
          sort: 'Please enter sort',
          status: 'Please select position status'
        },
        addPosition: 'Add Position',
        editPosition: 'Edit Position'
      },
      dict: {
        title: 'Dictionary List',
        name: 'Dictionary Name',
        code: 'Dictionary Code',
        type: 'Dictionary Type',
        sort: 'Sort',
        description: 'Description',
        status: 'Dictionary Status',
        form: {
          name: 'Please enter dictionary name',
          code: 'Please enter dictionary code',
          type: 'Please select dictionary type',
          description: 'Please enter dictionary description',
          sort: 'Please enter sort',
          status: 'Please select dictionary status'
        },
        addDict: 'Add Dictionary',
        editDict: 'Edit Dictionary',
        dictType: {
          system: 'System',
          business: 'Business'
        },
        loadCacheSuccess: 'Load Cache Success',
        selectTreeIsEmptyTip: 'Please select the dictionary for details',
        systemFieldsCannotBeDeleted: 'System fields cannot be deleted'
      },
      dictItem: {
        title: 'Dictionary Item List',
        dictCode: 'Dict Code',
        value: 'Value',
        zhCN: 'Simplified Chinese',
        enUS: 'English',
        color: 'Color',
        type: 'Type',
        sort: 'Sort',
        status: 'Status',
        description: 'Description',
        form: {
          value: 'Please enter value',
          zhCN: 'Please enter item simplified Chinese',
          enUS: 'Please enter item English',
          color: 'Please enter color',
          type: 'Please select type',
          sort: 'Please enter sort',
          status: 'Please select item status',
          description: 'Please enter item description'
        },
        addDictItem: 'Add Dict Item',
        editDictItem: 'Edit Dict Item'
      },
      orgUnits: {
        name: 'Organization Name',
        code: 'Organization Code',
        abbr: 'Abbreviation',
        description: 'Description',
        sort: 'Sort',
        status: 'Status',
        form: {
          name: 'Please enter organization name',
          code: 'Please enter organization code',
          abbr: 'Please enter abbreviation',
          description: 'Please enter organization description',
          sort: 'Please enter sort',
          status: 'Please select organization status'
        },
        addOrgUnits: 'Add Organization',
        editOrgUnits: 'Edit Organization',
        addChildDepart: 'Add Child Depart'
      }
    },
    monitor: {
      percentage: '{value} %',
      system: {
        status: 'System Status',
        cpuUserUsage: 'CPU User Usage',
        cpuSystemUsage: 'CPU System Usage',
        systemMemoryUsage: 'System Memory Usage',
        jvmMemoryUsage: 'JVM Memory Usage',
        operatingSystem: {
          title: 'System Info',
          name: 'Operating System',
          manufacturer: 'System Manufacturer',
          arch: 'System Architecture',
          systemBootTime: 'System Boot Time',
          systemUptime: 'System Uptime'
        },
        centralProcessor: {
          title: 'Central Processor',
          name: 'CPU Name',
          physicalProcessorCount: 'Physical Processor Count',
          logicalProcessorCount: 'Logical Processor Count (including Hyper-Threading)',
          processorIdentifier: 'Processor Identifier',
          vendorFreq: 'CPU Frequency',
          userPercent: 'User Usage Percentage',
          systemPercent: 'System Usage Percentage',
          idlePercent: 'Idle Percentage'
        },
        globalMemory: {
          title: 'System Memory',
          total: 'Total Memory',
          used: 'Used Memory',
          available: 'Available Memory',
          swapTotal: 'Swap Total Memory',
          swapUsed: 'Used Swap',
          swapFree: 'Free Swap',
          memoryUsedRate: 'Memory Usage Rate',
          swapUsedRate: 'Swap Usage Rate'
        },
        jvm: {
          title: 'JVM Memory',
          vmName: 'Name',
          uptime: 'Uptime',
          vmVersion: 'Version',
          vmVendor: 'Vendor',
          startTime: 'Start Time',
          inputArguments: 'Input Arguments',
          heapMemoryUsed: 'Heap Memory Used',
          heapMemoryMax: 'Heap Memory Maximum',
          memoryUsageRate: 'Memory Usage Rate',
          nonHeapMemoryUsed: 'Non-Heap Memory Used'
        },
        fileStore: {
          title: 'File Store',
          name: 'Name',
          type: 'Type',
          mount: 'Mount Point',
          totalSpace: 'Total Space',
          usableSpace: 'Usable Space',
          usedSpace: 'Used Space',
          usedPercentage: 'Used Percentage'
        },
        process: {
          title: 'Top 6 Processes',
          processID: 'Process ID',
          name: 'Name',
          cpuLoad: 'CPU Load'
        }
      },
      cache: {
        redis: {
          title: 'Redis Info',
          version: 'Version',
          uptime: 'Uptime',
          connectedClients: 'Connected Clients',
          usedMemory: 'Used Memory',
          maxMemory: 'Max Memory',
          memoryUsageRate: 'Memory Usage Rate',
          memFragmentationRatio: 'Memory Fragmentation Ratio',
          totalCommandsProcessed: 'Total Commands Processed',
          echartsTitle: 'Command Distribution',
          echartsSubTitle: 'Execution Time Distribution of Each Command'
        }
      },
      logs: {
        login: {
          userName: 'User Name',
          userRealName: 'User Real Name',
          ip: 'IP',
          ipAddr: 'IP Address',
          userAgent: 'User-Agent',
          status: 'Status',
          message: 'Message',
          createTime: 'Login Time',
          createUser: 'Login User',
          form: {
            userName: 'Please enter user name',
            userRealName: 'Please enter user real name'
          },
          loginStatus: {
            fail: 'Fail',
            success: 'Success'
          }
        },
        operation: {
          requestId: 'Request ID',
          ip: 'IP',
          ipAddr: 'IP Address',
          userAgent: 'User-Agent',
          requestUri: 'Request URI',
          requestMethod: 'Request Method',
          contentType: 'Content Type',
          methodName: 'Method Name',
          operation: 'Operation',
          methodParams: 'Method Params',
          useTime: 'Use Time(ms)',
          createUser: 'Operation User',
          createTime: 'Operation Time',
          form: {
            createUser: 'Please enter create User'
          }
        },
        error: {
          requestId: 'Request ID',
          ip: 'IP',
          ipAddr: 'IP Address',
          userAgent: 'User-Agent',
          requestUri: 'Request URI',
          requestMethod: 'Request Method',
          contentType: 'Content Type',
          methodName: 'Method Name',
          operation: 'Operation',
          methodParams: 'Method Params',
          useTime: 'Use Time(ms)',
          createUser: 'Operation User',
          createTime: 'Operation Time',
          exceptionMessage: 'Exception Message',
          exceptionClass: 'Exception Class',
          line: 'Exceptioin Line',
          stackTrace: 'Stack Trace',
          form: {
            createUser: 'Please enter operation User'
          }
        },
        scheduler: {
          jobName: 'Job Name',
          jobGroup: 'Job Group',
          useTime: 'Use Time(ms)',
          status: 'Status',
          createTime: 'Execute Time',
          exceptionMessage: 'Exception Message',
          exceptionClass: 'Exception Class',
          line: 'Exceptioin Line',
          stackTrace: 'Stack Trace',
          executeStatus: {
            success: 'Success',
            fail: 'Fail'
          },
          form: {
            jobName: 'Please select job name'
          }
        }
      },
      scheduler: {
        jobName: 'Job Name',
        jobGroup: 'Job Group',
        jobClassName: 'Job Class Name',
        description: 'Job Description',
        cronExpression: 'Cron Expression',
        jobData: 'Job Params',
        triggerName: 'Trigger Name',
        triggerGroup: 'Trigger Group',
        triggerDescription: 'Trigger Description',
        triggerData: 'Trigger Params',
        triggerState: 'State',
        form: {
          jobName: 'Please enter job name',
          jobGroup: 'Please enter job group',
          jobClassName: 'Please enter job class name',
          description: 'Please enter job description',
          cronExpression: 'Please enter cron expression',
          jobDataKey: 'Please enter job params key',
          jobDataValue: 'Please enter job params value',
          triggerName: 'Please enter trigger name',
          triggerGroup: 'Please enter trigger group',
          triggerDescription: 'Please enter trigger description',
          triggerDataKey: 'Please enter trigger params key',
          triggerDataValue: 'Please enter trigger params value'
        },
        addJob: 'Add Job',
        editJob: 'Edit Job',
        immediateJob: 'Immediate Job',
        immediateSuccess: 'Immediate Success',
        pauseJob: 'Pause Job',
        pauseJobGroup: 'Pause Group Job',
        pauseSuccess: 'Pause Success',
        pauseFail: 'Pause Fail',
        resumeJob: 'Resume Job',
        resumeJobGroup: 'Resume Group Job',
        resumeSuccess: 'Resume Success',
        resumeFail: 'Resume Fail',
        confirmOperate: 'Are You Confirm {operation} : {name} ?',
        triggerStates: {
          waiting: 'Waiting',
          acquired: 'Acquired',
          executing: 'Executing',
          paused: 'Paused',
          blocked: 'Blocked',
          error: 'Error'
        }
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
