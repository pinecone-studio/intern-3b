// "use client"

// import { Label, RadioGroup, RadioGroupItem } from "@intern-3b/shadcn"




// interface SearchFiltersProps {
//   searchType: "course" | "professor"
//   onChange: (type: "course" | "professor") => void
// }

// export function SearchFilters({ searchType, onChange }: SearchFiltersProps) {
//   return (
//     <RadioGroup
//       value={searchType}
//       onValueChange={(value) => onChange(value as "course" | "professor")}
//       className="flex gap-4"
//     >
//       <div className="flex items-center gap-2">
//         <RadioGroupItem value="course" id="course" className="cursor-pointer" />
//         <Label htmlFor="course" className="text-sm cursor-pointer">
//           Хичээл
//         </Label>
//       </div>
//       <div className="flex items-center gap-2">
//         <RadioGroupItem value="professor" id="professor" className="cursor-pointer" />
//         <Label htmlFor="professor" className="text-sm cursor-pointer">
//           Багш
//         </Label>
//       </div>
//     </RadioGroup>
//   )
// }
