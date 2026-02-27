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
      ? " w-[90vw] sm:w-[300px]"
      : sizeX === "md"
        ? " w-[90vw] sm:w-[400px]"
        : sizeX === "lg"
          ? " w-[90vw] sm:w-[500px]"
          : " w-[90vw] sm:w-[600px]";
  const SizeYDialog =
    sizeY === "sm"
      ? " max-h-[80vh]"
      : sizeY === "md"
        ? " max-h-[80vh]"
        : sizeY === "lg"
          ? " max-h-[85vh]"
          : " max-h-[90vh]";
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] bg-gradient-to-b from-[#1B1B23] to-[#14141A] border border-[#F5C452]/30 overflow-auto` + SizeXDialog + SizeYDialog}>
        <form onSubmit={onSubmit}>
          <DialogHeader className="border-b border-[#F5C452]/20">
            <DialogTitle className="text-white text-xl font-bold">{title || "Thông báo"}</DialogTitle>
            {description && (
              <DialogDescription className="text-gray-400">{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">{content}</div>
          {showFooter && (
            <DialogFooter className="border-t border-[#F5C452]/20 pt-4">
              <DialogClose asChild>
                <Button variant="outline" className="border-[#F5C452]/40 text-[#F5C452] hover:bg-[#F5C452]/10">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#F5C452]/80 to-[#FFD700]/70 hover:from-[#F5C452] hover:to-[#FFD700] text-black font-semibold"
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
