import { MessageSquareIcon } from "lucide-react";

export default function NodesPanel() {
    return (
        <div className="w-1/4 h-full bg-gray-100 p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <MessageSquareIcon className="w-4 h-4" />
                    <p className="text-sm font-medium">Send Message</p>
                </div>
            </div>
        </div>
    );
}