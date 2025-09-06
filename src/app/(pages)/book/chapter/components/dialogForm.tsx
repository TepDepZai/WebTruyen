import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface DialogFormProps {
  nameDialog?: string
  className?: string
  items?: Array<string>
  id?: string | null
  currentChapterNumber?: number | null
}

const DialogForm = ({
  nameDialog,
  className,
  items,
  id,
  currentChapterNumber,
}: DialogFormProps) => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant="default">
          {nameDialog}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Chapter List</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 mt-2">
          {items?.map((item, index) => {
            const isCurrent = Number(item) === currentChapterNumber
            return (
              <DialogClose asChild key={index}>
                <Button
                  variant={isCurrent ? "default" : "outline"}
                  className={`w-full justify-start text-left ${
                    isCurrent ? "bg-blue-500 text-white hover:bg-blue-600" : ""
                  }`}
                  onClick={() =>
                    router.push(`/book/chapter/view?id=${id}&number=${item}`)
                  }
                >
                  Chapter {item}
                  {isCurrent && (
                    <span className="ml-2 text-xs font-medium">(current)</span>
                  )}
                </Button>
              </DialogClose>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm
