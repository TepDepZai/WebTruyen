import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogAdminProps {
  title?: string;
  description?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "destructive";
  content: React.ReactNode;
  onSubmit?: (data: unknown) => void;
  showFooter?: boolean;
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onClose?: () => void;
}

const DialogAdmin = ({
  title,
  trigger,
  description,
  triggerLabel = "Open Dialog",
  triggerVariant = "outline",
  open = false,
  content,
  setOpen = () => { },
  onClose,
  onSubmit,
  showFooter = true,
}: DialogAdminProps) => {

    const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && onClose) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title || "Thông báo"}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-2">{content}</div>
          {showFooter && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => {
              if (onSubmit) {
                onSubmit({});
              }
            }}>Save changes</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAdmin;
