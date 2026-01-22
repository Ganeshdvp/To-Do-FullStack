import { Badge } from "@/components/ui/badge"

export function BadgeUI({value, className, icon}) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge className={className}>{icon} {value}</Badge>
    </div>
  )
}

