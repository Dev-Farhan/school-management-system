import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Card, Container } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SessionManagement from './sessionManagement';
import ClassManagement from './classManagement';
import SectionManagement from './sectionManagement';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AcademicSetup = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <MainCard>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Academic Configuration
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your school's structural settings in one place.
                    </Typography>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            aria-label="academic tabs"
                            textColor="secondary"
                            indicatorColor="secondary"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'secondary.main',
                                },
                                '& .MuiTab-root': {
                                    color: 'secondary.main',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <Tab label="Academic Years" />
                            <Tab label="Classes" />
                            <Tab label="Sections" />
                        </Tabs>
                    </Box>

                    <TabPanel value={activeTab} index={0}>
                        {/* Put the DataGrid code we wrote previously here */}
                        <Typography variant="h6">Academic Year Management</Typography>
                        <SessionManagement />
                    </TabPanel>

                    <TabPanel value={activeTab} index={1}>
                        <Typography variant="h6">Class Management</Typography>
                        <ClassManagement />
                    </TabPanel>

                    <TabPanel value={activeTab} index={2}>
                        <Typography variant="h6">Section Management</Typography>
                        <SectionManagement />
                    </TabPanel>
                </Box>
            </Container>
        </MainCard>
    );
};

export default AcademicSetup;