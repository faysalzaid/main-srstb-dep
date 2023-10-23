/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */


// import { useAuth } from '../hooks/useAuth'


// let secret;




// // const { authState } = useAuth(
// const useCheckPermission = () => {
//     const { authState } = useAuth()
//     if (authState.role === "admin") {
//         return secret = "admin"
//     } else if (authState.role === "planning") {
//         return secret = "planning"
//     } else if (authState.role === "finance") {
//         return secret = "finance"
//     } else if (authState.role === "engineer") {
//         return secret = "engineer"
//     }
// }

// useCheckPermission()

let routes;

routes = [{
        path: '/app/dashboard', // the url
        icon: 'HomeIcon', // the component being exported from icons/index.js
        name: 'Dashboard', // name that appear in Sidebar
        roles: ['admin', 'finance', 'financeAdmin', 'design', 'client', 'roadquality', 'planning', 'planningAdmin', 'engineer', 'contractadmin', 'hr', 'manager', 'pRelation']
    },
    {
        path: '/app/companies',
        icon: 'SunIcon',
        name: 'Companies',
        roles: ['admin', 'finance', 'financeAdmin', 'design', 'roadquality', 'engineer', 'contractadmin', 'hr', 'manager', 'planning', 'planningAdmin']
    },

    {
        path: '/app/bids',
        icon: 'FormsIcon',
        name: 'Bids',
        roles: ['admin', 'finance', 'financeAdmin', 'engineer', 'manager', 'planning', 'planningAdmin']
    },

    {
        path: '/app/users',
        icon: 'PeopleIcon',
        name: 'Users',
        roles: ['admin', 'financeAdmin', 'manager', 'hr', 'planningAdmin']
    },
    {
        path: '/app/charts',
        icon: 'ChartsIcon',
        name: 'Charts',
        roles: ['admin', 'finance', 'financeAdmin', 'design', 'roadquality', 'planning', 'planningAdmin', 'engineer', 'contractadmin', 'hr', 'manager']
    },


    {
        path: '/app/chat',
        icon: 'ChatIcon',
        name: 'Chat',
        roles: ['admin', 'finance', 'financeAdmin', 'design', 'client', 'roadquality', 'planning', 'planningAdmin', 'engineer', 'contractadmin', 'hr', 'manager', 'pRelation']
    },
    {
        path: '/app/pglist',
        icon: 'TablesIcon',
        name: 'Projects',
        roles: ['admin', 'finance', 'financeAdmin', 'roadquality', 'engineer', 'manager', 'planning', 'planningAdmin']
    },
    {
        icon: 'FaRoad',
        name: 'Road Asset',
        roles: ['admin', 'roadquality'],
        routes: [
            // submenu
            {
                path: '/app/roads',
                icon: 'FaBroadcastTower',
                name: 'Roads',
                roles: ['admin', 'roadquality']
            },
            {
                path: '/app/members',
                icon: 'FaPhoenixFramework',
                name: 'Maintainance',
                roles: ['admin', 'roadquality']
            },



        ],
    },

    {
        path: '/app/archives',
        icon: 'FaRegFileArchive',
        name: 'Archives',
        roles: ['admin', 'design', 'engineer', 'pRelation']
    },

    {

        icon: 'FaCircleNotch',
        name: 'Procurement',
        roles: ['admin', 'design', 'engineer'],
        routes: [
            // submenu
            {
                path: '/app/procurement',
                icon: 'FaRegLifeRing',
                name: 'Procurements',
                roles: ['admin', 'roadquality']
            },
            {
                path: '/app/procFile',
                icon: 'FaFileSignature',
                name: 'Pr.Files',
                roles: ['admin', 'roadquality']
            },



        ],
    },
    {
        path: '/app/requests',
        icon: 'CardsIcon',
        name: 'Letter Requests',
        roles: ['admin', 'finance', 'financeAdmin', 'hr', 'planning', 'planningAdmin']
    },

    // {
    //     path: '/app/designations',
    //     name: 'Designations',
    //     icon: 'PagesIcon',
    //     roles: ['admin', 'finance']'financeAdmin',
    // },
    // {
    //     path: '/app/employees',
    //     icon: 'MoonIcon',
    //     name: 'Employees',
    //     roles: ['admin', 'finance']'financeAdmin',
    // },
    {
        path: '/app/invoice',
        icon: 'FaFileInvoiceDollar',
        name: 'Invoices',
        roles: ['admin', 'finance', 'financeAdmin', ]

    },
    {
        path: '/app/awards',
        icon: 'FaAward',
        name: 'Awards',
        roles: ['admin', ]

    },
    {
        path: '/app/contract',
        icon: 'FaFileContract',
        name: 'Contracts',
        roles: ['admin', 'contractadmin']
    },
    {
        name: 'Reports',
        icon: 'FaReadme',
        roles: ['admin', 'finance', 'financeAdmin', 'roadquality', 'planningAdmin'],
        routes: [{
            path: '/app/reports/projects',
            icon: 'FaRoute',
            name: 'Projects',
            roles: ['admin', 'finance', 'financeAdmin', 'hr', 'planningAdmin']
        }, ]
    },


    {
        name: 'Office Info',
        icon: 'PagesIcon',
        roles: ['admin', 'hr'],
        routes: [
            // submenu
            {
                path: '/app/employees',
                icon: 'MoonIcon',
                name: 'Employees',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/designations',
                name: 'Designations',
                icon: 'PagesIcon',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/departments',
                name: 'Departments',
                icon: 'SearchIcon',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/leavetypelist',
                name: 'LeaveType',
                icon: 'FaPills',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/leavelist',
                name: 'Leaves',
                icon: 'FaHandHoldingMedical',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/area',
                name: 'Areas',
                icon: 'FaPlaceOfWorship',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/payroll',
                name: 'Payroll',
                icon: 'FaMoneyCheckAlt',
                roles: ['admin', 'hr']
            },

            {
                path: '/app/timesheet',
                name: 'M.timesheet',
                icon: 'FaUserClock',
                roles: ['admin', 'hr']
            },


        ],
    },

    {
        icon: 'FaHtml5',
        name: 'Website',
        roles: ['admin', 'pRelation'],
        routes: [
            // submenu
            {
                path: '/app/bloglist',
                icon: 'FaBlogger',
                name: 'Blog',
                roles: ['admin', 'hr']
            },
            {
                path: '/app/members',
                icon: 'FaUsersCog',
                name: 'Members',
                roles: ['admin', 'hr']
            },



        ],
    },

    // {
    //     name: 'Jobs',
    //     icon: 'FaForumbee',
    //     routes: [
    //         // submenu
    //         {
    //             path: '/app/candidates',
    //             icon: 'FaIoxhost',
    //             name: 'Candidates',
    //             roles: ['admin', 'finance','financeAdmin', 'hr']
    //         },
    //         {
    //             path: '/app/candidate/shortlisted',
    //             icon: 'FaSlideshare',
    //             name: 'ShortListed',
    //             roles: ['admin', 'finance','financeAdmin', 'hr']
    //         },
    //         {
    //             path: '/app/candidate/selected',
    //             icon: 'FaHandsHelping',
    //             name: 'Selected',
    //             roles: ['admin', 'finance','financeAdmin', 'hr']
    //         },


    //     ],
    // },
    {
        path: '/app/settings',
        icon: 'BsFillGearFill',
        name: 'Settings',
        roles: ['admin', ]
    },
]

export default routes