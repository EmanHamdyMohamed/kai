export default function HeaderTitle() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Kai</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Text Analyzer</span>
        </div>
    );
}