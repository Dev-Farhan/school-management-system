// assets
import { IconBrandChrome } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome };

// ==============================|| ADMISSION FORM MENU ITEMS ||============================== //

const admissionForm = {
  id: 'admission',
  title: 'Admission',
  type: 'group',
  children: [
    {
      id: 'admission-form',
      title: 'Admission Form',
      type: 'item',
      url: '/admission-form',
      icon: icons.IconBrandChrome,
      breadcrumbs: true
    }
  ]
};

export default admissionForm;
