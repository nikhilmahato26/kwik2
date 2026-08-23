import { getSettings } from "@/app/admin/actions";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  const settings = await getSettings();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your public site's name, tagline, and contact details.
        </p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
