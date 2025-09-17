import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ChapterFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleReset: () => void;
    chapterName: string;
    setChapterName: (name: string) => void;
    chapterNumber: string;
    setChapterNumber: (number: string) => void;
    bookId: string;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitButtonText?: string;
    handleCancel?: () => void;
    isEdit?: boolean;
}

const ChapterForm = ({isEdit, handleCancel, submitButtonText, handleSubmit, handleReset, chapterName, setChapterName, chapterNumber, setChapterNumber, bookId, handleFileUpload }: ChapterFormProps) => {
    return (
        <div className="w-130">
            <Card className="w-full max-w-2xl shadow-lg rounded-2xl border border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        {isEdit ? "Edit Chapter" : "Create Chapter"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
                        {/* Chapter Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Chapter Name
                            </label>
                            <Input
                                id="chapterName"
                                value={chapterName}
                                onChange={(e) => setChapterName(e.target.value)}
                                placeholder="Enter chapter name..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Chapter Number
                            </label>
                            <Input
                                id="chapterNumber"
                                type="number"
                                value={chapterNumber}
                                onChange={(e) => setChapterNumber(e.target.value)}
                                placeholder="Enter chapter number..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Name Book
                            </label>
                            <Input
                                disabled
                                value={bookId || ""}
                                placeholder="Name book"
                                required
                            />
                        </div>

                        {/* Upload DOCX */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Upload Chapter File (.docx)
                            </label>
                            <Input
                                type="file"
                                accept=".docx"
                                onChange={handleFileUpload}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-between">
                            <div></div>
                            <div className="flex justify-end">
                                {isEdit && <Button 
                                onClick={handleCancel}
                                className="bg-red-300 hover:bg-red-400 mr-2">
                                    Cancel
                                </Button>}
                                <Button type="reset" className="bg-gray-300 hover:bg-gray-400 mr-2">
                                    Reset
                                </Button>
                                <Button id="submit-chapter-button" type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                    {submitButtonText}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>


    );
}

export default ChapterForm;