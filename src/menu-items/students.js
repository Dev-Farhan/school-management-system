// assets
import { IconSchool } from '@tabler/icons-react';

// constant
const icons = {
  IconSchool
};

const students = {
  id: 'students',
  icon: icons.IconSchool,
  type: 'group',
  children: [
    {
      id: 'students',
      title: 'Students',
      type: 'collapse',
      icon: icons.IconSchool,
      children: [
        {
          id: 'all-students',
          title: 'All Students',
          type: 'item',
          url: '/students/all-students'
        },
        {
          id: 'new-admission',
          title: 'New Admission',
          type: 'item',
          url: '/students/new-admission'
        }
      ]
    }
  ]
};

export default students;
