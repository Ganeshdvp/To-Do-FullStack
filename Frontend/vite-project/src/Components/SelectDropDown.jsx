import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDropDown({placeholder, title, options, value, onChange}) {

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48 cursor-pointer" >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
         {
          options.map((options)=>(
             <SelectItem key={options.value} value={options.value} className='cursor-pointer'>{options?.value}</SelectItem>
          ))
         }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
