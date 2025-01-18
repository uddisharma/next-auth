import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ContactViewModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function ContactViewModal({
  isOpen,
  onClose,
  contact,
}: ContactViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>
            View the details of the contact submission.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{`${contact.submission.firstName} ${contact.submission.lastName}`}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Email:</span>
            <span className="col-span-3">{contact.submission.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Phone:</span>
            <span className="col-span-3">{contact.submission.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Subject:</span>
            <span className="col-span-3">{contact.submission.subject}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Message:</span>
            <span className="col-span-3">{contact.submission.message}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
