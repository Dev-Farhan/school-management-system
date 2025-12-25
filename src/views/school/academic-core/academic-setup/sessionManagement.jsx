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
import DeleteConfirmDialog from 'ui-component/modals/DeleteConfirmDialog';

// --- Validation Schema ---
const schema = yup.object().shape({
    name: yup
        .string()
        .required('Academic year name is required')
        .matches(/^\d{4}-\d{4}$/, 'Format must be YYYY-YYYY (e.g., 2025-2026)'),
    start_date: yup.date().required('Start date is required').typeError('Invalid date'),
    end_date: yup
        .date()
        .required('End date is required')
        .typeError('Invalid date')
        .min(yup.ref('start_date'), 'End date must be after start date'),
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
            start_date: '',
            end_date: ''
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
                                name="start_date"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Start Date *"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        error={!!errors.start_date}
                                        helperText={errors.start_date?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="end_date"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="End Date *"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        error={!!errors.end_date}
                                        helperText={errors.end_date?.message}
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
const SessionManagement = () => {
    const { profile } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [academicYears, setAcademicYears] = useState([]);
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);



    useEffect(() => {
        getAcademicYears();
    }, []);

    const getAcademicYears = async () => {
        const { data, error } = await supabase.from('academic_sessions').select('*');
        console.log('data', data);
        setAcademicYears(data);
        if (error) {
            toast.error(error.message);
        }
    };
    const handleSaveYear = async (data) => {
        const payload = {
            ...data,
            school_id: profile?.school_id,
        };

        let result;
        if (editingId) {
            // Use .update() if we are editing
            result = await supabase
                .from('academic_sessions')
                .update(payload)
                .eq('id', editingId);
        } else {
            // Use .insert() if we are creating new
            result = await supabase
                .from('academic_sessions')
                .insert([payload]);
        }

        if (result.error) {
            toast.error(result.error.message);
        } else {
            toast.success(`Academic year ${editingId ? 'updated' : 'added'} successfully`);
            setModalOpen(false);
            getAcademicYears();
        }
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setSelectedRow({ name: '', start_date: '', end_date: '' });
        setModalOpen(true);
    };

    const handleOpenEdit = (row) => {
        setEditingId(row.id);
        setSelectedRow(row);
        setModalOpen(true);
    };

const handleToogle = async (row) => {
    const payload = {
        ...row,
        is_active: !row.is_active,
    };
    const { data, error } = await supabase.from('academic_sessions').update(payload).eq('id', row.id);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success(`Academic year ${row.name} ${row.is_active ? 'activated' : 'deactivated'} successfully`);
        getAcademicYears();
    }
}

    const handleOpenDelete = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        const { error } = await supabase
            .from('academic_sessions')
            .delete()
            .eq('id', selectedRow.id);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(`Deleted successfully`);
            getAcademicYears();
        }
        setDeleteDialogOpen(false);
    };

    const columns = [
        { field: 'name', headerName: 'Academic Year', flex: 1 },
        {
            field: 'start_date',
            headerName: 'Start Date',
            flex: 1,
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            flex: 1,
        },
        {
            field: 'is_active',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Switch checked={params.value} color='secondary' onChange={()=>handleToogle(params.row)}/>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            align: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1} sx={{mt:1}}>
                    <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
                        <PencilIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => { }} disabled={params.row.isCurrent}>
                        <TrashIcon fontSize="small" onClick={()=>handleOpenDelete(params.row)}/>
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
                    <DataGrid rows={academicYears || []} columns={columns} disableRowSelectionOnClick />
                </Box>
            </Card>

            <AcademicYearModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveYear}
                isEditing={!!editingId}
                defaultValues={selectedRow}
            />

            <DeleteConfirmDialog 
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Academic Year"
                message={`Are you sure you want to delete "${selectedRow?.name}"? All associated data may be affected.`}
            />
        </Stack>
    );
};

export default SessionManagement;