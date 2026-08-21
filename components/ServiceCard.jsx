import { iconMap } from "@/lib/icon-map";

export default function ServiceCard({ service, featured = false }) {
  const Icon = iconMap[service.icon] ?? iconMap.Car;

  if (featured) {
    return (
      <div className="flex h-full flex-col justify-between rounded-card bg-maroon p-8 text-white">
        <div className="flex size-14 items-center justify-center rounded-[10px] bg-gold/20">
          <Icon className="size-7 text-gold-light" aria-hidden />
        </div>
        <div className="mt-8">
          <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            {service.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 rounded-card border border-maroon/10 bg-white p-6">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-gold/40 bg-cream">
        <Icon className="size-5 text-maroon" aria-hidden />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-maroon-deep">
          {service.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-dark/70">
          {service.description}
        </p>
      </div>
    </div>
  );
}
