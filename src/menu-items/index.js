import dashboard from './dashboard';
import admissionForm from './admissionForm';
import students from './students';
import plans from './plans';
import schools from './schools';
import academicCore from './academic-core';
// ==============================|| MENU ITEMS ||============================== //

const dashboardByRole = (role) => {
  const isSuperAdmin = role === 'super_admin';
  const isSchoolAdmin = role === 'school_admin';
  const label = isSuperAdmin ? 'Super Admin Dashboard' : isSchoolAdmin ? 'School Admin Dashboard' : 'Dashboard';
  const url = '/';

  return {
    ...dashboard,
    children: dashboard.children?.map((child) => ({
      ...child,
      title: label,
      url
    }))
  };
};

const navigationByRole = {
  super_admin: [dashboardByRole('super_admin'), plans, schools],
  school_admin: [dashboardByRole('school_admin'), academicCore]
};

const fallbackNavigation = [dashboardByRole(), students];

export const getNavigationByRole = (role) => {
  let resolvedRole = role;

  if (!resolvedRole && typeof window !== 'undefined') {
    resolvedRole = localStorage.getItem('user_role');
  }

  const items = navigationByRole[resolvedRole] || fallbackNavigation;
  return { items };
};

export default getNavigationByRole();
