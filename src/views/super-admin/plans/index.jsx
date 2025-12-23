import React, { useState, useEffect } from "react";
import { supabase } from '../../../utils/supabaseClient';

import {
  Box, Button, Card, CardContent, CardHeader, Typography, Grid,
  Stack, IconButton, Switch, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Divider, CircularProgress
} from "@mui/material";

// MUI Icons Replacement
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import MainCard from 'ui-component/cards/MainCard';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price_monthly', { ascending: true });

    if (data) setPlans(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpen = (plan = null) => {
    setSelectedPlan(plan || {
      name: "",
      price_monthly: 0,
      price_yearly: 0,
      student_limit: 0,
      features: [],
      is_active: true
    });
    setOpen(true);
  };

  const handleSave = async () => {
    const { id, created_at, ...payload } = selectedPlan;

    if (typeof payload.features === 'string') {
      payload.features = payload.features.split('\n').filter((f) => f.trim());
    }

    const { error } = id
      ? await supabase.from('plans').update(payload).eq('id', id)
      : await supabase.from('plans').insert([payload]);

    if (!error) {
      setOpen(false);
      fetchPlans();
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    await supabase.from('plans').update({ is_active: !currentStatus }).eq('id', id);
    fetchPlans();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainCard>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Plans Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Create Plan
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={plan.id}>
            <Card sx={{ border: plan.is_active ? '1px solid #e0e0e0' : '1px dashed red' }}>
              <CardHeader
                title={plan.name}
                action={
                  <Stack direction="row">
                    <IconButton onClick={() => handleOpen(plan)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                }
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  ${plan.price_monthly}<small>/mo</small>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or ${plan.price_yearly}/year
                </Typography>

                <Stack spacing={1} sx={{ my: 2, minHeight: '100px' }}>
                  {plan.features?.map((f, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <CheckIcon sx={{ fontSize: 18, color: 'success.main' }} />
                      <Typography variant="body2">{f}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption">
                    Student Limit: {plan.student_limit === -1 ? 'Unlimited' : plan.student_limit}
                  </Typography>
                  <Switch
                    checked={plan.is_active}
                    onChange={() => toggleStatus(plan.id, plan.is_active)}
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{selectedPlan?.id ? 'Edit Plan' : 'New Plan'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Plan Name" fullWidth
              value={selectedPlan?.name || ""}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Monthly Price" type="number" fullWidth
                value={selectedPlan?.price_monthly || 0}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, price_monthly: Number(e.target.value) })}
              />
              <TextField
                label="Yearly Price" type="number" fullWidth
                value={selectedPlan?.price_yearly || 0}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, price_yearly: Number(e.target.value) })}
              />
            </Stack>
            <TextField
              label="Student Limit" type="number"
              value={selectedPlan?.student_limit || 0}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, student_limit: Number(e.target.value) })}
              helperText="-1 for unlimited"
            />
            <TextField
              label="Features (one per line)" multiline rows={4}
              value={Array.isArray(selectedPlan?.features) ? selectedPlan.features.join('\n') : selectedPlan?.features || ""}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, features: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save to Database</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Plans;