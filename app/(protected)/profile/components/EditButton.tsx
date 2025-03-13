// app/(protected)/profile/components/EditButton.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { ProfileEditDialog } from './ProfileEditDialog';

interface EditableUserInfo {
  phone: string;
  workingHours: string;
  timeZone: string;
  preferredTools: string[];
}

interface EditButtonProps {
  userInfo: EditableUserInfo;
}

export function EditButton({ userInfo }: EditButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-blue-600"
        onClick={() => setIsDialogOpen(true)}
      >
        <Edit2 className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>

      <ProfileEditDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userInfo={userInfo}
      />
    </>
  );
}