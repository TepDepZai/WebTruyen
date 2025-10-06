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
      <Card className="w-full max-w-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl border border-gray-100">
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <UserIcon size={24} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">
              {name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm text-gray-500">
              <Mail size={14} /> {email}
            </CardDescription>
            <CardDescription className="flex items-center gap-1 text-sm text-gray-500">
              <ShieldCheck size={14} /> Role: {role}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-wrap justify-end gap-3 pt-3">
          <Button
            variant="outline"
            onClick={() => handlePageQueryToModal("view", String(_id))}
          >
            View
          </Button>

          <Button
            variant="default"
            className="bg-indigo-500 hover:bg-indigo-600"
            onClick={() => {
              setAlertDialogProps({
                title: "Confirm Role Assignment",
                description:
                  "Are you sure you want to assign this role? This action cannot be undone.",
                submitText: "Assign Role",
                onSubmit: async () => {
                  const data = await assignRole(_id, role);
                  if (!data?.success) {
                    setToast({
                      title: "Role Assignment",
                      message:
                        data.message ||
                        "Failed to assign role, please try again later.",
                      variant: "error",
                    });
                    return;
                  }
                  setToast({
                    title: "Role Assignment",
                    message: "Role assigned successfully.",
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
            Assign
          </Button>

          {!activated ? (
            <Button
              className="bg-green-500 hover:bg-green-600"
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
              className="bg-red-500 hover:bg-red-600"
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
