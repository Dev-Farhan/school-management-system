// assets
import { IconDashboard, IconSchool } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconSchool };

// ==============================|| ACADEMIC CORE MENU ITEMS ||============================== //

const academicCore = {
    id: 'academic-core',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Academic Core',
            type: 'collapse',
            icon: icons.IconSchool,
            children: [
                {
                    id: 'academic-setup',
                    title: 'Academic Setup',
                    type: 'item',
                    url: '/academic-core/academic-setup',
                    breadcrumbs: false
                },

            ]
        }
    ]
};

export default academicCore;
