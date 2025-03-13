// app/(protected)/profile/components/ProfileEditDialog.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, X } from "lucide-react";
import { useState } from 'react';

export interface EditableUserInfo {
  phone: string;
  workingHours: string;
  timeZone: string;
  preferredTools: string[];
}

interface ProfileEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: EditableUserInfo;
}

export function ProfileEditDialog({ 
  isOpen, 
  onClose,
  userInfo,
}: ProfileEditDialogProps) {
  const [formData, setFormData] = useState<EditableUserInfo>(userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: "Profile Updated",
        description: "Your information has been successfully updated.",
        duration: 3000,
      });
      onClose();
      // Optionally, you can trigger a page refresh here
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 XXXXXXXXXX"
              pattern="^\+?[1-9]\d{1,14}$"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workingHours">Working Hours</Label>
            <Input
              id="workingHours"
              value={formData.workingHours}
              onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
              placeholder="9:00 AM - 6:00 PM"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Input
              id="timeZone"
              value={formData.timeZone}
              onChange={(e) => setFormData(prev => ({ ...prev, timeZone: e.target.value }))}
              placeholder="IST (GMT+5:30)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTools">Preferred Tools (comma-separated)</Label>
            <Input
              id="preferredTools"
              value={formData.preferredTools.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferredTools: e.target.value.split(',').map(tool => tool.trim()).filter(Boolean)
              }))}
              placeholder="Tool1, Tool2, Tool3"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}