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
  sizeX?: "sm" | "md" | "lg" | "xl";
  sizeY?: "sm" | "md" | "lg" | "xl";
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
  sizeX = "md",
  sizeY = "md",
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
  const SizeXDialog =
    sizeX === "sm"
      ? " w-[300px]"
      : sizeX === "md"
        ? " w-[400px]"
        : sizeX === "lg"
          ? " w-[500px]"
          : " w-[600px]";
  const SizeYDialog =
    sizeY === "sm"
      ? " h-[300px]"
      : sizeY === "md"
        ? " h-[400px]"
        : sizeY === "lg"
          ? " h-[500px]"
          : " h-[600px]";
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={` overflow-auto` + SizeXDialog + SizeYDialog}>
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
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSubmit) {
                    onSubmit({});
                  }
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAdmin;
