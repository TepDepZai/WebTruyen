import { useRouter, useSearchParams } from "next/navigation";
import DialogAdmin from "../../components/dialogAdmin";
import Field from "@/app/(pages)/_components/fieald";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface EditBookDialogProps {
  userData: {
    id: string;
    title: string;
    roleBar: boolean;
    status: string;
    createdByName?: string;
  }[];
  onSubmit: (data: { id: string; roleBar: boolean; status: string }) => void;
}

const EditBookDialog = ({ userData, onSubmit }: EditBookDialogProps) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const userId = searchParam.get("id");
  const mode = searchParam.get("mode");
  const open = mode === "edit";

  const user = userData.find((u) => u.id === userId);

  const [formData, setFormData] = useState({
    roleBar: user?.roleBar || false,
    status: user?.status || "draft"
  });
  useEffect(() => {
    if (user) {
      setFormData({
        roleBar: user.roleBar,
        status: user.status
      });
    }
  }, [user]);

  const closeModal = () => {
    const params = new URLSearchParams(searchParam.toString());
    params.delete("mode");
    params.delete("id");
    router.push(`/admin/listBook?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = () => {
    if (user) {
      onSubmit({
        id: user.id,
        roleBar: formData.roleBar,
        status: formData.status
      });
      closeModal();
    }
  };

  return (
    <DialogAdmin
      onSubmit={handleSubmit}
      sizeX="xl"
      sizeY="lg"
      title="Edit Book"
      description="Modify the details of the book below."
      open={open}
      onClose={closeModal}
      showFooter={true}
      content={
        user ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.title || "—"}
                </h2>
              </div>
            </div>
            
            <div className="grid gap-4 text-sm">
              <Field label="Book ID" value={user.id} />
              <Field label="Book Title" value={user.title} />
              <Field label="Created By" value={user.createdByName || "—"} />
              
              <div>
                <Label htmlFor="roleBar" className="mb-2">Role Bar</Label>
                <Select 
                  value={formData.roleBar.toString()} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    roleBar: value === "true" 
                  }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select roleBar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status" className="mb-2">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    status: value 
                  }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>  
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Book not found</div>
        )
      }
    />
  );
};

export default EditBookDialog;