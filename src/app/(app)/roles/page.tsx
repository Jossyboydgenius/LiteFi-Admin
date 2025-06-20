"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { AdminRole } from '@/lib/types';
import { AddAdminModal } from '@/components/roles/AddAdminModal';
import { EditAdminModal, type AdminUser, type EditAdminFormValues } from '@/components/roles/EditAdminModal';
import { UserCheck, UserX, Users } from 'lucide-react';
import { useToast } from '@/components/ui/toast-provider';

export default function RolesPage() {
  const { toast } = useToast();
  
  // State for admin users data
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: 'admin1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@litefi.com',
      role: AdminRole.SUPER_ADMIN,
      createdAt: '2023-01-10T08:15:00Z',
      isActive: true,
    },
    {
      id: 'admin2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@litefi.com',
      role: AdminRole.ADMIN,
      createdAt: '2023-02-15T09:30:00Z',
      isActive: true,
    },
    {
      id: 'admin3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael@litefi.com',
      role: AdminRole.RISK,
      createdAt: '2023-03-05T11:45:00Z',
      isActive: true,
    },
    {
      id: 'admin4',
      firstName: 'Jennifer',
      lastName: 'Wong',
      email: 'jennifer@litefi.com',
      role: AdminRole.FINANCE,
      createdAt: '2023-04-20T14:20:00Z',
      isActive: true,
    },
    {
      id: 'admin5',
      firstName: 'David',
      lastName: 'Miller',
      email: 'david@litefi.com',
      role: AdminRole.COMPLIANCE,
      createdAt: '2023-05-15T10:10:00Z',
      isActive: false,
    },
  ]);

  // Track which admin is being modified (for loading state)
  const [processingAdminId, setProcessingAdminId] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Get role display name
  const getRoleDisplayName = (role: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        return 'Super Admin';
      case AdminRole.ADMIN:
        return 'Admin';
      case AdminRole.SALES:
        return 'Sales';
      case AdminRole.RISK:
        return 'Risk';
      case AdminRole.FINANCE:
        return 'Finance';
      case AdminRole.COMPLIANCE:
        return 'Compliance';
      case AdminRole.COLLECTIONS:
        return 'Collections';
      case AdminRole.PORT_MGT:
        return 'Portfolio Management';
      default:
        return role;
    }
  };

  // Get role badge color
  const getRoleBadge = (role: AdminRole) => {
    let className = '';
    
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        className = 'bg-purple-500';
        break;
      case AdminRole.ADMIN:
        className = 'bg-blue-500';
        break;
      case AdminRole.SALES:
        className = 'bg-green-500';
        break;
      case AdminRole.RISK:
        className = 'bg-yellow-500';
        break;
      case AdminRole.FINANCE:
        className = 'bg-indigo-500';
        break;
      case AdminRole.COMPLIANCE:
        className = 'bg-teal-500';
        break;
      case AdminRole.COLLECTIONS:
        className = 'bg-red-500';
        break;
      case AdminRole.PORT_MGT:
        className = 'bg-pink-500';
        break;
      default:
        className = 'bg-gray-500';
    }
    
    return <Badge className={className}>{getRoleDisplayName(role)}</Badge>;
  };

  // Get status badge
  const getStatusBadge = (isActive: boolean) => {
    return isActive ? 
      <Badge className="bg-green-500">Active</Badge> : 
      <Badge className="bg-red-500">Inactive</Badge>;
  };

  // Handle adding a new admin
  const handleAddAdmin = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: AdminRole;
    isActive: boolean;
  }) => {
    try {
      // This would normally call an API endpoint to create a new admin
      console.log('Adding new admin:', data);
      
      // For demo purposes, add to local state
      const newAdmin: AdminUser = {
        id: `admin${adminUsers.length + 1}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
        isActive: data.isActive
      };
      
      setAdminUsers(prev => [...prev, newAdmin]);
      
      // Show success toast
      toast({
        title: "Admin Added Successfully",
        message: `${data.firstName} ${data.lastName} has been added as ${getRoleDisplayName(data.role)}`,
        type: "success",
      });
    } catch (error) {
      console.error('Error adding admin:', error);
      
      // Show error toast
      toast({
        title: "Error Adding Admin",
        message: "There was an error adding the admin. Please try again.",
        type: "error",
      });
    }
  };

  // Handle editing an admin
  const handleEditAdmin = async (id: string, data: EditAdminFormValues) => {
    try {
      setProcessingAdminId(id);
      
      // This would normally call an API endpoint to update the admin
      console.log(`Editing admin ${id}:`, data);
      
      // For demo purposes, update in local state
      setAdminUsers(prev => prev.map(admin => 
        admin.id === id ? { ...admin, ...data } : admin
      ));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success toast
      toast({
        title: "Admin Updated Successfully",
        message: `${data.firstName} ${data.lastName}'s information has been updated`,
        type: "success",
      });
    } catch (error) {
      console.error('Error editing admin:', error);
      
      // Show error toast
      toast({
        title: "Error Updating Admin",
        message: "There was an error updating the admin. Please try again.",
        type: "error",
      });
    } finally {
      setProcessingAdminId(null);
    }
  };

  // Handle activating/deactivating an admin
  const handleToggleActive = async (admin: AdminUser) => {
    try {
      setProcessingAdminId(admin.id);
      
      // This would normally call an API endpoint to update the admin's status
      console.log(`${admin.isActive ? 'Deactivating' : 'Activating'} admin ${admin.id}`);
      
      // For demo purposes, update in local state
      setAdminUsers(prev => prev.map(item => 
        item.id === admin.id ? { ...item, isActive: !item.isActive } : item
      ));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success toast
      toast({
        title: `Admin ${!admin.isActive ? 'Activated' : 'Deactivated'}`,
        message: `${admin.firstName} ${admin.lastName} has been ${!admin.isActive ? 'activated' : 'deactivated'}`,
        type: "success",
      });
    } catch (error) {
      console.error('Error toggling admin status:', error);
      
      // Show error toast
      toast({
        title: "Error Updating Status",
        message: "There was an error updating the admin status. Please try again.",
        type: "error",
      });
    } finally {
      setProcessingAdminId(null);
    }
  };

  const activeAdmins = adminUsers.filter(admin => admin.isActive).length;
  const totalAdmins = adminUsers.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Roles</h1>
        <AddAdminModal onAddAdmin={handleAddAdmin} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All admin accounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              Active Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAdmins}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserX className="w-4 h-4 mr-2" />
              Inactive Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins - activeAdmins}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently inactive
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Manage administrative users and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    {admin.firstName} {admin.lastName}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{getRoleBadge(admin.role)}</TableCell>
                  <TableCell>{formatDate(admin.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(admin.isActive)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                    <EditAdminModal 
                      admin={admin} 
                      onEditAdmin={handleEditAdmin} 
                    />
                      <Switch
                        checked={admin.isActive}
                        onCheckedChange={() => handleToggleActive(admin)}
                      disabled={processingAdminId === admin.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Role-based access control settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead>Super Admin</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Finance</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Collections</TableHead>
                  <TableHead>Portfolio Mgt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Dashboard</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">User Management</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Investment Management</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>✓</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Loan Management</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Settings</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Role Management</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Legend:</strong> ✓ = Full Access, View = Read-only Access, - = No Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 