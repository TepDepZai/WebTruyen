"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlertDialog } from "../../_components/hook/useAlertDialog";
import { AppAlertDialog } from "../../_components/alertDialog";
import { useState } from "react";
import useToastState from "../../_components/hook/useToast";
import { activateUser, assignRole } from "@/services/authService";

interface CardAdminProps {
  name: string;
  email: string;
  role: string;
  activated?: boolean;
  _id: string;
  refresh?: () => void;
}

const CardAdmin = ({ name, email, role, activated, _id, refresh }: CardAdminProps) => {
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
      <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{email}</CardDescription>
          <CardDescription className="text-sm text-gray-500">Role: {role}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => handlePageQueryToModal("view", String(_id))}
          >
            View User
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setAlertDialogProps({
                title: "Confirm Role Assignment",
                description:
                  "Are you sure you want to assign this role? This action cannot be undone.",
                submitText: "Assign Role",
                onSubmit: async () => {
                  const data = await assignRole(_id, role);
                  console.log(data);
                  if (!data?.success) {
                    setToast({
                      title: "Role Assignment",
                      message: data.message || "Failed to assign role, please try again later.",
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
            Assign Role
          </Button>
          {!activated ? (
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                setAlertDialogProps({
                  title: "Confirm Activation",
                  description:
                    "Are you sure you want to activate this user? This action cannot be undone.",
                  submitText: "Activate",
                  onSubmit: async () => {
                    const data = await activateUser(_id);
                    console.log(data);
                    if (!data.success) {
                      setToast({
                        title: "Activation",
                        message: data.message || "Failed to activate user, please try again later.",
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
              variant="default"
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
                        message: "Failed to deactivate user, please try again later.",
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
        title={alertDialogProps.title || "Confirm User Deletion"}
        description={
          alertDialogProps.description ||
          "Are you sure you want to delete this user? This action cannot be undone."
        }
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        submitText={alertDialogProps.submitText || "Delete"}
        onSubmit={() => alertDialogProps.onSubmit?.()}
      />
    </>
  );
};

export default CardAdmin;
