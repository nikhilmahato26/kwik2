import { db } from "@/lib/db";
import { deleteLead } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export const dynamic = 'force-dynamic';

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [name, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default async function AdminInquiries() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Inquiries</h1>
        <p className="mt-2 text-sm text-gray-700">
          Every enquiry submitted through the Contact and Booking forms, saved before the customer is handed off to WhatsApp.
        </p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{lead.name}</p>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {lead.source}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{lead.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <LeadStatusSelect id={lead.id} status={lead.status} />
                <DeleteButton
                  action={deleteLead}
                  id={lead.id}
                  confirmMessage="Delete this inquiry? This cannot be undone."
                />
              </div>
            </div>

            {lead.details && Object.keys(lead.details).length > 0 && (
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-100 pt-4">
                {Object.entries(lead.details).map(([key, value]) => {
                  if (!value || String(value).trim() === "") return null;
                  return (
                    <div key={key}>
                      <dt className="text-xs font-medium text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd className="text-sm text-gray-700">{String(value)}</dd>
                    </div>
                  );
                })}
              </dl>
            )}

            <p className="mt-4 text-xs text-gray-400">{timeAgo(lead.createdAt)}</p>
          </div>
        ))}

        {leads.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
            No inquiries yet. They'll show up here as soon as a visitor submits the Contact or Booking form.
          </div>
        )}
      </div>
    </div>
  );
}
