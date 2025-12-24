import React, { useState, useEffect } from 'react';
import {
    Card, CardContent, CardHeader, Typography, Button, IconButton, Box,
    Switch, MenuItem, TextField, Chip, Stack, Dialog, DialogTitle,
    DialogContent, DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Add as PlusIcon, Edit as PencilIcon, Delete as TrashIcon,
    Check as CheckIcon, Save as SaveIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from 'contexts/AuthContext';
import { supabase } from '../../../../utils/supabaseClient';
import toast from 'react-hot-toast';

// --- Validation Schema ---
const schema = yup.object().shape({
    name: yup
        .string()
        .required('Academic year name is required')
        .matches(/^\d{4}-\d{4}$/, 'Format must be YYYY-YYYY (e.g., 2025-2026)'),
    startDate: yup.date().required('Start date is required').typeError('Invalid date'),
    endDate: yup
        .date()
        .required('End date is required')
        .typeError('Invalid date')
        .min(yup.ref('startDate'), 'End date must be after start date'),
});

// --- Sub-component: Unified Modal ---
const AcademicYearModal = ({ open, onClose, onSave, isEditing, defaultValues }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            startDate: '',
            endDate: ''
        }
    });

    // Reset form when modal opens with new data or is closed
    useEffect(() => {
        if (open) {
            reset(defaultValues);
        }
    }, [open, defaultValues, reset]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <form onSubmit={handleSubmit(onSave)}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold">
                        {isEditing ? 'Edit Academic Year' : 'Add Academic Year'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {isEditing ? 'Update the academic year details.' : 'Create a new academic year.'}
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <Stack spacing={2}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Academic Year Name *"
                                    placeholder="e.g., 2025-2026"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Start Date *"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        error={!!errors.startDate}
                                        helperText={errors.startDate?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="End Date *"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        error={!!errors.endDate}
                                        helperText={errors.endDate?.message}
                                    />
                                )}
                            />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained" color="secondary">
                        {isEditing ? 'Save Changes' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

// --- Main Component ---
const SessionManagement = ({ academicYears = [], handleDeleteYear, handleSetCurrent, refreshData }) => {
    const { profile } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleSaveYear = async (data) => {
        console.log('data', data);
        const payload = {
            ...data,
            school_id: profile?.school_id,
        };
        console.log('payload', payload);
        let result;
        if (editingId) {
            result = await supabase.from('academic_sessions').update(payload).eq('id', editingId);
        } else {
            result = await supabase.from('academic_sessions').insert([payload]);
            console.log('result insert', result);
        }

        if (result.error) {
            toast.error(result.error.message);
        } else {
            toast.success(`Academic year ${editingId ? 'updated' : 'added'} successfully`);
            setModalOpen(false);
            if (refreshData) refreshData(); // Call a function to re-fetch the list
        }
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setSelectedRow({ name: '', startDate: '', endDate: '' });
        setModalOpen(true);
    };

    const handleOpenEdit = (row) => {
        setEditingId(row.id);
        setSelectedRow(row);
        setModalOpen(true);
    };

    const columns = [
        { field: 'name', headerName: 'Academic Year', flex: 1 },
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : ''
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            flex: 1,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : ''
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip label={params.value || 'inactive'} size="small" color={params.value === 'active' ? 'success' : 'default'} />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
                        <PencilIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteYear(params.row.id)} disabled={params.row.isCurrent}>
                        <TrashIcon fontSize="small" />
                    </IconButton>
                </Stack>
            )
        }
    ];

    return (
        <Stack spacing={4}>
            <Card variant="outlined">
                <CardHeader
                    title="Academic Year Management"
                    action={<Button variant="contained" color="secondary" startIcon={<PlusIcon />} onClick={handleOpenAdd}>Add Academic Year</Button>}
                />
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={academicYears} columns={columns} disableRowSelectionOnClick />
                </Box>
            </Card>

            <AcademicYearModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveYear}
                isEditing={!!editingId}
                defaultValues={selectedRow}
            />
        </Stack>
    );
};

export default SessionManagement;