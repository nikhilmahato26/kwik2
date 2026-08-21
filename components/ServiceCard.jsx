import Image from "next/image";
import { iconMap } from "@/lib/icon-map";

export default function ServiceCard({ service, featured = false }) {
  const Icon = iconMap[service.icon] ?? iconMap.Car;

  if (featured) {
    return (
      <div className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-card bg-maroon p-8 text-white shadow-md group">
        {service.image ? (
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/80 to-maroon-deep/40" />
          </div>
        ) : null}
        <div className="relative z-10 flex size-14 items-center justify-center rounded-[10px] bg-gold/20 backdrop-blur-sm border border-gold/30">
          <Icon className="size-7 text-gold-light" aria-hidden />
        </div>
        <div className="relative z-10 mt-8">
          <h3 className="font-display text-2xl font-bold sm:text-3xl text-white">{service.name}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/90">
            {service.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card border border-maroon/10 bg-white transition-all duration-300 hover:border-gold/50 hover:shadow-lg">
      {service.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-gold/40 bg-cream">
            <Icon className="size-4 text-maroon" aria-hidden />
          </div>
          <h3 className="font-display text-lg font-semibold text-maroon-deep">
            {service.name}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-dark/70">
          {service.description}
        </p>
      </div>
    </div>
  );
}
