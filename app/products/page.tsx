"use client"

import { useState } from "react"
import { DualRangeSlider } from "../../components/ui/dualrangeslider"
import { ProductsList } from "../../components/product-list"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import SortIcon from "../../components/SortIcon"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command"

import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { Dialog } from "@headlessui/react"

const categories = ["All", "Category 1", "Category 2", "Category 3"]
const brands = ["All", "Brand 1", "Brand 2", "Brand 3"]

function FilterSelect({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <label className="font-semibold block mb-1">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700 focus:outline-none"
          >
            {selected || `Select ${label}`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="w-full px-3 py-2" />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup className="w-full">
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      onSelect(option)
                      setOpen(false)
                    }}
                    className="w-full text-sm text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700"
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function Products() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [rating, setRating] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [filterOpen, setFilterOpen] = useState(false)

  const toggleRating = (star: number) => {
    setRating((prev) => (prev.includes(star) ? prev.filter((r) => r !== star) : [...prev, star]))
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Mobile filter button */}
      <div className="md:hidden mb-4 flex justify-end">
        <Button onClick={() => setFilterOpen(true)} variant="outline" size="sm">
          <SlidersHorizontal size={16} />
          <span className="ml-2">Filters</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:w-1/4 sticky top-20 self-start bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <SlidersHorizontal size={20} />
            Filters
          </h2>

          <FilterSelect
            label="Category"
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <FilterSelect label="Brand" options={brands} selected={selectedBrand} onSelect={setSelectedBrand} />

          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Price Range</h3>
            <div className="flex justify-between text-sm">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <div className="px-2">
              <DualRangeSlider
                min={0}
                max={1000}
                minValue={minPrice}
                maxValue={maxPrice}
                step={10}
                onChange={({ min, max }) => {
                  setMinPrice(min)
                  setMaxPrice(max)
                }}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">Rating</label>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rating.includes(star)}
                    onChange={() => toggleRating(star)}
                    className="accent-yellow-400"
                  />
                  <span className="text-yellow-400 text-lg">{"★".repeat(star)}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products content */}
        <section className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">Products Page</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Input type="text" placeholder="Search products..." className="w-full md:w-80" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                    <SortIcon className="w-6 h-6 text-gray-500 dark:text-gray-200" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ProductsList />
        </section>
      </div>

      {/* Mobile filter modal */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50 p-4"
      >
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-sm text-sm relative">
          <button
            onClick={() => setFilterOpen(false)}
            className="absolute top-4 right-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <SlidersHorizontal size={20} />
            Filters
          </h2>

          <FilterSelect
            label="Category"
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <FilterSelect label="Brand" options={brands} selected={selectedBrand} onSelect={setSelectedBrand} />

          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Price Range</h3>
            <div className="flex justify-between text-sm">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <div className="px-2">
              <DualRangeSlider
                min={0}
                max={1000}
                minValue={minPrice}
                maxValue={maxPrice}
                step={10}
                onChange={({ min, max }) => {
                  setMinPrice(min)
                  setMaxPrice(max)
                }}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">Rating</label>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rating.includes(star)}
                    onChange={() => toggleRating(star)}
                    className="accent-yellow-400"
                  />
                  <span className="text-yellow-400 text-lg">{"★".repeat(star)}</span>
                </label>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
