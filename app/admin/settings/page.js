import { Wrench } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <Wrench className="size-12 text-gray-400" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Settings</h1>
      <p className="max-w-md text-gray-500">
        This is a placeholder for the settings page. Once the database is connected, you can manage your account, API keys (Cloudinary/Neon), and website configuration here.
      </p>
    </div>
  );
}
