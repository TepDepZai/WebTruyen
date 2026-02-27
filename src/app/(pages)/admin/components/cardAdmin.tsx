"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlertDialog } from "../../_components/hook/useAlertDialog";
import { AppAlertDialog } from "../../_components/alertDialog";
import { useState } from "react";
import useToastState from "../../_components/hook/useToast";
import { activateUser, assignRole } from "@/services/authService";
import { UserIcon, ShieldCheck, Mail } from "lucide-react";

interface CardAdminProps {
  name: string;
  email: string;
  role: string;
  activated?: boolean;
  _id: string;
  refresh?: () => void;
}

const CardAdmin = ({
  name,
  email,
  role,
  activated,
  _id,
  refresh,
}: CardAdminProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { alertDialogProps, setAlertDialogProps } = useAlertDialog();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { setToast } = useToastState();

  const handlePageQueryToModal = (mode: string, id?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", mode);
    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }

    router.push(`/admin/user?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl border border-[#F5C452]/30 bg-gradient-to-br from-[#1B1B23] to-[#14141A] hover:border-[#F5C452]/50">
        <CardHeader className="pb-3 flex flex-row items-center gap-3 border-b border-[#F5C452]/20">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#F5C452]/30 to-[#FFD700]/20 text-[#F5C452]">
            <UserIcon size={24} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-white">
              {name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 transition">
              <Mail size={14} /> {email}
            </CardDescription>
            <CardDescription className="flex items-center gap-1 text-sm text-[#F5C452]/70">
              <ShieldCheck size={14} /> Role: <span className="font-semibold">{role}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-end gap-3 pt-4">
          <Button
            variant="outline"
            className="border-[#F5C452]/40 text-black hover:bg-white bg-white/80 hover:border-[#F5C452] transition"
            onClick={() => handlePageQueryToModal("view", String(_id))}
          >
            View
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-[#F5C452]/80 to-[#FFD700]/70 hover:from-[#F5C452] hover:to-[#FFD700] text-black font-semibold shadow-lg hover:shadow-[0_0_12px_rgba(245,196,82,0.3)] transition"
            onClick={() => handlePageQueryToModal("Assign", String(_id))}
          >
            Assign
          </Button>

          {!activated ? (
            <Button
              className="bg-gradient-to-r from-green-500/80 to-emerald-500/70 hover:from-green-500 hover:to-emerald-500 text-white font-semibold shadow-lg hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] transition"
              onClick={() => {
                setAlertDialogProps({
                  title: "Confirm Activation",
                  description:
                    "Are you sure you want to activate this user? This action cannot be undone.",
                  submitText: "Activate",
                  onSubmit: async () => {
                    const data = await activateUser(_id);
                    if (!data.success) {
                      setToast({
                        title: "Activation",
                        message:
                          data.message ||
                          "Failed to activate user, please try again later.",
                        variant: "error",
                      });
                      return;
                    }
                    setToast({
                      title: "Activation",
                      message: "User activated successfully.",
                      variant: "success",
                    });
                    refresh?.();
                  },
                  open: true,
                  setOpen: setOpenAlertDialog,
                });
                setOpenAlertDialog(true);
              }}
            >
              Activate
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-red-500/80 to-rose-500/70 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg hover:shadow-[0_0_12px_rgba(239,68,68,0.3)] transition"
              onClick={() => {
                setAlertDialogProps({
                  title: "Confirm Deactivation",
                  description:
                    "Are you sure you want to deactivate this user? This action cannot be undone.",
                  submitText: "Deactivate",
                  onSubmit: async () => {
                    const data = await activateUser(_id);
                    if (data?.success === false) {
                      setToast({
                        title: "Deactivation",
                        message:
                          "Failed to deactivate user, please try again later.",
                        variant: "error",
                      });
                      return;
                    }
                    setToast({
                      title: "Deactivation",
                      message: "User deactivated successfully.",
                      variant: "success",
                    });
                    refresh?.();
                  },
                  open: true,
                  setOpen: setOpenAlertDialog,
                });
                setOpenAlertDialog(true);
              }}
            >
              Deactivate
            </Button>
          )}
        </CardContent>
      </Card>

      <AppAlertDialog
        title={alertDialogProps.title || "Confirm Action"}
        description={
          alertDialogProps.description ||
          "Are you sure you want to proceed with this action? This cannot be undone."
        }
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        submitText={alertDialogProps.submitText || "Confirm"}
        onSubmit={() => alertDialogProps.onSubmit?.()}
      />
    </>
  );
};

export default CardAdmin;
