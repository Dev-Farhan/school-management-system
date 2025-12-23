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
                    id: 'sessions',
                    title: 'Sessions',
                    type: 'item',
                    url: '/academic-core/sessions',
                    breadcrumbs: false
                },
                {
                    id: 'classes',
                    title: 'Classes',
                    type: 'item',
                    url: '/academic-core/classes',
                    breadcrumbs: false
                },
                {
                    id: 'sections',
                    title: 'Sections',
                    type: 'item',
                    url: '/academic-core/sections',
                    breadcrumbs: false
                },

            ]
        }
    ]
};

export default academicCore;
