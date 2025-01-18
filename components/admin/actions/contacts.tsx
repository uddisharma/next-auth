"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ContactViewModal } from "../contact-modal";

interface ContactActionsProps {
  contact: {
    id: string;
    submission: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    };
  };
}

export default function ContactActions({ contact }: ContactActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
        toast.success("Contact deleted successfully");
      } else if (response.status == 403) {
        toast.error("You don't have permission to delete a contact");
      } else {
        toast.error("Contact failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete contact. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDropdownOpen(false);
    }
  }, [contact.id, router]);

  const handleViewClick = useCallback(() => {
    setIsViewModalOpen(true);
    setIsDropdownOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsViewModalOpen(false);
  }, []);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleViewClick}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash2 className="mr-2 h-4 w-4 cursor-pointer" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  contact of "{contact?.submission?.firstName}" and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDropdownOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <ContactViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        contact={contact}
      />
    </>
  );
}

